'use client';

import FileUploader, { MCQuestion } from "../components/file-uploader";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "./stores/quizStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { questions, setQuestions } = useQuizStore();
  const router = useRouter();

  const handleQuestionsGenerated = (questions: MCQuestion[]) => {
    setQuestions(questions);
    
  };

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      alert("Please upload a PDF and generate questions first.");
      return;
    }
    
    // Redirect to quiz page with questions
    const quizUrl = `/quiz`;
    router.push(quizUrl);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
    <FileUploader onQuestionsGenerated={handleQuestionsGenerated} />
    <Button onClick={handleStartQuiz} disabled={questions.length === 0}>
      Start Quiz
    </Button>
    </div>
  );
}
