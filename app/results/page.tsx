"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Download, CheckCircle, XCircle } from "lucide-react"

import quizQuestions from "@/lib/data"

interface QuizResults {
  answers: Array<{
    questionId: number
    selectedAnswer: number
    isCorrect: boolean
  }>
  score: number
  totalQuestions: number
  completedAt: string
}

interface StudentData {
  name: string
  grade: string
  section: string
  parentName: string
  parentContact: string
  dateOfBirth: string
  emailProvider: string
  assignedEmail: string
}




export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResults | null>(null)
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")
    const savedStudentData = localStorage.getItem("studentData")

    if (!savedResults || !savedStudentData) {
      router.push("/")
      return
    }

    setResults(JSON.parse(savedResults))
    setStudentData(JSON.parse(savedStudentData))
  }, [router])

  const getGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 90) return { grade: "A+", color: "bg-green-600" }
    if (percentage >= 80) return { grade: "A", color: "bg-green-500" }
    if (percentage >= 70) return { grade: "B", color: "bg-blue-500" }
    if (percentage >= 60) return { grade: "C", color: "bg-yellow-500" }
    if (percentage >= 50) return { grade: "D", color: "bg-orange-500" }
    return { grade: "F", color: "bg-red-500" }
  }

  const generatePDF = async () => {
    if (!results || !studentData) return

    // Create a new window for PDF generation
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student Assessment Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          line-height: 1.6;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .school-name {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 10px;
        }
        .report-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1e40af;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .info-item {
          padding: 5px 0;
        }
        .info-label {
          font-weight: bold;
        }
        .results-summary {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .score-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          text-align: center;
          margin-bottom: 20px;
        }
        .score-item {
          padding: 15px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
        }
        .score-value {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
        }
        .score-label {
          font-size: 14px;
          color: #666;
        }
        .grade-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          color: white;
        }
        .question-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          page-break-inside: avoid;
        }
        .question-header {
          font-weight: bold;
          margin-bottom: 10px;
          color: #1e40af;
        }
        .question-text {
          margin-bottom: 10px;
          font-weight: 500;
        }
        .answer-section {
          margin: 10px 0;
        }
        .answer-label {
          font-weight: bold;
          margin-right: 5px;
        }
        .correct-answer {
          color: #059669;
          background-color: #ecfdf5;
          padding: 5px 8px;
          border-radius: 4px;
        }
        .incorrect-answer {
          color: #dc2626;
          background-color: #fef2f2;
          padding: 5px 8px;
          border-radius: 4px;
        }
        .explanation {
          background-color: #eff6ff;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
          font-style: italic;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ccc;
          padding-top: 20px;
        }
        @media print {
          body { margin: 0; }
          .question-item { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">EROFIS EDUCATIONAL COMPLEX</div>
        <div class="report-title">STUDENT ASSESSMENT REPORT</div>
        <div>Term Project Assessment</div>
      </div>

      <div class="section">
        <div class="section-title">Student Information</div>
        <div class="info-grid">
          <div class="info-item"><span class="info-label">Name:</span> ${studentData.name}</div>
          <div class="info-item"><span class="info-label">Grade:</span> ${studentData.grade}</div>
          <div class="info-item"><span class="info-label">Section:</span> ${studentData.section}</div>
          <div class="info-item"><span class="info-label">Date of Birth:</span> ${studentData.dateOfBirth}</div>
          <div class="info-item"><span class="info-label">Parent/Guardian:</span> ${studentData.parentName}</div>
          <div class="info-item"><span class="info-label">Parent Contact:</span> ${studentData.parentContact}</div>
          <div class="info-item"><span class="info-label">Assigned Email:</span> ${studentData.assignedEmail}</div>
          <div class="info-item"><span class="info-label">Completed:</span> ${new Date(results.completedAt).toLocaleString()}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Assessment Results</div>
        <div class="results-summary">
          <div class="score-grid">
            <div class="score-item">
              <div class="score-value">${results.score}/${results.totalQuestions}</div>
              <div class="score-label">Questions Correct</div>
            </div>
            <div class="score-item">
              <div class="score-value">${percentage.toFixed(1)}%</div>
              <div class="score-label">Overall Score</div>
            </div>
            <div class="score-item">
              <div class="score-value">
                <span class="grade-badge" style="background-color: ${gradeInfo.color.replace("bg-", "#")};">
                  ${gradeInfo.grade}
                </span>
              </div>
              <div class="score-label">Final Grade</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Detailed Question Review</div>
        ${results.answers
          .map((answer, index) => {
            const question = quizQuestions.find((q) => q.id === answer.questionId)
            if (!question) return ""

            return `
            <div class="question-item">
              <div class="question-header">Question ${index + 1}</div>
              <div class="question-text">${question.question}</div>
              
              <div class="answer-section">
                <span class="answer-label">Your Answer:</span>
                <span class="${answer.isCorrect ? "correct-answer" : "incorrect-answer"}">
                  ${question.options[answer.selectedAnswer]}
                </span>
              </div>
              
              ${
                !answer.isCorrect
                  ? `
                <div class="answer-section">
                  <span class="answer-label">Correct Answer:</span>
                  <span class="correct-answer">${question.options[question.correctAnswer]}</span>
                </div>
              `
                  : ""
              }
              
              ${
                question.explanation
                  ? `
                <div class="explanation">
                  <strong>Explanation:</strong> ${question.explanation}
                </div>
              `
                  : ""
              }
            </div>
          `
          })
          .join("")}
      </div>

      <div class="section">
        <div class="section-title">Performance Summary</div>
        <div class="info-grid">
          <div class="info-item"><span class="info-label">Correct Answers:</span> ${results.answers.filter((a) => a.isCorrect).length}</div>
          <div class="info-item"><span class="info-label">Incorrect Answers:</span> ${results.answers.filter((a) => a.isCorrect).length}</div>
          <div class="info-item"><span class="info-label">Total Questions:</span> ${results.totalQuestions}</div>
          <div class="info-item"><span class="info-label">Status:</span> ${percentage >= 70 ? "Pass" : "Review Needed"}</div>
        </div>
      </div>

      <div class="footer">
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>EROFIS EDUCATIONAL COMPLEX - Computing term project work basic 6</p>
        <p>Teacher: Sir Samuel | Email: ghsamuelk@gmail.com</p>
        <p>Contact: <a href="https://earlkalf.netlify.app">https://earlkalf.netlify.app</a> </p>
      </div>
    </body>
    </html>
  `

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for content to load then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }

  if (!results || !studentData) {
    return <div>Loading...</div>
  }

  const percentage = (results.score / results.totalQuestions) * 100
  const gradeInfo = getGrade(results.score, results.totalQuestions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Results Summary */}
          <Card>
            <CardHeader className="text-center">
              <Award className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {results.score}/{results.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-600">Questions Correct</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{percentage.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                <div>
                  <Badge className={`text-lg px-4 py-2 ${gradeInfo.color}`}>Grade: {gradeInfo.grade}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Name:</strong> {studentData.name}
                </div>
                <div>
                  <strong>Grade:</strong> {studentData.grade}
                </div>
                <div>
                  <strong>Section:</strong> {studentData.section}
                </div>
                <div>
                  <strong>Assigned Email:</strong> {studentData.assignedEmail}
                </div>
                <div>
                  <strong>Parent/Guardian:</strong> {studentData.parentName}
                </div>
                <div>
                  <strong>Completed:</strong> {new Date(results.completedAt).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={generatePDF} size="lg" className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Report
            </Button>
            <Button variant="outline" onClick={() => setShowDetails(!showDetails)} size="lg">
              {showDetails ? "Hide" : "Show"} Detailed Results
            </Button>
          </div>

          {/* Detailed Results */}
          {showDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed Question Review</CardTitle>
                <CardDescription>Review your answers and explanations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.answers.map((answer, index) => {
                    const question = quizQuestions.find((q) => q.id === answer.questionId)
                    if (!question) return null

                    return (
                      <div key={answer.questionId} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg">Question {index + 1}</h3>
                          {answer.isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )}
                        </div>

                        <p className="mb-4">{question.question}</p>

                        <div className="space-y-2">
                          <div
                            className={`p-2 rounded ${answer.isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                          >
                            <strong>Your Answer:</strong> {question.options[answer.selectedAnswer]}
                          </div>

                          {!answer.isCorrect && (
                            <div className="p-2 rounded bg-green-50 border border-green-200">
                              <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                            </div>
                          )}

                          {question.explanation && (
                            <div className="p-2 rounded bg-blue-50 border border-blue-200">
                              <strong>Explanation:</strong> {question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {results.answers.filter((a) => a.isCorrect).length}
                  </div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {results.answers.filter((a) => !a.isCorrect).length}
                  </div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{percentage >= 70 ? "Pass" : "Review"}</div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
