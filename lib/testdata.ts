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
    question: "Which of these best describes a computer network?",
    options: [
      "A single computer working alone.",
      "A group of devices connected together to share information and resources.",
      "A type of computer game.",
      "A program used for drawing pictures."
    ],
    correctAnswer: 1,
    explanation: "A computer network is formed when two or more computers or devices are connected, allowing them to share data and resources."
  },
  {
    id: 2,
    question: "Which type of network is the Internet an example of?",
    options: [
      "PAN (Personal Area Network)",
      "LAN (Local Area Network)",
      "WAN (Wide Area Network)",
      "MAN (Metropolitan Area Network)"
    ],
    correctAnswer: 2,
    explanation: "The Internet is the largest example of a Wide Area Network (WAN), connecting computers globally."
  },
  {
    id: 3,
    question: "What is the main purpose of a web browser?",
    options: [
      "To type documents.",
      "To send and receive emails.",
      "To view and interact with web pages on the internet.",
      "To play offline music."
    ],
    correctAnswer: 2,
    explanation: "A web browser is a software application designed to let users access, view, and navigate websites on the World Wide Web."
  },
  {
    id: 4,
    question: "Which of the following is an example of a web browser?",
    image: "https://placehold.co/400x200/ADD8E6/000?text=Browser+Icons",
    options: [
      "Microsoft Word",
      "Mozilla Firefox",
      "Microsoft Excel",
      "Adobe Photoshop"
    ],
    correctAnswer: 1,
    explanation: "Mozilla Firefox is a popular web browser. Microsoft Word and Excel are office applications, and Adobe Photoshop is for image editing."
  },
  {
    id: 5,
    question: "What is a 'Web Page' made up of?",
    options: [
      "Only text and numbers.",
      "Only pictures and videos.",
      "A combination of text, graphics, audio, video, and animation.",
      "Only computer programs."
    ],
    correctAnswer: 2,
    explanation: "A web page typically contains various types of content, including text, images (graphics), sounds (audio), videos, and animated elements."
  },
  {
    id: 6,
    question: "What is the 'home page' of a website?",
    options: [
      "Any page you visit on the website.",
      "The main or starting page of a website.",
      "A page where you can buy things.",
      "A page with only advertisements."
    ],
    correctAnswer: 1,
    explanation: "The home page is usually the first page you see when you go to a website, acting as the main introduction to its content."
  },
  {
    id: 7,
    question: "What do you click on a web page to move from one page to another?",
    options: [
      "A button that says 'Print'",
      "A hyperlink",
      "The 'Home' button of your computer",
      "The 'Delete' key"
    ],
    correctAnswer: 1,
    explanation: "Hyperlinks are special text or images on a web page that, when clicked, take you to another part of the same page or to a different web page."
  },
  {
    id: 8,
    question: "When you 'surf the World Wide Web', what are you doing?",
    options: [
      "Swimming in the ocean.",
      "Browsing and moving from one website to another.",
      "Drawing pictures on the computer.",
      "Playing video games offline."
    ],
    correctAnswer: 1,
    explanation: "Surfing the World Wide Web means exploring different websites and moving between them using hyperlinks or search engines."
  },
  {
    id: 9,
    question: "To save a web page address so you can easily find it later, you create a:",
    options: [
      "New document",
      "Favorite link (bookmark)",
      "Screen capture",
      "Temporary file"
    ],
    correctAnswer: 1,
    explanation: "A favorite link, also known as a bookmark, saves the URL of a web page for quick access in the future."
  },
  {
    id: 10,
    question: "Which of these is a common search engine?",
    image: "https://placehold.co/400x200/F0F8FF/000?text=Search+Engine+Logos",
    options: [
      "Microsoft PowerPoint",
      "Google",
      "Windows Media Player",
      "Paint"
    ],
    correctAnswer: 1,
    explanation: "Google is one of the most widely used search engines for finding information on the internet."
  },
  {
    id: 11,
    question: "How do 'smart search engines' help you find information?",
    options: [
      "They only show you pictures.",
      "They help you search for information more accurately and efficiently.",
      "They make your computer run slower.",
      "They only search for games."
    ],
    correctAnswer: 1,
    explanation: "Smart search engines use advanced technology to understand your search queries better and provide more relevant results."
  },
  {
    id: 12,
    question: "When you fill out an 'online form', what might you use a 'textbox' for?",
    options: [
      "To select one choice from many.",
      "To type in your name or address.",
      "To tick a box for a 'yes' or 'no' answer.",
      "To upload a picture."
    ],
    correctAnswer: 1,
    explanation: "A textbox in an online form is where you enter text-based information, such as names, addresses, or comments."
  },
  {
    id: 13,
    question: "What does 'downloading a file' mean?",
    options: [
      "Sending a file from your computer to the internet.",
      "Copying a file from your computer to a USB drive.",
      "Transferring a file from the internet to your computer.",
      "Deleting a file from your computer."
    ],
    correctAnswer: 2,
    explanation: "Downloading a file means receiving a copy of a file from a remote source (like a website) onto your local computer or device."
  },
  {
    id: 14,
    question: "Why might you want to 'customize' your web browser?",
    options: [
      "To make it look and work the way you prefer.",
      "To make your computer turn off automatically.",
      "To delete all your browsing history.",
      "To change your computer's password."
    ],
    correctAnswer: 0,
    explanation: "Customizing your browser allows you to change its appearance, add tools (extensions), and adjust settings to better suit your personal needs and preferences."
  },
  {
    id: 15,
    question: "What is the purpose of setting a 'default search engine' in your browser?",
    options: [
      "To make the internet faster.",
      "To block all websites.",
      "To automatically use your preferred search engine for searches.",
      "To turn off all notifications."
    ],
    correctAnswer: 2,
    explanation: "Setting a default search engine means that whenever you perform a search through your browser's address bar or search bar, it will use the chosen search engine automatically."
  },
  {
    id: 16,
    question: "What are 'cookies' in web browsers primarily used for?",
    options: [
      "To play games online.",
      "To remember information about your visits to websites.",
      "To speed up your computer's performance.",
      "To clean your computer's screen."
    ],
    correctAnswer: 1,
    explanation: "Cookies are small data files that websites store on your computer to remember things like your login status, site preferences, or items in a shopping cart."
  },
  {
    id: 17,
    question: "Which of these is a popular e-mail service provider?",
    options: [
      "Google Maps",
      "Gmail",
      "Microsoft Paint",
      "Netflix"
    ],
    correctAnswer: 1,
    explanation: "Gmail is a widely used free email service provided by Google."
  },
  {
    id: 18,
    question: "What is an 'internet e-mail address' used for?",
    options: [
      "To make phone calls over the internet.",
      "To send and receive electronic messages.",
      "To download movies.",
      "To browse the web."
    ],
    correctAnswer: 1,
    explanation: "An internet e-mail address is unique and allows you to send and receive electronic messages over the internet."
  },
  {
    id: 19,
    question: "What does it mean to 'compose' an email message?",
    options: [
      "To read an email you received.",
      "To delete an email.",
      "To write a new email message.",
      "To forward an email to someone else."
    ],
    correctAnswer: 2,
    explanation: "Composing an email means writing and preparing a new email message to be sent."
  },
  {
    id: 20,
    question: "What does 'IoT' stand for?",
    image: "https://placehold.co/400x200/DDA0DD/000?text=Connected+Devices+Icon",
    options: [
      "Information of Technology",
      "Internet of Tools",
      "Internet of Things",
      "Internal Only Traffic"
    ],
    correctAnswer: 2,
    explanation: "IoT is the common abbreviation for 'Internet of Things'."
  },
  {
    id: 21,
    question: "Which of these is an example of an Internet of Things (IoT) device for home use?",
    options: [
      "A regular light bulb.",
      "A smart refrigerator that can order groceries.",
      "A basic radio.",
      "A non-smart television."
    ],
    correctAnswer: 1,
    explanation: "A smart refrigerator that connects to the internet to perform tasks like ordering groceries is an example of a consumer IoT device."
  },
  {
    id: 22,
    question: "What is the role of 'smart sensors' in IoT devices?",
    options: [
      "To provide electricity to the device.",
      "To collect data from the environment, like temperature or motion.",
      "To display images on a screen.",
      "To make the device look attractive."
    ],
    correctAnswer: 1,
    explanation: "Smart sensors are crucial for IoT as they gather information (data) about their surroundings, which can then be used by the connected system."
  },
  {
    id: 23,
    question: "What is 'private information' online?",
    options: [
      "Information that everyone should know.",
      "Information that is unimportant.",
      "Information that should be kept secret and shared carefully, like your home address.",
      "Information about your favorite cartoon."
    ],
    correctAnswer: 2,
    explanation: "Private information includes sensitive details about you that should not be shared widely online to protect your safety and privacy."
  },
  {
    id: 24,
    question: "To protect yourself from online identity theft, you should:",
    options: [
      "Share your password with friends.",
      "Use easy-to-guess passwords.",
      "Log out of accounts after using public computers.",
      "Post all your personal details online."
    ],
    correctAnswer: 2,
    explanation: "Logging out of accounts, especially on public computers, helps prevent unauthorized access to your personal information."
  },
  {
    id: 25,
    question: "What is a 'digital footprint'?",
    options: [
      "A new type of computer mouse.",
      "The trail of data and activities you leave behind while using the internet.",
      "A way to organize your files.",
      "A type of virtual reality game."
    ],
    correctAnswer: 1,
    explanation: "Your digital footprint is the record of your online activities, including websites visited, comments posted, and information shared."
  },
  {
    id: 26,
    question: "Which of these is a major health hazard associated with using ICT tools?",
    image: "https://placehold.co/400x200/F08080/000?text=Eye+Strain+Icon",
    options: [
      "Stronger muscles.",
      "Eye strain and fatigue.",
      "More physical activity.",
      "Improved memory."
    ],
    correctAnswer: 1,
    explanation: "Staring at computer screens for too long can cause eye strain, irritation, and fatigue."
  },
  {
    id: 27,
    question: "What is the proper way to sit when using a computer to avoid back pain?",
    options: [
      "Slouching forward in your chair.",
      "Sitting upright with your back supported.",
      "Lying sideways on the desk.",
      "Keeping your feet off the ground."
    ],
    correctAnswer: 1,
    explanation: "Maintaining an upright posture with your back supported helps to prevent aches and pains from prolonged computer use."
  },
  {
    id: 28,
    question: "What should you do regularly when using ICT tools to prevent health problems?",
    options: [
      "Work without stopping for many hours.",
      "Take short breaks to rest your eyes and stretch.",
      "Increase the brightness of your screen to maximum.",
      "Eat your meals directly on the keyboard."
    ],
    correctAnswer: 1,
    explanation: "Taking short breaks allows your eyes to rest and your body to stretch, reducing the risk of strain and discomfort."
  },
  {
    id: 29,
    question: "What is 'wrist pain' often caused by when using ICT tools?",
    options: [
      "Drinking too much water.",
      "Using the mouse and keyboard without proper support or breaks.",
      "Running around too much.",
      "Sleeping too much."
    ],
    correctAnswer: 1,
    explanation: "Repetitive movements and improper positioning of wrists while using a mouse and keyboard can lead to wrist pain."
  },
  {
    id: 30,
    question: "What does 'Digital Literacy' help learners do?",
    options: [
      "Only watch videos online.",
      "Discover, acquire, and communicate information using ICT tools responsibly.",
      "Only play computer games.",
      "Learn to repair computer hardware."
    ],
    correctAnswer: 1,
    explanation: "Digital literacy equips learners with the skills to use digital media and ICT tools effectively and responsibly for learning and communication."
  }
]