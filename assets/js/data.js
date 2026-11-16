/**
 * iSOFT IT Training & Software Solutions
 * Official Master Course Catalog, Packages & Academy Data
 * WhatsApp: 0333 6606262 | Secondary: 0313 9999749
 * Address: Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar
 */

const ACADEMY_INFO = {
  name: "iSOFT IT Training & Software Solutions",
  shortName: "iSOFT",
  tagline: "Professional skills • Practical learning • Career-focused training",
  email: "admissions@isoft.edu.pk",
  supportEmail: "support@isoft.edu.pk",
  phone: "0333 6606262",
  phoneFormatted: "0333 6606262",
  phoneSecondary: "0313 9999749",
  whatsapp: "0333 6606262",
  whatsappClean: "923336606262",
  whatsappSecondary: "0313 9999749",
  whatsappSecondaryClean: "923139999749",
  address: "Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar, Pakistan",
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
  { id: "all", name: "All Programs", icon: "fa-solid fa-layer-group", count: 12 },
  { id: "packages", name: "Special Packages", icon: "fa-solid fa-fire", count: 7 },
  { id: "programming", name: "Programming & Dev", icon: "fa-solid fa-code", count: 3 },
  { id: "networking", name: "Networking & MCSE", icon: "fa-solid fa-network-wired", count: 3 },
  { id: "datascience", name: "Data Science & AI", icon: "fa-solid fa-chart-line", count: 3 },
  { id: "cybersecurity", name: "Cybersecurity", icon: "fa-solid fa-shield-halved", count: 1 },
  { id: "database", name: "Database Engineering", icon: "fa-solid fa-database", count: 2 }
];

/**
 * PROMOTIONAL COURSE PACKAGES (Directly from "course packages" posters)
 */
const COURSE_PACKAGES = [
  {
    id: "pkg-cpp-py",
    courseId: "course-cpp-py-01",
    title: "C++ & Python Beginner Course Offer",
    shortTitle: "C++ & Python for Beginners",
    slug: "cpp-python-beginner-course",
    posterImage: "assets/images/packages/cplusplus-python.png",
    duration: "2 Months (45 Days)",
    durationShort: "45 Days",
    fee: 5000,
    feeFormatted: "Rs. 5,000",
    regularFee: 10000,
    feeUnit: "Full Course",
    discountBadge: "50% OFF",
    mode: "Online",
    timing: "8:00 PM to 9:00 PM",
    category: "programming",
    categoryLabel: "Programming for Beginners",
    badgeColor: "#D32027",
    highlights: [
      "50% Discount Limited Time Offer",
      "Live Online Interactive Classes (8:00 PM - 9:00 PM)",
      "C++ Core Fundamentals & Problem Solving",
      "Python Scripting, Automation & Data Structures",
      "Free Code Repositories & Lecture Recordings"
    ],
    summary: "Kickstart your coding career with the two most popular languages: C++ for strong programming fundamentals and Python for modern development & automation."
  },
  {
    id: "pkg-ccna",
    courseId: "course-ccna-01",
    title: "CCNA - Cisco Certified Network Associate",
    shortTitle: "CCNA Networking Career",
    slug: "ccna-networking-career",
    posterImage: "assets/images/packages/ccna-networking.png",
    duration: "2 Months",
    durationShort: "2 Months",
    fee: 10000,
    feeFormatted: "Rs. 10,000",
    regularFee: 15000,
    feeUnit: "Total Fee",
    discountBadge: "Career Booster",
    mode: "On-Site (Peshawar)",
    timing: "5:30 PM to 6:30 PM",
    category: "networking",
    categoryLabel: "Networking",
    badgeColor: "#0284C7",
    highlights: [
      "Networking Fundamentals & IP Subnetting",
      "Routing & Switching Configurations",
      "Configuring Real Cisco Devices & Packet Tracer",
      "Network Security Basics & Firewalls",
      "Real-World Networking Skills & Career Growth"
    ],
    summary: "Build your networking skills for a high-paying career. Hands-on training on Cisco routers, switches, and enterprise protocols."
  },
  {
    id: "pkg-cybersecurity",
    courseId: "course-cyber-01",
    title: "Cyber Security Training Promotion",
    shortTitle: "Cyber Security Training",
    slug: "cyber-security-training-promotion",
    posterImage: "assets/images/packages/cyber-security.png",
    duration: "3 Months",
    durationShort: "3 Months",
    fee: 10000,
    feeFormatted: "Rs. 10,000",
    regularFee: 20000,
    feeUnit: "Complete Track",
    discountBadge: "50% OFF • 15 Seats Only",
    mode: "Online & On-Site",
    timing: "Flexible Evening Batches",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badgeColor: "#DC2626",
    highlights: [
      "Learn. Protect. Grow.",
      "Cybersecurity Concepts & Ethical Defense",
      "Network Penetration Testing & Vulnerability Assessment",
      "Virtual Lab Scenarios & Threat Analysis",
      "Strict Limit: Only 15 Seats Available"
    ],
    summary: "Protect modern systems from digital threats. Master hands-on ethical hacking fundamentals, network defense, and practical cybersecurity skills."
  },
  {
    id: "pkg-data-science",
    courseId: "course-ds-01",
    title: "Data Science Course Promotion",
    shortTitle: "Data Science & Machine Learning",
    slug: "data-science-course-promotion",
    posterImage: "assets/images/packages/data-science.png",
    duration: "4 Months",
    durationShort: "4 Months",
    fee: 5000,
    feeFormatted: "Rs. 5,000 / Month",
    regularFee: 10000,
    feeUnit: "Per Month",
    discountBadge: "50% OFF • Online",
    mode: "Online",
    timing: "9:30 PM to 10:30 PM",
    category: "datascience",
    categoryLabel: "Data Science",
    badgeColor: "#F59E0B",
    highlights: [
      "Python + Data Science Libraries (NumPy, Pandas, Seaborn)",
      "Machine Learning Algorithms & Predictive Modeling",
      "SQL Querying & Data Pipelines",
      "End-to-End Real-World Practical Projects",
      "Convenient Evening Time (9:30 PM to 10:30 PM)"
    ],
    summary: "Master data science and predictive analytics. 4 months of intensive, project-driven learning from Python basics to production machine learning."
  },
  {
    id: "pkg-database",
    courseId: "course-db-01",
    title: "Database Software Engineer (Master Database Skills)",
    shortTitle: "Database Software Engineer",
    slug: "master-database-skills-isoft",
    posterImage: "assets/images/packages/database-admin.png",
    duration: "2 Months",
    durationShort: "2 Months",
    fee: 16000,
    feeFormatted: "Rs. 16,000",
    regularFee: 21500,
    feeUnit: "Total Fee",
    discountBadge: "25% OFF • On-Site",
    mode: "On-Site (Peshawar)",
    timing: "5:30 PM to 6:30 PM",
    category: "database",
    categoryLabel: "Database Administration",
    badgeColor: "#E11D48",
    highlights: [
      "Master Databases, Build Better Solutions",
      "Oracle & Microsoft SQL Server Deep Dive",
      "Database Design, ER Modeling & Normalization",
      "SQL Queries, Stored Procedures & Advanced SQL",
      "Performance Tuning, Backup & Disaster Recovery"
    ],
    summary: "Become a proficient enterprise database developer and administrator. Master Oracle and SQL Server to design, manage, and optimize scalable databases."
  },
  {
    id: "pkg-mcse",
    courseId: "course-mcse-01",
    title: "MCSE 2025 Career Training Poster",
    shortTitle: "MCSE 2025 Systems Engineer",
    slug: "mcse-2025-career-training",
    posterImage: "assets/images/packages/mcse-training.png",
    duration: "2 Months",
    durationShort: "2 Months",
    fee: 16000,
    feeFormatted: "Rs. 16,000",
    regularFee: 22000,
    feeUnit: "Total Fee",
    discountBadge: "Enterprise Certified",
    mode: "On-Site (Peshawar)",
    timing: "6:30 PM to 7:30 PM",
    category: "networking",
    categoryLabel: "Systems Engineering",
    badgeColor: "#2563EB",
    highlights: [
      "Microsoft Certified Systems Engineer 2025 Curriculum",
      "Windows Server 2025 Deployment & Administration",
      "Active Directory Domain Services (AD DS) & Group Policies",
      "DNS, DHCP, Hyper-V Virtualization & Cloud Sync",
      "Hands-On Server Hardware & Live Enterprise Lab"
    ],
    summary: "Build your corporate career with Microsoft Systems Engineering. Master enterprise Windows Server infrastructure, Active Directory, and network services."
  },
  {
    id: "pkg-all-packages",
    courseId: "course-net-diploma",
    title: "ISOFT Courses Packages Poster (Complete Overview)",
    shortTitle: "ISOFT Complete Courses Catalog",
    slug: "isoft-courses-packages-poster",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    duration: "1 to 6 Months",
    durationShort: "All Tracks",
    fee: 4000,
    feeFormatted: "From Rs. 4,000",
    regularFee: 8000,
    feeUnit: "Starting",
    discountBadge: "Official Catalog",
    mode: "Online & On-Site",
    timing: "Morning / Evening / Night",
    category: "packages",
    categoryLabel: "All Packages",
    badgeColor: "#111827",
    highlights: [
      "Networking (CCNA + MCSE + CCNP) - 6 Months (Rs. 30,000)",
      "Web Development (HTML/CSS/JS/React/Firebase) - 6 Months (Rs. 4,000/mo)",
      "Programming for Beginners (C++ & Python) - 45 Days (Rs. 5,000)",
      "Database Administration (Oracle/SQL/PostgreSQL) - 2 Months (Rs. 16,000)",
      "Data Analytics, AI for Everyone, IT Support & Software Engineering"
    ],
    summary: "Explore our comprehensive technology training programs with practical, career-focused learning and verified certifications."
  }
];

/**
 * MASTER COURSES DATABASE
 */
const COURSES = [
  {
    id: "course-cpp-py-01",
    title: "Programming for Beginners: C++ & Python",
    slug: "programming-for-beginners-cpp-python",
    category: "programming",
    categoryLabel: "Programming for Beginners",
    level: "Absolute Beginner",
    duration: "2 Months (45 Days)",
    lecturesCount: 40,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior Software Architect & Mentor",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.98,
      studentsCount: 3100,
      bio: "12+ years experience in software architecture, C++, Python, and mentoring thousands of successful developers."
    },
    price: 10000,
    discountPrice: 5000,
    isFree: false,
    badge: "50% OFF",
    rating: 4.95,
    reviewsCount: 450,
    driveFolderId: "DRIVE_CPP_PY_BEGINNER_2026",
    driveFolderName: "iSOFT - C++ & Python Beginner Course Hub [Google Drive]",
    thumbnail: "assets/images/packages/cplusplus-python.png",
    posterImage: "assets/images/packages/cplusplus-python.png",
    classTiming: "8:00 PM to 9:00 PM",
    learningMode: "Online",
    shortDesc: "Complete starter pack covering computer science logic, modern C++ syntax, object-oriented programming, and practical Python automation.",
    longDesc: "Designed specifically for novices, college students, and anyone taking their first step into the tech world. You will learn the strong structural foundation of C++ (variables, pointers, control flow, functions, OOP) followed by the expressive simplicity of Python for modern scripting, automation, and mini applications.",
    learningObjectives: [
      "Build rock-solid logical problem-solving skills and algorithm basics",
      "Master C++ core syntax, memory concepts, functions, and OOP classes",
      "Learn modern Python syntax, lists, dictionaries, and modules",
      "Write automated utility scripts and interactive console projects",
      "Receive live instructor mentorship and verified Google Drive lecture archives"
    ],
    requirements: [
      "Any laptop or desktop PC (Windows, Mac, or Linux)",
      "No prior coding experience required",
      "Active WhatsApp and Gmail address"
    ],
    modules: [
      {
        id: "mod-cp-1",
        title: "Module 1: C++ Foundations & Logic Building",
        lessons: [
          { id: "les-cp-101", title: "Introduction to Programming & C++ Compiler Setup", duration: "25m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
          { id: "les-cp-102", title: "Variables, Data Types, Input/Output & Operators", duration: "35m", isPreview: false, driveFileId: "DRIVE_CPP_102" },
          { id: "les-cp-103", title: "Control Flow: If-Else, Switch & Loops", duration: "40m", isPreview: false, driveFileId: "DRIVE_CPP_103" },
          { id: "les-cp-104", title: "Functions, Arrays and Object-Oriented Principles", duration: "50m", isPreview: false, driveFileId: "DRIVE_CPP_104" }
        ]
      },
      {
        id: "mod-cp-2",
        title: "Module 2: Python Essentials & Practical Scripts",
        lessons: [
          { id: "les-cp-201", title: "Python Environment & Interactive Syntax", duration: "30m", isPreview: false, driveFileId: "DRIVE_PY_201" },
          { id: "les-cp-202", title: "Data Structures: Lists, Tuples, Dictionaries", duration: "45m", isPreview: false, driveFileId: "DRIVE_PY_202" },
          { id: "les-cp-203", title: "Capstone: Building Your First Automated Utility Project", duration: "60m", isPreview: false, driveFileId: "DRIVE_PY_203" }
        ]
      }
    ]
  },
  {
    id: "course-ccna-01",
    title: "CCNA - Cisco Certified Network Associate",
    slug: "ccna-cisco-certified-network-associate",
    category: "networking",
    categoryLabel: "Networking",
    level: "Beginner to Intermediate",
    duration: "2 Months",
    lecturesCount: 36,
    instructor: {
      name: "Engr. Shafiq Ur Rehman & Team",
      title: "Cisco Certified Network Architect",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.92,
      studentsCount: 1980,
      bio: "Industry network engineer with decades of enterprise deployment experience across Cisco switches, routers, and secure VPNs."
    },
    price: 15000,
    discountPrice: 10000,
    isFree: false,
    badge: "On-Site Lab",
    rating: 4.92,
    reviewsCount: 310,
    driveFolderId: "DRIVE_CCNA_CISCO_2026",
    driveFolderName: "iSOFT - CCNA Cisco Certified Network Associate [Drive Hub]",
    thumbnail: "assets/images/packages/ccna-networking.png",
    posterImage: "assets/images/packages/ccna-networking.png",
    classTiming: "5:30 PM to 6:30 PM",
    learningMode: "On-Site (Peshawar)",
    shortDesc: "Comprehensive Cisco CCNA certification training: Networking fundamentals, routing, switching, IP addressing, and Cisco CLI commands.",
    longDesc: "Prepare for high-demand IT networking roles and the Cisco CCNA exam. You'll master network architectures, IPv4/IPv6 subnetting, VLANs, trunking, dynamic routing protocols (OSPF), access control lists (ACLs), NAT, and hands-on lab exercises on real Cisco equipment.",
    learningObjectives: [
      "Understand enterprise network architecture, OSI and TCP/IP models",
      "Configure Cisco routers and switches via IOS Command Line Interface",
      "Implement VLANs, Inter-VLAN routing, and Spanning Tree Protocol (STP)",
      "Configure OSPF dynamic routing, NAT, and Access Control Lists",
      "Troubleshoot complex enterprise network connectivity issues"
    ],
    requirements: [
      "Basic understanding of computers",
      "Commitment to on-site practical lab sessions"
    ],
    modules: [
      {
        id: "mod-ccna-1",
        title: "Module 1: Network Fundamentals & IPv4/IPv6",
        lessons: [
          { id: "les-ccna-101", title: "Network Components, Topologies & Cable Standards", duration: "40m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
          { id: "les-ccna-102", title: "IPv4 Subnetting & VLSM Calculation Masterclass", duration: "60m", isPreview: false, driveFileId: "DRIVE_CCNA_102" }
        ]
      },
      {
        id: "mod-ccna-2",
        title: "Module 2: Routing, Switching & Cisco IOS",
        lessons: [
          { id: "les-ccna-201", title: "Cisco Switch Configuration & VLAN Trunking", duration: "55m", isPreview: false, driveFileId: "DRIVE_CCNA_201" },
          { id: "les-ccna-202", title: "OSPF Routing & Enterprise Network Security", duration: "70m", isPreview: false, driveFileId: "DRIVE_CCNA_202" }
        ]
      }
    ]
  },
  {
    id: "course-cyber-01",
    title: "Cyber Security Training Program",
    slug: "cyber-security-training-program",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    level: "Beginner to Advanced",
    duration: "3 Months",
    lecturesCount: 45,
    instructor: {
      name: "Cyber Security Advisory Team",
      title: "Certified Ethical Hackers & InfoSec Leads",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.96,
      studentsCount: 1400,
      bio: "Certified offensive and defensive security professionals training the next generation of cybersecurity analysts."
    },
    price: 20000,
    discountPrice: 10000,
    isFree: false,
    badge: "50% OFF • 15 Seats Only",
    rating: 4.96,
    reviewsCount: 220,
    driveFolderId: "DRIVE_CYBER_SECURITY_2026",
    driveFolderName: "iSOFT - Cyber Security Training Lectures & Virtual Labs [Drive]",
    thumbnail: "assets/images/packages/cyber-security.png",
    posterImage: "assets/images/packages/cyber-security.png",
    classTiming: "Flexible Evening Batches",
    learningMode: "Online & On-Site",
    shortDesc: "Learn. Protect. Grow. Practical cybersecurity concepts, ethical hacking fundamentals, vulnerability scanning, and defensive systems.",
    longDesc: "Step into the fast-growing field of digital protection. This program covers security principles, threat analysis, Wireshark packet capture, Kali Linux tools, network hardening, social engineering awareness, and defensive blue-team workflows. Limited to 15 students per batch for direct instructor attention.",
    learningObjectives: [
      "Master information security principles, CIA triad, and defense-in-depth",
      "Perform network scanning and vulnerability assessments with Nmap & Wireshark",
      "Understand web application vulnerabilities (OWASP Top 10)",
      "Set up firewalls, intrusion detection, and incident response routines",
      "Work in simulated virtual labs with safe, controlled environments"
    ],
    requirements: [
      "Basic networking or computer familiarity",
      "Laptop with at least 8GB RAM for virtualization"
    ],
    modules: [
      {
        id: "mod-cs-1",
        title: "Module 1: Information Security & Networking Defense",
        lessons: [
          { id: "les-cs-101", title: "Cyber Threat Landscape & Attack Vectors", duration: "35m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/2eWuYf-aZE4" },
          { id: "les-cs-102", title: "Network Sniffing & Wireshark Protocol Analysis", duration: "50m", isPreview: false, driveFileId: "DRIVE_CS_102" }
        ]
      }
    ]
  },
  {
    id: "course-ds-01",
    title: "Data Science & Machine Learning Bootcamp",
    slug: "data-science-machine-learning-bootcamp",
    category: "datascience",
    categoryLabel: "Data Science",
    level: "Intermediate",
    duration: "4 Months",
    lecturesCount: 50,
    instructor: {
      name: "Dr. Ayesha Tariq & Team",
      title: "Data Science Principal",
      avatar: "assets/images/instructors/ayesha.jpg",
      rating: 4.95,
      studentsCount: 2200,
      bio: "PhD in Computational Intelligence with 9+ years mentoring global data teams and implementing predictive analytics pipelines."
    },
    price: 10000,
    discountPrice: 5000,
    isFree: false,
    badge: "50% OFF (Rs. 5,000/mo)",
    rating: 4.93,
    reviewsCount: 380,
    driveFolderId: "2bCdEfGhIjKlMnOpQr_DATASCI_2026",
    driveFolderName: "iSOFT - Applied Data Science & ML Drive Repo [Google Drive]",
    thumbnail: "assets/images/packages/data-science.png",
    posterImage: "assets/images/packages/data-science.png",
    classTiming: "9:30 PM to 10:30 PM",
    learningMode: "Online",
    shortDesc: "Python + Data Science Libraries + Machine Learning + SQL + Real-world Practical Projects in convenient night batches.",
    longDesc: "Transform raw numbers into strategic intelligence. This comprehensive bootcamp bridges the gap between mathematics and high-impact industry applications. You will clean messy datasets, build robust regression and classification pipelines, and deploy machine learning models.",
    learningObjectives: [
      "Master NumPy array vectorization and advanced Pandas data wrangling",
      "Craft compelling executive data visualizations using Matplotlib & Seaborn",
      "Write advanced SQL queries for relational data warehouses",
      "Train, evaluate, and tune Scikit-Learn supervised and unsupervised ML models",
      "Complete an end-to-end predictive analytics capstone project"
    ],
    requirements: [
      "High school mathematics background",
      "Basic Python familiarity or simultaneous beginner course"
    ],
    modules: [
      {
        id: "mod-ds-1",
        title: "Module 1: Wrangling, Cleaning & Exploratory Analysis",
        lessons: [
          { id: "les-ds-101", title: "Modern Data Science Stack & Anaconda Setup", duration: "28m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/ua-CiDNNj30" },
          { id: "les-ds-102", title: "Pandas Indexing, Filtering & Aggregations", duration: "55m", isPreview: false, driveFileId: "DRIVE_DS_102" }
        ]
      }
    ]
  },
  {
    id: "course-db-01",
    title: "Database Software Engineer & Administration",
    slug: "database-software-engineer-administration",
    category: "database",
    categoryLabel: "Database Administration",
    level: "Beginner to Professional",
    duration: "2 Months",
    lecturesCount: 36,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior Database Architect & Oracle DBA",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.97,
      studentsCount: 1650,
      bio: "15+ years managing enterprise high-availability Oracle and Microsoft SQL Server databases for banking and corporate clients."
    },
    price: 21500,
    discountPrice: 16000,
    isFree: false,
    badge: "25% OFF • On-Site",
    rating: 4.97,
    reviewsCount: 290,
    driveFolderId: "DRIVE_DATABASE_SKILLS_2026",
    driveFolderName: "iSOFT - Database Software Engineer Lectures & SQL Scripts [Drive]",
    thumbnail: "assets/images/packages/database-admin.png",
    posterImage: "assets/images/packages/database-admin.png",
    classTiming: "5:30 PM to 6:30 PM",
    learningMode: "On-Site (Peshawar)",
    shortDesc: "Master databases, build better solutions. Learn Oracle and SQL Server to design, manage, and optimize enterprise databases.",
    longDesc: "Database administration and SQL development remain among the highest-paid IT disciplines. This hands-on course teaches enterprise database modeling, relational integrity, complex queries, indexing, query optimization, backup strategies, and multi-user administration in Oracle and SQL Server.",
    learningObjectives: [
      "Master relational database architecture, normal forms, and ER modeling",
      "Write complex SQL queries, subqueries, CTEs, and analytical window functions",
      "Implement Stored Procedures, Triggers, Views, and Transactions (ACID)",
      "Administer Oracle Database and Microsoft SQL Server instances",
      "Perform index tuning, query plan analysis, and backup/restore recovery"
    ],
    requirements: [
      "Basic understanding of computers",
      "Attendance at on-site classes in Peshawar campus"
    ],
    modules: [
      {
        id: "mod-db-1",
        title: "Module 1: Relational Modeling & Complex SQL",
        lessons: [
          { id: "les-db-101", title: "Database Foundations, Schemas & Table Creation", duration: "35m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc" },
          { id: "les-db-102", title: "Advanced SQL Joins, Aggregations & Analytical Queries", duration: "50m", isPreview: false, driveFileId: "DRIVE_DB_102" }
        ]
      }
    ]
  },
  {
    id: "course-mcse-01",
    title: "MCSE 2025 - Microsoft Certified Systems Engineer",
    slug: "mcse-2025-systems-engineer",
    category: "networking",
    categoryLabel: "Systems Engineering",
    level: "Intermediate",
    duration: "2 Months",
    lecturesCount: 36,
    instructor: {
      name: "Engr. Shafiq Ur Rehman & Certified Trainers",
      title: "Senior Systems Engineer",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.94,
      studentsCount: 1550,
      bio: "Microsoft Certified Enterprise Administrator specializing in Windows Server, Active Directory, and hybrid cloud infrastructures."
    },
    price: 22000,
    discountPrice: 16000,
    isFree: false,
    badge: "Career Track",
    rating: 4.94,
    reviewsCount: 210,
    driveFolderId: "DRIVE_MCSE_2025_SYSTEMS",
    driveFolderName: "iSOFT - MCSE 2025 Career Training [Google Drive Hub]",
    thumbnail: "assets/images/packages/mcse-training.png",
    posterImage: "assets/images/packages/mcse-training.png",
    classTiming: "6:30 PM to 7:30 PM",
    learningMode: "On-Site (Peshawar)",
    shortDesc: "Build your career with MCSE Certification. Enterprise Windows Server management, Active Directory, virtualization, and networking services.",
    longDesc: "Become a qualified Systems Administrator. Master Windows Server 2025 architecture, Active Directory domain controllers, Group Policy Objects (GPOs), DHCP, DNS, IPAM, Hyper-V virtualization, and storage management on real lab servers.",
    learningObjectives: [
      "Install, configure, and maintain Windows Server 2025 environments",
      "Deploy and manage Active Directory Domain Services (AD DS)",
      "Enforce organization-wide Group Policies and endpoint security",
      "Configure DHCP failover, DNS forwarding, and network routing",
      "Implement Hyper-V virtual machines and virtual switch fabrics"
    ],
    requirements: [
      "Basic computer and networking literacy",
      "Physical attendance at Peshawar training center"
    ],
    modules: [
      {
        id: "mod-mcse-1",
        title: "Module 1: Server Deployment & Active Directory",
        lessons: [
          { id: "les-mcse-101", title: "Windows Server 2025 Setup & Domain Controller Role", duration: "45m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
          { id: "les-mcse-102", title: "Active Directory Users, OUs & Group Policy Objects", duration: "55m", isPreview: false, driveFileId: "DRIVE_MCSE_102" }
        ]
      }
    ]
  },
  {
    id: "course-net-diploma",
    title: "Networking Master Package (CCNA + MCSE + CCNP)",
    slug: "networking-master-package-ccna-mcse-ccnp",
    category: "networking",
    categoryLabel: "Networking",
    level: "All Levels",
    duration: "6 Months",
    lecturesCount: 90,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Master Network & Systems Architect",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.99,
      studentsCount: 2800,
      bio: "Chief trainer with extensive international credentials in Cisco and Microsoft enterprise certifications."
    },
    price: 45000,
    discountPrice: 30000,
    isFree: false,
    badge: "6-Month Diploma",
    rating: 4.99,
    reviewsCount: 520,
    driveFolderId: "DRIVE_NETWORKING_MASTER_DIPLOMA",
    driveFolderName: "iSOFT - Networking Master Diploma Archive [Google Drive]",
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Evening Batches Available",
    learningMode: "On-Site & Online",
    shortDesc: "The ultimate IT infrastructure diploma: Combines Cisco CCNA, Microsoft MCSE Server Engineering, and Cisco CCNP Advanced Routing.",
    longDesc: "A comprehensive 6-month professional diploma that transforms beginners into top-tier enterprise network engineers and systems administrators. Covers Cisco switches, routers, firewalls, Windows Server Active Directory, cloud hybrid networks, and CCNP enterprise routing.",
    learningObjectives: [
      "Master Cisco CCNA routing, switching, and wireless architectures",
      "Deploy full Microsoft MCSE enterprise server infrastructures",
      "Master Cisco CCNP Enterprise routing protocols (BGP, EIGRP, OSPF)",
      "Gain extensive physical equipment lab experience in Peshawar",
      "Prepare for international IT certification exams and jobs"
    ],
    requirements: [
      "Basic computer literacy",
      "Motivation for a lucrative career in IT infrastructure"
    ],
    modules: [
      {
        id: "mod-nd-1",
        title: "Module 1: Cisco CCNA Complete",
        lessons: [
          { id: "les-nd-101", title: "Cisco Infrastructure & Routing Protocols", duration: "60m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
        ]
      }
    ]
  },
  {
    id: "course-web-01",
    title: "Full Stack Web Development (MERN + React)",
    slug: "full-stack-web-development-mern-react",
    category: "programming",
    categoryLabel: "Web Development",
    level: "Beginner to Professional",
    duration: "6 Months",
    lecturesCount: 60,
    instructor: {
      name: "Shafqat Ullah & Full Stack Team",
      title: "Senior Full Stack Architect",
      avatar: "assets/images/shafqat-ullah.jpg",
      rating: 4.91,
      studentsCount: 2600,
      bio: "3+ years scaling React, Node.js, and modern full stack web applications."
    },
    price: 8000,
    discountPrice: 4000,
    isFree: false,
    badge: "Rs. 4,000 / Month",
    rating: 4.91,
    reviewsCount: 412,
    driveFolderId: "3cDeFgHiJkLmNoPqRs_MERN_NEXT_2026",
    driveFolderName: "iSOFT - Full Stack Web Development Google Drive Hub",
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Morning & Evening Options",
    learningMode: "Online & On-Site",
    shortDesc: "(HTML • CSS • Bootstrap) + (JavaScript + TypeScript + React) + (Tailwind CSS • Firebase • MongoDB). Only Rs. 4,000/month.",
    longDesc: "Become a job-ready modern web developer. Master responsive frontend with HTML5, CSS3, Bootstrap, and Tailwind CSS. Level up to JavaScript ES6+, TypeScript, and modern React 19. Build secure backends with Node.js, Express, MongoDB, and Firebase cloud hosting.",
    learningObjectives: [
      "Master modern responsive UI design with Tailwind CSS and Bootstrap",
      "Deep dive into JavaScript ES6+, async/await, and TypeScript",
      "Build single-page web applications with React 19 and hooks",
      "Design REST APIs with Node.js, Express, and MongoDB aggregation",
      "Deploy live client-ready full stack web applications"
    ],
    requirements: [
      "A laptop with at least 8GB RAM",
      "No coding background required"
    ],
    modules: [
      {
        id: "mod-web-1",
        title: "Module 1: Modern Frontend Engineering",
        lessons: [
          { id: "les-web-101", title: "HTML5 Semantic Standards & Modern Layout Architecture", duration: "35m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc" }
        ]
      }
    ]
  },
  {
    id: "course-analytics-01",
    title: "Data Analytics Masterclass",
    slug: "data-analytics-power-bi-tableau-sql",
    category: "datascience",
    categoryLabel: "Data Analytics",
    level: "All Levels",
    duration: "2 Months",
    lecturesCount: 30,
    instructor: {
      name: "Business Intelligence Team",
      title: "Senior BI Consultant",
      avatar: "assets/images/instructors/ayesha.jpg",
      rating: 4.89,
      studentsCount: 1350,
      bio: "Specializing in business intelligence dashboards, Power BI DAX modeling, and financial reporting."
    },
    price: 15000,
    discountPrice: 9000,
    isFree: false,
    badge: "In Demand",
    rating: 4.89,
    reviewsCount: 195,
    driveFolderId: "DRIVE_DATA_ANALYTICS_2026",
    driveFolderName: "iSOFT - Data Analytics & Power BI Drive Repo",
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Evening Batches",
    learningMode: "Online & On-Site",
    shortDesc: "Microsoft Excel • Power BI • Tableau • SQL • Python. Turn raw data into actionable dashboards and business insights.",
    longDesc: "Data analysts are sought after by banks, retail companies, and consulting firms worldwide. Master advanced Excel formulas, Power Query, Power BI interactive reports with DAX calculations, Tableau visual storytelling, SQL database extraction, and basic Python data analysis.",
    learningObjectives: [
      "Master advanced Microsoft Excel (XLOOKUP, Pivot Tables, Power Query)",
      "Build executive-level Power BI dashboards with DAX measures",
      "Create compelling visual stories and geospatial charts in Tableau",
      "Extract and transform relational business data with SQL",
      "Deliver automated reports and KPI trackers"
    ],
    requirements: [
      "Computer with Windows OS",
      "Familiarity with basic computer usage"
    ],
    modules: [
      {
        id: "mod-da-1",
        title: "Module 1: Excel & Power BI Mastery",
        lessons: [
          { id: "les-da-101", title: "Data Cleaning with Power Query & Data Modeling", duration: "45m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/ua-CiDNNj30" }
        ]
      }
    ]
  },
  {
    id: "course-ai-everyone",
    title: "Artificial Intelligence for Everyone",
    slug: "artificial-intelligence-for-everyone",
    category: "datascience",
    categoryLabel: "Artificial Intelligence",
    level: "All Levels",
    duration: "2 Months",
    lecturesCount: 28,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior AI Researcher",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.96,
      studentsCount: 1800,
      bio: "Advising businesses on generative AI adoption, prompt engineering, and automated agent workflows."
    },
    price: 14000,
    discountPrice: 8000,
    isFree: false,
    badge: "Future Ready",
    rating: 4.96,
    reviewsCount: 240,
    driveFolderId: "DRIVE_AI_FOR_EVERYONE_2026",
    driveFolderName: "iSOFT - Artificial Intelligence for Everyone [Drive]",
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Flexible Evening Batches",
    learningMode: "Online & On-Site",
    shortDesc: "Python • AI tools • AI techniques. Learn how to leverage modern AI tools, prompt engineering, and intelligent automation.",
    longDesc: "Demystify Artificial Intelligence and discover how to supercharge your career. Covers modern AI fundamentals, Python for AI, advanced prompting for ChatGPT and Claude, AI graphic tools, automated research assistants, and integrating AI into daily business operations.",
    learningObjectives: [
      "Understand AI, Machine Learning, and Generative LLM architectures",
      "Master prompt engineering frameworks and custom instructions",
      "Automate daily workflows using AI APIs and autonomous assistants",
      "Create AI-driven content, graphics, and code solutions",
      "Build practical AI-enhanced micro applications"
    ],
    requirements: [
      "Any laptop or smartphone with internet connection",
      "Curiosity about artificial intelligence"
    ],
    modules: [
      {
        id: "mod-aie-1",
        title: "Module 1: AI Essentials & Prompt Engineering",
        lessons: [
          { id: "les-aie-101", title: "Modern AI Landscape & Hands-On Prompt Protocols", duration: "40m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/2eWuYf-aZE4" }
        ]
      }
    ]
  },
  {
    id: "course-it-support",
    title: "IT Support & Office Automation",
    slug: "it-support-office-automation",
    category: "networking",
    categoryLabel: "IT Support",
    level: "Beginner",
    duration: "1 Month",
    lecturesCount: 20,
    instructor: {
      name: "iSOFT Technical Support Team",
      title: "Senior IT Support Specialist",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.9,
      studentsCount: 2100,
      bio: "Specializing in office automation, computer maintenance, and desktop support engineering."
    },
    price: 10000,
    discountPrice: 6000,
    isFree: false,
    badge: "Quick Job Starter",
    rating: 4.9,
    reviewsCount: 310,
    driveFolderId: "DRIVE_IT_SUPPORT_OFFICE_2026",
    driveFolderName: "iSOFT - IT Support & Office Automation [Drive Hub]",
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Morning & Evening Options",
    learningMode: "On-Site (Peshawar)",
    shortDesc: "MS Office • Office documentation, Windows administration, computer hardware assembly, and troubleshooting.",
    longDesc: "The quickest pathway to office and administrative IT employment. Master Microsoft Word document formatting, Microsoft Excel data entry and calculations, PowerPoint presentations, Windows OS installation, printer sharing, and hardware troubleshooting.",
    learningObjectives: [
      "Attain complete proficiency in Microsoft Office 365",
      "Learn Windows 10/11 operating system configuration and repair",
      "Assemble, maintain, and troubleshoot PC hardware components",
      "Setup local office networking, Wi-Fi, and printer sharing",
      "Prepare professional documentation and office spreadsheets"
    ],
    requirements: [
      "No prerequisite required"
    ],
    modules: [
      {
        id: "mod-it-1",
        title: "Module 1: Office Suite & Hardware Maintenance",
        lessons: [
          { id: "les-it-101", title: "MS Office Masterclass & PC Diagnostics", duration: "45m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
        ]
      }
    ]
  },
  {
    id: "course-se-track",
    title: "Software Engineering & Enterprise Database Track",
    slug: "software-engineering-enterprise-track",
    category: "database",
    categoryLabel: "Software Engineering",
    level: "Intermediate to Pro",
    duration: "2 Months",
    lecturesCount: 35,
    instructor: {
      name: "Engr. Shafiq Ur Rehman",
      title: "Senior Enterprise Architect",
      avatar: "assets/images/instructors/shafiq.jpg",
      rating: 4.98,
      studentsCount: 1250,
      bio: "Decades of architectural leadership deploying multi-tier enterprise solutions using Oracle APEX, .NET, and Python."
    },
    price: 24000,
    discountPrice: 16000,
    isFree: false,
    badge: "Enterprise Pro",
    rating: 4.98,
    reviewsCount: 230,
    driveFolderId: "DRIVE_SOFTWARE_ENG_ENTERPRISE",
    driveFolderName: "iSOFT - Software Engineering & Enterprise DB Hub",
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Evening Batches",
    learningMode: "On-Site & Online",
    shortDesc: "(SQL + PL/SQL + Oracle APEX) (Dot.NET • SQL Server) (Python & MySQL). Complete enterprise software engineering.",
    longDesc: "Equip yourself with the tools used by big enterprises, banks, and software houses. Covers Oracle APEX rapid database application development, .NET / C# enterprise backend connected to SQL Server, and Python data backends with MySQL.",
    learningObjectives: [
      "Master SQL, PL/SQL stored procedures, and triggers",
      "Build web applications with Oracle APEX rapid framework",
      "Develop .NET enterprise desktop/web applications with SQL Server",
      "Build Python applications integrated with relational databases",
      "Implement multi-tier software engineering architectures"
    ],
    requirements: [
      "Basic programming and database understanding"
    ],
    modules: [
      {
        id: "mod-se-1",
        title: "Module 1: Oracle APEX & .NET Enterprise",
        lessons: [
          { id: "les-se-101", title: "Enterprise Architecture & PL/SQL Stored Packages", duration: "50m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc" }
        ]
      }
    ]
  },
  {
    id: "course-py-01",
    title: "Mastering Python: From Zero to Industry Pro",
    slug: "python-programming-mastery",
    category: "programming",
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
    thumbnail: "assets/images/packages/cplusplus-python.png",
    posterImage: "assets/images/packages/cplusplus-python.png",
    classTiming: "Evening Batches",
    learningMode: "Online & On-Site",
    shortDesc: "Complete hands-on Python curriculum covering syntax, OOP, automation scripts, APIs, data manipulation, and 8 real-world industry capstones.",
    longDesc: "This flagship Python training program is tailored for ambitious students and working professionals aiming to master modern software development. Paid lectures are distributed through verified, dedicated Google Drive folder storage with 4K resolution.",
    learningObjectives: [
      "Master core Python syntax, data structures, and algorithmic problem-solving",
      "Implement robust Object-Oriented Programming (OOP) design patterns",
      "Build automated web scrapers using BeautifulSoup and Playwright",
      "Develop asynchronous microservices and RESTful APIs using FastAPI"
    ],
    requirements: [
      "Any laptop or desktop PC",
      "Active Gmail account for Google Drive permissions"
    ],
    modules: [
      {
        id: "mod-py-1",
        title: "Module 1: Foundations & Pythonic Syntax",
        lessons: [
          { id: "les-py-101", title: "Course Introduction & Dev Environment Setup (VS Code)", duration: "24m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
        ]
      }
    ]
  },
  {
    id: "course-gd-01",
    title: "Professional Graphic Design & Brand Identity Mastery",
    slug: "graphic-design-brand-identity",
    category: "programming",
    categoryLabel: "Graphic Designing",
    level: "Beginner to Advanced",
    duration: "8 Weeks (40 Hours)",
    lecturesCount: 32,
    instructor: {
      name: "Mariam Zainab & Design Team",
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
    thumbnail: "assets/images/packages/courses-packages-poster.png",
    posterImage: "assets/images/packages/courses-packages-poster.png",
    classTiming: "Evening Batches",
    learningMode: "Online & On-Site",
    shortDesc: "Master Adobe Photoshop, Illustrator, Figma, typography rules, color theory, social media kits, and complete client branding projects.",
    longDesc: "Master the principles of visual communication and design software. Build compelling brand identities, vector logos, marketing collateral, and UI mockups in Adobe Illustrator, Photoshop, and Figma.",
    learningObjectives: [
      "Master vector illustration and logo design in Adobe Illustrator",
      "Advanced photo manipulation, retouching, and compositing in Photoshop",
      "Modern UI/UX prototyping and design systems in Figma"
    ],
    requirements: [
      "Laptop or PC with 8GB RAM minimum"
    ],
    modules: [
      {
        id: "mod-gd-1",
        title: "Module 1: Design Principles & Vector Mastery",
        lessons: [
          { id: "les-gd-101", title: "Design Theory: Contrast, Hierarchy, Balance & Color Psychology", duration: "32m", isPreview: true, previewVideoUrl: "https://www.youtube.com/embed/un50Bs4BvZ8" }
        ]
      }
    ]
  }
];

const PAYMENT_METHODS = [
  {
    id: "jazzcash",
    name: "JazzCash / EasyPaisa / Bank Transfer",
    badge: "Direct Account",
    accountTitle: "iSOFT IT Training & Software Solutions",
    accountNumber: "0333 6606262",
    instructions: "Transfer fee via JazzCash / EasyPaisa / Bank App to 0333 6606262. After payment, send the screenshot to our WhatsApp 0333 6606262 for instant confirmation."
  },
  {
    id: "onsite",
    name: "Cash Payment at Peshawar Campus",
    badge: "On-Site Admissions",
    accountTitle: "iSOFT Admissions Office",
    accountNumber: "Office 17, Jabir Flat, Abdra BRT Station",
    instructions: "Visit our campus at Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar to register in person and pay at the desk."
  }
];

const FAQS = [
  {
    question: "How do I register for any course or special package offer?",
    answer: "Simply click the 'Register Online' button or click 'Register Now' on any course poster. Fill out the quick registration form with your name, WhatsApp number, and selected course, then submit it directly via WhatsApp to 0333 6606262. Our coordinator will immediately confirm your seat and provide class batch details."
  },
  {
    question: "What is the official WhatsApp helpline number for iSOFT?",
    answer: "Our official primary WhatsApp and phone contact is 0333 6606262 (+92 333 6606262). You can also reach our secondary support line at 0313 9999749."
  },
  {
    question: "Where is the physical campus located in Peshawar?",
    answer: "Our physical training academy is located at: Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar. Both on-site and online learning modes are available."
  },
  {
    question: "Are course lectures provided on Google Drive?",
    answer: "Yes! Enrolled students receive dedicated, high-speed 4K Google Drive lecture folder access for self-paced review, downloadable code repositories, and hands-on practice files."
  },
  {
    question: "Will I receive an official certificate after completing my course?",
    answer: "Yes, every graduate receives an official verified certificate from iSOFT IT Training & Software Solutions, complete with a unique verifiable serial code on our website."
  }
];

const SAMPLE_CERTIFICATES = [
  {
    certId: "ISOFT-CERT-2026-001",
    studentName: "Muhammad Zeeshan",
    courseName: "Programming for Beginners: C++ & Python",
    issueDate: "October 15, 2026",
    grade: "Distinction (94%)",
    status: "Verified",
    instructor: "Engr. Shafiq Ur Rehman"
  },
  {
    certId: "ISOFT-CERT-2026-002",
    studentName: "Farhan Ali",
    courseName: "CCNA - Cisco Certified Network Associate",
    issueDate: "October 18, 2026",
    grade: "Excellent (89%)",
    status: "Verified",
    instructor: "Engr. Shafiq Ur Rehman"
  },
  {
    certId: "ISOFT-CERT-2026-003",
    studentName: "Usman Tariq",
    courseName: "Database Software Engineer & Administration",
    issueDate: "November 02, 2026",
    grade: "Distinction (92%)",
    status: "Verified",
    instructor: "Engr. Shafiq Ur Rehman"
  }
];


/**
 * ACADEMY FACULTY & LEADERSHIP TEAM (5 Teachers with CEO Sir Shafiq)
 */
const TEAM_MEMBERS = [
  {
    id: "team-shafiq",
    name: "Engr. Shafiq Ur Rehman",
    role: "CEO & Founder",
    designation: "Chief Executive Officer & Chief Enterprise Architect",
    avatar: "assets/images/instructors/shafiq.jpg",
    initials: "SR",
    isCeo: true,
    experience: "14+ Years Enterprise Leadership",
    rating: "4.99 ★",
    studentsCount: "5,000+",
    specializations: ["C++ Programming", "Python Architecture", "Cisco CCNA/CCNP", "Database Administration", "Systems Engineering"],
    bio: "Visionary founder of iSOFT IT Training & Software Solutions. Senior enterprise architect with 14+ years of industry experience empowering ambitious students and IT engineers with practical, job-ready skills.",
    contactWhatsapp: "03336606262"
  },
    {
    id: "team-shafqat",
    name: "Shafqat Ullah",
    role: "Lead Full Stack Instructor",
    designation: "Full Stack Developer (3+ Years Experience)",
    avatar: "assets/images/shafqat-ullah.jpg",
    initials: "SU",
    isCeo: false,
    experience: "3+ Years Full Stack Experience",
    rating: "4.95 ★",
    studentsCount: "1,800+",
    specializations: ["Full Stack Web Development", "MERN Stack (React, Node, Express)", "JavaScript & TypeScript", "Next.js & REST APIs", "Database & Cloud Architecture"],
    bio: "Full Stack Developer with 3+ years of professional industry experience building high-performance web applications, scalable cloud APIs, and modern responsive frontend interfaces. Mentors students through practical project-based web development at iSOFT.",
    contactWhatsapp: "03336606262"
  },
  {
    id: "team-ayesha",
    name: "Dr. Ayesha Tariq",
    role: "Principal AI & Data Science Lead",
    designation: "PhD in Computational Intelligence & Senior AI Consultant",
    avatar: "assets/images/instructors/ayesha.jpg",
    initials: "AT",
    isCeo: false,
    experience: "9+ Years Data Science & Research",
    rating: "4.95 ★",
    studentsCount: "2,200+",
    specializations: ["Python for Data Science", "Machine Learning", "Data Analytics & Power BI", "Deep Learning", "Generative AI"],
    bio: "Excellence in predictive data modeling and machine learning research. Trains professionals to transform complex business datasets into automated insights, visualizations, and production ML models.",
    contactWhatsapp: "03336606262"
  },
  {
    id: "team-tariq",
    name: "Muhammad Tariq",
    role: "Senior Networking & Infrastructure Lead",
    designation: "Cisco Certified Network Professional (CCNP) & MCSE",
    avatar: "assets/images/instructors/tariq.jpg",
    initials: "MT",
    isCeo: false,
    experience: "10+ Years Enterprise Networks",
    rating: "4.94 ★",
    studentsCount: "1,950+",
    specializations: ["Cisco CCNA (200-301)", "CCNP Routing & Switching", "Microsoft MCSE 2025", "Enterprise Network Security", "Hardware Lab Setup"],
    bio: "Network infrastructure veteran overseeing physical equipment and hardware labs at our Peshawar campus. Specializes in enterprise routing protocols, switch configurations, and network defense.",
    contactWhatsapp: "03336606262"
  },
  {
    id: "team-zeeshan",
    name: "Engr. Zeeshan Ahmad",
    role: "Lead Cyber Security & Database Specialist",
    designation: "Certified Ethical Hacker (CEH) & Senior Oracle DBA",
    avatar: "assets/images/instructors/zeeshan.jpg",
    initials: "ZA",
    isCeo: false,
    experience: "8+ Years InfoSec & Database Admin",
    rating: "4.96 ★",
    studentsCount: "1,600+",
    specializations: ["Cyber Security Concepts", "Ethical Hacking & Penetration Testing", "Oracle Database 19c", "Microsoft SQL Server", "Linux Server Admin"],
    bio: "Cybersecurity analyst and database administrator dedicated to training next-generation security engineers to safeguard digital networks and design fault-tolerant enterprise database systems.",
    contactWhatsapp: "03336606262"
  }
];
