interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  image?: string
  explanation?: string
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

export default quizQuestions