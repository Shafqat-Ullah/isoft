/**
 * iSOFT IT Training & Consultancy
 * Master Course Catalog & Academy Seed Data
 */

const ACADEMY_INFO = {
  name: "iSOFT IT Training & Consultancy",
  shortName: "iSOFT",
  tagline: "Empowering Next-Generation Tech Leaders",
  email: "admissions@isoft.edu.pk",
  supportEmail: "support@isoft.edu.pk",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  address: "iSOFT Tower, Commercial Zone, Phase 5, DHA, Lahore, Pakistan",
  googleDriveAdminAccount: "drive-admin@isoft.edu.pk",
  currency: "PKR",
  currencySymbol: "Rs.",
  socials: {
    facebook: "https://facebook.com/isofttraining",
    linkedin: "https://linkedin.com/company/isoft-training",
    youtube: "https://youtube.com/@isoft-academy",
    github: "https://github.com/isoft-academy"
  }
};

const CATEGORIES = [
  { id: "all", name: "All Programs", icon: "fa-solid fa-layer-group", count: 8 },
  { id: "python", name: "Python Programming", icon: "fa-brands fa-python", count: 2 },
  { id: "datascience", name: "Data Science & AI", icon: "fa-solid fa-chart-line", count: 2 },
  { id: "webdev", name: "Web Development", icon: "fa-brands fa-react", count: 2 },
  { id: "ai", name: "Artificial Intelligence", icon: "fa-solid fa-brain", count: 1 },
  { id: "graphic", name: "Graphic Designing", icon: "fa-solid fa-palette", count: 1 }
];

const COURSES = [
  {
    id: "course-py-01",
    title: "Mastering Python: From Zero to Industry Pro",
    slug: "python-programming-mastery",
    category: "python",
    categoryLabel: "Python Programming",
    level: "Beginner to Advanced",
    duration: "10 Weeks (50 Hours)",
    lecturesCount: 42,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior Software Architect & Python Lead",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.9,
      studentsCount: 1850,
      bio: "12+ years of enterprise software engineering experience with deep expertise in Python, distributed backend architectures, and AI model deployment."
    },
    price: 18000,
    discountPrice: 12500,
    isFree: false,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 328,
    driveFolderId: "1aBcDeFgHiJkLmNoPq_PYTHON_2026",
    driveFolderName: "iSOFT - Python Programming Masterclass Lectures [Google Drive]",
    thumbnail: "assets/images/courses/python-course.jpg",
    shortDesc: "Complete hands-on Python curriculum covering syntax, OOP, automation scripts, APIs, data manipulation, and 8 real-world industry capstones.",
    longDesc: "This flagship Python training program is tailored for ambitious students and working professionals aiming to master modern software development. You will progress from foundational syntax to object-oriented architecture, web scraping, asynchronous programming, REST APIs, and automated workflows. Paid lectures are distributed through verified, dedicated Google Drive folder storage with 4K resolution and downloadable source code repositories.",
    learningObjectives: [
      "Master core Python syntax, data structures, and algorithmic problem-solving",
      "Implement robust Object-Oriented Programming (OOP) design patterns and unit tests",
      "Build automated web scrapers using BeautifulSoup and Selenium",
      "Develop asynchronous microservices and RESTful APIs using FastAPI",
      "Perform practical exploratory data analysis with Pandas and NumPy",
      "Deploy production-grade Python applications with Docker and GitHub Actions"
    ],
    requirements: [
      "A laptop or desktop running Windows, macOS, or Linux with at least 8GB RAM",
      "Basic computer literacy; no prior coding experience required",
      "A verified Gmail account to receive Google Drive lecture permissions"
    ],
    modules: [
      {
        id: "mod-py-1",
        title: "Module 1: Foundations & Pythonic Syntax",
        lessons: [
          { id: "les-py-101", title: "Course Introduction & Dev Environment Setup (VS Code)", duration: "24m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
          { id: "les-py-102", title: "Variables, Primitive Data Types & Dynamic Typing", duration: "32m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
          { id: "les-py-103", title: "Conditional Logic, Match-Case & Loop Constructs", duration: "45m", isPreview: false, driveFileId: "DRIVE_PY_103_HD" },
          { id: "les-py-104", title: "Deep Dive into Lists, Tuples, Sets, and Dictionaries", duration: "50m", isPreview: false, driveFileId: "DRIVE_PY_104_HD" }
        ]
      },
      {
        id: "mod-py-2",
        title: "Module 2: Object-Oriented Programming & Clean Architecture",
        lessons: [
          { id: "les-py-201", title: "Classes, Instances, Dunder Methods & Encapsulation", duration: "52m", isPreview: false, driveFileId: "DRIVE_PY_201_HD" },
          { id: "les-py-202", title: "Inheritance, Polymorphism & Abstract Base Classes", duration: "48m", isPreview: false, driveFileId: "DRIVE_PY_202_HD" },
          { id: "les-py-203", title: "Exception Handling, Custom Exceptions & Logging", duration: "38m", isPreview: false, driveFileId: "DRIVE_PY_203_HD" }
        ]
      },
      {
        id: "mod-py-3",
        title: "Module 3: Automation, Web Scraping & REST APIs",
        lessons: [
          { id: "les-py-301", title: "Web Scraping at Scale with BeautifulSoup & Playwright", duration: "65m", isPreview: false, driveFileId: "DRIVE_PY_301_HD" },
          { id: "les-py-302", title: "Building Modern RESTful APIs with FastAPI & Pydantic", duration: "72m", isPreview: false, driveFileId: "DRIVE_PY_302_HD" },
          { id: "les-py-303", title: "Capstone Project: Automated Market Intelligence Bot", duration: "90m", isPreview: false, driveFileId: "DRIVE_PY_303_HD" }
        ]
      }
    ]
  },
  {
    id: "course-ds-01",
    title: "Applied Data Science & Machine Learning Bootcamp",
    slug: "applied-data-science-machine-learning",
    category: "datascience",
    categoryLabel: "Data Science & AI",
    level: "Intermediate",
    duration: "12 Weeks (60 Hours)",
    lecturesCount: 48,
    instructor: {
      name: "Dr. Ayesha Tariq",
      title: "Data Science Principal & Ex-Kaggle Grandmaster",
      avatar: "assets/images/instructors/ayesha.jpg",
      rating: 4.95,
      studentsCount: 1420,
      bio: "PhD in Computational Intelligence with 9+ years mentoring global data teams and implementing predictive analytics pipelines."
    },
    price: 24000,
    discountPrice: 16500,
    isFree: false,
    badge: "Trending",
    rating: 4.9,
    reviewsCount: 240,
    driveFolderId: "2bCdEfGhIjKlMnOpQr_DATASCI_2026",
    driveFolderName: "iSOFT - Applied Data Science & ML Drive Repo [Google Drive]",
    thumbnail: "assets/images/courses/data-science.jpg",
    shortDesc: "Master statistical modeling, NumPy, Pandas, Seaborn, SQL, Scikit-Learn algorithms, and build 6 production predictive machine learning pipelines.",
    longDesc: "Transform raw data into strategic intelligence. This comprehensive bootcamp bridges the gap between theoretical mathematics and high-impact industry applications. You will clean messy datasets, build robust regression and classification pipelines, perform feature engineering, and deploy machine learning models as production cloud endpoints.",
    learningObjectives: [
      "Master NumPy array vectorization and advanced Pandas data wrangling",
      "Craft compelling executive data visualizations using Matplotlib, Seaborn, and Plotly",
      "Write advanced SQL queries for relational data warehouses and ETL pipelines",
      "Train, evaluate, and tune Scikit-Learn supervised and unsupervised ML models",
      "Master feature selection, cross-validation, and hyperparameter optimization",
      "Deploy models via Streamlit web apps and containerized cloud services"
    ],
    requirements: [
      "Familiarity with basic high school math (algebra and elementary statistics)",
      "Basic Python syntax knowledge or completion of our Python foundational module",
      "Active Gmail ID to access the private Google Drive lecture folder"
    ],
    modules: [
      {
        id: "mod-ds-1",
        title: "Module 1: Wrangling, Cleaning & Exploratory Analysis",
        lessons: [
          { id: "les-ds-101", title: "Modern Data Science Stack & Anaconda Setup", duration: "28m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/ua-CiDNNj30" },
          { id: "les-ds-102", title: "Pandas Indexing, Filtering & Aggregations Masterclass", duration: "55m", isPreview: false, driveFileId: "DRIVE_DS_102_HD" },
          { id: "les-ds-103", title: "Handling Missing Values, Outliers & Skewed Distributions", duration: "48m", isPreview: false, driveFileId: "DRIVE_DS_103_HD" }
        ]
      },
      {
        id: "mod-ds-2",
        title: "Module 2: Machine Learning Algorithms from Scratch",
        lessons: [
          { id: "les-ds-201", title: "Linear & Logistic Regression with Mathematical Intuition", duration: "62m", isPreview: false, driveFileId: "DRIVE_DS_201_HD" },
          { id: "les-ds-202", title: "Decision Trees, Random Forests & XGBoost Ensemble", duration: "70m", isPreview: false, driveFileId: "DRIVE_DS_202_HD" },
          { id: "les-ds-203", title: "Clustering (K-Means, DBSCAN) & Dimensionality Reduction (PCA)", duration: "58m", isPreview: false, driveFileId: "DRIVE_DS_203_HD" }
        ]
      }
    ]
  },
  {
    id: "course-web-01",
    title: "Full Stack Web Development (MERN + Next.js)",
    slug: "full-stack-web-development-mern-nextjs",
    category: "webdev",
    categoryLabel: "Web Development",
    level: "Beginner to Professional",
    duration: "14 Weeks (75 Hours)",
    lecturesCount: 56,
    instructor: {
      name: "Hamza Bilal",
      title: "Senior Full Stack Architect & Tech Consultant",
      avatar: "assets/images/instructors/hamza.jpg",
      rating: 4.88,
      studentsCount: 2100,
      bio: "Creator of multiple high-traffic SaaS applications with 8+ years experience scaling React, Node.js, and cloud native architectures."
    },
    price: 26000,
    discountPrice: 17999,
    isFree: false,
    badge: "Top Rated",
    rating: 4.9,
    reviewsCount: 412,
    driveFolderId: "3cDeFgHiJkLmNoPqRs_MERN_NEXT_2026",
    driveFolderName: "iSOFT - Full Stack Web Development Google Drive Hub",
    thumbnail: "assets/images/courses/web-dev.jpg",
    shortDesc: "End-to-end full stack mastery: Modern JavaScript ES6+, React 19, Next.js App Router, Node.js, Express, MongoDB, Tailwind CSS, and Cloud Deployment.",
    learningObjectives: [
      "Master modern semantic HTML5, responsive CSS Grid/Flexbox, and modern CSS frameworks",
      "Deep dive into JavaScript ES6+, closures, promises, async/await, and DOM manipulation",
      "Build complex single-page apps with React 19, hooks, custom state management",
      "Architect lightning-fast server-rendered web portals with Next.js App Router",
      "Design secure REST APIs with Node.js, Express, JWT auth, and MongoDB aggregation",
      "Deploy production applications to Vercel, Docker, and AWS VPS"
    ],
    requirements: [
      "A PC or Mac with at least 8GB RAM",
      "No coding background needed; we teach starting from the basics",
      "Personal Gmail address for Google Drive permissions"
    ],
    modules: [
      {
        id: "mod-web-1",
        title: "Module 1: Modern Frontend Engineering",
        lessons: [
          { id: "les-web-101", title: "HTML5 Semantic Standards & Modern Layout Architecture", duration: "35m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc" },
          { id: "les-web-102", title: "Modern JavaScript Deep Dive: Promises, Async/Await & Event Loop", duration: "58m", isPreview: false, driveFileId: "DRIVE_WEB_102_HD" },
          { id: "les-web-103", title: "React 19 Core Concepts, Virtual DOM & State Machines", duration: "64m", isPreview: false, driveFileId: "DRIVE_WEB_103_HD" }
        ]
      },
      {
        id: "mod-web-2",
        title: "Module 2: Server-Side & Database Engineering",
        lessons: [
          { id: "les-web-201", title: "Node.js Architecture, Streams & Express.js REST APIs", duration: "60m", isPreview: false, driveFileId: "DRIVE_WEB_201_HD" },
          { id: "les-web-202", title: "MongoDB Schema Design, Indexing & Secure JWT Authentication", duration: "55m", isPreview: false, driveFileId: "DRIVE_WEB_202_HD" },
          { id: "les-web-203", title: "Production Next.js 15 Full Stack E-Commerce Capstone", duration: "85m", isPreview: false, driveFileId: "DRIVE_WEB_203_HD" }
        ]
      }
    ]
  },
  {
    id: "course-ai-01",
    title: "Artificial Intelligence, Generative AI & Prompt Engineering",
    slug: "generative-ai-prompt-engineering",
    category: "ai",
    categoryLabel: "Artificial Intelligence",
    level: "All Levels",
    duration: "8 Weeks (40 Hours)",
    lecturesCount: 36,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior Software Architect & AI Researcher",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.96,
      studentsCount: 980,
      bio: "Leading AI consultant working with international enterprises on LLM fine-tuning, RAG pipelines, and agentic coding workflows."
    },
    price: 22000,
    discountPrice: 14999,
    isFree: false,
    badge: "Hot & New",
    rating: 5.0,
    reviewsCount: 187,
    driveFolderId: "4dEfGhIjKlMnOpQrSt_GENAI_2026",
    driveFolderName: "iSOFT - Generative AI & Prompt Engineering Lectures [Drive]",
    thumbnail: "assets/images/courses/ai-course.jpg",
    shortDesc: "Harness LLMs, OpenAI/Claude APIs, LangChain, LlamaIndex, Retrieval-Augmented Generation (RAG), and Autonomous AI Agents for modern enterprise.",
    learningObjectives: [
      "Master foundational concepts of Large Language Models and Transformer architectures",
      "Design advanced prompting frameworks: Few-Shot, Chain-of-Thought, ReAct pattern",
      "Build custom RAG (Retrieval-Augmented Generation) pipelines using vector databases (Pinecone, ChromaDB)",
      "Integrate OpenAI, Anthropic, and local HuggingFace open-source models (Llama 3)",
      "Build AI-powered enterprise chatbots, automated research agents, and code assistants"
    ],
    requirements: [
      "Basic understanding of software applications",
      "Personal computer with modern browser",
      "Gmail address to access Google Drive lecture archives"
    ],
    modules: [
      {
        id: "mod-ai-1",
        title: "Module 1: Foundations of Generative AI & Prompting Mastery",
        lessons: [
          { id: "les-ai-101", title: "The Generative AI Revolution: Architecture & Capabilities", duration: "30m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/2eWuYf-aZE4" },
          { id: "les-ai-102", title: "Prompt Engineering Protocols: Zero-Shot, Few-Shot & Meta-Prompting", duration: "48m", isPreview: false, driveFileId: "DRIVE_AI_102_HD" }
        ]
      },
      {
        id: "mod-ai-2",
        title: "Module 2: Building Enterprise RAG & Autonomous Agents",
        lessons: [
          { id: "les-ai-201", title: "Vector Embeddings & Semantic Search with LangChain", duration: "65m", isPreview: false, driveFileId: "DRIVE_AI_201_HD" },
          { id: "les-ai-202", title: "Multi-Agent Systems: CrewAI and Autogen in Practice", duration: "75m", isPreview: false, driveFileId: "DRIVE_AI_202_HD" }
        ]
      }
    ]
  },
  {
    id: "course-free-01",
    title: "Python 101: Code Your First Program Today",
    slug: "free-python-101",
    category: "python",
    categoryLabel: "Python Programming",
    level: "Absolute Beginner",
    duration: "2 Weeks (8 Hours)",
    lecturesCount: 10,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior Software Architect",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.85,
      studentsCount: 4200,
      bio: "Dedicated to making high-tier computer science education accessible across Pakistan."
    },
    price: 0,
    discountPrice: 0,
    isFree: true,
    badge: "100% Free",
    rating: 4.8,
    reviewsCount: 512,
    driveFolderId: "FREE_DRIVE_PUBLIC_PY101",
    driveFolderName: "iSOFT - Free Python 101 Public Library [Drive]",
    thumbnail: "assets/images/courses/free-python.jpg",
    shortDesc: "A complete zero-cost introductory crash course to help you build confidence, write your first lines of code, and decide your tech career path.",
    learningObjectives: [
      "Understand what computer programming is and how computers execute instructions",
      "Install Python 3 and write simple console applications",
      "Work with numbers, text, conditions, and basic loops",
      "Build a fun interactive CLI game project"
    ],
    requirements: [
      "Any desktop or laptop computer",
      "Desire to learn programming"
    ],
    modules: [
      {
        id: "mod-fpy-1",
        title: "Module 1: Quickstart",
        lessons: [
          { id: "les-fpy-101", title: "Welcome to Programming & Why Python Rules", duration: "18m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
          { id: "les-fpy-102", title: "Writing Your First Python Script: Hello World & Beyond", duration: "25m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
        ]
      }
    ]
  },
  {
    id: "course-gd-01",
    title: "Professional Graphic Design & Brand Identity Mastery",
    slug: "graphic-design-brand-identity",
    category: "graphic",
    categoryLabel: "Graphic Designing",
    level: "Beginner to Advanced",
    duration: "8 Weeks (40 Hours)",
    lecturesCount: 32,
    instructor: {
      name: "Mariam Zainab",
      title: "Creative Director & Brand Strategist",
      avatar: "assets/images/instructors/mariam.jpg",
      rating: 4.92,
      studentsCount: 1100,
      bio: "Over a decade crafting iconic visual identities for global tech startups, packaging, and digital marketing campaigns."
    },
    price: 16000,
    discountPrice: 9999,
    isFree: false,
    badge: "Creative",
    rating: 4.9,
    reviewsCount: 165,
    driveFolderId: "6fGhIjKlMnOpQrStUv_GRAPHIC_2026",
    driveFolderName: "iSOFT - Graphic Design & Brand Identity [Drive Hub]",
    thumbnail: "assets/images/courses/graphic-design.jpg",
    shortDesc: "Master Adobe Photoshop, Illustrator, Figma, typography rules, color theory, social media kits, and complete client branding projects.",
    learningObjectives: [
      "Master vector illustration and logo design in Adobe Illustrator",
      "Advanced photo manipulation, retouching, and compositing in Photoshop",
      "Modern UI/UX prototyping and design systems in Figma",
      "Develop complete brand identity style guides and client pitch decks"
    ],
    requirements: [
      "Laptop or PC with 8GB RAM minimum",
      "Adobe Illustrator / Photoshop (guidance provided on setup)",
      "Gmail account to access Google Drive lecture files"
    ],
    modules: [
      {
        id: "mod-gd-1",
        title: "Module 1: Design Principles & Vector Mastery",
        lessons: [
          { id: "les-gd-101", title: "Design Theory: Contrast, Hierarchy, Balance & Color Psychology", duration: "32m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/un50Bs4BvZ8" },
          { id: "les-gd-102", title: "Mastering the Pen Tool & Vector Geometry in Illustrator", duration: "50m", isPreview: false, driveFileId: "DRIVE_GD_102_HD" }
        ]
      }
    ]
  }
];

const PAYMENT_METHODS = [
  {
    id: "jazzcash",
    name: "JazzCash Mobile Account / Till",
    badge: "Instant Verification",
    accountTitle: "iSOFT IT Training & Consultancy",
    accountNumber: "0300 1234567",
    tillId: "0098412",
    instructions: "Transfer the payable amount via JazzCash App or USSD *786#. In the recipient field, enter 0300 1234567 (Account Title: iSOFT IT Training). Note down your 12-digit Transaction ID (TID) and take a screenshot of the confirmation screen."
  },
  {
    id: "easypaisa",
    name: "Easypaisa Mobile Wallet",
    badge: "Recommended",
    accountTitle: "iSOFT IT Training & Consultancy",
    accountNumber: "0345 9876543",
    instructions: "Send the fee via Easypaisa App. Select 'Send Money' -> 'Easypaisa Transfer' -> enter 0345 9876543. Ensure the account name displays 'iSOFT IT Training & Consultancy'. Keep the TRX ID and receipt screenshot for submission."
  },
  {
    id: "bank",
    name: "Direct Bank Transfer (Meezan Bank)",
    badge: "Official Corporate",
    accountTitle: "iSOFT IT Training & Consultancy Pvt Ltd",
    accountNumber: "01020104567891",
    bankName: "Meezan Bank Limited",
    iban: "PK36MEZN0001020104567891",
    branch: "DHA Phase 5 Branch, Lahore",
    instructions: "Transfer the exact fee through your mobile banking app or ATM (1Link). Enter the corporate IBAN above. Save the transaction reference number and receipt PDF/image."
  },
  {
    id: "card",
    name: "Credit / Debit Card (Visa / Mastercard)",
    badge: "Online Gateway",
    instructions: "Pay instantly using your Visa, MasterCard, or UnionPay debit/credit card through our 256-bit encrypted SSL checkout."
  }
];

const FAQS = [
  {
    question: "How and when will I get access to the Google Drive course lectures?",
    answer: "After you complete the enrollment form and submit your payment receipt or transaction ID, our admissions team verifies the payment. Once verified and approved, our system automatically shares the course's dedicated Google Drive folder with your registered Gmail address with viewer streaming permissions, and unlocks the 'Open Course Lectures on Google Drive' button in your Student Dashboard."
  },
  {
    question: "Why are paid lectures hosted on Google Drive instead of an open website?",
    answer: "Google Drive ensures 4K/1080p lag-free video streaming powered by Google's global CDN, enables direct access to downloadable project files and code notebooks, and ensures high security so only verified enrolled students receive learning materials."
  },
  {
    question: "Can I use any email address or does it have to be a Gmail account?",
    answer: "We strongly recommend using a valid Gmail or Google Workspace email address when filling out the Course Access Form, as Google Drive permissions are directly linked to your Google account."
  },
  {
    question: "What happens if my payment verification is rejected?",
    answer: "If an invalid transaction reference or unreadable receipt is submitted, our administrator will reject the submission with an explanation note. You will receive an immediate in-app and email notification allowing you to re-upload the correct receipt without having to fill out the form from scratch."
  },
  {
    question: "Is there an official certificate after completing the course?",
    answer: "Yes! Upon completing the curriculum and submitting your capstone project, you receive a verified digital certificate with a unique QR code and ID that can be authenticated on our Certificate Verification page."
  },
  {
    question: "What is the academy refund policy?",
    answer: "We offer a 7-day hassle-free money-back guarantee if you have watched less than 20% of the lectures and find the curriculum does not meet your expectations."
  }
];

const SAMPLE_CERTIFICATES = [
  {
    certId: "ISOFT-CERT-2026-001",
    studentName: "Muhammad Zeeshan",
    courseName: "Mastering Python: From Zero to Industry Pro",
    issueDate: "October 15, 2026",
    grade: "Distinction (94%)",
    status: "Verified",
    instructor: "Engr. Shafiq Ur Rehman"
  },
  {
    certId: "ISOFT-CERT-2026-002",
    studentName: "Farhan Ali",
    courseName: "Full Stack Web Development (MERN + Next.js)",
    issueDate: "October 18, 2026",
    grade: "Excellent (89%)",
    status: "Verified",
    instructor: "Hamza Bilal"
  }
];
