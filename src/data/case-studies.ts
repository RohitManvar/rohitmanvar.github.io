export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  liveUrl?: string;
  repoUrl: string;
  role: string;
  timeline: string;
  overview: string;
  challenge: string;
  solution: string;
  architecture: { name: string; detail: string }[];
  outcomes: string[];
  learnings: string[];
  technologies: string[];
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "enlyghten",
    title: "Enlyghten",
    category: "Data Engineering",
    summary: "A searchable data pipeline for exploring 300+ philosophers across 25+ categories.",
    image: "/enlyghten.png",
    liveUrl: "https://philo-data-pipeline.vercel.app/",
    repoUrl: "https://github.com/RohitManvar/Philo-data-pipeline",
    role: "Full-stack data engineer",
    timeline: "Personal project",
    overview:
      "Enlyghten turns a large collection of semi-structured Wikipedia pages into a clean, searchable knowledge product. The project combines scheduled scraping, an API, a relational database, and a Next.js interface so the dataset can be explored instead of sitting as disconnected raw pages.",
    challenge:
      "The source material was inconsistent and changed over time. The pipeline needed to collect data repeatedly, preserve a useful structure, and expose it through a UI that made filtering and discovery fast for a human reader.",
    solution:
      "I separated ingestion from presentation. A Python scraper collects and normalizes philosopher data, FastAPI exposes a typed service layer, PostgreSQL stores the structured records, and the Next.js frontend provides browsing and filtering. GitHub Actions re-runs the scraper every two days so the project stays maintainable after the first import.",
    architecture: [
      { name: "Ingestion", detail: "Python scraping and normalization for 300+ philosopher records from Wikipedia." },
      { name: "API layer", detail: "FastAPI endpoints provide filtered, structured access to the dataset." },
      { name: "Storage", detail: "PostgreSQL keeps the normalized records queryable and easy to extend." },
      { name: "Delivery", detail: "A Next.js interface supports browsing and category-based discovery." },
      { name: "Automation", detail: "GitHub Actions schedules a fresh scrape every two days." },
    ],
    outcomes: [
      "Structured data on 300+ philosophers across 25+ categories.",
      "Created a repeatable pipeline instead of a one-time data import.",
      "Delivered both a public API-backed experience and a searchable frontend.",
    ],
    learnings: [
      "Data quality and normalization decisions matter as much as the scraping code.",
      "Separating ingestion, storage, and presentation makes scheduled refreshes easier to reason about.",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Docker", "GitHub Actions"],
  },
  {
    slug: "popcorns",
    title: "PopcornS",
    category: "Web and Machine Learning",
    summary: "A movie discovery product that combines content-based recommendations with a practical watchlist workflow.",
    image: "/popcorns.png",
    liveUrl: "https://movie-recommender-system-chi-plum.vercel.app/",
    repoUrl: "https://github.com/RohitManvar/Movie-Recommender-System",
    role: "Machine learning and full-stack developer",
    timeline: "Personal project",
    overview:
      "PopcornS makes movie recommendations useful in a real browsing session. Instead of stopping at a model prediction, it combines recommendations with trending titles, trailers, genre filters, and a personal watchlist.",
    challenge:
      "A recommendation model is only valuable when the surrounding product helps people act on the result. The project needed to make similarity understandable, keep search responsive, and connect model output to live movie information without making the interface feel like a demo notebook.",
    solution:
      "I built a content-based recommendation model over a dataset of 4,800+ films and served it through FastAPI. The Next.js client handles search and browsing, React Query manages server state, and external movie APIs add current metadata, trailers, and trending content around the model output.",
    architecture: [
      { name: "Recommendation engine", detail: "A Python and scikit-learn content-based model ranks similar films." },
      { name: "Backend", detail: "FastAPI serves recommendation requests and keeps model logic behind a clean API." },
      { name: "Frontend", detail: "Next.js and TypeScript provide search, filters, trending titles, and watchlist interactions." },
      { name: "External data", detail: "TMDB and OMDb enrich recommendations with posters, metadata, and trailers." },
      { name: "Client state", detail: "React Query keeps asynchronous search and recommendation data predictable." },
    ],
    outcomes: [
      "Recommendations are generated across a catalog of 4,800+ films.",
      "Combined a machine learning model with a complete discovery workflow.",
      "Added practical product features including trailers, genres, trending content, and watchlists.",
    ],
    learnings: [
      "Model quality is only one part of a recommendation product; discovery context affects usefulness.",
      "Clear API boundaries make it easier to evolve the model without rewriting the interface.",
    ],
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "Scikit-learn", "React Query", "TMDB API", "OMDb API"],
  },
  {
    slug: "vibe2value",
    title: "Vibe2Value",
    category: "Search and AI",
    summary: "An influencer search engine that ranks creators by semantic fit and estimated commercial value.",
    image: "/vibe2value.png",
    liveUrl: "https://vibe2-value-rho.vercel.app/",
    repoUrl: "https://github.com/RohitManvar/Vibe2Value",
    role: "Full-stack AI engineer",
    timeline: "RoCathon project",
    overview:
      "Vibe2Value helps brands search for creators using the language they naturally use when describing a campaign. It turns a subjective brief into ranked results by combining semantic similarity with estimated sales potential.",
    challenge:
      "Keyword search is a poor fit for creative briefs. A brand may describe a creator as calm, minimal, technical, or energetic without using the exact words stored in a creator profile. The ranking also needs to consider business value, not only language similarity.",
    solution:
      "I built a local embedding and vector-search pipeline so the product could understand meaning without depending on paid external AI APIs. Express and Node.js provide the service layer, PostgreSQL with pgvector stores embeddings, and Zod validates data at the application boundary.",
    architecture: [
      { name: "Semantic representation", detail: "Transformers.js generates local embeddings for creator profiles and search briefs." },
      { name: "Vector search", detail: "PostgreSQL and pgvector retrieve creators with similar meaning, not only matching keywords." },
      { name: "Ranking", detail: "Semantic relevance is combined with estimated sales potential for business-oriented results." },
      { name: "API", detail: "Node.js and Express expose the search workflow to the frontend." },
      { name: "Validation", detail: "Zod keeps request and response data explicit at the system boundary." },
    ],
    outcomes: [
      "Made natural-language creator discovery possible without paid external AI APIs.",
      "Combined semantic relevance with a commercial ranking signal.",
      "Built a complete search product suitable for a hackathon demonstration and further iteration.",
    ],
    learnings: [
      "Local models can be a practical choice when cost, privacy, or deployment control matters.",
      "Search ranking should reflect the user's real decision, not just the similarity score.",
    ],
    technologies: ["TypeScript", "Node.js", "Express", "PostgreSQL", "pgvector", "Transformers.js", "Zod"],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
