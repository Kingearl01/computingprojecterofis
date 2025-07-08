"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Download, CheckCircle, XCircle } from "lucide-react"

import Marquee from "react-fast-marquee";

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

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which of these is NOT an example of a facility offered by the internet?",
    options: [
      "FTP (File Transfer Protocol)",
      "Local area network (LAN)",
      "E-mail",
      "WWW (World Wide Web)"
    ],
    correctAnswer: 1,
    explanation: "LAN (Local Area Network) is a type of network, not a facility offered by the internet itself. E-mail, FTP, and WWW are common internet facilities."
  },
  {
    id: 2,
    question: "What type of information can you typically find on the Internet?",
    options: [
      "Financial information only",
      "Educational information only",
      "Educational, Financial, and Entertainment information",
      "Entertainment information only"
    ],
    correctAnswer: 2,
    explanation: "The internet offers a vast array of information, including educational, financial, and entertainment content."
  },
  {
    id: 3,
    question: "What does data duplication refer to in the context of information?",
    options: [
      "Organizing data in alphabetical order",
      "Deleting unnecessary data",
      "Having multiple copies of the same data",
      "Creating new information"
    ],
    correctAnswer: 2,
    explanation: "Data duplication means having identical copies of data in different locations or multiple times within the same system."
  },
  {
    id: 4,
    question: "Which of these is essential to connect to the Internet?",
  
    options: [
      "A scanner",
      "A desktop computer or mobile phone",
      "A printer",
      "A joystick"
    ],
    correctAnswer: 1,
    explanation: "A desktop computer or a mobile phone are common devices needed to connect to the Internet. Printers, scanners, and joysticks are peripheral devices not essential for connection."
  },
  {
    id: 5,
    question: "What is the primary function of a web browser?",
    options: [
      "To send emails",
      "To access and view web pages",
      "To create documents",
      "To play offline games"
    ],
    correctAnswer: 1,
    explanation: "A web browser is a software application used to access and view information on the World Wide Web."
  },
  {
    id: 6,
    question: "Which of the following is NOT a common web browser?",
    
    options: [
      "Microsoft Edge",
      "Google Chrome",
      "Microsoft Word",
      "Mozilla Firefox"
    ],
    correctAnswer: 2,
    explanation: "Microsoft Word is a word processing application, not a web browser. Firefox, Chrome, and Edge are all popular web browsers."
  },
  {
    id: 7,
    question: "What is a URL?",
    options: [
      "Unified Research Language",
      "Uniform Resource Locator",
      "User Resource Login",
      "Universal Remote Link"
    ],
    correctAnswer: 1,
    explanation: "URL stands for Uniform Resource Locator, which is the address of a web page or other resource on the Internet."
  },
  {
    id: 8,
    question: "What is the purpose of the 'back' button in a web browser?",
    options: [
      "To close the browser",
      "To refresh the current page",
      "To return to the previous page visited",
      "To go to the next page in browsing history"
    ],
    correctAnswer: 2,
    explanation: "The 'back' button allows you to navigate to the web page you were viewing immediately before the current one."
  },
  {
    id: 9,
    question: "When surfing the World Wide Web, what is the best way to quickly find specific information on a very long web page?",
    options: [
      "Print the page and read it offline",
      "Use the 'Find' function (Ctrl+F or Cmd+F) in the browser",
      "Scroll through the entire page",
      "Close the page and search again"
    ],
    correctAnswer: 1,
    explanation: "Using the 'Find' function (often activated by Ctrl+F on Windows or Cmd+F on Mac) allows you to search for specific text within the current web page."
  },
  {
    id: 10,
    question: "What is a 'favorite link' or 'bookmark' in a web browser used for?",
    options: [
      "To download files from the internet",
      "To block unwanted websites",
      "To save a shortcut to a frequently visited web page",
      "To clear browsing history"
    ],
    correctAnswer: 2,
    explanation: "A favorite link or bookmark saves the address of a web page so you can easily revisit it later without typing the full URL."
  },
  {
    id: 11,
    question: "Which of these is a common search engine?",
   
    options: [
      "Google Chrome",
      "Microsoft Word",
      "Google",
      "Adobe Photoshop"
    ],
    correctAnswer: 2,
    explanation: "Google is a widely used search engine. Microsoft Word and Adobe Photoshop are application software, and VLC Media Player is for playing media."
  },
  {
    id: 12,
    question: "What is the main reason for customizing your web browser?",
    options: [
      "To delete all your files",
      "To make your computer faster",
      "To personalize its appearance and add useful features",
      "To change the computer's operating system"
    ],
    correctAnswer: 2,
    explanation: "Customizing a browser allows you to change its themes, add extensions (add-ons/plug-ins), and set preferences to make it more suitable for your needs and preferences."
  },
  {
    id: 13,
    question: "What are 'cookies' in the context of web browsers?",
    options: [
      "Security features that protect your personal data from theft",
      "Small food items displayed on websites",
      "Small data files stored on your computer by websites to remember information about you",
      "Programs that help your computer run faster"
    ],
    correctAnswer: 2,
    explanation: "Cookies are small text files that websites store on your computer to remember information about you, such as login status, site preferences, or shopping cart contents."
  },
  {
    id: 14,
    question: "What is the purpose of setting a 'homepage' in your web browser?",
    options: [
      "To change your computer's password",
      "To set the page that opens automatically when you launch the browser",
      "To make the browser load faster",
      "To block all advertisements"
    ],
    correctAnswer: 1,
    explanation: "The homepage is the web page that your browser loads by default when you open it or click the home button."
  },
  {
    id: 15,
    question: "Which of these is a common email service provider?",
    options: [
      "Microsoft Excel",
      "YouTube",
      "Google Docs",
      "Gmail"
    ],
    correctAnswer: 3,
    explanation: "Gmail is a popular email service provider. Microsoft Excel and Google Docs are productivity tools, and YouTube is a video-sharing platform."
  },
  {
    id: 16,
    question: "What does 'Composing' an email message mean?",
    options: [
      "Reading an email you received",
      "Writing a new email message",
      "Deleting an email you received",
      "Forwarding an email to someone else"
    ],
    correctAnswer: 1,
    explanation: "Composing an email means writing a new email message."
  },
  {
    id: 17,
    question: "The address of a website is mostly typed in the ........",
    options: [
      "title bar",
      "address bar",
      "taskbar",
      "status bar"
    ],
    correctAnswer: 1,
    explanation: "The URL (address of a website) is typed in the address bar of a web browser."
  },
  {
    id: 18,
    question: "What is the purpose of 'attaching a file' to an email message?",
    options: [
      "To send documents, pictures, or other files along with the email",
      "To make the email text bigger",
      "To block the recipient from replying",
      "To change the email's background color"
    ],
    correctAnswer: 0,
    explanation: "Attaching a file allows you to send documents, images, videos, or other types of files to the recipient of the email."
  },
  {
    id: 19,
    question: "What is the 'Internet of Things' (IoT)?",
    
    options: [
      "A social media platform for sharing pictures",
      "A network of physical objects embedded with sensors and software that connect and exchange data over the internet",
      "A new type of internet cable",
      "A way to make your computer run faster"
    ],
    correctAnswer: 1,
    explanation: "The Internet of Things (IoT) refers to the network of everyday physical objects embedded with sensors, software, and other technologies that allow them to connect and exchange data over the internet."
  },
  {
    id: 20,
    question: "Which of these is an example of an IoT gadget with a consumer part?",
    options: [
      "A basic calculator",
      "A factory assembly line machine",
      "A traditional landline phone",
      "A Nest Smart Thermostat"
    ],
    correctAnswer: 3,
    explanation: "A Nest Smart Thermostat is a common example of a consumer-grade IoT device, allowing users to control their home heating and cooling remotely."
  },
  {
    id: 21,
    question: "In 1989, the World Wide Web (WWW) was invented by ..........",
    options: [
      "Sir Tim Bruce-Lee",
      "Sir Tim Zuckerbery-Lee",
      "Sir Tim Bernes-Lee",
      "Sir Tim Cook-Lee"
    ],
    correctAnswer: 2,
    explanation: "Sir Tim Berners-Lee inverted the WWW when he was working at CERN."
  },
  {
    id: 22,
    question: "What is 'Digital Literacy' primarily about?",
    options: [
      "Knowing how to repair computers",
      "Being able to use digital technology, communication tools, and networks to access, manage, integrate, evaluate, create, and communicate information",
      "Learning how to read and write traditional books",
      "Only using social media for entertainment"
    ],
    correctAnswer: 1,
    explanation: "Digital literacy involves the ability to find, evaluate, create, and communicate information using digital technologies, as well as understanding how to use digital media responsibly and safely."
  },
  {
    id: 23,
    question: "Why is it important to handle private and personal information carefully online?",
    options: [
      "To prevent online identity theft and protect your privacy",
      "To make your computer faster",
      "To avoid making new friends",
      "To get more advertisements"
    ],
    correctAnswer: 0,
    explanation: "Protecting private and personal information online is crucial to prevent identity theft, scams, and other security risks."
  },
  {
    id: 24,
    question: "What is a 'strong password' or 'passphrase' used for online?",
    options: [
      "To speed up your internet connection",
      "To make it easy for others to access your accounts",
      "To share with everyone you know",
      "To protect your online accounts from unauthorized access"
    ],
    correctAnswer: 3,
    explanation: "Strong passwords or passphrases are vital security measures that make it difficult for unauthorized individuals to guess or crack your account credentials, thus protecting your online information."
  },
  {
    id: 25,
    question: "What is 'spam' in the context of email?",
    options: [
      "Unwanted, unsolicited junk email messages",
      "Important messages from your friends",
      "Messages from your teachers",
      "Emails with important attachments"
    ],
    correctAnswer: 0,
    explanation: "Spam refers to unsolicited and often unwanted email messages, typically sent in bulk for advertising or malicious purposes."
  },
  {
    id: 26,
    question: "Which of these is a major health hazard associated with the use of ICT tools?",
    
    options: [
      "Improved physical fitness",
      "Eye strain and fatigue",
      "Stronger eyesight",
      "Better posture"
    ],
    correctAnswer: 1,
    explanation: "Prolonged use of ICT tools can lead to eye strain, irritation, and fatigue due to staring at screens for extended periods."
  },
  {
    id: 27,
    question: "What is the recommended sitting posture when using a computer?",
    
    options: [
      "Lying down on a chair",
      "Standing up for the entire duration",
      "Sitting upright at approximately 90 degrees with back supported",
      "Slouching forward with a rounded back"
    ],
    correctAnswer: 2,
    explanation: "Maintaining a proper sitting posture, such as sitting upright with your back supported and at about 90 degrees, helps prevent neck, back, and wrist pain."
  },
  {
    id: 28,
    question: "Besides good posture, what is another solution to health problems associated with ICT use?",
    options: [
      "Eating while using the computer",
      "Increasing screen brightness to maximum",
      "Taking short breaks and resting your eyes",
      "Using the computer for longer periods"
    ],
    correctAnswer: 2,
    explanation: "Taking short breaks from the screen and resting your eyes regularly helps reduce eye strain and discomfort."
  },
  {
    id: 29,
    question: "What is a 'digital footprint'?",
    options: [
      "A new way to print documents",
      "A type of digital currency",
      "The trail of data you leave behind when you use the internet",
      "A mark left by your shoes on a digital device"
    ],
    correctAnswer: 2,
    explanation: "A digital footprint refers to the unique and identifiable trail of data that a person leaves behind when interacting with digital services and the internet."
  },
  {
    id: 30,
    question: "Why should you avoid posting detailed personal information online?",
    options: [
      "It makes your internet connection faster",
      "It can be used by others for identity theft or other harmful purposes",
      "It helps you make more virtual friends",
      "It makes your social media profile more popular"
    ],
    correctAnswer: 1,
    explanation: "Posting detailed personal information online can make you vulnerable to identity theft, phishing, and other security risks."
  }
]


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

    const percentage = (results.score / results.totalQuestions) * 100
    const gradeInfo = getGrade(results.score, results.totalQuestions)

    // Import jsPDF dynamically
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()

    // Set up the document
    doc.setFontSize(20)
    doc.setTextColor(30, 64, 175) // Blue color
    doc.text("EROFIS EDUCATIONAL COMPLEX", 105, 20, { align: "center" })

    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text("STUDENT ASSESSMENT REPORT", 105, 30, { align: "center" })
    doc.text("Computing Term Project", 105, 40, { align: "center" })

    // Add a line
    doc.setLineWidth(0.5)
    doc.line(20, 45, 190, 45)

    let yPosition = 60

    // Student Information Section
    doc.setFontSize(14)
    doc.setTextColor(30, 64, 175)
    doc.text("Student Information", 20, yPosition)
    yPosition += 10

    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    const studentInfo = [
      `Name: ${studentData.name}`,
      `Grade: ${studentData.grade}`,
      `Section: ${studentData.section}`,
      `Date of Birth: ${studentData.dateOfBirth}`,
      `Parent/Guardian: ${studentData.parentName}`,
      `Parent Contact: ${studentData.parentContact}`,
      `Assigned Email: ${studentData.assignedEmail}`,
      `Completed: ${new Date(results.completedAt).toLocaleString()}`,
    ]

    studentInfo.forEach((info) => {
      doc.text(info, 20, yPosition)
      yPosition += 7
    })

    yPosition += 10

    // Assessment Results Section
    doc.setFontSize(14)
    doc.setTextColor(30, 64, 175)
    doc.text("Assessment Results", 20, yPosition)
    yPosition += 15

    // Results summary box
    doc.setFillColor(248, 249, 250)
    doc.rect(20, yPosition - 5, 170, 30, "F")

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Score: ${results.score}/${results.totalQuestions}`, 30, yPosition + 5)
    doc.text(`Percentage: ${percentage.toFixed(1)}%`, 30, yPosition + 15)
    doc.text(`Grade: ${gradeInfo.grade}`, 120, yPosition + 5)
    doc.text(`Status: ${percentage >= 70 ? "Pass" : "Review Needed"}`, 120, yPosition + 15)

    yPosition += 40

    // Detailed Question Review
    doc.setFontSize(14)
    doc.setTextColor(30, 64, 175)
    doc.text("Detailed Question Review", 20, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)

    results.answers.forEach((answer, index) => {
      const question = quizQuestions.find((q) => q.id === answer.questionId)
      if (!question) return

      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      // Question header
      doc.setFont("Times", "bold")
      doc.text(`Question ${index + 1}:`, 20, yPosition)
      yPosition += 7

      // Question text (wrap if too long)
      doc.setFont("Times", "normal")
      const questionLines = doc.splitTextToSize(question.question, 170)
      doc.text(questionLines, 20, yPosition)
      yPosition += questionLines.length * 5 + 3

      // Your answer
      doc.setFont("Times", "bold")
      doc.text("Your Answer: ", 20, yPosition)
      doc.setFont("Times", "normal")
      if (answer.isCorrect) {
        doc.setTextColor(5, 150, 105) // Green
      } else {
        doc.setTextColor(220, 38, 38) // Red
      }
      doc.text(question.options[answer.selectedAnswer], 50, yPosition)
      doc.setTextColor(0, 0, 0)
      yPosition += 7

      // Correct answer (if wrong)
      if (!answer.isCorrect) {
        doc.setFont("Times", "bold")
        doc.text("Correct Answer: ", 20, yPosition)
        doc.setFont("Times", "normal")
        doc.setTextColor(5, 150, 105)
        doc.text(question.options[question.correctAnswer], 60, yPosition)
        doc.setTextColor(0, 0, 0)
        yPosition += 7
      }

      // Explanation
      if (question.explanation) {
        doc.setFont("Times", "bold")
        doc.text("Explanation: ", 20, yPosition)
        doc.setFont("Times", "normal")
        const explanationLines = doc.splitTextToSize(question.explanation, 150)
        doc.text(explanationLines, 50, yPosition)
        yPosition += explanationLines.length * 5
      }

      yPosition += 8 // Space between questions
    })

    // Add footer on last page
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 285)
      doc.text("EROFIS- Computing Term Project", 105, 290, { align: "center" })
      doc.text("Teacher: Sir Samuel | Email: ghsamuelk@gmail.com", 105, 295, { align: "center" })
    }

    // Save the PDF
    const fileName = `${studentData.name.replace(/\s+/g, "_")}_computing_project.pdf`
    doc.save(fileName)
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
            <Marquee>
              Download Report button is working now.
            </Marquee>
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
