import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, SparklesIcon } from "lucide-react";

export const DATA = {
  name: "Rohit Manvar",
  initials: "HC",
  url: "https://heilcheng.github.io",
  location: "Vadodara",
  locationLink: "https://www.google.com/maps/place/vadodara",
  description:
    "A Data Explorer and passionate about Application Development, learning new technologies, crafted with care, and building projects with a mindful spirit.",
  summary:
    "I was born and raised in Junagadh. I’ve always been curious about how things work, and early on, I loved exploring the mysteries of life and developing a sense of spiritual awareness.- I am exerting myself to escape the same mind that traps me.\n Back when I worked as an HR Assistant, I often faced issues with salary processing, ERP software, and attendance systems. One day, I watched how a professional solved those problems with technology, and it left a lasting impression—I realized I wanted to understand and build such solutions myself.\nThat moment pushed me to pursue a Bachelor’s in Computer Applications at Atmiya University, Rajkot, where I explored programming, theory, and built projects that gave me a strong technical foundation. Today, as a Master’s student at The Maharaja Sayajirao University of Baroda, I’m continuing that journey by developing applications such as a movie recommender, BookNest (an Android Virtual Library app), a Flutter-based startup idea evaluator (Nous), and backend services like AuthService with FastAPI, JWT, and Redis.\nAlong the way, I found two passions: Android application development and Data Engineering.With Android, I enjoy building apps like BookNest that bring ideas to life for users. And with Data Engineering, I dive into the world of pipelines, scalable systems, and insights hidden in data — the perfect bridge between problem-solving and creating real impact..",
  avatarUrl: "/me.jpg",

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
    // { href: "/showcase", icon: SparklesIcon, label: "Showcase" },
  ],
  contact: {
    email: "rohitmanvar123@gmail.com",
    tel: "+91-9662787336",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/RohitManvar",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rohit-manvar-141261216/",
        icon: Icons.linkedin,
        navbar: true,
      },

      email: {
        name: "Send Email",
        url: "mailto:rohitmanvar123@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  technicalExperience: [
    {
      company: "Plasmid",
      href: "https://plasmid.co.in/",
      badges: [],
      location: "Remote",
      title: "Data Science Intern",
      logoUrl: "/plasmid.jpg",
      start: "Nov 2024",
      end: "May 2025",
      bullets: [
        "Location: Remote",
        "Analyze and Interpret complex datasets.",
        "Developing data processing pipelines and statistical models to extract meaningful insights from raw data."
      ],
    },
    {
      company: "GM EXPORTS",
      href: "",
      badges: [],
      location: "Rajkot",
      title: "Human Resources Assistant",
      logoUrl: "/gm2.png",
      start: "Sep 2020",
      end: "Jul 2021",
      bullets: [
        "Location: Rajkot",
        "Managed HR operations including recruitment, employee relations, and administrative tasks.",
        "Streamlined HR processes and maintained employee records Assisted in organizing company events and training sessions."
      ],
    },
  ],
  education: [
    {
      school: "The Maharaja Sayajirao University of Baroda",
      href: "https://msubaroda.ac.in/",
      degree: "Master of Computer Applications",
      logoUrl: "/msu.jpg",
      start: "2024",
      end: "2026",
    },
    {
      school: "Atmiya Institute of Technology & Science, Rajkot",
      href: "https://atmiyauni.ac.in/",
      degree: "Bachelor of Computer Applications",
      logoUrl: "/Atmiya.png",
      start: "2021",
      end: "2024",
    }
  ],
  projects: [
    {
      title: "BookNest",
      href: "",
      dates: "2025 - Present",
      active: true,
      description:
        "BookNest is an Android e-library application built with Java and Firebase, designed to bring the experience of a personal library to your phone. It allows users to explore, read, and organize books, while providing a smooth and modern UI with Material Design.",
      technologies: [
        "Android",
        "Firebase",
      ],
      links: [
        {
          type: "Application",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/BookNest",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Nous",
      href: "https://drive.google.com/file/d/1YnKJn6uTOcQwPDmiJw1CnP1YSrEdlKIL/view?usp=drive_link",
      dates: "2025 - Aug",
      active: true,
      description:
        "Nous is a creative Flutter app to submit, vote, and rank startup ideas. Track top ideas on a dynamic leaderboard with AI ratings, dark/light themes and offline storage using SharedPreferences.",
      technologies: [
        "Flutter",
        "Dart",
        "Animations",
        "Packages",
      ],
      links: [
        {
          type: "Application",
          href: "https://drive.google.com/file/d/1YnKJn6uTOcQwPDmiJw1CnP1YSrEdlKIL/view",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Nous",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Online-Product-Recommendation",
      href: "https://online-product-recommendation.onrender.com/",
      dates: "2025 - March",
      active: true,
      description:
        "Application that recommends products to users based on their preferences and historical behavior. Built using Python and Streamlit, the app leverages machine learning models for content-based and collaborative filtering recommendations.",
      technologies: [
        "Python",
        "Numpy",
        "Pandas",
        "Scikit-learn",
        "Streamlit",
      ],
      links: [
        {
          type: "Website",
          href: "https://online-product-recommendation.onrender.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Online-Product-Recommendation",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Weatherly",
      href: "",
      dates: "2024 - April",
      active: true,
      description:
        "Dynamic web application that fetches and displays live weather information using external API integration. Users can search for any city to view real-time weather data, including temperature, humidity, wind speed, and overall weather conditions.",
      technologies: [
        "JSP",
        "Servlet",
        "JavaScript",
        "JAVA",
        "API integration",
        "NetBeans",
      ],
      links: [
        {
          type: "Website",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Weatherly",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  books: [
    {
      theme: "Self-Improvement / Personal Growth",
      books: [
        {
          title: "The Alchemist",
          author: "Paulo Coelho",
          number: 1,
        },
        {
          title: "Ikigai",
          author: "Francesc Miralles and Hector Garcia",
          number: 2,
        },
        {
          title: "The Art of Being Alone",
          author: "Renuka Gavrani",
          number: 3,
        },
      ],
    },
    {
      theme: "Productivity / Skills / Social Skills",
      books: [
        {
          title: "The Art of Dealing with People",
          author: "Les Giblin",
          number: 4,
        },
      ],
    },
    {
      theme: "Motivation / Mindset",
      books: [
        {
          title: "Manifest",
          author: "Roxie Nafousi",
          number: 7,
        },
      ],
    },
    {
      theme: "History & Biography",
      books: [
        {
          title: "Indian Hestory",
          author: "Sanjay Paghdal",
          number: 5,
        },
        {
          title: "Biography of Abraham Lincoln",
          author: "Swami Sachchidanand",
          number: 6,
        },
      ],
    },
  ],
} as const;
