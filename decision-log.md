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

_Add entries below as the project progresses. Format: date, what happened, what was decided, why._

### Day 1
- 

