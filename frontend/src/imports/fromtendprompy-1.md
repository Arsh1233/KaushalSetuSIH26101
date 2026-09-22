Design and prototype a complete end-to-end government learning and competency intelligence web application called:

KAUSHALSETU
“Bridging Skill Gaps, Building Capability”

Context:
KaushalSetu is an AI-powered competency intelligence and learning platform for officials working in India's Official Statistical System.

The platform integrates with iGOT Karmayogi, NSSTA/TPAC training programmes and departmental learning content.

The goal is NOT to create another generic LMS.

The key differentiator is:

“Don’t just know what they learned. Know what they can do.”

The platform should demonstrate:
1. Evidence of Capability
2. Evidence-Adaptive Assessment
3. Role Readiness Engine
4. Competency Confidence & Freshness
5. Learning → Application → Proof
6. Minimum Learning Path

Create a highly polished, realistic, clickable frontend prototype using seeded/mock data.

IMPORTANT:
- This is a prototype, not a production backend.
- Use realistic seeded Indian government employee data.
- Simulate AI recommendations, assessments, competency scores and analytics using static/mock data.
- All buttons, cards, filters, tabs and navigation should work within the prototype.
- Prioritize usability and clarity over visual complexity.
- The application should feel suitable for Indian government officials aged approximately 25–60.
- Avoid flashy startup-style UI.
- Avoid excessive gradients, glassmorphism, animations or decorative elements.
- Use a clean, trustworthy, institutional design language.

==================================================
DESIGN SYSTEM
==================================================

Overall style:
- Clean
- Professional
- Government-grade
- Accessible
- Calm
- Minimal cognitive load
- High readability
- Desktop-first responsive web application

Visual language:
- White/light neutral background
- Deep navy / government blue as primary
- Subtle teal/green accent for positive competency states
- Amber for attention/warning
- Red only for critical gaps
- Very subtle shadows
- Rounded corners, but not overly rounded
- Strong information hierarchy
- Large readable typography

Typography:
- Use Inter or a similar highly readable sans-serif.
- Support Devanagari/Hindi text.
- Minimum body text size around 14–16px.
- Avoid tiny dashboard text.

Accessibility:
- WCAG-conscious contrast
- Clear focus states
- Large clickable areas
- Icons always paired with text where necessary
- Do not rely only on colour to communicate status
- Tooltips for unfamiliar concepts
- Clear empty/loading/error states

Header:
- KaushalSetu logo/name on left
- Government / MoSPI style institutional identity
- Global search
- Language selector: English / हिन्दी
- Notifications
- Help
- User profile menu

Primary navigation:
- Home
- My Competencies
- Skill Gaps
- Learning Path
- Assessments
- Evidence
- Role Readiness
- Resources

Admin navigation:
- Overview
- Workforce
- Competencies
- Skill Gaps
- Training Analytics
- Emerging Skills
- Content & Assessments
- Reports

==================================================
CORE PRODUCT CONCEPT
==================================================

Make the central product loop visually consistent throughout the application:

PROFILE
↓
EVIDENCE
↓
CONFIDENCE
↓
GAP
↓
MINIMUM LEARNING
↓
PRACTICE
↓
PROVE
↓
UPDATE
↓
ROLE READINESS

Use this loop as the conceptual backbone.

Important:
Do NOT make “course completion” the main success metric.

The primary outcome is:
PROVEN CAPABILITY + ROLE READINESS.

==================================================
SEEDED USERS
==================================================

Create 10 realistic seeded officials.

Use fictional names and clearly mark them as demo data.

Department:
Ministry of Statistics & Programme Implementation / Official Statistical System

Officials:

1. Ananya Sharma
   Role: Statistical Officer
   Experience: 6 years
   Competencies: Sampling, Survey Design, Excel, R
   Main gap: Python
   Readiness: 82%

2. Rajesh Kumar
   Role: Data Analyst
   Experience: 8 years
   Competencies: SQL, Python, Data Visualization
   Main gap: Statistical Methodology
   Readiness: 88%

3. Priya Nair
   Role: Statistical Investigator
   Experience: 4 years
   Competencies: Survey Design, Sampling
   Main gap: GIS
   Readiness: 74%

4. Arjun Mehta
   Role: Senior Statistical Officer
   Experience: 12 years
   Competencies: National Accounts, Sampling, R
   Main gap: AI/ML
   Readiness: 91%

5. Kavita Singh
   Role: Statistical Officer
   Experience: 7 years
   Competencies: Labour Statistics, SQL
   Main gap: Data Visualization
   Readiness: 79%

6. Vivek Rao
   Role: Data Processing Officer
   Experience: 5 years
   Competencies: SQL, Python
   Main gap: Cloud Computing
   Readiness: 76%

7. Neha Verma
   Role: Research Officer
   Experience: 3 years
   Competencies: R, Statistics, Survey Design
   Main gap: Big Data Analytics
   Readiness: 68%

8. Suresh Iyer
   Role: Deputy Director
   Experience: 15 years
   Competencies: Leadership, National Accounts, Project Management
   Main gap: Digital Governance
   Readiness: 87%

9. Meena Das
   Role: Statistical Officer
   Experience: 9 years
   Competencies: Agricultural Statistics, GIS
   Main gap: AI/ML
   Readiness: 81%

10. Rohit Gupta
    Role: Data Analyst
    Experience: 2 years
    Competencies: Python, SQL
    Main gap: Statistical Quality Frameworks
    Readiness: 64%

Create realistic competency values from 1–5 and evidence confidence values from 0–100%.

==================================================
USER ROLE 1 — OFFICIAL
==================================================

Create a complete employee experience.

Default logged-in user:
Ananya Sharma
Statistical Officer
6 years experience

------------------------------------
SCREEN 1 — LOGIN
------------------------------------

Create a government-style login screen.

Elements:
- KaushalSetu logo
- “Official Login”
- SSO login button
- Demo Login
- English / हिन्दी
- Security/privacy note

For prototype:
Clicking “Demo Login” enters the official dashboard.

------------------------------------
SCREEN 2 — OFFICIAL DASHBOARD
------------------------------------

Create a simple executive dashboard.

Top greeting:
“Good morning, Ananya.”

Show:

Overall Role Readiness
82%

Competency Confidence
87%

Critical Skill Gaps
2

Learning Progress
64%

Learning Hours Saved
4.5 hrs

Main section:
“Your Capability Journey”

Show:
PROFILE → EVIDENCE → GAP → LEARN → PROVE → READY

Use a visual progress tracker.

Section:
“Top Capability Gaps”

Cards:
- Python for Statistical Analysis
  Current: 2.4/5
  Required: 4/5
  Gap: High
  Confidence: 72%

- Data Visualization
  Current: 3.1/5
  Required: 4/5
  Gap: Medium

Section:
“Recommended for You”

Show 3 highly targeted learning recommendations.

Each card:
- Course title
- Provider: iGOT / NSSTA / Department
- Duration
- Competency addressed
- Expected competency gain
- Why recommended
- Start button

IMPORTANT:
Show “Why this is recommended” rather than just generic recommendations.

Example:
“Recommended because Python is a critical competency for your current role and your current evidence confidence is low.”

------------------------------------
SCREEN 3 — MY COMPETENCIES
------------------------------------

Create a competency passport.

Header:
“My Competency Passport”

Show competency categories:

STATISTICAL
- Survey Design
- Sampling
- Data Quality
- Labour Statistics
- National Accounts

TECHNICAL
- Python
- R
- SQL
- Data Visualization
- GIS

DIGITAL GOVERNANCE
- Cybersecurity
- Data Privacy
- Cloud

BEHAVIOURAL
- Leadership
- Communication
- Project Management

For each competency show:

Competency level
Required level
Confidence
Evidence count
Freshness
Status

Example:

Python
Level: 2.4 / 5
Required: 4.0
Confidence: 72%
Evidence: 3
Freshness: 3 months
Status: Gap

Clicking a competency opens its detail page.

------------------------------------
SCREEN 4 — COMPETENCY DETAIL
------------------------------------

Example: Python for Statistical Analysis

Show:

Current competency: 2.4/5
Required: 4/5
Confidence: 72%
Freshness: 3 months

Visual progression:

2.4 ───────────── 4.0
Current             Required

Evidence:
✓ Diagnostic assessment
✓ iGOT course completion
✓ Practical exercise

Missing evidence:
! Real-world statistical data processing task

Section:
“Why is my confidence 72%?”

Explain:
- 2 assessments
- 1 practical task
- course completed
- no recent workplace evidence

Section:
“Recommended validation”
“Complete a 15-minute practical task”

Button:
“Validate Capability”

------------------------------------
SCREEN 5 — SKILL GAPS
------------------------------------

Show prioritized gaps.

Use categories:

CRITICAL
HIGH
MEDIUM
LOW

Each gap should show:

Competency
Current
Required
Gap
Role impact
Confidence
Estimated learning time

Example:

Python for Statistical Analysis
2.4 → 4.0
Gap: 1.6
Role Impact: High
Confidence: 72%
Estimated intervention: 45 min

Button:
“View Minimum Learning Path”

------------------------------------
SCREEN 6 — MINIMUM LEARNING PATH
------------------------------------

This is a key USP screen.

Title:
“Minimum Learning Path”

Subtitle:
“The shortest targeted path to close this capability gap.”

Show:

CURRENT:
Python — 2.4/5

TARGET:
Python — 4.0/5

Recommended intervention:

1. iGOT Micro Module
   20 min

2. Guided Practice
   15 min

3. Practical Task
   10 min

4. Validation
   5 min

TOTAL:
50 minutes

Expected result:
Competency confidence: 72% → 88%

Show:
“Why not a full course?”

Answer:
“Existing evidence already demonstrates foundational Python capability. Only statistical data-processing skills require validation.”

Buttons:
“Start Path”
“View Evidence”

------------------------------------
SCREEN 7 — LEARNING DETAIL
------------------------------------

Show a realistic course page.

Provider:
iGOT Karmayogi

Title:
“Python for Statistical Data Processing”

Show:
- Duration
- Difficulty
- Competency
- Learning outcomes
- Why recommended
- Progress
- Modules

Button:
“Start Learning”

Also show:
“Alternative: NSSTA Recommended Programme”

------------------------------------
SCREEN 8 — ASSESSMENT
------------------------------------

Create adaptive assessment UI.

Header:
“Capability Validation”

Show:
Competency:
Python for Statistical Analysis

Question types:
- MCQ
- Scenario-based question
- Practical task

Show a progress indicator.

Important:
The interface should feel simple and non-intimidating.

After submission:
Show instant feedback.

Example:
“Correct”

Explanation:
Short explanation.

Update:
Confidence 72% → 79%

------------------------------------
SCREEN 9 — PRACTICAL TASK
------------------------------------

Create a simple simulated practical task.

Example:
“Identify the appropriate Python operation for cleaning missing values in a survey dataset.”

Show:
- Problem statement
- Sample dataset preview
- Task
- Submit button
- Hint
- Expected competency

After submission:
Show:
“Capability demonstrated”

Evidence added:
“Practical Task — Python Data Cleaning”

Confidence:
79% → 88%

------------------------------------
SCREEN 10 — EVIDENCE
------------------------------------

Create an “Evidence of Capability” page.

Title:
“My Capability Evidence”

Evidence cards:

Assessment
Practical Task
Course
Project
Supervisor Validation

Each evidence item shows:
- Type
- Competency
- Date
- Score
- Source
- Verification
- Freshness

Example:

✓ Practical Task
Python Data Cleaning
Score: 91%
Verified
2 days ago

Show evidence timeline.

------------------------------------
SCREEN 11 — ROLE READINESS
------------------------------------

This is another key USP.

Title:
“Role Readiness”

Target role:
Statistical Officer

Show large score:

82%
ROLE READY

Breakdown:

Statistical Competencies 91%
Technical Competencies 76%
Digital Governance 83%
Behavioural 88%

Show:
“Role-blocking gaps”

1. Python
2. Data Visualization

Show:
“What will make you role-ready?”

A short targeted action list.

------------------------------------
SCREEN 12 — COMPETENCY UPDATE
------------------------------------

After completing learning and practical validation, show a success state.

Before:
Python 2.4/5
Confidence 72%

After:
Python 3.7/5
Confidence 88%

Role readiness:
82% → 89%

Use a clear “Capability Improved” confirmation.

Do NOT use gamification-heavy animations.

------------------------------------
SCREEN 13 — AI QUIZ GENERATOR
------------------------------------

Create trainer/admin-facing AI assessment generator.

Title:
“AI Assessment Generator”

Upload:
PDF
PPT
DOCX
Video

Show uploaded example:
“Survey Sampling Fundamentals.pdf”

Options:
Number of questions
Difficulty
Question type
Competency
Language

Button:
“Generate Assessment”

Show generated questions.

Every generated question must show:

Question
Options
Correct answer
Explanation
Source page
Competency tag
Difficulty
AI confidence
Human review status

Example:
Source: Page 14
Competency: Sampling
Difficulty: Medium
Status: Needs Review

Add:
“Regenerate”
“Edit”
“Approve”

------------------------------------
SCREEN 14 — AI QUIZ REVIEW
------------------------------------

Show trainer reviewing generated questions.

Include:
- Question
- Source
- Answer
- Explanation
- Competency
- Difficulty

Buttons:
Approve
Edit
Reject

Show source traceability.

------------------------------------
USER ROLE 2 — DEPARTMENT ADMIN
====================================

Create a separate Admin Dashboard.

Use a fictional department:
“Department of Official Statistics”

Admin:
“Dr. Vikram Menon”
Role:
Department Training Administrator

------------------------------------
SCREEN 15 — ADMIN OVERVIEW
------------------------------------

Show organization-wide KPIs:

Officials:
10

Average Role Readiness:
79%

Average Competency Confidence:
82%

Critical Skill Gaps:
14

Training Completion:
74%

Capability Improvement:
+18%

Learning Hours Saved:
37 hrs

Main chart:
“Competency Distribution”

Show:
Beginner
Developing
Proficient
Advanced

------------------------------------
SCREEN 16 — WORKFORCE CAPABILITY
------------------------------------

Table of all 10 officials.

Columns:

Official
Role
Readiness
Top Gap
Confidence
Learning Progress
Status

Allow:
- Search
- Filter by role
- Filter by competency
- Sort by readiness
- Sort by critical gaps

Click an official → open detailed capability profile.

------------------------------------
SCREEN 17 — OFFICIAL DETAIL — ADMIN VIEW
------------------------------------

Show selected official:

Ananya Sharma

Profile
Role
Experience
Competency distribution
Skill gaps
Evidence
Learning history
Role readiness

Admin can see:

“Why is this competency score high/low?”

Show evidence behind every score.

------------------------------------
SCREEN 18 — TRAINING EFFECTIVENESS
------------------------------------

Show:

Course / Programme
Participants
Completion
Average competency gain
Capability validation rate

Example:

Python for Statistical Analysis

Participants: 32
Completion: 84%
Competency gain: +21%
Capability validated: 76%

Key insight:
“Course completion is high, but practical capability validation is lower.”

This should demonstrate that KaushalSetu measures capability rather than attendance.

------------------------------------
SCREEN 19 — EMERGING SKILLS
------------------------------------

Create an “Emerging Skill Radar”.

Show emerging skills:

AI/ML
Big Data Analytics
Cloud Computing
GIS
Data Visualization
Cybersecurity

For each:
Current workforce capability
Future requirement
Gap
Priority

Example:

AI/ML
Current: 2.1/5
Future requirement: 4.0/5
Gap: 1.9
Priority: Critical

------------------------------------
SCREEN 20 — DEPARTMENT TRAINING PLANNER
------------------------------------

Admin can select:

Department
Role
Competency
Priority

System recommends:

- iGOT courses
- NSSTA programmes
- Departmental content
- Minimum learning interventions

Show expected workforce impact.

Example:

“Training 12 officers in Python could improve workforce readiness by approximately 11%.”

------------------------------------
SCREEN 21 — CONTENT LIBRARY
------------------------------------

Admin can upload/manage:

PDF
PPT
DOCX
Video

Show:
- Content
- Competencies
- Language
- Questions generated
- Review status

Buttons:
Upload
Generate Quiz
Edit
Publish

------------------------------------
SCREEN 22 — REPORTS
------------------------------------

Create a clean reporting dashboard.

Reports:
- Workforce competency report
- Skill gap report
- Training effectiveness
- Role readiness
- Emerging skills
- Learning hours
- Evidence coverage

Allow:
Export PDF
Export CSV

==================================================
GLOBAL INTERACTIONS
==================================================

Make the prototype genuinely clickable.

Navigation:
- Sidebar navigation works
- Breadcrumbs work
- Back buttons work
- Dashboard cards open relevant details

Interactions:
- Search officials
- Filter competencies
- Sort tables
- Open competency details
- Open evidence
- Start learning
- Start assessment
- Submit assessment
- Complete practical task
- Update competency
- View role readiness
- Generate quiz
- Review quiz
- Switch employee/admin view
- Toggle English/Hindi
- Open notifications
- Open help

Use realistic loading, success, empty and error states where appropriate.

==================================================
AI SIMULATION
==================================================

Since this is a frontend prototype, simulate AI capabilities using seeded data.

Examples:

AI Recommendation:
“Recommended because Python is a high-priority competency for your role and current confidence is below the required threshold.”

AI Gap Detection:
“Your current evidence indicates a 1.6-level gap in Python for Statistical Analysis.”

AI Adaptive Assessment:
“Existing evidence is sufficient for foundational Python. A 10-minute practical validation is recommended.”

AI Quiz Generation:
Generate 5–10 realistic questions from the uploaded sample document.

AI Explanation:
Show concise explanations for answers.

AI Workforce Insight:
“Data Visualization is the most common technical competency gap across the department.”

==================================================
DEMO DATA
==================================================

Seed all screens consistently.

Use the 10 officials listed above.

Create realistic:
- Competency scores
- Evidence records
- Learning history
- Course recommendations
- Assessment results
- Role readiness
- Skill gaps

Ensure dashboard totals are consistent with the seeded data.

Use fictional/demo data only.

Clearly label:
“Prototype / Demo Data”

==================================================
KEY UX PRINCIPLES
==================================================

1. A government official should understand the dashboard within 10 seconds.

2. Avoid information overload.

3. Use progressive disclosure:
Show summary first → details on click.

4. Every AI recommendation should explain WHY.

5. Every competency score should have traceable evidence.

6. Every skill gap should lead to an actionable next step.

7. Every learning recommendation should show:
   - Why recommended
   - Duration
   - Expected benefit

8. Keep the number of primary actions per screen low.

9. Use plain language rather than technical AI terminology.

10. Do not make the interface feel like a consumer social-learning platform.

==================================================
DESIGN THE MAIN “WOW” SCREENS
==================================================

Give special visual attention to these 5 screens:

1. Official Dashboard
2. Evidence of Capability
3. Minimum Learning Path
4. Role Readiness
5. Admin Workforce Intelligence

These should be the strongest screens for a Smart India Hackathon presentation.

==================================================
FINAL PROTOTYPE STORY
==================================================

The entire prototype should demonstrate this narrative:

An official logs in
↓
KaushalSetu understands their role
↓
Builds competency profile
↓
Uses existing evidence
↓
Calculates competency confidence
↓
Identifies critical gaps
↓
Avoids unnecessary testing
↓
Creates the minimum learning path
↓
Connects to iGOT / NSSTA / departmental content
↓
Official learns and practices
↓
Capability is proven through assessment/practical evidence
↓
Competency is updated
↓
Role readiness increases
↓
Department admin sees workforce capability improvement

The final product should visually communicate:

“From Learning Records → To Proven Capability.”

Do not design this as a generic LMS.

Design it as a trustworthy, simple, evidence-driven competency intelligence platform for the Government of India.