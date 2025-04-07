import { create } from 'zustand';
import { MCQuestion } from '../../components/file-uploader';

interface QuizState {
    questions: MCQuestion[];
    currentQuestionIndex: number;
    userAnswers: Record<number, string>;
    setQuestions: (questions: MCQuestion[]) => void;
    setCurrentQuestionIndex: (index: number) => void;
    setUserAnswer: (questionIndex: number, answer: string) => void;
    resetQuiz: () => void;
  }
  
  export const useQuizStore = create<QuizState>((set) => ({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    
    setQuestions: (questions) => set({ questions }),
    setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    setUserAnswer: (questionIndex, answer) => set((state) => ({
      userAnswers: { ...state.userAnswers, [questionIndex]: answer }
    })),
    resetQuiz: () => set({ questions: [], currentQuestionIndex: 0, userAnswers: {} })
  }));