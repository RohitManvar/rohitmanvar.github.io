import { Icons } from "@/components/icons";
import { HomeIcon, Link, NotebookIcon, SparklesIcon } from "lucide-react";

export const DATA = {
  name: "Rohit Manvar",
  initials: "HC",
  url: "https://rohitmanvar.github.io",
  location: "Vadodara",
  locationLink: "https://www.google.com/maps/place/vadodara",
  description:
    "A Data Explorer and passionate about AI/Data engineering & Development, Learning new technologies, crafted with care, and building projects with a mindful spirit.",
  summary:
    "",
  avatarUrl: "/me.jpg",

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
    // { href: "/showcase", icon: SparklesIcon, label: "Showcase" },
  ],
  contact: {
    email: "rohitmanvar.dev@gmail.com",
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
      Linktree: {
        name: "Linktree",
        url: "https://linktr.ee/RohitManvar",
        icon: Link,
        navbar: true,
      },

      email: {
        name: "Send Email",
        url: "mailto:rohitmanvar.dev@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  technicalExperience: [
    {
  company: "Faber Infinite",
  href: "https://faberinfinite.com/",
  badges: [],
  location: "Vadodara, India",
  title: "Software Engineer Intern (Data & Analytics Systems)",
  logoUrl: "/faber.jpg",
  start: "Jan 2026",
  end: "Present",
  bullets: [
    "Developing a Value Stream Mapping (VSM) Automation Tool to digitize Lean workflows and reduce manual effort.",
    "Designed and implemented PostgreSQL schemas and FastAPI-based backend APIs for analytics and reporting.",
    "Developed data processing and analytics logic to compute production metrics and enable real-time insights.",
    "Owned the end-to-end system including requirements, development, testing, and deployment of the application."
  ],
},
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
      logoUrl: "/logo.png",
      start: "2021",
      end: "2024",
    }
  ],
  projects: [
    {
  title: "PopcornS — Movie Recommendation",
  href: "https://github.com/RohitManvar/Movie-Recommender-System",
  dates: "",
  active: true,
  description:
    "A full-stack movie discovery app with content-based ML recommendations across 4800+ films. Features a Trending section, YouTube trailers, personal watchlist, genre filters, skeleton loading, toast notifications, and a fully responsive UI.",
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "Scikit-learn",
    "React Query",
    "OMDb API",
    "TMDB API",
  ],
  links: [
    {
      type: "Website",
      href: "https://movie-recommender-system-chi-plum.vercel.app/",
      icon: <Icons.globe className="size-3" />,
    },
    {
      type: "Source",
      href: "https://github.com/RohitManvar/Movie-Recommender-System",
      icon: <Icons.github className="size-3" />,
    },
  ],
  image: "",
  video: "",
}, {
      title: "Custom ELT Project",
      href: "",
      dates: "",
      active: true,
      description:
        "Custom ELT Project with Airflow and dbt is an end-to-end, containerized data engineering pipeline that automates the Extract, Load, and Transform (ELT) process using Docker, PostgreSQL, Apache Airflow, and dbt (Data Build Tool).",
      technologies: [
        "Python",
        "DBT",
        "Airflow",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Data Pipeline",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Custom-ELT-Project",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Online-Product-Recommendation",
      href: "https://online-product-recommendation.onrender.com/",
      dates: "",
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
          type: "DA/ML",
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
  title: "Vibe2Value",
  href: "",
  dates: "",
  active: true,
  description:
    "Hybrid creator search engine built for RoCathon that helps brands find the right influencers by combining semantic relevance with projected commercial performance (GMV). Uses local ONNX embeddings and pgvector HNSW indexing for fast, cost-free vector search with transparent scoring breakdowns.",
  technologies: [
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "pgvector",
    "Transformers.js",
    "Zod",
  ],
  links: [
    {
      type: "Source",
      href: "https://github.com/RohitManvar/Vibe2Value",
      icon: <Icons.github className="size-3" />,
    },
  ],
  image: "",
  video: "",
},
    {
      title: "Weatherly",
      href: "",
      dates: "",
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
          type: "JSP Application",
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
    {
      title: "BookNest",
      href: "https://drive.google.com/file/d/1YnKJn6uTOcQwPDmiJw1CnP1YSrEdlKIL/view?usp=drive_link",
      dates: "",
      active: true,
      description:
        "BookNest is an Android e-Book application built with Flutter and Firebase, designed to bring the experience of a personal library to your phone. It allows users to explore, read, and organize books, while providing a smooth and modern UI with Material Design.",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Supabase",
      ],
      links: [
        {
          type: "Flutter Application",
          href: "https://drive.google.com/file/d/19QJQ1gI8E0FNmOS9rRWkAVb1K7ZV_FDH/view?usp=drive_link",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/BookNestFlutter",
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
        {
          title: "The Power of Subconscious Mind",
          author: "Dr Joseph Murphy",
          number: 4,
        },
      ],
    },
    {
      theme: "Productivity / Skills / Social Skills",
      books: [
        {
          title: "The Art of Dealing with People",
          author: "Les Giblin",
          number: 5,
        },
      ],
    },
    {
      theme: "Motivation / Mindset",
      books: [
        {
          title: "Manifest",
          author: "Roxie Nafousi",
          number: 6,
        },
      ],
    },
    {
      theme: "Biography",
      books: [
        {
          title: "Biography of Abraham Lincoln",
          author: "Swami Sachchidanand",
          number: 7,
        },
      ],
    },
    {
      theme: "Fiction",
      books: [
        {
          title: "Kafan",
          author: "Premchand",
          number: 8,
        },
        {
          title: "Usne Kaha Tha",
          author: "Chandradhar Sharma Guleri",
          number: 9,
        },
      ],
    },
    {
      theme: "Novel",
      books: [
        {
          title: "An Inspector Calls (crime thriller)",
          author: "J. B. Priestley",
          number: 10,
        },
      ],
    },
  ],
} as const;
