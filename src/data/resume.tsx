import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, SparklesIcon, BookOpenIcon } from "lucide-react";

export const DATA = {
  name: "Rohit Manvar",
  initials: "RM",
  url: "https://rohitmanvar.github.io",
  location: "Vadodara",
  locationLink: "https://www.google.com/maps/place/vadodara",
  description:
    "A Data Explorer and passionate about AI/Data Engineering & Development, Learning new technologies, crafted with care, and building projects with a mindful spirit.",
  summary:
    "",
  avatarUrl: "/me.jpg",

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/books", icon: BookOpenIcon, label: "Books" },
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
        icon: Icons.linktree,
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
        "Developed a Value Stream Mapping (VSM) Automation Tool, digitizing Lean workflows and reducing manual data entry effort by 40%.",
        "Designed and optimized PostgreSQL schemas and FastAPI-based backend APIs, improving report generation speed by 3x.",
        "Engineered data processing and analytics logic to compute production metrics, enabling real-time insights for 5+ departments.",
        "Owned the end-to-end system including requirements gathering, development, testing, and deployment to production."
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
        "Analyzed and interpreted complex datasets containing over 500,000 records to identify key business trends.",
        "Developed data processing pipelines and statistical models, accelerating data extraction and improving data accuracy by 25%.",
        "Collaborated remotely with cross-functional teams to deliver actionable insights that informed strategic decisions."
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
        "Managed HR operations including recruitment, employee relations, and administrative tasks.",
        "Streamlined HR processes and maintained employee records.",
        "Assisted in organizing company events and training sessions."
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
      title: "Enlyghten — Data Pipeline",
      href: "https://philo-data-pipeline.vercel.app/",
      dates: "",
      active: true,
      category: "Data Engineering",
      description:
        "Scraped and structured data on 300+ philosophers from Wikipedia — Ancient Greece to modern day — across 25+ categories. A FastAPI + PostgreSQL backend serves the data, a Next.js frontend lets you browse and filter, and a GitHub Actions workflow re-scrapes every two days to keep it fresh.",
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Next.js",
        "Docker",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Website",
          href: "https://philo-data-pipeline.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Philo-data-pipeline",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/enlyghten.png",
      video: "",
      color: "#ffffff",
    },
    {
      title: "PopcornS — Movie Recommendation",
      href: "https://github.com/RohitManvar/Movie-Recommender-System",
      dates: "",
      active: true,
      category: "Web & ML",
      description:
        "Search any movie and get instant content-based recommendations from 4,800+ films. Includes a Trending section, YouTube trailer previews, personal watchlist, and genre filters — all backed by a Python ML model served via FastAPI.",
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
      image: "/popcorns.png",
      video: "",
      color: "#ffffff",
    },
    {
      title: "Vibe2Value",
      href: "https://vibe2-value-rho.vercel.app/",
      dates: "",
      active: true,
      category: "Web & ML",
      description:
        "An influencer search engine built for RoCathon. Brands describe a creator vibe and get ranked results by both relevance and estimated sales potential. Powered by local AI embeddings and vector search — no external API costs.",
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
          type: "Website",
          href: "https://vibe2-value-rho.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Vibe2Value",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/vibe2value.png",
      video: "",
      color: "#ffffff",
    },
    {
      title: "Custom ELT Project",
      href: "https://github.com/RohitManvar/Custom-ELT-Project",
      dates: "",
      active: true,
      category: "Data Engineering",
      description:
        "A fully automated Extract, Load, Transform pipeline using Docker Compose. Spins up a source and destination PostgreSQL database, then migrates data between them using a Python script — zero manual steps after docker-compose up.",
      technologies: [
        "Python",
        "PostgreSQL",
        "Docker",
        "Docker Compose",
        "pg_dump",
        "psql",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/RohitManvar/Custom-ELT-Project",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/elt_pipeline.png",
      video: "",
      color: "#ffffff",
    },
    {
      title: "BookNest",
      href: "https://drive.google.com/file/d/1YnKJn6uTOcQwPDmiJw1CnP1YSrEdlKIL/view?usp=drive_link",
      dates: "",
      active: true,
      category: "Mobile",
      description:
        "A personal digital library app for Android. Browse, read, and organize e-books with a clean Material Design UI. Built with Flutter and Firebase for real-time sync and authentication.",
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
      image: "/booknest.jpg",
      video: "",
      color: "#ffffff",
      portrait: true,
    },
    {
      title: "Weatherly",
      href: "https://github.com/RohitManvar/Weatherly",
      dates: "",
      active: true,
      category: "Web",
      description:
        "Search any city and get live weather data — temperature, humidity, wind speed, and conditions — in real time. Built as a Java web app using JSP and Servlets with an external weather API.",
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
          type: "Source",
          href: "https://github.com/RohitManvar/Weatherly",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/weatherly.png",
      video: "",
      color: "#ffffff",
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
          cover: "https://covers.openlibrary.org/b/id/15121528-L.jpg",
          genre: "Self-Improvement",
          view: "Read this during a time when I kept second-guessing every decision. The line 'when you want something, all the universe conspires to help you achieve it' felt almost too on-the-nose. Still think about it.",
        },
        {
          title: "Ikigai",
          author: "Francesc Miralles and Hector Garcia",
          number: 2,
          cover: "https://covers.openlibrary.org/b/id/15147241-L.jpg",
          genre: "Self-Improvement",
          view: "I drew the four circles on paper while reading this. The overlap in the middle felt less like a concept and more like a challenge. Still working on it, honestly.",
        },
        {
          title: "The Art of Being Alone",
          author: "Renuka Gavrani",
          number: 3,
          cover: "https://covers.openlibrary.org/b/id/15052166-L.jpg",
          genre: "Self-Improvement",
          view: "I used to fill every quiet moment with noise. This book made me sit with the discomfort of silence instead of running from it. Took a while to actually get there.",
        },
        {
          title: "The Power of Subconscious Mind",
          author: "Dr Joseph Murphy",
          number: 4,
          cover: "https://covers.openlibrary.org/b/id/15146952-L.jpg",
          genre: "Self-Improvement",
          view: "Went in skeptical. Came out genuinely trying to catch my own self-doubt before it spirals. Whether it's psychology or something else — the reframing actually works.",
        },
        {
          title: "Manifest",
          author: "Roxie Nafousi",
          number: 5,
          cover: "https://covers.openlibrary.org/b/id/13162460-L.jpg",
          genre: "Self-Improvement",
          view: "The part about self-sabotage hit harder than expected. I kept putting big goals off because some part of me didn't believe I deserved them. This book called that out directly.",
        },
      ],
    },
    {
      theme: "Productivity / Skills / Social Skills",
      books: [
        {
          title: "The Art of Dealing with People",
          author: "Les Giblin",
          number: 6,
          cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebmDk62APYb7zRnGjj42LUzRbBcWFDpEWVouZNOvUyQb-m51sP3iPaocNBnFWa_kGFTizQn7fSkXMhDqpF2MmtLsndBSh5RJDaN9RrbdpZA&s=10",
          genre: "Productivity",
          view: "I'm naturally quiet in groups. This didn't teach me to fake being outgoing — it helped me understand what people actually need when they talk. Listening differently changed more than I expected.",
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
          cover: "https://covers.openlibrary.org/b/id/7117697-L.jpg",
          genre: "Biography",
          view: "Lost elections, lost friends, battled depression — and still kept going. I read this during a rough patch and felt embarrassed for wanting to give up so quickly.",
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
          cover: "https://covers.openlibrary.org/b/id/15126939-L.jpg",
          genre: "Fiction",
          view: "A father and son sit outside while a woman dies inside. They feel nothing. Premchand doesn't explain or judge — he just shows you. I finished it and sat quietly for a bit.",
        },
        {
          title: "Usne Kaha Tha",
          author: "Chandradhar Sharma Guleri",
          number: 9,
          cover: "data:image/jpeg;base64,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",
          genre: "Fiction",
          view: "A love story told almost entirely through restraint. The ending doesn't announce itself — it just lands. Read it twice in the same sitting without meaning to.",
        },
      ],
    },
    {
      theme: "Novel",
      books: [
        {
          title: "An Inspector Calls",
          author: "J. B. Priestley",
          number: 10,
          cover: "https://archive.org/download/bmshri.inspectorcalls0000jbpr/page/cover_w500_h500.jpg",
          genre: "Novel",
          view: "Each character finds a way to avoid responsibility. Reading it, I kept catching myself doing the same mental gymnastics they do. That was uncomfortable in a good way.",
        },
      ],
    },
  ],
} as const;
