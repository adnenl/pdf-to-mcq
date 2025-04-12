export interface Env {
  AI: any;
}

// Define interfaces for structured data
interface MCQOption {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface MCQuestion {
  question: string;
  options: MCQOption;
  correctAnswer: "A" | "B" | "C" | "D";
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    try {
      const { chunks } = (await request.json()) as { chunks: string[] };
      
      if (!chunks || !Array.isArray(chunks) || chunks.length === 0) {
        return new Response(JSON.stringify({ error: 'No valid chunks provided' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Select most content-rich chunks
      const chunksToProcess = chunks
        .filter(chunk => chunk && chunk.length >= 200)
        .slice(0, Math.min(chunks.length, 5)); // Process fewer chunks for speed
      
      // Process chunks in parallel with JSON output
      const questionPromises = chunksToProcess.map(async (chunk) => {
        const cleanedChunk = chunk
          .replace(/[\x00-\x09\x0B-\x1F\x7F-\xFF]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
          
        if (cleanedChunk.length < 200) return [];
        
        const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          prompt: `
You are creating multiple choice questions based on provided text.

TEXT:
${cleanedChunk}

TASK:
Create 2 multiple choice questions based on the text above.

INSTRUCTIONS:
1. Each question must have 4 options labeled A, B, C, and D
2. Include one correct answer for each question
3. Format your response as a valid JSON array following this exact structure:
[
  {
    "question": "Question text goes here?",
    "options": {
      "A": "First option",
      "B": "Second option",
      "C": "Third option",
      "D": "Fourth option"
    },
    "correctAnswer": "A"
    "explanation": "Optional explanation for the correct answer"
  }
]
4. The correctAnswer field must be one of: "A", "B", "C", or "D"
5. Make sure your JSON is valid with no trailing commas or syntax errors

Return ONLY the JSON array and nothing else.
`,
          max_tokens: 500
        });
        
        // Parse the LLM response as JSON and validate
        try {
          // Extract just the JSON part if there's any extra text
          const jsonMatch = result.response.match(/\[[\s\S]*\]/);
          const jsonStr = jsonMatch ? jsonMatch[0] : result.response;
          
          const parsedQuestions = JSON.parse(jsonStr);
          
          // Validate the structure
          if (!Array.isArray(parsedQuestions)) return [];
          
          return parsedQuestions.filter(q => 
            q.question && 
            q.options && 
            q.options.A && 
            q.options.B && 
            q.options.C && 
            q.options.D && 
            ["A", "B", "C", "D"].includes(q.correctAnswer)
          );
        } catch (e) {
          console.error("Failed to parse LLM response as JSON:", e);
          return []; // Return empty array if parsing fails
        }
      });
      
      // Wait for all chunks to be processed and flatten the results
      const results = await Promise.all(questionPromises);
      const allQuestions = results.flat();
      
      return new Response(JSON.stringify({
        success: true,
        questions: allQuestions,
        count: allQuestions.length
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: `Failed to process text: ${getErrorMessage(error)}` 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
};