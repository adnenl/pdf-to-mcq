
# PDF to MCQ Quiz Generator

A web application that automatically generates multiple-choice questions from uploaded PDF documents using AI. Perfect for students, teachers, or anyone who wants to create quizzes from educational materials.

---

## ✨ Features

- 📄 **PDF Upload**: Easily upload PDF documents  
- 🤖 **AI-Powered Question Generation**: Automatically creates multiple-choice questions based on document content  
- 🧠 **Interactive Quiz Interface**: Take quizzes with immediate feedback  
- ✅ **Question Review**: Review your answers and see correct solutions  
- 📱 **Mobile Responsive**: Works on desktop and mobile devices  

---

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React, Tailwind CSS  
- **PDF Processing**: LangChain Document Loaders  
- **AI**: Cloudflare Workers AI (Llama 3.1 model)  
- **State Management**: Zustand  

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+  
- `pnpm` (preferred), or `npm`/`yarn`  
- Cloudflare account (for Worker deployment)  

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/pdf-to-mcq-quiz.git
   cd pdf-to-mcq-quiz
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create a `.env.local` file** with your Cloudflare credentials

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

---

## ☁️ Cloudflare Worker Setup

This project uses a Cloudflare Worker to process PDF chunks and generate questions using AI.

### Steps:

1. Deploy the Worker with **Wrangler**:

   ```bash
   wrangler deploy
   ```

2. Enable **Cloudflare AI** for the Worker from the Cloudflare dashboard  
3. Update the Worker URL in `route.ts` if necessary

---

## 📚 Usage

1. **Upload a PDF**: Click on the file upload area or drag and drop a PDF  
2. **Wait for Processing**: The app will extract text and generate questions  
3. **Start Quiz**: Once questions are generated, click "Start Quiz"  
4. **Answer Questions**: Select your answers for each question  
5. **Check Answers**: See immediate feedback on your selected answers  
6. **Complete Quiz**: Review your final score  

---

## 📁 Project Structure

- `components/` – Reusable UI components  
- `pages/` – Next.js pages  
- `utils/` – Utility functions  
- `worker/` – Cloudflare Worker logic for AI question generation  

---

## ⚙️ How It Works

1. **PDF Processing**: The application extracts text from uploaded PDFs using LangChain's document loaders  
2. **Text Chunking**: The extracted text is split into manageable chunks  
3. **Question Generation**: The chunks are sent to a Cloudflare Worker that uses Llama 3.1 to generate multiple-choice questions  
4. **Quiz Interface**: The generated questions are displayed in an interactive quiz interface  
5. **Feedback**: Users receive immediate feedback on their answers  

---

## 📦 Deployment

### ✅ Vercel (Frontend)

The easiest way to deploy the Next.js frontend:

1. Push your code to GitHub  
2. Import the project in Vercel  
3. Set environment variables  
4. Deploy  

### ⚙️ Cloudflare Workers (Backend)

Deploy the worker using Wrangler:

```bash
wrangler deploy
```

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) – The React framework  
- [Cloudflare Workers](https://workers.cloudflare.com/) – Serverless execution environment  
- [LangChain](https://www.langchain.com/) – Framework for LLM applications  
- [Llama 3.1](https://ai.meta.com/llama/) – Meta's large language model  

---

> Created by Ådne Longva
