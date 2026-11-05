# Cloud Deployment Documentation
## Meet Chhugani Portfolio - GMIU Cloud Computing Assignment

---

## 1. Project Overview

This portfolio demonstrates a cloud-native full-stack application showcasing:
- **Frontend**: Next.js 15 (React 19, TypeScript, Tailwind CSS v4) hosted on **Vercel**
- **Backend/API**: Next.js API Routes (serverless functions) on Vercel
- **Database**: **Supabase PostgreSQL** for persistent contact form storage
- **Email Notifications**: FormSubmit.co / Web3Forms (serverless email)
- **Python ML App**: Streamlit application (Employee Risk Radar) deployed separately on Streamlit Cloud

**Live URLs** (to be filled after deployment):
- Portfolio: `https://<your-project>.vercel.app`
- Employee Risk Radar: `https://employee-risk-radar-xexmbf3kfedcvxdrdgbnnh.streamlit.app`

---

## 2. Cloud Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Browser       │────▶│   Vercel Edge    │────▶│  Next.js API    │
│   (Client)      │     │   Network / CDN  │     │  Routes         │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                              ┌───────────────────────────┼───────────────────────────┐
                              ▼                           ▼                           ▼
                       ┌─────────────┐             ┌─────────────┐             ┌─────────────┐
                       │  Supabase   │             │  FormSubmit │             │  Web3Forms  │
                       │  PostgreSQL │             │  .co        │             │  (backup)   │
                       │  (Primary)  │             │  (Primary)  │             │  (Fallback) │
                       └─────────────┘             └─────────────┘             └─────────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │  Row Level  │
                       │  Security   │
                       │  (RLS)      │
                       └─────────────┘
```

### Data Flow

1. **User submits contact form** → Client-side validation
2. **POST `/api/contact`** → Vercel serverless function
3. **Rate limiting check** (in-memory, per IP)
4. **Input validation & sanitization**
5. **Supabase insert** (service role key, server-side only)
6. **FormSubmit.co email** → Direct to inbox
7. **Web3Forms fallback** (if configured)
8. **Response** → Success/error to client

---

## 3. Technologies & Services Used

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend Framework** | Next.js 15 (App Router) | React SSR/SSG, API routes |
| **Language** | TypeScript 5 | Type safety |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **Animation** | Framer Motion, GSAP | Smooth animations |
| **3D Graphics** | Three.js, React Three Fiber | Interactive backgrounds |
| **Database** | Supabase (PostgreSQL) | Persistent storage |
| **Database Client** | @supabase/supabase-js v2 | Type-safe DB access |
| **Email (Primary)** | FormSubmit.co | Serverless email, no API key |
| **Email (Backup)** | Web3Forms | Alternative email provider |
| **Hosting (Frontend)** | Vercel | Edge network, serverless functions |
| **Hosting (Python)** | Streamlit Cloud | ML app deployment |
| **Version Control** | Git/GitHub | Source control |
| **CI/CD** | Vercel Git Integration | Auto-deploy on push |

---

## 4. Compute Service Configuration

### Vercel (Frontend + API)

**Project Settings:**
- Framework Preset: Next.js
- Build Command: `npm run build` (uses Turbopack)
- Output Directory: `.next`
- Install Command: `npm install`
- Node.js Version: 20.x (default)

**Environment Variables (Vercel Dashboard > Settings > Environment Variables):**

| Variable | Environment | Description |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview, Development | **Secret** - Service role for API routes |
| `WEB3FORMS_ACCESS_KEY` | Production, Preview (optional) | Backup email service key |

**Vercel Features Used:**
- **Edge Network**: Global CDN for static assets
- **Serverless Functions**: API routes execute on-demand
- **Automatic HTTPS**: TLS termination at edge
- **Preview Deployments**: Every PR gets a unique URL
- **Analytics**: Vercel Analytics (optional, enable in dashboard)

### Streamlit Cloud (Python ML App)

**Repository:** `employee-risk-radar` (separate repo)
**Deployment:** Connected to GitHub, auto-deploys on push
**Secrets:** `GROQ_API_KEY` in Streamlit Cloud secrets manager
**Resources:** Shared CPU, 1GB RAM (free tier)

---

## 5. Database/Storage Configuration

### Supabase Project Setup

1. **Create Project** at https://supabase.com/dashboard
2. **Region**: Choose closest to users (e.g., `ap-south-1` for India)
3. **Database Password**: Save securely (needed for direct connections)
4. **API Keys**: Copy from Settings > API

### Table: `contact_submissions`

```sql
-- See supabase/schema.sql for complete schema
create table public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  project text,
  message text,
  created_at timestamptz not null default now(),
  ip_hash text,
  user_agent text
);

-- Indexes for query performance
create index contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
create index contact_submissions_email_idx on public.contact_submissions (email);

-- Row Level Security
alter table public.contact_submissions enable row level security;

-- Only service role can insert/read (no direct browser access)
create policy "Service role full access"
  on public.contact_submissions
  for all
  to service_role
  using (true) with check (true);

-- Block anonymous/authenticated direct inserts
create policy "Block direct browser inserts"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (false);
```

### Security Model

| Role | Permissions |
|------|-------------|
| `anon` (browser) | **None** - Cannot read/write directly |
| `authenticated` | **None** - Cannot read/write directly |
| `service_role` (API route) | **Full CRUD** - Server-side only |

**Key Security Practices:**
- Service role key **never exposed to browser**
- All database operations in server-side API route
- IP hashing for basic privacy (not stored raw)
- Input sanitization (XSS prevention)
- Rate limiting (5 req/hour/IP in-memory)

---

## 6. Database Schema

### `contact_submissions` Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, default `uuid_generate_v4()` | Unique identifier |
| `name` | `text` | NOT NULL | Sender's name |
| `email` | `text` | NOT NULL | Sender's email |
| `company` | `text` | NULL | Company/organization |
| `project` | `text` | NULL | Project focus/role |
| `message` | `text` | NULL | Full formatted message |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | Submission timestamp |
| `ip_hash` | `text` | NULL | Hashed IP for rate limiting |
| `user_agent` | `text` | NULL | Browser user agent |

### Indexes

```sql
-- For recent submissions queries (admin dashboard)
create index contact_submissions_created_at_idx on contact_submissions (created_at desc);

-- For duplicate detection / lookup by email
create index contact_submissions_email_idx on contact_submissions (email);
```

### Row Level Security Policies

```sql
-- Service role (API route) has full access
create policy "Service role full access"
  on contact_submissions for all to service_role using (true) with check (true);

-- Block direct browser access
create policy "Block direct browser inserts"
  on contact_submissions for insert to anon, authenticated with check (false);
```

---

## 7. Environment Variable Setup

### Local Development (`.env.local`)

```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Backup email
WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

**Never commit `.env.local` to Git.** It's in `.gitignore`.

### Vercel Production

1. Go to Vercel Dashboard > Project > Settings > Environment Variables
2. Add each variable for **Production**, **Preview**, and **Development**
3. Mark `SUPABASE_SERVICE_ROLE_KEY` as **Secret** (sensitive)
4. Redeploy after adding variables

### Streamlit Cloud (Python App)

1. Go to Streamlit Cloud > App > Settings > Secrets
2. Add: `GROQ_API_KEY = "your-groq-key"`

---

## 8. Local Execution Instructions

### Prerequisites
- Node.js 20+ and npm
- Git
- Supabase account (free tier)

### Setup

```bash
# 1. Clone repository
git clone https://github.com/MeetChhugani/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run Supabase schema
# Go to Supabase Dashboard > SQL Editor > New Query
# Paste contents of supabase/schema.sql and run

# 5. Start development server
npm run dev
# Opens http://localhost:3000
```

### Verify Local Setup

1. Open `http://localhost:3000`
2. Navigate to Contact section (#contact)
3. Fill and submit form
4. Check:
   - Success toast appears
   - Email received at `meetchhugani81@gmail.com`
   - Row inserted in Supabase Dashboard > Table Editor > `contact_submissions`

### Run Python App Locally (Optional)

```bash
# Separate terminal
cd path/to/employee-risk-radar
pip install -r requirements.txt
streamlit run app.py
# Opens http://localhost:8501
```

---

## 9. Deployment Instructions

### Frontend + API (Vercel)

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B: GitHub Integration (Recommended)**
1. Push repository to GitHub
2. Go to https://vercel.com/new
3. Import GitHub repository
4. Configure:
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output: `.next`
5. Add Environment Variables (see Section 7)
6. Click **Deploy**

**Post-Deployment:**
- Vercel assigns `https://<project>.vercel.app`
- Custom domain: Settings > Domains > Add
- Analytics: Enable in Vercel dashboard (optional)

### Python App (Streamlit Cloud)

1. Push `employee-risk-radar` repo to GitHub
2. Go to https://share.streamlit.io/
3. New App > Select repo/branch > `app.py`
4. Advanced Settings > Secrets:
   ```toml
   GROQ_API_KEY = "your-groq-key"
   ```
5. Deploy

---

## 10. Public URL Placeholders

| Service | URL | Status |
|---------|-----|--------|
| Portfolio (Vercel) | `https://<your-project>.vercel.app` | ☐ Deployed |
| Portfolio (Custom Domain) | `https://meetchhugani.vercel.app` | ☐ Configured |
| Employee Risk Radar (Streamlit) | `https://employee-risk-radar-xexmbf3kfedcvxdrdgbnnh.streamlit.app` | ✅ Live |
| Supabase Dashboard | `https://supabase.com/dashboard/project/<project-ref>` | ☐ Created |
| Vercel Dashboard | `https://vercel.com/<team>/<project>` | ☐ Created |

---

## 11. Resource Management & Monitoring

### Vercel Monitoring

**Built-in (Free Tier):**
- **Function Logs**: Dashboard > Functions > View logs per invocation
- **Analytics**: Enable Vercel Analytics ($10/mo after free tier) for Web Vitals
- **Speed Insights**: Free, shows Core Web Vitals
- **Usage**: Dashboard > Usage > Bandwidth, Function Execution, Edge Requests

**Key Metrics to Monitor:**
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Function Duration | < 1s | > 5s (timeout risk) |
| Function Errors | 0% | > 1% |
| Bandwidth | < 100 GB/mo | > 80% of limit |
| Edge Requests | N/A | > 1M/mo (pro tier) |

### Supabase Monitoring

**Dashboard > Reports:**
- **Database Size**: Track growth (free tier: 500 MB)
- **API Requests**: Daily/monthly request count
- **Active Connections**: Connection pool usage
- **Storage**: File storage if used

**Free Tier Limits:**
- Database: 500 MB
- Bandwidth: 2 GB/mo
- API Requests: Unlimited (fair use)
- File Storage: 1 GB

### Cost Awareness

| Service | Free Tier | Estimated Monthly Cost (if exceeded) |
|---------|-----------|--------------------------------------|
| Vercel | 100 GB bandwidth, 1M serverless invocations | $20/mo (Pro) |
| Supabase | 500 MB DB, 2 GB bandwidth | $25/mo (Pro) |
| Streamlit Cloud | Unlimited public apps | Free |
| FormSubmit.co | Unlimited | Free |
| Web3Forms | 250 submissions/mo | $10/mo |

**Current Project Estimate:** $0/mo (well within free tiers)

---

## 12. Testing Procedure

### Automated Checks

```bash
# 1. TypeScript compilation
npx tsc --noEmit

# 2. ESLint
npm run lint

# 3. Production build
npm run build

# 4. Start production server locally
npm run start
```

### Manual Test Cases

| Test | Steps | Expected Result |
|------|-------|-----------------|
| **TC-01: Form Validation (Empty)** | Submit without name/email | Error: "Name and Email are required" |
| **TC-02: Form Validation (Invalid Email)** | Enter "invalid-email" | Error: "A valid email address is required" |
| **TC-03: Form Validation (Long Input)** | Name > 100 chars | Error: "Fields exceed allowed length" |
| **TC-04: Successful Submission** | Valid name, email, company, project | Success toast, email received, DB row created |
| **TC-05: Database Persistence** | Check Supabase Table Editor | New row with correct data, `created_at` set |
| **TC-06: Rate Limiting** | Submit 6x rapidly from same IP | 6th request: 429 "Too many requests" |
| **TC-07: XSS Prevention** | Submit `<script>alert(1)</script>` | Sanitized, no script execution |
| **TC-08: Responsive Layout** | Test mobile (375px), tablet (768px), desktop | Form usable, no horizontal scroll |
| **TC-09: Build Success** | `npm run build` | Exit code 0, no errors |
| **TC-10: API Security** | Call API directly with service role key | Works; without key → 500 (env missing) |

### Test Results Template

| Test Case | Status | Notes |
|-----------|--------|-------|
| TC-01 | ☐ Pass / ☐ Fail | |
| TC-02 | ☐ Pass / ☐ Fail | |
| TC-03 | ☐ Pass / ☐ Fail | |
| TC-04 | ☐ Pass / ☐ Fail | Requires Supabase credentials |
| TC-05 | ☐ Pass / ☐ Fail | Requires Supabase credentials |
| TC-06 | ☐ Pass / ☐ Fail | |
| TC-07 | ☐ Pass / ☐ Fail | |
| TC-08 | ☐ Pass / ☐ Fail | |
| TC-09 | ☐ Pass / ☐ Fail | |
| TC-10 | ☐ Pass / ☐ Fail | Requires env vars |

---

## 13. Screenshots Checklist for GMIU Submission

### Required Screenshots

| # | Screenshot | Description | Captured |
|---|------------|-------------|----------|
| 1 | **Portfolio Homepage** | Full page showing hero, projects, contact | ☐ |
| 2 | **Contact Form** | Form with fields filled, before submit | ☐ |
| 3 | **Contact Success** | Success toast/message after submission | ☐ |
| 4 | **Supabase Table** | Dashboard > Table Editor showing submissions | ☐ |
| 5 | **Supabase Schema** | Dashboard > Table Editor > Schema view | ☐ |
| 6 | **Supabase RLS** | Dashboard > Authentication > Policies | ☐ |
| 7 | **Vercel Deployment** | Dashboard showing successful build/deploy | ☐ |
| 8 | **Vercel Environment Variables** | Settings > Environment Variables (masked) | ☐ |
| 9 | **Vercel Functions** | Functions tab showing `/api/contact` | ☐ |
| 10 | **Vercel Logs** | Function invocation log for contact submission | ☐ |
| 11 | **Streamlit App** | Employee Risk Radar live demo | ☐ |
| 12 | **Architecture Diagram** | Hand-drawn or digital (see Section 2) | ☐ |
| 13 | **GitHub Repo** | Repository with commits, branches | ☐ |
| 14 | **Local Build** | Terminal showing `npm run build` success | ☐ |
| 15 | **Mobile Responsive** | Chrome DevTools device toolbar | ☐ |

### Optional but Recommended

| # | Screenshot | Description |
|---|------------|-------------|
| 16 | **Rate Limit Test** | 429 response in Network tab |
| 17 | **Email Received** | Gmail inbox showing form submission |
| 18 | **Vercel Analytics** | Speed Insights / Web Vitals (if enabled) |
| 19 | **Supabase Usage** | Reports showing DB size, API requests |
| 20 | **CI/CD Pipeline** | Vercel build logs for a deployment |

---

## Appendix A: File Summary

### Created/Modified Files

| File | Status | Purpose |
|------|--------|---------|
| `package.json` | Modified | Added `@supabase/supabase-js` dependency |
| `src/lib/supabase.ts` | Created | Supabase client (browser + server) |
| `supabase/schema.sql` | Created | Database schema + RLS policies |
| `src/app/api/contact/route.ts` | Modified | Supabase persistence + rate limiting + email |
| `.env.example` | Created | Environment variable template |
| `CLOUD_DEPLOYMENT.md` | Created | This documentation |

### Existing Files (Unchanged)

- All frontend components (`src/components/*`)
- Portfolio data (`src/data/*`)
- Next.js config (`next.config.ts`)
- Python app (`app.py`, `requirements.txt`)

---

## Appendix B: Supabase Setup Commands

```bash
# If using Supabase CLI (optional)
npm i -g supabase
supabase login
supabase link --project-ref <your-project-ref>
supabase db push  # Applies migrations
```

Or manually run `supabase/schema.sql` in Dashboard > SQL Editor.

---

## Appendix C: Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| `Missing Supabase environment variables` | `.env.local` not configured | Copy `.env.example` to `.env.local` and fill values |
| `Failed to process your message` | Supabase key invalid or RLS blocking | Verify service role key; check RLS policies |
| `Rate limited immediately` | In-memory rate limiter resets on deploy | Wait 1 hour or redeploy (clears memory) |
| `Email not received` | FormSubmit.co delay or spam folder | Check spam; verify email in FormSubmit dashboard |
| `Build fails on Vercel` | Missing env vars in Vercel settings | Add all env vars for Production/Preview/Development |
| `CORS error` | Calling API from wrong origin | API is same-origin; check `fetch("/api/contact")` |

---

**Document Version:** 1.0  
**Last Updated:** 2026-11-05  
**Author:** Meet Chhugani  
**Course:** GMIU Cloud Computing Assignment