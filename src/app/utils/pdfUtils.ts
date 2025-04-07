import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function extractAndChunkPdf(buffer: Buffer) {
  // Create a temporary file path for the PDF
  const tempPath = `/tmp/temp-${Date.now()}.pdf`;
  require('fs').writeFileSync(tempPath, buffer);
  
  // Use PDFLoader from LangChain (handles browser/Node.js environments properly)
  const loader = new PDFLoader(tempPath);
  const docs = await loader.load();
  
  // Clean up temp file
  require('fs').unlinkSync(tempPath);
  
  // Chunk the document text
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  
  const chunks = await textSplitter.splitDocuments(docs);
  
  // Return just the page content from each chunk
  return chunks.map(chunk => chunk.pageContent);
}