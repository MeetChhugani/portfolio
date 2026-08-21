import type { ProjectDetail } from "@/components/ProjectCaseStudyModal";

export type EngineeringDomain = "backend" | "ai" | "ml" | "data" | "infra";
export type ProjectStatus = "Implemented" | "Designed" | "Planned" | "Experimental";

export interface PortfolioProject extends ProjectDetail {
  domain: EngineeringDomain;
  status: ProjectStatus | `${ProjectStatus} / ${ProjectStatus}`;
  rolePriority: { backendDev: number; dataScience: number };
}
export interface StackTechnology { name: string; what: string; why: string; usedIn: string[]; role: string; }
export interface StackDomain { id: EngineeringDomain; label: string; summary: string; technologies: StackTechnology[]; }

export const portfolioIdentity = {
  name: "Meet Chhugani",
  email: "meetchhugani81@gmail.com",
  github: "https://github.com/MeetChhugani",
  linkedin: "https://linkedin.com/in/meet-chhugani/",
  education: "B.Tech, Information Technology · Gyanmanjari Innovative University (Expected 2027)",
  positioning: "Machine Learning Engineer focused on NLP, Computer Vision, RAG document intelligence, and production-oriented ML workflows.",
} as const;

export const projects: PortfolioProject[] = [
  { 
    id: "attrition", 
    tag: "EXPLAINABLE ML & EXPERIMENTATION", 
    metric: "0.89 ROC-AUC | MLflow", 
    title: "Employee Risk Radar", 
    subtitle: "Python, Scikit-learn, XGBoost, PyTorch, MLflow, SHAP, Streamlit", 
    domain: "ml", 
    status: "Implemented", 
    rolePriority: { backendDev: 2, dataScience: 1 }, 
    problem: "HR teams need quantitative attrition predictions grounded in local feature importance and experiment tracking.", 
    solution: "An end-to-end ML workflow evaluating 1,470 samples across 30 variables using PyTorch, XGBoost, SMOTE threshold optimization (0.89 ROC-AUC), MLflow experiment tracking, and SHAP explainability.", 
    architectureFlow: ["1,470 Employee Samples", "SMOTE & Threshold Opt", "XGBoost & PyTorch", "MLflow Logging", "SHAP Feature Attribution", "Streamlit UI"], 
    challenges: ["Addressed severe class imbalance using SMOTE and threshold optimization to achieve 0.89 ROC-AUC.", "Tracked model hyperparams, metrics, and artifacts across experiments with MLflow.", "Applied SHAP-based local feature attribution across key predictor variables."], 
    metrics: [{ label: "MODEL ACCURACY", val: "0.89 ROC-AUC" }, { label: "TRACKING", val: "MLflow Experiments" }, { label: "STATUS", val: "Implemented" }], 
    stack: ["Python", "Scikit-learn", "XGBoost", "PyTorch", "MLflow", "SHAP", "Streamlit"], 
    githubUrl: "https://github.com/MeetChhugani",
    liveUrl: "https://employee-risk-radar-xexmbf3kfedcvxdrdgbnnh.streamlit.app"
  },
  { 
    id: "quizlab", 
    tag: "RAG · DOCUMENT INTELLIGENCE", 
    metric: "ChromaDB + Groq RAG", 
    title: "QuizLab Platform", 
    subtitle: "Python, Streamlit, RAG, ChromaDB, Sentence Transformers, Groq, NLP, OCR", 
    domain: "ai", 
    status: "Implemented", 
    rolePriority: { backendDev: 3, dataScience: 2 }, 
    problem: "Converting textbook PDFs into searchable vector knowledge and adaptive quizzes requires robust RAG architecture.", 
    solution: "A document-intelligence learning platform converting uploaded PDFs into vector knowledge using PyMuPDF text extraction, Sentence Transformer embeddings, ChromaDB, and a 3-state adaptive difficulty state machine executing in under 50ms.", 
    architectureFlow: ["PDF Ingestion & PyMuPDF", "Sentence Transformers", "ChromaDB Vector Store", "Context-Aware Retrieval", "Groq LLM Response", "Adaptive Flashcards UI"], 
    challenges: ["Implemented semantic and metadata-aware retrieval executing in under 50ms.", "Added document hashing, source references, and persistent vector storage.", "Engineered an interactive Streamlit learning interface."], 
    metrics: [{ label: "VECTOR STORE", val: "ChromaDB" }, { label: "RETRIEVAL LATENCY", val: "<50ms" }, { label: "STATUS", val: "Implemented" }], 
    stack: ["Python", "Streamlit", "RAG", "ChromaDB", "Sentence Transformers", "Groq", "NLP", "OCR"], 
    githubUrl: "https://github.com/MeetChhugani/QuizLab", 
    liveUrl: "https://quizlab-ed8.streamlit.app" 
  },
  { 
    id: "interview", 
    tag: "COMPUTER VISION & RECSYS", 
    metric: "MediaPipe 468 Points", 
    title: "AI-Powered Mock Interview Analyzer", 
    subtitle: "Python, FastAPI, OpenCV, MediaPipe, NLP, Recommendation Systems, AWS", 
    domain: "ai", 
    status: "Implemented", 
    rolePriority: { backendDev: 1, dataScience: 3 }, 
    problem: "Candidates need real-time multi-modal feedback on posture stability, speech tempo, and matching role recommendations.", 
    solution: "A multi-modal analysis pipeline using MediaPipe face mesh landmarks (468 points) and Web Audio API spectrograms (<150ms latency), paired with a company recommendation system and async FastAPI REST APIs deployed on AWS.", 
    architectureFlow: ["Web Audio / Video Stream", "MediaPipe 468 Landmarks", "Spectrogram WPM Analysis", "Scoring Engine", "Company RecSys", "FastAPI / AWS"], 
    challenges: ["Processed real-time audio and facial streams under 150ms latency.", "Engineered scoring workflows for posture, WPM tempo, and technical keyword density.", "Deployed asynchronous FastAPI REST APIs on AWS infrastructure."], 
    metrics: [{ label: "LANDMARKS", val: "468 Facial Mesh" }, { label: "LATENCY", val: "<150ms" }, { label: "DEPLOYMENT", val: "FastAPI / AWS" }], 
    stack: ["Python", "FastAPI", "OpenCV", "MediaPipe", "NLP", "Recommendation Systems", "AWS"], 
    githubUrl: "https://github.com/MeetChhugani/ai-interview-analyzer" 
  },
  { 
    id: "businessos", 
    tag: "ENTERPRISE BACKEND ARCHITECTURE", 
    metric: "100+ REST APIs", 
    title: "AI BusinessOS", 
    subtitle: "Python, FastAPI, PostgreSQL, Redis, Docker, JWT", 
    domain: "backend", 
    status: "Implemented / Designed", 
    rolePriority: { backendDev: 4, dataScience: 4 }, 
    problem: "Business operations require clean microservices with JWT authentication, RBAC, and scalable ORM persistence.", 
    solution: "A modular backend system built with Clean Architecture, FastAPI REST endpoints, SQLAlchemy 2 async ORM, PostgreSQL 16 schema migrations, and Redis session token caching.", 
    architectureFlow: ["FastAPI REST Gateway", "Application Services", "Domain Entities", "PostgreSQL 16 & Redis", "Alembic Migrations", "Docker Compose"], 
    challenges: ["Separated application, domain, and repository responsibilities using Clean Architecture.", "Implemented JWT authentication, 7-role RBAC, and background job processing.", "Documented 100+ REST APIs."], 
    metrics: [{ label: "API SURFACE", val: "100+ REST APIs" }, { label: "MODULES", val: "8 Business Modules" }, { label: "STATUS", val: "Implemented" }], 
    stack: ["FastAPI", "PostgreSQL", "Redis", "Docker", "JWT", "SQLAlchemy"], 
    githubUrl: "https://github.com/MeetChhugani/AI-BusinessOS" 
  },
  { 
    id: "sentiment", 
    tag: "FINTECH DATA PIPELINE", 
    metric: "3,000+ Headlines", 
    title: "Fintech Sentiment Analyzer", 
    subtitle: "Python, NLP, Streamlit, Groq API", 
    domain: "data", 
    status: "Implemented", 
    rolePriority: { backendDev: 5, dataScience: 5 }, 
    problem: "Financial news headline volume requires automated sentiment extraction and index correlation.", 
    solution: "An automated data processing pipeline analyzing 3,000+ news headlines against NSE/BSE stock markers using Groq LLaMA sentiment commentary.", 
    architectureFlow: ["Financial Headline Streams", "Python Processing Pipeline", "Groq LLaMA Sentiment", "NSE/BSE Price Mapping", "Streamlit Dashboard"], 
    challenges: ["Ingested 3,000+ financial headlines.", "Mapped headline sentiment scores against stock market indices.", "Built an interactive Streamlit commentary application."], 
    metrics: [{ label: "INGESTION", val: "3,000+ Headlines" }, { label: "MARKETS", val: "NSE & BSE" }, { label: "STATUS", val: "Implemented" }], 
    stack: ["Python", "NLP", "Streamlit", "Groq API"], 
    githubUrl: "https://github.com/MeetChhugani" 
  },
];

export const stackDomains: StackDomain[] = [
  { 
    id: "ml", 
    label: "Machine Learning", 
    summary: "End-to-end classification, PyTorch models, MLflow experiment tracking, and SHAP explainability.", 
    technologies: [
      { name: "Scikit-learn", what: "Machine Learning framework.", why: "Used for modeling pipelines and threshold tuning.", usedIn: ["Employee Risk Radar", "Startup Success Predictor"], role: "Model workflow" },
      { name: "PyTorch & XGBoost", what: "Deep Learning & Gradient Boosting.", why: "Achieved 0.89 ROC-AUC on attrition prediction.", usedIn: ["Employee Risk Radar"], role: "Classification" },
      { name: "MLflow", what: "ML Lifecycle & Experiment Tracking.", why: "Records hyperparams, metrics, and model artifacts.", usedIn: ["Employee Risk Radar"], role: "Experiment tracking" },
      { name: "SHAP", what: "Local Feature Attribution.", why: "Surfaces individual risk drivers across 30 features.", usedIn: ["Employee Risk Radar"], role: "Explainability" }
    ] 
  },
  { 
    id: "ai", 
    label: "NLP & Vision", 
    summary: "RAG document intelligence, vector databases, and multimodal computer vision.", 
    technologies: [
      { name: "ChromaDB & RAG", what: "Vector Database & Retrieval.", why: "Powers sub-50ms context retrieval for PDF knowledge.", usedIn: ["QuizLab"], role: "Vector search" },
      { name: "Sentence Transformers", what: "Text Embeddings.", why: "Converts text chunks into dense vector representations.", usedIn: ["QuizLab"], role: "Embeddings" },
      { name: "MediaPipe & OpenCV", what: "Multimodal Computer Vision.", why: "Tracks 468 facial mesh landmarks & posture in real-time.", usedIn: ["Mock Interview Analyzer"], role: "Vision analytics" },
      { name: "Groq LLM", what: "Low-latency LLM Inference.", why: "Grounds generative responses in document context.", usedIn: ["QuizLab", "Fintech Sentiment"], role: "Generative AI" }
    ] 
  },
  { 
    id: "backend", 
    label: "Backend & Cloud", 
    summary: "Asynchronous REST services, cloud infrastructure, and database schemas.", 
    technologies: [
      { name: "FastAPI", what: "Async Python Framework.", why: "Serves real-time vision, audio & interview REST APIs.", usedIn: ["Mock Interview Analyzer", "AI BusinessOS"], role: "REST API layer" },
      { name: "AWS", what: "Cloud Infrastructure.", why: "Hosts asynchronous backend APIs and services.", usedIn: ["Mock Interview Analyzer"], role: "Cloud hosting" },
      { name: "PostgreSQL & MySQL", what: "Relational Databases.", why: "Used for normalized schema design and transaction storage.", usedIn: ["AI BusinessOS", "iStudio ETL"], role: "Data persistence" },
      { name: "Streamlit", what: "Interactive ML Serving.", why: "Deploys interactive ML and RAG applications.", usedIn: ["Employee Risk Radar", "QuizLab"], role: "App deployment" }
    ] 
  },
  { 
    id: "data", 
    label: "Data Engineering", 
    summary: "Data preprocessing, ETL pipelines, and statistical analysis.", 
    technologies: [
      { name: "Pandas & NumPy", what: "Data Manipulation Libraries.", why: "Used for data cleaning, SMOTE resampling, and EDA.", usedIn: ["iStudio ETL", "Employee Risk Radar"], role: "Data processing" },
      { name: "SQL", what: "Relational Querying.", why: "Applied during iStudio data analytics internship for ETL.", usedIn: ["iStudio internship"], role: "Querying" }
    ] 
  },
  { 
    id: "infra", 
    label: "DevOps & Tools", 
    summary: "Version control, containerization, and experiment environments.", 
    technologies: [
      { name: "Git & GitHub", what: "Version Control.", why: "Source code collaboration and revision tracking.", usedIn: ["All projects"], role: "Version control" },
      { name: "Docker", what: "Containerization.", why: "Package microservices into isolated runtime containers.", usedIn: ["AI BusinessOS"], role: "Packaging" }
    ] 
  }
];

export const experiences = [
  { 
    period: "Jan 2026 – Feb 2026", 
    role: "Data Analytics Intern", 
    organization: "iStudio", 
    detail: "Built Python data engineering pipelines and ETL processes to validate, clean, and structure raw transaction datasets, yielding a ~25% runtime-error reduction. Performed EDA and statistical modeling using SQL, Pandas, and NumPy." 
  },
  { 
    period: "Jun 2025 – Jul 2025", 
    role: "Python with Django Intern", 
    organization: "Brainybeam Info-Tech Pvt. Ltd.", 
    detail: "Developed modular Python backend components and database schemas, implementing Django REST Framework endpoints. Automated testing and backend query optimization, achieving a ~30% response-time improvement." 
  },
] as const;

export const verifiedLearning = [
  "Machine Learning Specialization – DeepLearning.AI & Stanford",
  "IBM Data Science Professional Certificate",
  "Google Advanced Data Analytics Professional Certificate",
  "Python for Data Science, AI & Development – IBM",
  "Deloitte Data Analytics Virtual Experience",
  "Green Skills & AI Foundation Program"
] as const;

export const technologyFlows: Record<string, { nodes: string[]; related: string[] }> = {
  "Python": { nodes: ["Python", "Data Processing", "ML / RAG Pipeline", "FastAPI / Streamlit Interface"], related: ["FastAPI", "Scikit-learn", "PyTorch"] },
  "FastAPI": { nodes: ["Client Request", "FastAPI Async Router", "OpenCV / MediaPipe / RecSys", "AWS Infrastructure"], related: ["Python", "AWS", "MediaPipe"] },
  "XGBoost": { nodes: ["1,470 Samples", "SMOTE Resampling", "XGBoost & PyTorch", "0.89 ROC-AUC", "MLflow Logging", "SHAP Waterfall"], related: ["PyTorch", "MLflow", "SHAP"] },
  "RAG": { nodes: ["PDF Upload", "PyMuPDF Extract", "Sentence Transformers", "ChromaDB Vector Store", "<50ms Retrieval", "Groq Response"], related: ["ChromaDB", "Sentence Transformers", "Groq"] },
};
