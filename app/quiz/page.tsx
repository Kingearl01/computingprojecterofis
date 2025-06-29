"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  image?: string
  explanation?: string
}

interface QuizAnswer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and largest city of France.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.",
  },
  {
    id: 3,
    question: "What is 15 × 8?",
    options: ["110", "120", "130", "140"],
    correctAnswer: 1,
    explanation: "15 × 8 = 120",
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    explanation: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'.",
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth.",
  },
  {
    id: 6,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    correctAnswer: 1,
    explanation: "Oxygen has the chemical symbol 'O' on the periodic table.",
  },
  {
    id: 7,
    question: "What year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    explanation: "World War II ended in 1945 with the surrender of Japan.",
  },
  {
    id: 8,
    question: "Which continent is the largest by area?",
    options: ["Africa", "North America", "Asia", "Europe"],
    correctAnswer: 2,
    explanation: "Asia is the largest continent by both area and population.",
  },
  {
    id: 9,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    explanation: "The square root of 144 is 12 (12 × 12 = 144).",
  },
  {
    id: 10,
    question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
    explanation: "Plants absorb carbon dioxide from the atmosphere during photosynthesis.",
  },
  {
    id: 11,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    explanation: "2 is the smallest prime number and the only even prime number.",
  },
  {
    id: 12,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "Australia", "South Africa", "Brazil"],
    correctAnswer: 1,
    explanation: "Kangaroos are native to Australia.",
  },
  {
    id: 13,
    question: "What is the chemical formula for water?",
    options: ["CO2", "H2O", "NaCl", "CH4"],
    correctAnswer: 1,
    explanation: "Water has the chemical formula H2O (two hydrogen atoms and one oxygen atom).",
  },
  {
    id: 14,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    explanation: "Leonardo da Vinci painted the famous Mona Lisa.",
  },
  {
    id: 15,
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
    correctAnswer: 1,
    explanation: "The Nile River is generally considered the longest river in the world.",
  },
  {
    id: 16,
    question: "Which organ in the human body produces insulin?",
    options: ["Liver", "Kidney", "Pancreas", "Heart"],
    correctAnswer: 2,
    explanation: "The pancreas produces insulin, which regulates blood sugar levels.",
  },
  {
    id: 17,
    question: "What is the speed of light in vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0,
    explanation: "The speed of light in vacuum is approximately 300,000 kilometers per second.",
  },
  {
    id: 18,
    question: "Which is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: 2,
    explanation: "Diamond is the hardest naturally occurring substance.",
  },
  {
    id: 19,
    question: "What is the capital of Japan?",
    options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"],
    correctAnswer: 2,
    explanation: "Tokyo is the capital city of Japan.",
  },
  {
    id: 20,
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    explanation: "A hexagon has 6 sides.",
  },
  {
    id: 21,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    correctAnswer: 2,
    explanation: "Mercury is the planet closest to the Sun.",
  },
  {
    id: 22,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1,
    explanation: "The Blue Whale is the largest mammal and largest animal ever known to exist.",
  },
  {
    id: 23,
    question: "In which year did the Titanic sink?",
    options: ["1910", "1911", "1912", "1913"],
    correctAnswer: 2,
    explanation: "The Titanic sank on April 15, 1912.",
  },
  {
    id: 24,
    question: "What is the main gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 2,
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
  },
  {
    id: 25,
    question: "Which country invented paper?",
    options: ["Egypt", "Greece", "China", "India"],
    correctAnswer: 2,
    explanation: "Paper was invented in ancient China around 105 AD.",
  },
  {
    id: 26,
    question: "What is the freezing point of water in Celsius?",
    options: ["0°C", "32°C", "100°C", "-32°C"],
    correctAnswer: 0,
    explanation: "Water freezes at 0°C (32°F).",
  },
  {
    id: 27,
    question: "Which is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    explanation: "Vatican City is the smallest country in the world by both area and population.",
  },
  {
    id: 28,
    question: "What does 'www' stand for?",
    options: ["World Wide Web", "World Wide Website", "World Web Wide", "Wide World Web"],
    correctAnswer: 0,
    explanation: "WWW stands for World Wide Web.",
  },
  {
    id: 29,
    question: "How many bones are in an adult human body?",
    options: ["196", "206", "216", "226"],
    correctAnswer: 1,
    explanation: "An adult human body has 206 bones.",
  },
  {
    id: 30,
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correctAnswer: 3,
    explanation: "Vitamin D is produced when skin is exposed to sunlight.",
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(45 * 60) // 45 minutes
  const [quizStarted, setQuizStarted] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check if user is registered
    const studentData = localStorage.getItem("studentData")
    if (!studentData) {
      router.push("/register")
      return
    }

    // Check if quiz already completed
    const quizCompleted = localStorage.getItem("quizCompleted")
    if (quizCompleted === "true") {
      router.push("/results")
      return
    }

    // Load saved quiz progress
    const savedAnswers = localStorage.getItem("quizAnswers")
    const savedCurrentQuestion = localStorage.getItem("currentQuestion")
    const savedTimeRemaining = localStorage.getItem("timeRemaining")

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
    if (savedCurrentQuestion) {
      setCurrentQuestion(Number.parseInt(savedCurrentQuestion))
      setQuizStarted(true)
    }
    if (savedTimeRemaining) {
      setTimeRemaining(Number.parseInt(savedTimeRemaining))
      setQuizStarted(true)
    }
  }, [router])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (quizStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1
          localStorage.setItem("timeRemaining", newTime.toString())

          if (newTime <= 300 && !showWarning) {
            // 5 minutes warning
            setShowWarning(true)
          }

          if (newTime <= 0) {
            submitQuiz()
          }

          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [quizStarted, timeRemaining, showWarning])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const startQuiz = () => {
    setQuizStarted(true)
    localStorage.setItem("quizStarted", "true")
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const nextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswer: QuizAnswer = {
      questionId: quizQuestions[currentQuestion].id,
      selectedAnswer,
      isCorrect: selectedAnswer === quizQuestions[currentQuestion].correctAnswer,
    }

    const updatedAnswers = [...answers]
    const existingAnswerIndex = updatedAnswers.findIndex((a) => a.questionId === newAnswer.questionId)

    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer
    } else {
      updatedAnswers.push(newAnswer)
    }

    setAnswers(updatedAnswers)
    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers))

    if (currentQuestion < quizQuestions.length - 1) {
      const nextQ = currentQuestion + 1
      setCurrentQuestion(nextQ)
      localStorage.setItem("currentQuestion", nextQ.toString())
      setSelectedAnswer(null)

      // Load existing answer if available
      const existingAnswer = updatedAnswers.find((a) => a.questionId === quizQuestions[nextQ].id)
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selectedAnswer)
      }
    } else {
      submitQuiz()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQ = currentQuestion - 1
      setCurrentQuestion(prevQ)
      localStorage.setItem("currentQuestion", prevQ.toString())

      // Load existing answer
      const existingAnswer = answers.find((a) => a.questionId === quizQuestions[prevQ].id)
      setSelectedAnswer(existingAnswer ? existingAnswer.selectedAnswer : null)
    }
  }

  const submitQuiz = () => {
    const finalAnswers = [...answers]
    if (selectedAnswer !== null) {
      const newAnswer: QuizAnswer = {
        questionId: quizQuestions[currentQuestion].id,
        selectedAnswer,
        isCorrect: selectedAnswer === quizQuestions[currentQuestion].correctAnswer,
      }

      const existingAnswerIndex = finalAnswers.findIndex((a) => a.questionId === newAnswer.questionId)
      if (existingAnswerIndex >= 0) {
        finalAnswers[existingAnswerIndex] = newAnswer
      } else {
        finalAnswers.push(newAnswer)
      }
    }

    const score = finalAnswers.filter((a) => a.isCorrect).length
    const results = {
      answers: finalAnswers,
      score,
      totalQuestions: quizQuestions.length,
      completedAt: new Date().toISOString(),
    }

    localStorage.setItem("quizResults", JSON.stringify(results))
    localStorage.setItem("quizCompleted", "true")
    localStorage.removeItem("quizAnswers")
    localStorage.removeItem("currentQuestion")
    localStorage.removeItem("timeRemaining")
    localStorage.removeItem("quizStarted")

    router.push("/results")
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Start Your Quiz?</CardTitle>
              <CardDescription>
                You have 45 minutes to complete 30 questions. Once started, the timer cannot be paused.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> You can only attempt this quiz once. Make sure you're ready before
                  starting.
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button onClick={startQuiz} size="lg" className="px-8">
                  Start Quiz Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Timer and Progress */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className={`font-mono text-lg ${timeRemaining <= 300 ? "text-red-600 font-bold" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>

          <Progress value={progress} className="mb-6" />

          {showWarning && timeRemaining <= 300 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                <strong>Warning:</strong> Only {formatTime(timeRemaining)} remaining!
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg font-medium">{question.question}</div>

              {question.image && (
                <div className="flex justify-center">
                  <Image
                    src={question.image || "/placeholder.svg"}
                    alt="Question image"
                    width={400}
                    height={300}
                    className="rounded-lg border"
                  />
                </div>
              )}

              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 py-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={previousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>

                <Button
                  onClick={currentQuestion === quizQuestions.length - 1 ? submitQuiz : nextQuestion}
                  disabled={selectedAnswer === null}
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Submit Quiz" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
