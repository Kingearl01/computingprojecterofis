"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Mail } from "lucide-react"

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

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    grade: "",
    section: "",
    parentName: "",
    parentContact: "",
    dateOfBirth: "",
    emailProvider: "",
    assignedEmail: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check if user already registered
    const savedData = localStorage.getItem("studentData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setFormData(data)
      if (data.assignedEmail) {
        setIsSubmitted(true)
      }
    }

    // Check if quiz already completed
    const quizCompleted = localStorage.getItem("quizCompleted")
    if (quizCompleted === "true") {
      router.push("/results")
    }
  }, [router])

  const generateEmail = (name: string, provider: string) => {
    const cleanName = name.toLowerCase().replace(/\s+/g, "")
    const randomNum = Math.floor(Math.random() * 1000)
    const domains = {
      gmail: "gmail.com",
      yahoo: "yahoo.com",
      outlook: "outlook.com",
      hotmail: "hotmail.com",
    }
    return `${cleanName}${randomNum}@${domains[provider as keyof typeof domains]}`
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.grade) newErrors.grade = "Grade is required"
    if (!formData.section.trim()) newErrors.section = "Section is required"
    if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required"
    if (!formData.parentContact.trim()) newErrors.parentContact = "Parent contact is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.emailProvider) newErrors.emailProvider = "Email provider is required"

    // Validate phone number format
    if (formData.parentContact && !/^\+?[\d\s-()]{10,}$/.test(formData.parentContact)) {
      newErrors.parentContact = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const assignedEmail = generateEmail(formData.name, formData.emailProvider)
    const updatedData = { ...formData, assignedEmail }

    setFormData(updatedData)
    localStorage.setItem("studentData", JSON.stringify(updatedData))
    setIsSubmitted(true)
  }

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const proceedToQuiz = () => {
    router.push("/quiz")
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
              <CardDescription>Your educational email has been assigned</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription className="text-lg">
                  <strong>Your assigned email:</strong> {formData.assignedEmail}
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Registration Summary:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Name:</strong> {formData.name}
                  </div>
                  <div>
                    <strong>Grade:</strong> {formData.grade}
                  </div>
                  <div>
                    <strong>Section:</strong> {formData.section}
                  </div>
                  <div>
                    <strong>Parent:</strong> {formData.parentName}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  You're now ready to take the assessment quiz. The quiz contains 30 questions and you have only one
                  attempt.
                </p>
                <Button onClick={proceedToQuiz} size="lg" className="w-full">
                  Proceed to Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription>Please fill in your information to get started with the assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade *</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.grade && <p className="text-sm text-red-600">{errors.grade}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Input
                  id="section"
                  value={formData.section}
                  onChange={(e) => handleInputChange("section", e.target.value)}
                  placeholder="Enter your section (e.g., A, B, C)"
                />
                {errors.section && <p className="text-sm text-red-600">{errors.section}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange("parentName", e.target.value)}
                    placeholder="Enter parent/guardian name"
                  />
                  {errors.parentName && <p className="text-sm text-red-600">{errors.parentName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentContact">Parent Contact *</Label>
                  <Input
                    id="parentContact"
                    value={formData.parentContact}
                    onChange={(e) => handleInputChange("parentContact", e.target.value)}
                    placeholder="Enter phone number"
                  />
                  {errors.parentContact && <p className="text-sm text-red-600">{errors.parentContact}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailProvider">Preferred Email Service Provider *</Label>
                <Select
                  value={formData.emailProvider}
                  onValueChange={(value) => handleInputChange("emailProvider", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select email provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                    <SelectItem value="outlook">Outlook</SelectItem>
                    <SelectItem value="hotmail">Hotmail</SelectItem>
                  </SelectContent>
                </Select>
                {errors.emailProvider && <p className="text-sm text-red-600">{errors.emailProvider}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Register & Get Email Address
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
