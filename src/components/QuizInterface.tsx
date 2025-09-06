import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  sourceDocument: string;
}

const QuizInterface = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const generateQuiz = async (documentId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      });

      if (response.ok) {
        const newQuiz = await response.json();
        setQuizzes([...quizzes, newQuiz]);
        toast({
          title: "Quiz Generated!",
          description: "Your quiz has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === '') return;

    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      // Quiz completed
      const correctAnswers = newAnswers.filter((answer, index) => 
        answer === currentQuiz!.questions[index].correctAnswer
      ).length;
      setScore(correctAnswers);
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (currentQuiz && !quizCompleted) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{currentQuiz.title}</h2>
            <p className="text-gray-400">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
          </div>
          <Button variant="ghost" onClick={resetQuiz}>
            <XCircle className="w-4 h-4 mr-2" />
            Exit Quiz
          </Button>
        </div>

        <Progress value={progress} className="w-full" />

        <Card className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
          <CardHeader>
            <CardTitle className="text-white">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border border-neural-connection/10 hover:bg-white/5 transition-all duration-200">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-white cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === ''}
                variant="neural"
              >
                {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted && showResult) {
    const percentage = Math.round((score / currentQuiz!.questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-card/50 backdrop-blur-md border border-neural-connection/20 text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-neural-highlight" />
            </div>
            <CardTitle className="text-3xl text-white">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-neural-node mb-2">{percentage}%</div>
              <p className="text-gray-400">You scored {score} out of {currentQuiz!.questions.length} questions correctly</p>
            </div>

            <div className="grid gap-4">
              {currentQuiz!.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={index} className="text-left p-4 rounded-lg border border-neural-connection/10 bg-white/5">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{question.question}</p>
                        <p className="text-sm text-gray-400 mb-1">
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-400 mb-2">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-300">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => startQuiz(currentQuiz!)} variant="neural">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={resetQuiz} variant="ghost">
                Back to Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Knowledge Quizzes</h2>
          <p className="text-gray-400">Test your understanding with AI-generated quizzes</p>
        </div>
        <Button 
          onClick={() => generateQuiz('sample-doc')} 
          disabled={loading}
          variant="neural"
        >
          <Brain className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate New Quiz'}
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
          <CardContent className="text-center py-12">
            <Brain className="w-16 h-16 text-neural-node mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">No Quizzes Yet</h3>
            <p className="text-gray-400 mb-6">Generate your first quiz from uploaded documents</p>
            <Button onClick={() => generateQuiz('sample-doc')} variant="neural">
              Create Your First Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="bg-card/50 backdrop-blur-md border border-neural-connection/20 hover:border-neural-node/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">{quiz.title}</CardTitle>
                <p className="text-gray-400 text-sm">{quiz.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{quiz.questions.length} Questions</Badge>
                  <Badge variant="outline">AI Generated</Badge>
                </div>
                <p className="text-xs text-gray-500">Based on: {quiz.sourceDocument}</p>
                <Button 
                  onClick={() => startQuiz(quiz)} 
                  className="w-full"
                  variant="neural"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizInterface;