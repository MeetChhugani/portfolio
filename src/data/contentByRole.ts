export type RoleType = "dataScience" | "backendDev" | "hybrid";

export interface RoleContent {
  roleName: string;
  badgeLabel: string;
  emoji: string;
  theme: {
    primaryAccent: string;
    secondaryAccent: string;
    gradientText: string;
    particleColors: {
      layer2: string;
      layer3: string;
    };
  };
  eyebrows: {
    aboutOverview: string;
    aboutStack: string;
    skillsVisualizer: string;
    skillsNodeConnection: string;
    caseStudiesHeader: string;
    resumeHeader: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    taglinePrefix: string;
    rolesList: string[];
  };
  about: {
    headline: string;
    bio: string;
    stackCategoryOrder: string[];
  };
  currentFocus: {
    items: string[];
  };
  roadmap: {
    steps: { step: string; label: string; desc: string; isFuture?: boolean }[];
  };
  projectOrder: string[];
  skillsCategoryOrder: string[];
  resume: {
    title: string;
    rawSummaryText: string;
    tabLabels: {
      experience: string;
      projects: string;
      skills: string;
      education: string;
    };
    projectOrder: string[];
  };
}

export const contentByRole: Record<RoleType, RoleContent> = {
  backendDev: {
    roleName: "Python Backend Developer",
    badgeLabel: "PYTHON BACKEND DEVELOPER",
    emoji: "🐍",
    theme: {
      primaryAccent: "#0284c7",
      secondaryAccent: "#22d3ee",
      gradientText: "from-cyan-400 via-sky-400 to-blue-500",
      particleColors: {
        layer2: "#0284c7",
        layer3: "#22d3ee",
      },
    },
    eyebrows: {
      aboutOverview: "SERVER_OVERVIEW // ARCHITECTURE",
      aboutStack: "BACKEND_STACK // RUNTIME_PIPELINES",
      skillsVisualizer: "BACKEND_STACK // COMPETENCY_VISUALIZER",
      skillsNodeConnection: "Active backend module node",
      caseStudiesHeader: "PROJECT_REPOS // API_SERVICES",
      resumeHeader: "PYTHON_RESUME // SPECIFICATION_DOC",
    },
    hero: {
      title: "Python Backend Developer",
      subtitle: "Building scalable backend systems, APIs and automation tools using modern Python technologies.",
      description: "Focused on designing reliable backend architectures, REST APIs, databases and production-ready software.",
      taglinePrefix: "I am ",
      rolesList: ["Python Backend Developer", "FastAPI Engineer", "API System Architect"],
    },
    about: {
      headline: "Building clean, scalable Python backend systems.",
      bio: "Final-year B.Tech IT student specializing in Python backend architecture, FastAPI async microservices, PostgreSQL schema design, Redis caching, Docker containerization, and REST API design.",
      stackCategoryOrder: [
        "LANGUAGES",
        "TOOLS & FRAMEWORKS",
        "DATA ANALYTICS",
        "MACHINE LEARNING",
        "ARTIFICIAL INTELLIGENCE",
      ],
    },
    currentFocus: {
      items: [
        "FastAPI",
        "Django",
        "Docker",
        "PostgreSQL",
        "Redis",
        "Celery",
        "Authentication",
        "JWT",
        "Async Python",
        "System Design",
        "Microservices",
        "REST APIs",
        "Testing",
        "CI/CD",
        "GitHub Actions",
        "Linux",
      ],
    },
    roadmap: {
      steps: [
        { step: "01", label: "Python", desc: "Core async I/O, OOP principles & scripting" },
        { step: "02", label: "FastAPI", desc: "High-performance REST API routing & Pydantic V2" },
        { step: "03", label: "Docker", desc: "Multi-stage container builds & Compose networking" },
        { step: "04", label: "Redis", desc: "Caching layers, token rotation & rate limiting" },
        { step: "05", label: "Celery", desc: "Asynchronous task queue & background workers" },
        { step: "06", label: "Microservices", desc: "Decoupled domain architectures & gRPC/REST APIs" },
        { step: "07", label: "Kubernetes", desc: "Cluster orchestration & automated scaling", isFuture: true },
      ],
    },
    projectOrder: ["businessos", "attrition", "quizlab", "interview", "sentiment", "startup"],
    skillsCategoryOrder: ["programming", "deploy", "cloud", "ml", "viz"],
    resume: {
      title: "Python Developer Summary",
      rawSummaryText: `MEET CHHUGANI
Python Developer
GitHub: MeetChhugani | LinkedIn: meet-chhugani | meetchhugani81@gmail.com | +91-7862806190 | Gujarat, India

SUMMARY:
Final-year B.Tech Information Technology student with backend development experience in Python, Django, and FastAPI, including REST API design and third-party API integration (Groq LLaMA). Built and deployed six Python applications covering backend logic, data pipelines, and service integration, with additional applied experience in Machine Learning (Scikit-learn, XGBoost) and data analytics. Comfortable owning a service from API design through deployment.

EXPERIENCE:
- Python & Django Developer Intern – Brainybeam Info-Tech Pvt. Ltd. (Jun 2025 – Jul 2025)
  • Developed backend modules and database-driven features for production Django applications.
  • Debugged and tested existing codebases, identifying and resolving functional defects before release.
  • Implemented new application features end-to-end, from requirement to deployment-ready code.
- Data Analytics Intern – iStudio (Jan 2026 – Feb 2026)
  • Wrote SQL queries and Python scripts to clean and preprocess multi-source datasets for reporting pipelines.
  • Built data processing workflows and dashboards, translating raw data into structured business reporting.
  • Supported recurring stakeholder reporting cycles using SQL and Excel-based analysis.

PROJECTS:
- Employee Risk Radar (Python, XGBoost, SHAP, Streamlit, Groq API)
  • Built an application backend integrating a trained XGBoost model with a Groq LLaMA chatbot, designing the data flow between model inference, SHAP explainability output, and the chatbot response layer.
  • Applied SHAP for model explainability, surfacing individual attrition risk drivers for HR decision-makers.
- QuizLab (Python, Streamlit, LLMs, OCR, NLP)
  • Interactive learning application parsing document arrays into JSON flashcard decks.
- AI BusinessOS – Enterprise AI ERP Platform (Python, FastAPI, PostgreSQL, Redis, Docker, JWT)
  • Architected a modular AI-powered ERP platform with 8 business modules: HR, CRM, Finance, Inventory, Analytics, Platform Services, and AI Copilot.
  • Built 100+ RESTful APIs using FastAPI, implementing JWT authentication, RBAC, audit logging, and background job processing.
  • Designed normalized relational schemas in PostgreSQL using SQLAlchemy and Alembic.
- AI-Powered Mock Interview Analyzer (Flutter, Python, FastAPI, MediaPipe, NLP)
  • Designed and built a FastAPI backend serving real-time speech, posture, and facial-expression analysis endpoints.
- Fintech Sentiment Analyzer (Python, NLP, Streamlit, Groq API)
  • Built a data pipeline ingesting and processing 3,000+ financial news headlines against NSE/BSE price data.

SKILLS:
- Languages: Python, SQL, TypeScript
- Backend & APIs: FastAPI, Django, REST API Design, JWT Authentication, RBAC, SQLAlchemy
- Databases: PostgreSQL, Redis, SQL, Alembic
- Machine Learning: Scikit-learn, XGBoost, SHAP, NLP, RAG
- DevOps & Tools: Docker, Git, GitHub, Streamlit, React

EDUCATION:
- 2023 – May 2026: Bachelor of Technology, Information Technology | Gyanmanjari Innovative University, Bhavnagar, Gujarat`.trim(),
      tabLabels: {
        experience: "Work Experience",
        projects: "Selected Projects",
        skills: "Technical Skills",
        education: "Certs & Education",
      },
      projectOrder: ["attrition", "quizlab", "businessos", "interview", "sentiment"],
    },
  },

  hybrid: {
    roleName: "Systems & Data Engineer",
    badgeLabel: "SYSTEMS & DATA ENGINEER",
    emoji: "⚡",
    theme: {
      primaryAccent: "#10b981",
      secondaryAccent: "#38bdf8",
      gradientText: "from-emerald-400 via-sky-400 to-purple-400",
      particleColors: {
        layer2: "#10b981",
        layer3: "#38bdf8",
      },
    },
    eyebrows: {
      aboutOverview: "SYSTEMS_OVERVIEW // DUAL_ARCHITECTURE",
      aboutStack: "SYSTEMS_STACK // RUNTIME_PIPELINES",
      skillsVisualizer: "SYSTEMS_STACK // COMPETENCY_MAP",
      skillsNodeConnection: "Active architecture node",
      caseStudiesHeader: "FLAGSHIP_PROJECTS // PRODUCTION_SYSTEMS",
      resumeHeader: "ENGINEERING_RESUME // SPECIFICATION_DOC",
    },
    hero: {
      title: "Systems & Data Engineer",
      subtitle: "Building production Python backend microservices, relational databases, and explainable ML pipelines.",
      description: "Combining FastAPI, PostgreSQL 16, Redis, and Docker with applied Machine Learning (XGBoost, SHAP, Groq LLaMA) to engineer production software.",
      taglinePrefix: "I build ",
      rolesList: ["Systems & Data Engineer", "Python Backend Developer", "Applied ML Engineer"],
    },
    about: {
      headline: "Engineering scalable backend systems and explainable ML pipelines.",
      bio: "Final-year B.Tech IT student combining Python backend microservices (FastAPI, PostgreSQL 16, Redis, Docker) with explainable machine learning models (XGBoost, SHAP, SMOTE, Groq LLaMA RAG) for production deployment.",
      stackCategoryOrder: [
        "LANGUAGES",
        "TOOLS & FRAMEWORKS",
        "MACHINE LEARNING",
        "DATA ANALYTICS",
        "ARTIFICIAL INTELLIGENCE",
      ],
    },
    currentFocus: {
      items: [
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Python",
        "SQL",
        "XGBoost",
        "SHAP",
        "Groq LLaMA",
        "Clean Architecture",
      ],
    },
    roadmap: {
      steps: [
        { step: "01", label: "Backend Microservices", desc: "FastAPI async REST endpoints with Clean Architecture" },
        { step: "02", label: "Relational Persistence", desc: "PostgreSQL 16 schemas & Alembic migrations" },
        { step: "03", label: "Security & Caching", desc: "Redis token rotation & RBAC security" },
        { step: "04", label: "Applied Machine Learning", desc: "XGBoost classification with SMOTE resampling" },
        { step: "05", label: "Explainability & AI", desc: "SHAP feature waterfalls & Groq LLaMA RAG" },
      ],
    },
    projectOrder: ["businessos", "attrition", "quizlab", "sentiment", "interview", "startup"],
    skillsCategoryOrder: ["programming", "deploy", "cloud", "ml", "viz"],
    resume: {
      title: "Systems Engineer Summary",
      rawSummaryText: `MEET CHHUGANI
Systems Engineer & Applied Developer
Email: meetchhugani81@gmail.com | Phone: +91-7862806190
GitHub: github.com/MeetChhugani | LinkedIn: linkedin.com/in/meet-chhugani

SUMMARY:
Builds backend systems, data workflows, and applied ML features with a focus on production reliability, architecture clarity, and measurable business value.

EXPERIENCE:
- Python & Django Developer Intern – Brainybeam Info-Tech Pvt. Ltd. (Jun 2025 – Jul 2025)
- Data Analytics Intern – iStudio (Jan 2026 – Feb 2026)

PROJECTS:
- AI BusinessOS – FastAPI, PostgreSQL, Redis, Docker, JWT
- Employee Risk Radar – XGBoost + SHAP explainability
- Fintech Sentiment Analyzer – NLP pipeline with 3,000+ headlines

SKILLS:
- Backend: FastAPI, Django, REST APIs, SQLAlchemy, PostgreSQL, Redis
- Data & ML: Pandas, NumPy, XGBoost, SHAP, Scikit-learn, NLP
- Delivery: Docker, GitHub Actions, Streamlit
`.trim(),
      tabLabels: {
        experience: "Work Experience",
        projects: "Selected Projects",
        skills: "Technical Skills",
        education: "Certs & Education",
      },
      projectOrder: ["businessos", "attrition", "sentiment", "quizlab", "interview"],
    },
  },

  dataScience: {
    roleName: "AI / ML Engineer",
    badgeLabel: "AI / ML ENGINEER",
    emoji: "🤖",
    theme: {
      primaryAccent: "#a855f7",
      secondaryAccent: "#10b981",
      gradientText: "from-purple-400 via-emerald-400 to-teal-300",
      particleColors: {
        layer2: "#a855f7",
        layer3: "#10b981",
      },
    },
    eyebrows: {
      aboutOverview: "INTELLIGENCE // ML_SYSTEMS",
      aboutStack: "ML_PIPELINES // INFERENCE_ENGINE",
      skillsVisualizer: "ARTIFICIAL_INTELLIGENCE // COMPETENCY_VISUALIZER",
      skillsNodeConnection: "Active neural network synapse node",
      caseStudiesHeader: "ML_REPOS // PROD_MODELS",
      resumeHeader: "AI_RESUME // SPECIFICATION_DOC",
    },
    hero: {
      title: "AI / ML Engineer",
      subtitle: "Building intelligent systems using Machine Learning, Large Language Models and modern AI infrastructure.",
      description: "Focused on creating production-ready AI applications that solve real-world problems through data and intelligent automation.",
      taglinePrefix: "I am an ",
      rolesList: ["AI / ML Engineer", "Machine Learning Engineer", "LLM & RAG Architect"],
    },
    about: {
      headline: "Engineering intelligent models into production solutions.",
      bio: "Final-year B.Tech IT student specializing in supervised machine learning (Scikit-learn, XGBoost), explainable AI (SHAP), LLM orchestration (Groq LLaMA, RAG), and end-to-end data pipelines.",
      stackCategoryOrder: [
        "MACHINE LEARNING",
        "ARTIFICIAL INTELLIGENCE",
        "DATA ANALYTICS",
        "LANGUAGES",
        "TOOLS & FRAMEWORKS",
      ],
    },
    currentFocus: {
      items: [
        "Machine Learning",
        "Deep Learning",
        "LLMs",
        "Prompt Engineering",
        "LangChain",
        "LlamaIndex",
        "RAG",
        "AI Agents",
        "Vector Databases",
        "MLOps",
        "MLflow",
        "Transformers",
        "HuggingFace",
        "Model Deployment",
      ],
    },
    roadmap: {
      steps: [
        { step: "01", label: "Machine Learning", desc: "Scikit-learn, XGBoost & statistical modeling" },
        { step: "02", label: "Deep Learning", desc: "Neural network architectures & PyTorch" },
        { step: "03", label: "LLMs", desc: "Large Language Models & prompt optimization" },
        { step: "04", label: "RAG", desc: "Retrieval-Augmented Generation & context injection" },
        { step: "05", label: "Vector DBs", desc: "Embeddings indexing & similarity search" },
        { step: "06", label: "MLOps", desc: "Model deployment, tracking & monitoring" },
        { step: "07", label: "AI Agents", desc: "Autonomous multi-agent workflows", isFuture: true },
      ],
    },
    projectOrder: ["attrition", "startup", "quizlab", "sentiment", "interview", "businessos"],
    skillsCategoryOrder: ["ml", "viz", "programming", "deploy", "cloud"],
    resume: {
      title: "AI/ML Engineer Summary",
      rawSummaryText: `MEET CHHUGANI
AI/ML Engineer | Data Scientist
Email: meetchhugani81@gmail.com | Phone: +91-7862806190
GitHub: github.com/MeetChhugani | LinkedIn: linkedin.com/in/meet-chhugani

EXPERIENCE:
- Data Analytics Intern (Jan 2026 - Feb 2026) @ iStudio
  Performed data cleaning, built dashboards supporting business decisions, and applied Excel/SQL techniques.
- Python & Django Developer Intern (Jun 2025 - Jul 2025) @ Brainybeam Info-Tech
  Developed RESTful APIs and backend modules using Python and Django.

PROJECTS:
- Employee Risk Radar (Python, Scikit-learn, SHAP, Streamlit)
  XGBoost-based employee attrition predictor utilizing SHAP local explainability.
- Startup Success Predictor (Python, Scikit-learn, Random Forest)
  Random Forest classification model predicting funding viability (0.81 ROC-AUC).
- QuizLab (Python, Streamlit, LLMs, OCR, NLP)
  Interactive learning application parsing document arrays into JSON flashcard decks.
- Fintech Sentiment Analyzer (Python, NLP, Streamlit, Groq API)
  Data pipeline ingesting 3,000+ headlines against NSE/BSE data.
- AI-Powered Mock Interview Analyzer (Flutter, Python, FastAPI, MediaPipe, NLP)
  Real-time posture and facial expression telemetry backend.

TECHNICAL SKILLS:
- Languages: Python, SQL
- ML: Scikit-learn, Feature Engineering, Statistical Modeling, NLP, XGBoost, SHAP
- Data: Pandas, NumPy, EDA, Data Visualization
- AI: Generative AI, LLMs, Prompt Engineering, RAG, Agentic AI Basics

EDUCATION:
- Gyanmanjari Innovative University (2023 - Present)
  Bachelor of Technology in Information Technology`.trim(),
      tabLabels: {
        experience: "Work Experience",
        projects: "Selected Projects",
        skills: "Technical Skills",
        education: "Certs & Education",
      },
      projectOrder: ["attrition", "startup", "quizlab", "sentiment", "interview"],
    },
  },
};
