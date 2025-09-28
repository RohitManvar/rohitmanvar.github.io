"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Grid3X3, ArrowLeft } from "lucide-react";

interface TechStackProps {
  delay?: number;
}

interface TechItem {
  name: string;
  logo: string;
}

interface TechCategory {
  category: string;
  subcategories?: {
    name: string;
    items: TechItem[];
  }[];
  items?: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    category: "Core & Computational Tools",
    subcategories: [
      {
        name: "Languages & Environments",
        items: [
          { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
          { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
          { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
          { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
          { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        ]
      },
      {
        name: "Data tools",
        items: [
          { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
          { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
          { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
          { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
          { name: "Streamlit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
        ]
      }
    ]
  },
  {
    category: "Application Development",
    subcategories: [
      {
        name: "",
        items: [
          { name: "Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
          { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        ]
      }
    ]
  },
  {
    category: "Web Development",
    subcategories: [
      {
        name: "",
        items: [
          { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        ]
      },
    ]
  },
  {
    "category": "Frameworks & Backend",
    "items": [
      { "name": ".NET", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
      { "name": "Flask", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { "name": "JSP", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { "name": "FastAPI", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { "name": "MySQL", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { "name": "Firebase", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ]
  },
  {
    "category": "DevOps & Cloud Platforms",
    "items": [
      { "name": "Git", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { "name": "GitHub", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { "name": "Redis", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { "name": "AWS", "logo": "https://img.icons8.com/?size=100&id=33039&format=png&color=000000" },
      { "name": "Google Cloud (GCP)", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    ]
  }
];

// Flatten all items for the scrolling marquee
const allTechItems: TechItem[] = techCategories.flatMap(category =>
  category.subcategories
    ? category.subcategories.flatMap(sub => sub.items)
    : category.items || []
);

const TechItem = ({ tech, showName = false }: { tech: TechItem; showName?: boolean }) => {
  return (
    <div className={`flex ${showName ? 'flex-col' : ''} items-center justify-center ${showName ? 'p-4' : 'mx-6'} group`}>
      <div className={`relative ${showName ? 'w-16 h-16' : 'w-12 h-12'} transition-all duration-300 group-hover:scale-110 opacity-70 hover:opacity-100`}>
        <Image
          src={tech.logo}
          alt={`${tech.name} logo`}
          fill
          className="object-contain filter transition-all duration-300"
          unoptimized
        />
      </div>
      {showName && (
        <span className="text-xs font-medium text-muted-foreground text-center mt-2 whitespace-nowrap">
          {tech.name}
        </span>
      )}
    </div>
  );
};

export const TechStack = ({ delay = 0 }: TechStackProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
      },
    },
  };

  // Duplicate the tech stack for seamless infinite scroll
  const duplicatedTechStack = [...allTechItems, ...allTechItems];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-content-md"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Tech Stack.
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Technologies and tools I work with to build innovative solutions.
          </p>
        </div>
      </div>

      {!showAll ? (
        <>
          {/* Elegant scrolling logos */}
          <div className="relative w-full overflow-hidden py-8">
            {/* Subtle gradient overlays */}
            <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background via-background/80 to-transparent" />

            {/* Floating logos */}
            <motion.div
              className="flex items-center"
              animate={{
                x: [0, -50 + "%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTechStack.map((tech, index) => (
                <TechItem key={`${tech.name}-${index}`} tech={tech} />
              ))}
            </motion.div>
          </div>

          {/* Icon-only Show All Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAll(true)}
              className="h-10 w-10"
              title="Show all technologies"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Organized category view */}
          <div className="max-w-6xl mx-auto py-8 space-y-12">
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-center text-foreground">
                  {category.category}
                </h3>

                {category.subcategories ? (
                  <div className="space-y-8">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <div key={subcategory.name} className="space-y-4">
                        {subcategory.name && (
                          <h4 className="text-lg font-semibold text-muted-foreground text-center">
                            {subcategory.name}
                          </h4>
                        )}

                        <div className="flex justify-center">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                            {subcategory.items.map((tech, techIndex) => (
                              <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: (categoryIndex * 0.1) + (subIndex * 0.05) + (techIndex * 0.03)
                                }}
                              >
                                <TechItem tech={tech} showName={true} />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                      {category.items?.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (techIndex * 0.03) }}
                        >
                          <TechItem tech={tech} showName={true} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>


          {/* Icon-only Back Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAll(false)}
              className="h-10 w-10"
              title="Back to scrolling view"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}; 