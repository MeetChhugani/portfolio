# PROJECT KNOWLEDGE BASE

Verified information from GitHub repository inspection (source code, READMEs, file structures, dependencies).

**Generated:** 2026-11-02  
**GitHub User:** MeetChhugani  
**Total Public Repos Inspected:** 12 (11 non-fork)

---

## REPOSITORIES MAP

| Repo Name | Status | In Portfolio | Category | Live Demo |
|-----------|--------|--------------|----------|-----------|
| InterviewAgent | ✅ Verified | ❌ Missing | AI Voice Interviewing | No (local only) |
| Voice-Calling-Agent | ✅ Verified | ❌ Missing | AI Voice Agent (Hindi) | No (local only) |
| ResumeParser | ✅ Verified | ❌ Missing | Resume-JD Matching | No (local only) |
| employee-risk-radar | ✅ Verified | ✅ Present | Explainable ML | ✅ Streamlit |
| startup-success-predictor | ✅ Verified | ❌ Missing | ML Classification | ✅ Streamlit |
| QuizLab | ✅ Verified | ✅ Present | RAG/Document Intelligence | ✅ Streamlit |
| ai-interview-analyzer | ✅ Verified | ✅ Present | Computer Vision + Audio | No (private) |
| AI-BusinessOS | ✅ Verified | ✅ Present | Backend/Enterprise | No (Docker) |
| fintech-sentiment-analyzer | ✅ Verified | ✅ Present | NLP/FinTech | ✅ Streamlit |
| retail-sales-bi-dashboard | ✅ Verified | ❌ Missing | Data Analytics/BI | No (local only) |
| portfolio | — | — | Portfolio | — |
| MeetChhugani | — | — | Profile README | — |

---

## DETAILED PROJECT SPECIFICATIONS

### 1. InterviewAgent (InterviewOS)
**GitHub:** https://github.com/MeetChhugani/InterviewAgent  
**Updated:** 2026-10-30  
**Category:** AI Voice Interviewing / Candidate Screening  
**Status:** Active development (private repo structure)

**Problem:** Automate first-round technical candidate screening with bilingual voice interviews and structured evaluation reports.

**Architecture:**
- Frontend: React + Vite + Tailwind CSS + LiveKit Components
- Backend API: FastAPI + Uvicorn
- Voice Transport: LiveKit (WebRTC)
- Agent Orchestration: LiveKit Agents
- LLM/Evaluation: Groq (LLaMA)
- Indian-language Speech: Gnani Vachana (`timbre-v2.5`, voice: Vikrant)

**Key Features:**
- Role/domain/difficulty/focus-area/question-count configuration
- Real-time voice interview via LiveKit
- One question at a time (no pre-generation)
- **Bilingual mode**: 10 questions = exactly 5 English + 5 Hindi (Devanagari) interleaved
- Push-to-talk responses + "Repeat question" action
- Per-question evaluation + final candidate screening report
- Responsive React UI with live interview states

**Environment Variables Required:**
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `GROQ_API_KEY`
- `GNANI_API_KEY` (required for Hindi/Hinglish)
- `GNANI_TTS_VOICE=Vikrant`
- `INTERVIEW_LANGUAGE_MODE=bilingual|english|hindi|hinglish`

**Run Requirements:** 3 terminals (FastAPI, LiveKit Agent, React Frontend)

**Deployment:** Cloudflare Quick Tunnels for demos; no production DB (in-memory sessions)

**Languages:** Python, TypeScript, JavaScript  
**Frameworks:** FastAPI, React, Vite, LiveKit, Tailwind CSS

---

### 2. Voice-Calling-Agent
**GitHub:** https://github.com/MeetChhugani/Voice-Calling-Agent  
**Updated:** 2026-10-29  
**Category:** AI Voice Agent / Hindi Conversational AI  
**Status:** Active development

**Problem:** Build a Hindi-first conversational voice agent for automated calling with speech recognition, LLM integration, conversation workflows, and text-to-speech.

**Tech Stack (from package.json):**
- Frontend: Next.js 16.4.3, React 19.3.0, Tailwind CSS v4
- Voice: `@vapi-ai/web` ^3.0.1, `twilio` ^6.2.0
- Database: `@supabase/supabase-js` ^2.117.3
- AI/Integrations: `googleapis` ^185.0.0, `zod` ^4.6.7
- Data: `exceljs` ^4.4.0, `xlsx` ^0.18.5
- Testing: Vitest 5.0.4

**Project Structure:**
- `src/app` — Next.js App Router pages
- `src/components` — React components
- `src/config` — Configuration
- `src/services` — Business logic services
- `src/types` — TypeScript types
- `src/utils` — Utilities
- `supabase/` — Supabase migrations/config
- `docs/` — Documentation

**Key Dependencies Indicating Features:**
- Vapi AI web SDK → Voice AI platform integration
- Twilio → Phone calling/SMS
- Supabase → Database/auth
- Google APIs → Calendar, Sheets, or other Google services
- ExcelJS/XLSX → Spreadsheet processing

**Languages:** TypeScript, JavaScript  
**Frameworks:** Next.js 16, React 19, Tailwind CSS v4

**Status:** No live demo URL found; runs locally with `npm run dev`

---

### 3. ResumeParser (Resume Matcher)
**GitHub:** https://github.com/MeetChhugani/ResumeParser  
**Updated:** 2026-10-16  
**Category:** Resume-JD Matching / HR Tech  
**Status:** Complete, functional

**Problem:** Compare candidate resumes against job descriptions to calculate match scores and hiring recommendations.

**Tech Stack:**
- Python, Streamlit
- PyPDF2 (PDF parsing)
- scikit-learn (term similarity, TF-IDF/cosine similarity)

**Features:**
- Upload resume (PDF/TXT)
- Select job role from built-in library or manage custom roles
- Edit job descriptions per opening
- Term similarity comparison (excludes generic words)
- Match score + recommendation:
  - **≥70%**: Candidate can be considered for review
  - **<70%**: Candidate needs stronger alignment
- Missing terms + interview focus points per role
- Batch screening of multiple candidates
- Download shortlist CSV
- Individual candidate profiles with matched/missing skills

**Project Structure:**
```
Resume_Matcher/
├── app.py                 # Main Streamlit app (~37KB)
├── requirements.txt       # streamlit, PyPDF2, scikit-learn
├── .streamlit/config.toml # Light theme config
└── README.md
```

**Run:** `streamlit run app.py` → http://localhost:8501

**Languages:** Python  
**Frameworks:** Streamlit, scikit-learn

---

### 4. employee-risk-radar (UPDATED METRICS)
**GitHub:** https://github.com/MeetChhugani/employee-risk-radar  
**Updated:** 2026-09-24  
**Category:** Explainable ML / HR Analytics  
**Status:** Complete, deployed

**Current Portfolio Claims vs Verified Reality:**

| Metric | Portfolio Says | Verified from README |
|--------|----------------|---------------------|
| Model | XGBoost + PyTorch | **Soft-voting Ensemble: XGBoost + LightGBM + CatBoost** (Optuna-tuned) |
| ROC-AUC | 0.89 | **0.79558** (5-fold CV) / 0.76329 (test) |
| Accuracy | Not stated | **84.35%** (test) |
| Attrition Recall | Not stated | **49.0%** (+17% over baseline) |
| Attrition F1 | Not stated | **0.50** (from 0.36 baseline) |
| Imbalance Fix | SMOTE + threshold opt | SMOTE + threshold **0.25** |
| Explainability | SHAP | SHAP (global + local) + **Hugging Face Llama 3.2 Retention Advisor** |
| Features | 30 variables | **39 features** (9 engineered HR interaction features) |

**New Verified Features:**
- Ensemble `VotingClassifier` (XGBoost, LightGBM, CatBoost)
- Optuna hyperparameter optimization
- 9 advanced engineered features: Loyalty, Burnout, Stagnation ratios, Satisfactions
- Hugging Face Llama 3.2 conversational retention chatbot
- Preset profiles: High-Risk Software Engineer, Overworked Sales Rep, Stable Executive Manager
- IBM Watson HR Dataset (WA_Fn-UseC_-HR-Employee-Attrition.csv)

**Live Demo:** https://employee-risk-radar-xexmbf3kfedcvxdrdgbnnh.streamlit.app

**Languages:** Python  
**Frameworks:** Streamlit, XGBoost, LightGBM, CatBoost, Optuna, SHAP, Hugging Face Transformers

---

### 5. startup-success-predictor (MISSING FROM PORTFOLIO)
**GitHub:** https://github.com/MeetChhugani/startup-success-predictor  
**Updated:** 2026-09-24  
**Category:** ML Classification / Startup Analytics  
**Status:** Complete, deployed

**Problem:** Predict startup success (acquisition/IPO) by analyzing traction, team pedigree, serial entrepreneurship, and investor caliber.

**Verified Metrics:**
- **Test Accuracy: 93.56%** (optimal threshold)
- **Test ROC-AUC: 0.88502** (+7.0% absolute over initial 0.81)
- **5-Fold CV ROC-AUC: 0.88623**

**Advanced Feature Engineering (23 features):**
1. **Founder Pedigree**: Serial entrepreneurship rates, PhD/MBA/Master's counts, Ivy League/Stanford/MIT/UC Berkeley alumni representation (from `relationships.csv`, `degrees.csv`)
2. **Investor Influence**: Historical deal-making volume from `investments.csv`
3. **Traction Velocities**: Funding velocity (capital/day), milestone velocity, network density (relationships/funding rounds normalized by age)
4. **Office Footprint**: Locations and branch counts from `offices.csv`

**Data Scale:** Merged relational databases mapping **196,553** companies, founders, VC investments (from initial 87,990 subset)

**Model Architecture:** Soft-voting `VotingClassifier` ensemble (tuned XGBoost + LightGBM + CatBoost)

**Tech Stack:** Python, XGBoost, LightGBM, CatBoost, Optuna, Scikit-Learn, SHAP, Streamlit, Groq API (Llama 3.3 for AI Advisor)

**Live Demo:** https://startup-success-predictor-gt794ctbxinbtaleqyfxy2.streamlit.app/

**Languages:** Python  
**Frameworks:** Streamlit, XGBoost, LightGBM, CatBoost, Optuna, SHAP

---

### 6. QuizLab
**GitHub:** https://github.com/MeetChhugani/QuizLab  
**Updated:** 2026-09-01  
**Category:** RAG / Document Intelligence / EdTech  
**Status:** Complete, deployed

**Verified from Portfolio (accurate):**
- PDF → PyMuPDF text extraction → Sentence Transformers embeddings → ChromaDB
- Sub-50ms retrieval, Groq LLM grounding
- 3-state adaptive difficulty state machine
- Document hashing, source references, persistent vector storage

**Live Demo:** https://quizlab-ed8.streamlit.app

**Languages:** Python  
**Frameworks:** Streamlit, ChromaDB, Sentence Transformers, Groq, PyMuPDF

---

### 7. ai-interview-analyzer
**GitHub:** https://github.com/MeetChhugani/ai-interview-analyzer  
**Updated:** 2026-08-18  
**Category:** Computer Vision + Audio / Multimodal AI  
**Status:** Complete

**Verified from Portfolio (accurate):**
- MediaPipe 468 facial mesh landmarks
- Web Audio API spectrogram analysis
- <150ms latency real-time processing
- FastAPI async REST APIs on AWS
- Company recommendation system

**Tech Stack:** Python, FastAPI, OpenCV, MediaPipe, NLP, Recommendation Systems, AWS, Flutter (frontend mentioned in README)

**Languages:** Python, Dart (Flutter)  
**Frameworks:** FastAPI, MediaPipe, OpenCV, AWS

---

### 8. AI-BusinessOS
**GitHub:** https://github.com/MeetChhugani/AI-BusinessOS  
**Updated:** 2026-07-21  
**Category:** Backend / Enterprise SaaS / Clean Architecture  
**Status:** Complete, Docker-ready

**Verified from Portfolio (accurate):**
- Clean Architecture: API → Services → Domain → Repositories
- FastAPI async, SQLAlchemy 2 async ORM, PostgreSQL 16, Redis
- JWT + Refresh Token Rotation (RTR) with Redis blacklist
- 7-role RBAC (Super Admin, Admin, Manager, HR, Finance, Sales, Employee)
- Alembic migrations, pytest suite, Docker Compose
- 100+ REST APIs documented
- Glassmorphic React frontend (Vite, Tailwind, TypeScript)

**Security Features:**
- Double token delivery (JSON + HttpOnly Secure Cookie)
- Refresh token rotation with replay attack detection
- Rate limiting: 100 req/min global, 10/hr login, 5/hr password recovery
- Structured JSON logging (structlog)

**Run:** `make up && make migrate && make seed && make test`

**Languages:** Python, TypeScript  
**Frameworks:** FastAPI, SQLAlchemy 2, PostgreSQL, Redis, React, Vite, Tailwind, Docker

---

### 9. fintech-sentiment-analyzer (ENHANCED DETAILS)
**GitHub:** https://github.com/MeetChhugani/fintech-sentiment-analyzer  
**Updated:** 2026-06-10  
**Category:** NLP / FinTech / Data Analytics  
**Status:** Complete, deployed

**Enhanced Verified Details:**
- **3,000+ financial headlines** correlated with index price changes
- **Markets:** NSE Nifty, BSE Sensex + 16 other global indices
- **Glassmorphic UI:** Midnight cyber theme, Outfit/Space Grotesk typography, backdrop blurs, glowing borders
- **Visualizations:** Plotly dark-theme responsive charts (donut, grouped bars, damage charts)
- **AI News Console:** Paste any headline → sentiment + market impact + target sector + reasoning (Groq LLaMA 3.3 70B)
- **Key EDA Findings:**
  - Real Estate most vulnerable (-0.99% avg return on bad news)
  - Automotive & Aerospace most resilient
  - Nifty/Sensex show "sell the rumor, buy the news" behavior
  - High-impact news alerts ≠ largest index deviations (noise-to-signal ratio)

**Project Structure:**
```
fintech-sentiment-analyzer/
├── app/app.py              # Streamlit dashboard with glassmorphic CSS
├── data/financial_news_events.csv/json/xlsx
├── notebooks/01_eda_analysis.ipynb
└── requirements.txt
```

**Live Demo:** https://fintech-sentiment-analyzer-7emjz5hnngnyfjwvmn4p3o.streamlit.app/

**Languages:** Python  
**Frameworks:** Streamlit, Plotly, Groq, Pandas

---

### 10. retail-sales-bi-dashboard (MISSING FROM PORTFOLIO)
**GitHub:** https://github.com/MeetChhugani/retail-sales-bi-dashboard  
**Updated:** 2026-06-06  
**Category:** Data Analytics / Business Intelligence  
**Status:** Complete

**Problem:** Interactive BI dashboard analyzing 1,000 retail transactions for revenue trends, customer segmentation, and category performance.

**Verified Features (from app.py):**
- **Dataset:** 1,000 transactions, 2023 data (retail_sales_dataset.csv)
- **KPI Cards:** Total Revenue, Avg Order Value, Top Category, Peak Month
- **Visualizations (Plotly):**
  - Monthly Revenue Trend (bar)
  - Revenue by Category (donut pie)
  - Revenue by Age Group (horizontal bar: 18-25, 26-35, 36-45, 46-60, 60+)
  - Revenue by Gender (bar: Male/Female)
  - Quantity Sold by Category (bar)
  - Top 10 Customers by Spend (table)
- **Filters:** Product Category, Gender, Age Group, Month Range (slider)
- **Raw Data View:** Expandable table with all filtered records
- **SQL Queries:** `queries.sql` file with analytical queries
- **Jupyter Notebook:** `retail-sales-dataset_meet.ipynb` (1.3MB) with full EDA

**Tech Stack:** Python, Streamlit, Pandas, Plotly Express/Graph Objects

**Languages:** Python, SQL  
**Frameworks:** Streamlit, Plotly, Pandas

---

## EXPERIENCE VERIFICATION

### Current Portfolio Experiences:
1. **Data Analytics Intern — iStudio** (Jan–Feb 2026)
   - Python ETL pipelines, ~25% runtime-error reduction
   - SQL, Pandas, NumPy EDA and statistical modeling

2. **Python with Django Intern — Brainybeam Info-Tech** (Jun–Jul 2025)
   - Django REST Framework endpoints, modular backend components
   - ~30% response-time improvement via query optimization

### **NEW: 3i Infotech Internship (TO ADD)**
**Period:** Current (as of 2026)  
**Role:** AI/ML Engineer Intern  
**Organization:** 3i Infotech  

**Responsibilities (from user input, mapped to verified repos):**

| Responsibility | Verified Repo Evidence |
|----------------|------------------------|
| AI/ML Development: Building practical AI-powered applications and automation solutions | InterviewAgent, Voice-Calling-Agent, ResumeParser |
| Smart CV & JD Matching: Platform analyzing resumes against JDs, eligibility scores | **ResumeParser** (70% threshold, term similarity, batch screening) |
| Notebook Integration: Working with two existing ML notebooks, understanding workflows, integrating/interchanging datasets | startup-success-predictor (notebooks), employee-risk-radar (notebook) |
| AI Voice Interviewing: Automated voice-interview platform for screening, evaluation, scoring | **InterviewAgent** (InterviewOS: LiveKit, Groq, Gnani, bilingual) |
| Cost Estimation: Expense reports for infrastructure, operational, maintenance costs for voice platform | Voice-Calling-Agent (Twilio, Vapi AI, Supabase cost considerations) |
| Hindi Voice Calling Agent: Speech recognition, LLM integration, conversation workflows, TTS | **Voice-Calling-Agent** (Next.js, Vapi AI, Twilio, Hindi-first, Gnani/Groq) |

**Distinction:**
- **Completed**: ResumeParser (deployed), InterviewAgent (functional), startup-success-predictor (deployed), employee-risk-radar (deployed)
- **Ongoing/In Progress**: Voice-Calling-Agent (active development), Hindi Voice Calling Agent (currently developing)

---

## TECHNOLOGY STACK CONSOLIDATION

### Core Languages
- **Python** — Primary (ML, Backend, Data, Scripting)
- **TypeScript/JavaScript** — Frontends (React, Next.js), Voice Agent
- **Dart** — Flutter (ai-interview-analyzer frontend)
- **SQL** — PostgreSQL, analytical queries

### AI/ML Frameworks
- **Gradient Boosting:** XGBoost, LightGBM, CatBoost, Optuna
- **Deep Learning:** PyTorch (portfolio), Hugging Face Transformers (Llama 3.2)
- **Classical ML:** Scikit-learn, Pandas, NumPy
- **Explainability:** SHAP (global + local)
- **Experiment Tracking:** MLflow (portfolio claim)

### NLP/LLM/RAG
- **LLMs:** Groq (LLaMA 3.3 70B, Llama 3.2), Hugging Face
- **Embeddings:** Sentence Transformers
- **Vector DB:** ChromaDB
- **Document Processing:** PyMuPDF, PyPDF2
- **RAG Patterns:** Semantic + metadata retrieval, adaptive difficulty state machine

### Computer Vision/Audio
- **Vision:** MediaPipe (468 landmarks), OpenCV
- **Audio:** Web Audio API (spectrograms), LiveKit (WebRTC voice)
- **Indian Language Speech:** Gnani Vachana (timbre-v2.5, Vikrant voice)

### Backend/Cloud
- **API:** FastAPI (async), Uvicorn
- **Database:** PostgreSQL 16 (asyncpg), Redis, Supabase
- **ORM:** SQLAlchemy 2 (async)
- **Auth:** JWT + Refresh Token Rotation, RBAC (7 roles), HttpOnly cookies
- **Cloud:** AWS (portfolio), Docker, Docker Compose, Cloudflare Tunnels (demo)
- **Migrations:** Alembic

### Frontend/UI
- **React 19**, Next.js 16, Vite
- **Tailwind CSS v4**, Plotly (dark theme), Streamlit
- **Glassmorphism**, custom CSS animations
- **LiveKit Components** (voice UI)

### DevOps/Tools
- Git/GitHub, Docker, Make
- pytest, Vitest, Ruff
- Structured logging (structlog)
- CI/CD: GitHub Actions (AI-BusinessOS)

---

## GAPS & DISCREPANCIES TO FIX

### Portfolio Content Updates Needed:

1. **employee-risk-radar** — Update metrics to verified ensemble numbers (0.79558 CV ROC-AUC, 84.35% accuracy, 49% recall, 39 features, Llama 3.2 advisor)

2. **Add startup-success-predictor** — High-impact ML project (93.56% accuracy, 0.885 ROC-AUC, 196K companies, 23 engineered features, ensemble)

3. **Add retail-sales-bi-dashboard** — Demonstrates data analytics/BI skills (1K transactions, Plotly, SQL, customer segmentation)

4. **Add InterviewAgent (InterviewOS)** — Flagship AI voice interviewing platform (LiveKit, bilingual, Groq, Gnani)

5. **Add Voice-Calling-Agent** — Hindi voice agent (Next.js, Vapi AI, Twilio, Supabase) — mark as "In Development"

6. **Add ResumeParser** — Smart CV/JD matcher (Streamlit, scikit-learn, 70% threshold, batch screening)

7. **fintech-sentiment-analyzer** — Enhance description with glassmorphic UI, 16 indices, AI News Console, EDA findings

8. **ai-interview-analyzer** — Verify Flutter frontend mention; confirm AWS deployment details

9. **3i Infotech Experience** — Add as consolidated internship with 6 responsibility areas mapped to verified repos

10. **Stack Domains** — Add missing technologies: LightGBM, CatBoost, Optuna, LiveKit, Vapi AI, Twilio, Supabase, Gnani, Hugging Face, Plotly, Flutter/Dart

---

## RECOMMENDED PROJECT CATEGORIZATION

### AI/ML Engineering (Core)
1. **startup-success-predictor** ⭐ NEW — Ensemble ML, 196K companies, 0.885 ROC-AUC
2. **employee-risk-radar** — Explainable ML, SHAP, Llama 3.2 advisor, ensemble
3. **InterviewAgent (InterviewOS)** ⭐ NEW — Voice AI, LiveKit, bilingual, Groq/Gnani
4. **Voice-Calling-Agent** ⭐ NEW (In Dev) — Hindi voice, Vapi AI, Twilio, Next.js

### RAG / Document Intelligence
5. **QuizLab** — ChromaDB, Sentence Transformers, Groq, <50ms retrieval
6. **ResumeParser** ⭐ NEW — CV-JD matching, term similarity, 70% threshold

### Computer Vision / Multimodal
7. **ai-interview-analyzer** — MediaPipe 468 pts, Web Audio, <150ms, FastAPI/AWS

### NLP / FinTech Analytics
8. **fintech-sentiment-analyzer** — 3K+ headlines, 16 indices, Groq LLaMA 3.3, glassmorphic UI

### Data Analytics / BI
9. **retail-sales-bi-dashboard** ⭐ NEW — 1K transactions, Plotly, SQL, customer segmentation

### Backend / Enterprise Systems
10. **AI-BusinessOS** — Clean Architecture, FastAPI, PostgreSQL, Redis, JWT/RTR, RBAC, Docker

---

## ACTION ITEMS FOR IMPLEMENTATION

### Data Files to Update:
1. `src/data/portfolioContent.ts` — Add 4 new projects, update employee-risk-radar metrics, add stack technologies
2. `src/data/contentByRole.ts` — Update projectOrder arrays, add experience, update resume text, add skills
3. `src/components/ProjectRoom.tsx` — Add ROOM_META entries for new projects

### New Components (if needed):
- None required; existing ProjectRoom + ProjectCaseStudyModal handle all projects

### Verification Checklist:
- [ ] All GitHub URLs resolve to correct repos
- [ ] All live demo URLs work (Streamlit apps)
- [ ] No fabricated metrics or claims
- [ ] Experience descriptions map to verified repo evidence
- [ ] Distinguish completed vs ongoing work clearly
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors
- [ ] Responsive layout verified