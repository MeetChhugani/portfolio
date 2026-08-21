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
      subtitle: "Building scalable backend systems, APIs, microservices, and applied ML pipelines using modern Python & AWS.",
      description: "Focused on designing reliable backend architectures, REST APIs, databases, vector stores, and production-oriented ML workflows.",
      taglinePrefix: "I am ",
      rolesList: ["Python Backend Developer", "FastAPI & REST Engineer", "Machine Learning & API Architect"],
    },
    about: {
      headline: "Building clean, production-oriented Python backend systems & ML workflows.",
      bio: "Final-year B.Tech Information Technology student specializing in Python backend architecture, FastAPI REST microservices, PostgreSQL/MySQL database schemas, ChromaDB vector search, AWS infrastructure, and production ML pipelines.",
      stackCategoryOrder: [
        "PROGRAMMING",
        "BACKEND / CLOUD",
        "MACHINE LEARNING",
        "NLP / INFORMATION RETRIEVAL",
        "COMPUTER VISION",
      ],
    },
    currentFocus: {
      items: [
        "FastAPI",
        "Python",
        "REST APIs",
        "AWS",
        "PostgreSQL",
        "MySQL",
        "ChromaDB",
        "MLflow",
        "PyTorch",
        "Scikit-learn",
        "XGBoost",
        "RAG",
        "Docker",
        "Git",
        "Streamlit",
      ],
    },
    roadmap: {
      steps: [
        { step: "01", label: "Python & SQL", desc: "Core async I/O, OOP principles & database query optimization" },
        { step: "02", label: "FastAPI REST APIs", desc: "High-performance REST API routing & async microservices" },
        { step: "03", label: "Databases & RAG", desc: "PostgreSQL, MySQL, and ChromaDB vector search retrieval" },
        { step: "04", label: "ML & MLflow", desc: "XGBoost, PyTorch, SMOTE, and MLflow experiment tracking" },
        { step: "05", label: "Computer Vision & Audio", desc: "MediaPipe (468 facial points) & Web Audio API spectrograms" },
        { step: "06", label: "Cloud & Ops", desc: "AWS deployment, Streamlit cloud serving, and CI/CD pipelines" },
        { step: "07", label: "Microservices & Orchestration", desc: "Distributed vector orchestration & cloud scaling", isFuture: true },
      ],
    },
    projectOrder: ["attrition", "quizlab", "interview", "businessos", "sentiment", "startup"],
    skillsCategoryOrder: ["programming", "deploy", "cloud", "ml", "viz"],
    resume: {
      title: "Python Developer Resume",
      rawSummaryText: `MEET CHHUGANI
Machine Learning Engineer | NLP, Computer Vision & ML
+91-7862806190 | Gujarat, India | meetchhugani81@gmail.com | Portfolio: meetchhugani.vercel.app | GitHub: github.com/MeetChhugani | LinkedIn: linkedin.com/in/meet-chhugani

PROFESSIONAL SUMMARY:
Final-year Information Technology student focused on applied machine learning for NLP, computer vision, and document intelligence. Built end-to-end ML systems using Python, Scikit-learn, PyTorch, and XGBoost, including RAG pipelines and multimodal interview analysis. Experienced in FastAPI, Streamlit, AWS, MLflow, and vector databases for experiment tracking, deployment, and production-oriented ML workflows.

TECHNICAL SKILLS:
• PROGRAMMING: Python, SQL
• MACHINE LEARNING: Scikit-learn, PyTorch, XGBoost, Predictive Modeling, Classification, Regression, Feature Engineering, Model Evaluation, Model Tuning
• NLP / INFORMATION RETRIEVAL: NLP, OCR, Information Extraction, RAG, Embeddings, Sentence Transformers, Semantic Retrieval, Semantic Search, Document Processing
• COMPUTER VISION: OpenCV, MediaPipe, Computer Vision, Image Processing
• ML ENGINEERING: MLflow, Experiment Tracking, Model Training, Model Inference, Model Evaluation, Model Deployment, ML Lifecycle
• BACKEND / CLOUD: FastAPI, REST APIs, AWS
• DATABASES: PostgreSQL, MySQL, ChromaDB
• DATA / TOOLS: Pandas, NumPy, Data Preprocessing, Data Analysis, Git, GitHub, Jupyter Notebook, Streamlit

EXPERIENCE:
- Data Analytics Intern – iStudio (Jan 2026 – Feb 2026)
  • Built Python data engineering pipelines and ETL processes to validate, clean, and structure raw transaction datasets, yielding a ~25% runtime-error reduction.
  • Performed exploratory data analysis (EDA) and statistical modeling utilizing SQL, Pandas, and NumPy to identify patterns and resolve operational problems.
  • Collaborated in cross-functional teams to document database processes and translate complex analytical insights into structured reports.
- Python with Django Intern – Brainybeam Info-Tech Pvt. Ltd. (Jun 2025 – Jul 2025)
  • Developed modular Python backend components and database schemas, implementing Django REST Framework endpoints for web application workflows.
  • Automated testing, systematic debugging, and backend query optimization, achieving a ~30% response-time improvement in data processing.
  • Utilized Git version control across multi-person development environments and generated developer-facing technical documentation.

PROJECTS:
- Employee Risk Radar | ML Prediction & Experimentation (Python, Scikit-learn, XGBoost, PyTorch, MLflow, SHAP, Streamlit)
  • Developed an employee attrition prediction pipeline evaluating 1,470 employee samples across 30 feature variables using Python, Scikit-learn, XGBoost, and PyTorch.
  • Addressed severe class imbalance using SMOTE and classification-threshold optimization, achieving a 0.89 ROC-AUC score.
  • Used MLflow for experiment tracking, recording model parameters, evaluation metrics, and artifacts across training experiments.
  • Applied SHAP-based local feature attribution across key predictor variables and deployed the interactive ML workflow on Streamlit.
- QuizLab | RAG-Powered AI Learning & Information Retrieval Platform (Python, Streamlit, RAG, ChromaDB, Sentence Transformers, Groq, NLP, OCR)
  • Built a RAG-powered document intelligence pipeline that converts uploaded PDFs into searchable vector knowledge using PyMuPDF text extraction, chunking, Sentence Transformer embeddings, and ChromaDB storage.
  • Implemented semantic and metadata-aware retrieval to ground Groq LLM responses in document context, maintaining a 3-state adaptive difficulty state machine executing evaluation logic in under 50ms.
  • Added document hashing, source references, persistent vector storage, and configurable retrieval parameters to improve retrieval consistency, reusability, and scalability.
- AI-Powered Mock Interview Analyzer | Computer Vision & Career Recommendation (Python, FastAPI, OpenCV, MediaPipe, NLP, Recommendation Systems, AWS)
  • Engineered a multimodal interview analysis pipeline utilizing MediaPipe face mesh landmarks (468 points) and Web Audio API spectrogram analysis, processing real-time audio streams under 150ms latency.
  • Developed scoring workflows analyzing posture stability, speech tempo (WPM), and technical keyword density to generate structured candidate performance feedback.
  • Implemented a recommendation system that analyzes candidate profiles and recommends suitable companies based on relevant matching criteria.
  • Built asynchronous FastAPI REST APIs for interview analysis and candidate profiling, with AWS-based deployment/infrastructure.

EDUCATION:
- Gyanmanjari Innovative University, Bhavnagar, Gujarat (Expected Graduation: 2027)
  Bachelor of Technology in Information Technology

CERTIFICATIONS:
• Machine Learning Specialization – DeepLearning.AI & Stanford | • IBM Data Science Professional Certificate
• Google Advanced Data Analytics Professional Certificate | • Python for Data Science, AI & Development – IBM
• Deloitte Data Analytics Virtual Experience | • Green Skills & AI Foundation Program`.trim(),
      tabLabels: {
        experience: "Work Experience",
        projects: "Selected Projects",
        skills: "Technical Skills",
        education: "Certs & Education",
      },
      projectOrder: ["attrition", "quizlab", "interview", "businessos", "sentiment"],
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
      subtitle: "Building production ML pipelines, document intelligence RAG platforms, computer vision, and FastAPI backends.",
      description: "Combining Python, Scikit-learn, PyTorch, XGBoost (0.89 ROC-AUC), MLflow, FastAPI, and AWS to engineer end-to-end production systems.",
      taglinePrefix: "I build ",
      rolesList: ["Machine Learning Engineer", "NLP & Computer Vision Specialist", "FastAPI & Cloud Architect"],
    },
    about: {
      headline: "Engineering end-to-end Machine Learning systems, NLP RAG pipelines & Computer Vision.",
      bio: "Final-year Information Technology student (B.Tech IT, Graduating 2027) focused on applied machine learning, document intelligence (ChromaDB, Sentence Transformers, RAG), multimodal computer vision (MediaPipe 468 landmarks), and FastAPI/AWS deployments.",
      stackCategoryOrder: [
        "PROGRAMMING",
        "MACHINE LEARNING",
        "NLP / INFORMATION RETRIEVAL",
        "COMPUTER VISION",
        "BACKEND / CLOUD",
      ],
    },
    currentFocus: {
      items: [
        "Python",
        "Scikit-learn",
        "PyTorch",
        "XGBoost",
        "MLflow",
        "FastAPI",
        "RAG",
        "ChromaDB",
        "MediaPipe",
        "OpenCV",
        "AWS",
        "PostgreSQL",
        "MySQL",
        "Streamlit",
        "Git",
      ],
    },
    roadmap: {
      steps: [
        { step: "01", label: "Data Pipelines & ETL", desc: "Python data engineering pipelines yielding ~25% error reduction" },
        { step: "02", label: "ML & Threshold Tuning", desc: "XGBoost & PyTorch attrition model achieving 0.89 ROC-AUC" },
        { step: "03", label: "Experiment Tracking", desc: "MLflow logging of hyperparams, metrics & model artifacts" },
        { step: "04", label: "RAG & Vector Search", desc: "ChromaDB & Sentence Transformers sub-50ms retrieval" },
        { step: "05", label: "Multimodal Vision & Audio", desc: "MediaPipe 468 points & spectrogram latency under 150ms" },
        { step: "06", label: "REST APIs & AWS Cloud", desc: "Async FastAPI REST endpoints deployed on AWS infrastructure" },
      ],
    },
    projectOrder: ["attrition", "quizlab", "interview", "businessos", "sentiment", "startup"],
    skillsCategoryOrder: ["programming", "deploy", "cloud", "ml", "viz"],
    resume: {
      title: "Machine Learning Engineer Resume",
      rawSummaryText: `MEET CHHUGANI
Machine Learning Engineer | NLP, Computer Vision & ML
+91-7862806190 | Gujarat, India | meetchhugani81@gmail.com | Portfolio: meetchhugani.vercel.app | GitHub: github.com/MeetChhugani | LinkedIn: linkedin.com/in/meet-chhugani

PROFESSIONAL SUMMARY:
Final-year Information Technology student focused on applied machine learning for NLP, computer vision, and document intelligence. Built end-to-end ML systems using Python, Scikit-learn, PyTorch, and XGBoost, including RAG pipelines and multimodal interview analysis. Experienced in FastAPI, Streamlit, AWS, MLflow, and vector databases for experiment tracking, deployment, and production-oriented ML workflows.

EXPERIENCE:
- Data Analytics Intern – iStudio (Jan 2026 – Feb 2026)
  • Built Python data engineering pipelines and ETL processes to validate, clean, and structure raw transaction datasets, yielding a ~25% runtime-error reduction.
  • Performed exploratory data analysis (EDA) and statistical modeling utilizing SQL, Pandas, and NumPy to identify patterns and resolve operational problems.
  • Collaborated in cross-functional teams to document database processes and translate complex analytical insights into structured reports.
- Python with Django Intern – Brainybeam Info-Tech Pvt. Ltd. (Jun 2025 – Jul 2025)
  • Developed modular Python backend components and database schemas, implementing Django REST Framework endpoints for web application workflows.
  • Automated testing, systematic debugging, and backend query optimization, achieving a ~30% response-time improvement in data processing.
  • Utilized Git version control across multi-person development environments and generated developer-facing technical documentation.

PROJECTS:
- Employee Risk Radar | ML Prediction & Experimentation (Python, Scikit-learn, XGBoost, PyTorch, MLflow, SHAP, Streamlit)
  • Developed an employee attrition prediction pipeline evaluating 1,470 employee samples across 30 feature variables using Python, Scikit-learn, XGBoost, and PyTorch.
  • Addressed severe class imbalance using SMOTE and classification-threshold optimization, achieving a 0.89 ROC-AUC score.
  • Used MLflow for experiment tracking, recording model parameters, evaluation metrics, and artifacts across training experiments.
- QuizLab | RAG-Powered AI Learning & Information Retrieval Platform (Python, Streamlit, RAG, ChromaDB, Sentence Transformers, Groq, NLP, OCR)
  • Built a RAG-powered document intelligence pipeline that converts uploaded PDFs into searchable vector knowledge using PyMuPDF text extraction, chunking, Sentence Transformer embeddings, and ChromaDB storage.
  • Implemented semantic and metadata-aware retrieval to ground Groq LLM responses in document context, maintaining a 3-state adaptive difficulty state machine executing evaluation logic in under 50ms.
- AI-Powered Mock Interview Analyzer | Computer Vision & Career Recommendation (Python, FastAPI, OpenCV, MediaPipe, NLP, Recommendation Systems, AWS)
  • Engineered a multimodal interview analysis pipeline utilizing MediaPipe face mesh landmarks (468 points) and Web Audio API spectrogram analysis, processing real-time audio streams under 150ms latency.
  • Developed scoring workflows analyzing posture stability, speech tempo (WPM), and technical keyword density to generate structured candidate performance feedback.

EDUCATION:
- Gyanmanjari Innovative University, Bhavnagar, Gujarat (Expected Graduation: 2027)
  Bachelor of Technology in Information Technology`.trim(),
      tabLabels: {
        experience: "Work Experience",
        projects: "Selected Projects",
        skills: "Technical Skills",
        education: "Certs & Education",
      },
      projectOrder: ["attrition", "quizlab", "interview", "sentiment", "businessos"],
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
      title: "Machine Learning Engineer",
      subtitle: "Machine Learning Engineer | NLP, Computer Vision & ML workflows.",
      description: "Focused on applied machine learning for NLP, computer vision, document intelligence RAG pipelines, MLflow experiment tracking, and AWS deployment.",
      taglinePrefix: "I am a ",
      rolesList: ["Machine Learning Engineer", "NLP & RAG Architect", "Computer Vision Specialist"],
    },
    about: {
      headline: "Engineering applied ML models, document RAG pipelines & computer vision.",
      bio: "Final-year Information Technology student (B.Tech IT, Graduating 2027) specializing in supervised machine learning (Scikit-learn, XGBoost, PyTorch, 0.89 ROC-AUC), explainable AI (SHAP, MLflow), RAG platforms (ChromaDB, Sentence Transformers), MediaPipe vision analytics, and FastAPI/AWS deployment.",
      stackCategoryOrder: [
        "MACHINE LEARNING",
        "NLP / INFORMATION RETRIEVAL",
        "COMPUTER VISION",
        "ML ENGINEERING",
        "BACKEND / CLOUD",
      ],
    },
    currentFocus: {
      items: [
        "Python",
        "Scikit-learn",
        "PyTorch",
        "XGBoost",
        "MLflow",
        "SHAP",
        "RAG",
        "ChromaDB",
        "Sentence Transformers",
        "OpenCV",
        "MediaPipe",
        "FastAPI",
        "AWS",
        "PostgreSQL",
      ],
    },
    roadmap: {
      steps: [
        { step: "01", label: "Machine Learning", desc: "Scikit-learn, PyTorch & XGBoost (0.89 ROC-AUC)" },
        { step: "02", label: "Experiment Tracking", desc: "MLflow logging of params, metrics & model artifacts" },
        { step: "03", label: "NLP & Vector Search", desc: "ChromaDB, Sentence Transformers & PyMuPDF RAG" },
        { step: "04", label: "Computer Vision", desc: "MediaPipe 468 facial mesh landmarks & Web Audio spectrograms" },
        { step: "05", label: "Model Interpretability", desc: "SHAP local feature attribution across 30 predictor variables" },
        { step: "06", label: "Deployment & AWS", desc: "Async FastAPI REST APIs with AWS & Streamlit serving" },
      ],
    },
    projectOrder: ["attrition", "quizlab", "interview", "sentiment", "startup", "businessos"],
    skillsCategoryOrder: ["ml", "viz", "programming", "deploy", "cloud"],
    resume: {
      title: "Machine Learning Resume",
      rawSummaryText: `MEET CHHUGANI
Machine Learning Engineer | NLP, Computer Vision & ML
Email: meetchhugani81@gmail.com | Phone: +91-7862806190
GitHub: github.com/MeetChhugani | LinkedIn: linkedin.com/in/meet-chhugani

PROFESSIONAL SUMMARY:
Final-year Information Technology student focused on applied machine learning for NLP, computer vision, and document intelligence. Built end-to-end ML systems using Python, Scikit-learn, PyTorch, and XGBoost, including RAG pipelines and multimodal interview analysis. Experienced in FastAPI, Streamlit, AWS, MLflow, and vector databases for experiment tracking, deployment, and production-oriented ML workflows.

EXPERIENCE:
- Data Analytics Intern (Jan 2026 – Feb 2026) @ iStudio
  Built Python data engineering pipelines and ETL processes to validate, clean, and structure raw transaction datasets, yielding a ~25% runtime-error reduction. Performed EDA utilizing SQL, Pandas, and NumPy.
- Python with Django Intern (Jun 2025 – Jul 2025) @ Brainybeam Info-Tech Pvt. Ltd.
  Developed modular Python backend components and database schemas, achieving a ~30% response-time improvement in data processing.

PROJECTS:
- Employee Risk Radar | ML Prediction & Experimentation (Python, Scikit-learn, XGBoost, PyTorch, MLflow, SHAP, Streamlit)
  Evaluated 1,470 employee samples across 30 feature variables using PyTorch & XGBoost. Addressed class imbalance using SMOTE (0.89 ROC-AUC). MLflow experiment tracking & SHAP explainability.
- QuizLab | RAG-Powered AI Learning & Information Retrieval Platform (Python, Streamlit, RAG, ChromaDB, Sentence Transformers, Groq, NLP, OCR)
  Converts uploaded PDFs into searchable vector knowledge using PyMuPDF, Sentence Transformers, and ChromaDB. 3-state adaptive difficulty state machine executing evaluation logic under 50ms.
- AI-Powered Mock Interview Analyzer | Computer Vision & Career Recommendation (Python, FastAPI, OpenCV, MediaPipe, NLP, Recommendation Systems, AWS)
  Multimodal analysis utilizing MediaPipe face mesh (468 points) and Web Audio API spectrograms (<150ms latency). Recommendation system for candidate matching. Async FastAPI on AWS.

TECHNICAL SKILLS:
- PROGRAMMING: Python, SQL
- MACHINE LEARNING: Scikit-learn, PyTorch, XGBoost, Predictive Modeling, Classification, Regression, Feature Engineering, Model Evaluation, Model Tuning
- NLP / INFORMATION RETRIEVAL: NLP, OCR, Information Extraction, RAG, Embeddings, Sentence Transformers, Semantic Search, Document Processing
- COMPUTER VISION: OpenCV, MediaPipe, Image Processing
- ML ENGINEERING: MLflow, Experiment Tracking, Model Inference, Model Deployment
- BACKEND / CLOUD: FastAPI, REST APIs, AWS
- DATABASES: PostgreSQL, MySQL, ChromaDB
- DATA / TOOLS: Pandas, NumPy, Git, GitHub, Jupyter Notebook, Streamlit

EDUCATION:
- Gyanmanjari Innovative University, Bhavnagar, Gujarat (Expected Graduation: 2027)
  Bachelor of Technology in Information Technology`.trim(),
      tabLabels: {
        experience: "Work Experience",
        projects: "Selected Projects",
        skills: "Technical Skills",
        education: "Certs & Education",
      },
      projectOrder: ["attrition", "quizlab", "interview", "sentiment", "startup"],
    },
  },
};
