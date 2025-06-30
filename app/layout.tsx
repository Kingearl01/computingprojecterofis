import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Computing Project Work",
  description: "Educational assessment platform for end of term computing evaluation",
  authors: [{name: "Earl Kalf ", url:"https://earlkalf.netlify.app"}],  
  category: 'EDUCATION',
  keywords: ['computing', 'erofis', 'erofiscomputing', 'computing project work', 'project work'],
    creator: 'Sir Samuel, Earl Kalf_Official',
    publisher: 'Sir Samuel, Earl Kalf Official',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,

    },

    openGraph: {
      title: "Computing Project Work Basic 6",
      description: "Educational assessment platform for end of term computing evaluation",
      images: './app/erofis.png',
      creators: 'Sir Samuel'
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
