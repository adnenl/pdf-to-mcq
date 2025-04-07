import { MCQuestion } from "./file-uploader";
import { useQuizStore } from '@/app/stores/quizStore';


export default function QuizCard({ question, questionIndex, totalQuestions, showFeedback }: { 
    question: MCQuestion; 
    questionIndex: number; 
    totalQuestions: number;
    showFeedback?: boolean;
}) {
    const { userAnswers, setUserAnswer } = useQuizStore();
    
    const selectedAnswer = userAnswers[questionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    const handleSelectAnswer = (optionKey: string) => {
        setUserAnswer(questionIndex, optionKey);
    }

   return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Question {questionIndex + 1} of {totalQuestions}
      </h3>
      <p className="text-gray-800 mb-4">{question.question}</p>
      
      <ul className="space-y-2">
        {Object.entries(question.options).map(([key, value]) => {
          const isSelected = selectedAnswer === key;
          const isCorrectOption = key === question.correctAnswer;
          
          return (
            <li 
              key={key}
              onClick={() => !showFeedback && handleSelectAnswer(key)}
              className={`p-3 border rounded-md ${!showFeedback ? 'cursor-pointer' : ''} ${
                showFeedback
                  ? isCorrectOption
                    ? 'bg-green-100 border-green-400'
                    : isSelected && !isCorrectOption
                    ? 'bg-red-100 border-red-400'
                    : 'opacity-60'
                  : isSelected
                  ? 'bg-blue-100 border-blue-400'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium mr-2">{key}:</span> {value}
              {showFeedback && isCorrectOption && <span className="ml-2 text-green-600">✓ Correct</span>}
              {showFeedback && isSelected && !isCorrectOption && <span className="ml-2 text-red-600">✗ Incorrect</span>}
            </li>
          );
        })}
      </ul>
      
      {showFeedback && (
        <div className={`mt-4 p-3 rounded-md ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {isCorrect 
            ? "Correct! Well done." 
            : `Incorrect. The correct answer is ${question.correctAnswer}.`}
        </div>
      )}
    </div>
  );
}