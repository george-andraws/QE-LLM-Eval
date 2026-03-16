# Decision Log — AI-Powered QE Portfolio Project

## Project Goal
Build a demonstrable portfolio project that shows hands-on experience using AI to build software, generate tests, and evaluate LLM outputs for quality engineering tasks. The end result supports candidacy for Director of Quality Engineering roles.

## Key Decisions Made

### Language & Stack
- **JavaScript/TypeScript across the entire project** (site, tests, AI scripts). Rationale: one language across all phases reduces context-switching; aligns with target company's stack; Cypress tests are JS-native.
- **Next.js** for the web framework (most popular React-based framework, Claude Code generates it well).
- **Cypress** for test automation (mature ecosystem, strong community, JS-native).

### AI & Evaluation Tools
- **Claude API + OpenAI API + Google Gemini API** for model comparison. Rationale: comparing multiple models is more valuable than using just one. Demonstrates critical evaluation mindset.
- **LLM provider abstraction layer** built into the project so models can be swapped and outputs compared side by side.
- **Langfuse** for LLM observability and evaluation. Rationale: structured tracing, scoring, and comparison of model outputs. Also used by target company — demonstrates direct tool fluency.

### Development Tools
- **Claude Code** as primary AI coding assistant (runs in terminal/VSCode).
- **GitHub Copilot** in VSCode as secondary AI code completion.
- **VSCode** as editor.
- **Git/GitHub** for version control and portfolio visibility.
- **MacBook Pro** as development machine.

### Scope Decisions
- **No CI/CD automation** — run tests manually. Rationale: CI/CD setup is not the learning goal and would consume time needed for higher-value phases.
- **No local LLM** — use cloud APIs only. Rationale: local model setup is time-intensive and produces worse output. The learning is in workflow design and model evaluation, not infrastructure.
- **Phase 2 (test case generation + model comparison via Langfuse) is the highest priority phase.** If time runs short, protect this over Phase 4.

---

## Phases

### Phase 1 — Build Simple Site with AI (Days 1–2, ~12 hrs)
**Goal:** Use Claude Code to build a simple website from a personal passion project. Run it locally.
**What it teaches:** How developers use AI as a coding partner. What AI does well (scaffolding, boilerplate) and where it struggles (architecture, subtle logic). Builds the application that all later phases depend on.
**Output:** Working local website, code on GitHub.

### Phase 2 — AI-Generated Test Cases with Model Comparison (Days 3–5, ~18 hrs)
**Goal:** Write business requirements for the site. Build an LLM abstraction layer with Langfuse integration. Send the same test-generation prompts to Claude, GPT-4, and Gemini. Evaluate outputs against a rubric.
**What it teaches:** Prompt design for QE tasks. How to critically evaluate LLM output using domain expertise. How to use Langfuse for tracing and scoring. How different models perform on the same QE task.
**Output:** Business requirements doc, LLM adapter layer, Langfuse traces with scored comparisons, evaluation rubric, written findings.
**Priority: HIGHEST — protect this phase above all others.**

### Phase 3 — AI-Written Cypress Tests (Days 6–8, ~18 hrs)
**Goal:** Use AI to generate Cypress test code from Phase 2 test cases. Get tests running against the site. Debug failures and document where AI-generated tests break.
**What it teaches:** The gap between "test case" and "working automated test." What AI gets wrong about real-world test automation (selectors, async behavior, test data, state management). How to evaluate and fix AI-generated test code.
**Output:** Working Cypress test suite (even if not 100% passing), documented analysis of AI test generation quality.

### Phase 4 — Analyze Test Results with AI (Days 9–10, ~6 hrs, simplified)
**Goal:** Build a script that sends Cypress test results to the LLM adapter and gets back structured failure analysis (bug vs. test issue vs. environment flake). Run through Langfuse for comparison.
**What it teaches:** Agentic AI workflows — AI making judgment calls, not just answering questions. How to evaluate whether AI analysis is trustworthy for QE decisions.
**Output:** Working analysis script, sample output in Langfuse.

### Phase 5 — Reflect and Package (Days 9–10, ~6 hrs, combined with Phase 4)
**Goal:** Clean up GitHub repo. Write a strong README. Compile decision log into a coherent narrative of what was learned.
**What it teaches:** How to communicate technical work to a non-technical or semi-technical audience (interviewers).
**Output:** Polished GitHub repo, README, finalized decision log.

---

## Ongoing Log


### Day 2 — 2026-03-15

**What was built:**
- Scaffolded a full Next.js 16 app (App Router, TypeScript, Tailwind) inside the `coptic-hymns/` directory.
- Defined TypeScript interfaces for the full data hierarchy: Season → Service → Hymn → Format → Variation → Content, with type guards (`isTextContent`, `isHazzatContent`).
- Built a client-side data layer: `seasons.json` lives in `public/` and is fetched once on load, then module-level cached so navigating between pages doesn't re-fetch the 10 MB file.
- Implemented the full navigation hierarchy across four route levels: home (all seasons) → season detail (services) → service detail (hymns) → hymn detail.
- Hymn detail page renders Text content as a three-column table (English / Coptic / Arabic), with Arabic set to `dir="rtl"`. Hazzat HTML is rendered below via `dangerouslySetInnerHTML`.
- Added breadcrumb navigation on all inner pages.
- Built client-side search (`/search?q=…`) that scans all paragraph text across all hymns and returns results with match snippets and inline highlighting.
- Added `@font-face` rules and global CSS classes for all seven font types used in the hazzat HTML: `CopticFont` (CS Copt.ttf), `HazzatFont` / `Hazzat` (hazzat1_10a.ttf), `HazzatVFont`, `HazzatAFont`, `EnglishFont`, `ArabicFont` (Noto Sans Arabic via Google Fonts).

**Issues identified and resolved:**
1. **English Hazzat not rendering in musical notation font.** Root cause: English hazzat HTML uses `style="font-family: Hazzat, sans-serif"` as an inline style, not a CSS class — so the `.HazzatFont` class rule had no effect on it. Fix: added a second `@font-face` declaration with `font-family: "Hazzat"` (matching the inline style name exactly) pointing to the same `hazzat1_10a.ttf` file.
2. **Coptic text column rendering in Courier.** Root cause: the table cell had a `font-mono` Tailwind class applied, which overrides font to a monospace stack. Fix: removed `font-mono` and replaced it with the global `CopticFont` class, which applies `font-family: "CopticFont", serif` (CS Copt.ttf).

**Observations about AI-assisted development (relevant to Phase 2):**
- Claude Code scaffolded navigation, types, data fetching, and search correctly in one pass with no iteration needed.
- The font rendering bugs required human observation from the browser — Claude Code could not detect them without being told what was visually wrong. This is a meaningful limitation: AI can generate correct-looking code that fails in ways only visible at runtime or in the rendered UI.
- The inconsistent casing in the JSON (`"English"` vs `"english"`, `HazzatFont` vs `hazzatfont`) and the mix of CSS class vs. inline style in the hazzat HTML are real-world data quality issues that required inspection and defensive handling. AI handled the normalization cleanly once the problem was described.

### Day 1 - used Claude AI to generate requirements and prompt for Claude Code in VSCode to create html site
- Setup dev environment: VSCode, node.js via nvm, Copilot, Claude Code, etc. Rusty but feels great to have a fresh start.
- **Chose Coptic Hymns site as the passion project.** Data source: `seasons.json` (10.4 MB, 32 seasons, 564 hymns, trilingual English/Coptic/Arabic). Modeled after hazzat.com. Rich enough for meaningful test cases in Phase 2, personally meaningful.
- **Scope: Text content only for MVP.** I gave Claude Code AI coding assistant a structured prompt and had a functional site with trilingual rendering, custom font support, and full-text search running locally. First pass took 10 minutes. Updating fonts and column display issues took another 10 minutes.
- **Runtime JSON loading over build-time.** Tradeoff: slightly slower page loads vs. simpler development loop (edit JSON → refresh browser). Chose simplicity since the site runs locally and the learning goal is AI-assisted development, not production performance.
- **Font strategy:** Hazzat HTML content uses 7 CSS classes (HazzatFont, CopticFont, EnglishFont, etc.) mapped to .ttf font files available as freeware from hazzat.com. Plan: download fonts, add @font-face rules. Deferred to after core navigation works. Claude handled the changes well and even an update to switch hazzat from displaying above-below to side-by-side.
