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

import quizQuestions from "@/lib/data"

interface QuizAnswer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}



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
