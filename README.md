PDF to MCQ Quiz Generator
A web application that automatically generates multiple-choice questions from uploaded PDF documents using AI. Perfect for students, teachers, or anyone who wants to create quizzes from educational materials.

Features
PDF Upload: Easily upload PDF documents
AI-Powered Question Generation: Automatically creates multiple-choice questions based on document content
Interactive Quiz Interface: Take quizzes with immediate feedback
Question Review: Review your answers and see correct solutions
Mobile Responsive: Works on desktop and mobile devices
Technology Stack
Frontend: Next.js 15, React, Tailwind CSS
PDF Processing: LangChain Document Loaders
AI: Cloudflare Workers AI (Llama 3.1 model)
State Management: Zustand
Getting Started
Prerequisites
Node.js 18+
pnpm (preferred) or npm/yarn
Cloudflare account (for Worker deployment)
Installation
Clone the repository

Install dependencies

Create a .env.local file with your Cloudflare credentials

Start the development server

Open http://localhost:3000 to view the application

Cloudflare Worker Setup
This project uses a Cloudflare Worker to process PDF chunks and generate questions using AI.

Deploy the Worker with Wrangler:

Enable Cloudflare AI for the Worker from the Cloudflare dashboard

Update the Worker URL in route.ts if necessary

Usage
Upload a PDF: Click on the file upload area or drag and drop a PDF
Wait for Processing: The app will extract text and generate questions
Start Quiz: Once questions are generated, click "Start Quiz"
Answer Questions: Select your answers for each question
Check Answers: See immediate feedback on your selected answers
Complete Quiz: Review your final score
Project Structure
How It Works
PDF Processing: The application extracts text from uploaded PDFs using LangChain's document loaders.
Text Chunking: The extracted text is split into manageable chunks.
Question Generation: The chunks are sent to a Cloudflare Worker that uses Llama 3.1 to generate multiple-choice questions.
Quiz Interface: The generated questions are displayed in an interactive quiz interface.
Feedback: Users receive immediate feedback on their answers.
Deployment
Vercel (Frontend)
The easiest way to deploy the Next.js frontend:

Push your code to GitHub
Import the project in Vercel
Set environment variables
Deploy
Cloudflare Workers (Backend)
Deploy the worker using Wrangler:

License
MIT

Acknowledgements
Next.js - The React framework
Cloudflare Workers - Serverless execution environment
LangChain - Framework for LLM applications
Llama 3.1 - Meta's large language model
Created by Your Name