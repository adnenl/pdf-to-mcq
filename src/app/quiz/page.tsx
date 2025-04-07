'use client';

import { useQuizStore } from '@/app/stores/quizStore';
import QuizCard from '@/components/quiz-card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuizPage() {
    const { questions, userAnswers } = useQuizStore();
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    // Move redirect logic to useEffect
    useEffect(() => {
      if (questions.length === 0) {
          router.push('/');
      }
  }, [questions.length, router]);

  // Early return if no questions, but without router.push in render
  if (questions.length === 0) {
      return <div>Loading...</div>;
  }

    const currentQuestion = questions[currentQuestionIndex];

    const handlePrevious = () => {
      setIsAnswerChecked(false);
      setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
    }

    const handleNext = () => {

      setIsAnswerChecked(false);

      if (currentQuestionIndex < questions.length - 1 ){
          setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
          router.push('quiz/summary')
      }
    }

    const checkAnswer = () => {
      // First make sure an answer was selected
      if (!userAnswers[currentQuestionIndex]) {
        alert("Please select an answer first");
        return;
      }
      
      // Mark answer as checked
      setIsAnswerChecked(true);
    };

    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto p-6">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Current question */}
          <QuizCard 
            question={currentQuestion} 
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            showFeedback={isAnswerChecked}
          />
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>

            <Button onClick={checkAnswer}>
              Check answer
            </Button>
            
            <Button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'}
            </Button>
          </div>
        </div>
      );
}