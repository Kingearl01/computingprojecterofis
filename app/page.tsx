import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, FileText, Award, Calendar, User, School } from "lucide-react"

import bgImage from "@/public/bg-image.jpg"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: ` url(${bgImage.src})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <School className="h-8 w-8 text-white" />
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">EROFIS EDUCATIONAL COMPLEX</h2>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">END OF TERM PROECT WORK : GRADE 6</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Welcome to your computing end of term project  platform. This system will collect your information and evaluate
            your knowledge through a comprehensive quiz.
          </p>
        </div>

        {/* Teacher and Deadline Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="bg-blue-50/95 border-blue-200 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg text-blue-800">Teacher Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-blue-700">
                  <strong>Name:</strong> Sir Samuel
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Email:</strong> ghsamuelk@gmail.com
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Subject:</strong> COMPUTING
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50/95 border-red-200 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                <CardTitle className="text-lg text-red-800">Deadline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-bold text-red-700">Monday, July 7th, 2025</p>

                <p className="text-xs text-red-600">Late submissions will not be accepted</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-blue-600" />
              <CardTitle>Step 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Register your personal information and get assigned an educational email address
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <BookOpen className="h-12 w-12 mx-auto text-green-600" />
              <CardTitle>Step 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Complete a 30-question quiz with text and image-based questions</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto text-purple-600" />
              <CardTitle>Step 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">View your results and performance analysis</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <FileText className="h-12 w-12 mx-auto text-orange-600" />
              <CardTitle>Step 4</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Download a comprehensive PDF report of your assessment</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto mb-8 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Important Instructions</CardTitle>
            <CardDescription>Please read carefully before proceeding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-blue-600">Assessment Rules</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • You can only attempt the quiz <strong>once</strong>
                  </li>
                  
                  <li>• Your progress is automatically saved</li>
                  <li>• The quiz contains 30 questions</li>
                  
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-600">What You'll Need</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Your personal information ready</li>
                  <li>• Parent/guardian contact details</li>
                  <li>
                    • <strong>Parent/guardian assistance is encouraged</strong>
                  </li>
                  <li>• Stable internet connection</li>
                  <li>• About 45-60 minutes to complete</li>
                  <li>• A quiet environment for focus</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Your information will be saved automatically as you progress</li>
               
                <li>• Once you submit the quiz, you cannot retake it</li>
                <li>• Make sure to download your PDF report after completion</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-green-800 mb-2">📋 Submission Instructions</h4>
              <p className="text-sm text-green-700 mb-3">
                After completing your assessment and downloading your PDF report, you have two submission options:
              </p>
              <ul className="text-sm text-green-700 space-y-2">
                <li>
                  <strong>Option 1 - Print & Submit:</strong> Print your PDF report and submit the physical copy to
                  School before the deadline
                </li>
                <li>
                  <strong>Option 2 - Email Submission:</strong> With the help of a parent/guardian, email your PDF
                  report to Sir Samuel at:
                  <span className="font-mono bg-green-100 px-2 py-1 rounded ml-1">ghsamuelk@gmail.com</span>
                </li>
              </ul>
              <p className="text-sm text-green-700 mt-3">
                <strong>Email Subject Format:</strong> "COMPUTING PROJECT WORK - [Your Full Name] - Grade [Your Grade]"
              </p>
              <p className="text-sm text-green-700 mt-2">
                <strong>Deadline Reminder:</strong> All submissions must be received by Monday, July 7th, 2025.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-800 mb-2">👨‍👩‍👧‍👦 Parent/Guardian Assistance</h4>
              <p className="text-sm text-blue-700 mb-3">
                Parents and guardians are <strong>encouraged to assist</strong> their children with this project work:
              </p>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>
                  <strong>Registration Help:</strong> Parents can help students fill out personal information and
                  contact details accurately
                </li>
                <li>
                  <strong>Technical Support:</strong> Assist with internet connection, browser issues, or navigating the
                  platform
                </li>
                <li>
                  <strong>Reading Assistance:</strong> Help younger students read and understand questions if needed
                </li>
                <li>
                  <strong>Submission Support:</strong> Parents should help with email submission or printing the PDF
                  report
                </li>
                <li>
                  <strong>Time Management:</strong> Help ensure the assessment is completed within the deadline
                </li>
              </ul>
              <p className="text-sm text-blue-700 mt-3 font-medium">
                Note: While parents can provide technical and logistical support, students should answer the quiz
                questions independently to demonstrate their own knowledge.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/register">
            <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              Start Assessment
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center text-sm text-white/80">
          <p className="drop-shadow-md">EROFIS EDUCATIONAL COMPLEX - Computing - End of Term Project Work and Assessment</p>
          <p className="drop-shadow-md">All data collected is for educational purposes only.</p>
        </div>
      </div>
    </div>
  )
}
