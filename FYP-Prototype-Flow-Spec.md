# Prototype Specification — Complete System Flow
### For building a prototype that matches the approved idea exactly, without deviation

**How to use this document:** Section 2 gives the high-level picture. Sections 3–5 each contain a navigation flow diagram (follow it exactly), a screen-by-screen table (build every row — nothing extra, nothing missing), and callouts for approved additions. Section 6 covers the flow that connects all three modules. Section 7 is a non-negotiable checklist — check every box before presenting the prototype.

*(Diagrams are written in Mermaid syntax. They render natively on GitHub, GitLab, Obsidian, Notion, VS Code with the Mermaid extension, and most modern Markdown viewers.)*

---

## 1. Scope

This prototype covers three independent modules:
1. **Teacher Module**
2. **Student Module**
3. **Competition Mode** (standalone)

No database schema is included here — this document is purely the functional/navigational flow.

---

## 2. High-Level System Flow

```mermaid
flowchart TD
    A[Landing Page] --> B[Sign Up / Login as Teacher]
    A --> C[Sign Up / Login as Student]
    A --> D[Competition Mode - Organizer Login]
    A --> E[Guest Entry - Quiz/Competition Code, No Login]

    B --> TM[Teacher Module]
    C --> SM[Student Module]
    D --> CM[Competition Mode]
    E -- "join with QR/PIN" --> TM
    E -- "join with QR/PIN" --> CM

    TM -- "shares class/quiz code" --> SM
    TM -- "creates competition" --> CM
    SM -- "own Room competitions" --> SM
```

**Key principle:** Teacher and Student modules are fully independent. A teacher never directly accesses a student's account, and a student can use the entire platform (self-learning + quizzes + Room) without ever being added to a teacher's class.

---

## 3. Teacher Module

### 3.1 Navigation Flow

```mermaid
flowchart TD
    T0[Teacher Dashboard] --> T1[Prepare a Lecture]
    T0 --> T2[Classes]
    T0 --> T3[Reports]
    T0 --> T4[Create a Competition]
    T0 --> T5[Create Slides]
    T0 --> T6[Create a Quiz]
    T0 --> T7[Profile]

    T1 --> T1a[Fill Topic Form]
    T1a --> T1b[AI Generates Lecture Plan]
    T1b --> T1c{Teacher Reviews Plan}
    T1c -- Edit --> T1d[Teacher Edits Plan]
    T1d --> T1e[AI Follows Updated Plan]
    T1c -- Approve As-Is --> T1e
    T1e --> T1f{Create Slides?}
    T1f -- Yes --> T5
    T1f -- No --> T0

    T2 --> T2a[Create New Class]
    T2 --> T2b[Created Classes List]
    T2a --> T2a1[Form: Dept/Class, Section, Subject]
    T2a1 --> T2b
    T2b --> T2c[Class Detail Page]
    T2c --> T2c1[Sections]
    T2c --> T2c2[Class Reports and Progress]
    T2c --> T2c3[Assign Quiz with Deadline]
    T2c --> T2c4[Send Announcements]
    T2c --> T2c5[Per-Student Drill-down]
    T2c --> T2c6[Class Join Code / QR]

    T3 --> T3a[List of Standalone Quiz Results]

    T4 --> T4a[Configure: Groups or Single Students]
    T4a --> T4b[Generate Questions]
    T4b --> T4c[Publish / Host Live Session]

    T5 --> T5a[Select Template]
    T5a --> T5b[System Auto-fills Template with Data]
    T5b --> T5c[Preview, Edit, Export]

    T6 --> T6a{Objective or Subjective?}
    T6a -- Objective --> T6b[Configure Question Types: MCQ, True/False, others]
    T6a -- Subjective --> T6c[Configure Subjective Questions]
    T6b --> T6d[Publish: Assign to Class OR Standalone QR/PIN]
    T6c --> T6d

    T7 --> T7a[Account Settings]
    T7 --> T7b[Subscription / Upgrade Plan]
    T7 --> T7c[Quota Usage Indicator]
    T7 --> T7d[Weekly Timetable / Calendar]
    T7 --> T7e[Subjective Grading Override]
```

### 3.2 Screen Specification

| # | Screen | Purpose | Key Elements | Navigates To |
|---|---|---|---|---|
| 1 | Dashboard | Consolidated overview | Recent classes, recent quizzes, quota usage widget, notifications | All other teacher screens |
| 2 | Prepare a Lecture | Get an AI lecture plan | Topic form → AI plan viewer/editor → "Create Slides?" prompt | Create Slides (optional) |
| 3 | Classes → Create New Class | Start a new class | Form: department/class, section, subject | Created Classes list |
| 4 | Classes → Created Classes | Manage existing classes | List of classes, each opens to detail | Class Detail |
| 5 | Class Detail | Manage one class | Sections, reports/progress, assign quiz, announcements, per-student drill-down, join code/QR | Assign Quiz flow |
| 6 | Reports | View standalone (non-class) quiz results | List of quizzes taken outside any class, with scores/analytics | — |
| 7 | Create a Competition | Launch a gamified quiz | Group/single config, question generation, publish/host | Live hosting screen |
| 8 | Create Slides | Build slides from a template | Template picker, auto-filled content, preview/edit/export | — |
| 9 | Create a Quiz | Direct quiz creation | Objective/subjective toggle, question type config, publish (class or QR/PIN) | Class Detail (if assigned) or standalone link |
| 10 | Profile | Account and plan management | Settings, subscription/upgrade, quota indicator, weekly timetable, grading override toggle | — |

### 3.3 Approved Additions (must be included)
- Class join code/QR generation
- Assign quiz to class with a deadline
- Subjective grading override (teacher can edit AI-assigned grades before finalizing)
- Announcements to a class
- Weekly timetable/calendar
- Per-student drill-down within class reports
- Subscription/upgrade screen + quota usage indicator

### 3.4 Explicitly Excluded
- Question bank/library (declined — do not build)

---

## 4. Student Module

### 4.1 Navigation Flow

```mermaid
flowchart TD
    S0[Student Dashboard] --> S1[My Classes]
    S0 --> S2[Learn a Topic]
    S0 --> S3[Take a Quiz]
    S0 --> S4[Room]
    S0 --> S5[Profile]

    S1 --> S1a[Join a Class via Code/QR]
    S1a --> S1b[Joined Classes List]
    S1b --> S1c[Class Detail: Quizzes and Tasks]
    S1c --> S1d[Attempt Assigned Quiz]
    S1d --> S1e[Results + Wrong-Answer Review]

    S2 --> S2a[Enter Topic]
    S2a --> S2b[AI Generates Learning Plan]
    S2b --> S2c{Student Confirms Plan}
    S2c -- Edit --> S2d[Student Edits Plan]
    S2d --> S2e[Learning Begins]
    S2c -- Confirm As-Is --> S2e
    S2e --> S2f[Topic Content Delivered]
    S2f --> S2g[Practice Quiz After Topic]
    S2g --> S2h{More Topics Remaining?}
    S2h -- Yes --> S2f
    S2h -- No --> S2i[Plan Complete - Saved to My Library]

    S3 --> S3a[Fill Quiz Request Form]
    S3a --> S3b{Objective or Subjective?}
    S3b --> S3c[Attempt Quiz]
    S3c --> S3d[Results + Wrong-Answer Review]

    S4 --> S4a{Join or Create}
    S4a -- Join --> S4b[Enter Room Code]
    S4a -- Create --> S4c[Configure Single or Group Competition]
    S4b --> S4d[Live Competition]
    S4c --> S4d
    S4d --> S4e[Live Leaderboard]
    S4e --> S4f[Final Results]

    S5 --> S5a[Account Settings]
    S5 --> S5b[Subscription / Upgrade Plan]
    S5 --> S5c[Notifications / Reminders]
    S5 --> S5d[My Library / Learning History]
```

### 4.2 Screen Specification

| # | Screen | Purpose | Key Elements | Navigates To |
|---|---|---|---|---|
| 1 | Dashboard | Summarized overview | Joined classes snapshot, recent activity, quota/notifications | All other student screens |
| 2 | My Classes → Join | Join a teacher's class | Code entry / QR scanner | Joined Classes list |
| 3 | My Classes → List | View joined classes | List of classes, each with pending quizzes/tasks | Class Detail |
| 4 | Class Detail | Attempt class-assigned work | List of quizzes/tasks with deadlines | Quiz attempt screen |
| 5 | Learn a Topic | Self-paced learning | Topic input → AI plan → confirm/edit → topic content → per-topic practice quiz | My Library (on completion) |
| 6 | Take a Quiz | Standalone practice quiz | Form (topic/details), objective/subjective choice, attempt, results | Wrong-answer review |
| 7 | Room | Peer competition | Join or create (single/group), live play, live leaderboard, final results | — |
| 8 | Profile | Account and plan management | Settings, subscription/upgrade, notifications, learning history/library | — |

### 4.3 Approved Additions (must be included)
- Explicit "Join a Class" action (code/QR)
- Wrong-answer review with explanations after any quiz
- My Library / Learning history (revisit past plans without regenerating)
- Notifications/reminders
- Subscription/upgrade screen

---

## 5. Competition Mode (Standalone)

### 5.1 Navigation Flow

```mermaid
flowchart TD
    C0[Competition Dashboard - Live Leaderboard] --> C1[Create Competition]
    C0 --> C2[Results]
    C0 --> C3[Profile]

    C1 --> C1a[Fill Form: Simple or Game-style]
    C1a --> C1b[Team Formation: Auto / Self-select / Host-assigned]
    C1b --> C1c[Generate Objective Questions - AI or Manual]
    C1c --> C1d[Publish: Share Join Code / QR]
    C1d --> C1e[Lobby - Participants Join, No Login Needed]
    C1e --> C1f[Host Starts Live Session]
    C1f --> C1g[Host Live Controls: Pause / Skip / Extend Time]
    C1g --> C1h[Live Leaderboard Updates in Real Time]
    C1h --> C1i[Competition Ends]
    C1i --> C1j[Final Results + Certificates]
    C1j --> C2

    C2 --> C2a[Past Competitions List]
    C2a --> C2b[Competition Detail: Leaderboard History, Export]

    C3 --> C3a[Account Settings]
    C3 --> C3b[Subscription / Upgrade Plan]
```

### 5.2 Screen Specification

| # | Screen | Purpose | Key Elements | Navigates To |
|---|---|---|---|---|
| 1 | Dashboard | Live overview | Live leaderboard, panel data | Create Competition, Results |
| 2 | Create Competition | Set up a competition | Format config, team formation, question generation, publish/share code | Lobby → Live session |
| 3 | Lobby | Pre-game holding screen | Joined participants list, "Start" button (host only) | Live session |
| 4 | Live Session | Run the competition | Question display, live rank updates, host controls (pause/skip/extend) | Final Results |
| 5 | Results | Post-competition record | Past competitions list, detail view with leaderboard history and export | — |
| 6 | Profile | Account and plan management | Settings, subscription/upgrade | — |

### 5.3 Approved Additions (must be included)
- Join Competition flow (code/QR, no login required for guests)
- Team formation options
- Host live controls (pause/skip/extend time)
- Certificates + custom branding (tied to Premium tier)

---

## 6. Cross-Cutting Flow: No-Login Quiz/Competition Attempt

This is a core differentiator of the platform and must work exactly as shown — it is what allows a student or guest to participate without creating an account.

```mermaid
sequenceDiagram
    participant T as Teacher / Organizer
    participant Sys as Platform
    participant P as Student / Guest (No Login)

    T->>Sys: Create Quiz or Competition
    Sys->>T: Generate QR Code / PIN
    T->>P: Share QR Code / PIN
    P->>Sys: Scan QR or Enter PIN
    Sys->>P: Load Quiz/Competition (no account required)
    P->>Sys: Submit Answers
    alt Objective Questions
        Sys->>Sys: Auto-grade Instantly
    else Subjective Questions
        Sys->>Sys: AI Grades Answers
    end
    Sys->>P: Show Result
    Sys->>T: Update Reports / Dashboard
```

---

## 7. Non-Negotiable Checklist

Before presenting the prototype, confirm every item below is present and unchanged from the approved idea:

**Teacher**
- [ ] Prepare a Lecture ends with an explicit "Create Slides?" prompt
- [ ] Classes has both "Create New Class" and "Created Classes" as separate, visible options
- [ ] Reports shows only standalone (non-class) quiz results
- [ ] Create a Quiz supports objective (multiple types, not just MCQ/T-F) AND subjective
- [ ] Create Slides uses templates that the system auto-fills
- [ ] Weekly timetable/calendar is present
- [ ] No question bank/library feature has been added

**Student**
- [ ] My Classes is separate from Take a Quiz (class-assigned vs. standalone are distinct flows)
- [ ] Learn a Topic requires student confirmation of the AI plan before learning starts
- [ ] A practice quiz is generated after every topic in a learning plan
- [ ] Room supports both single and group competition
- [ ] Wrong-answer review is present after every quiz

**Competition Mode**
- [ ] Fully standalone from Teacher/Student login (organizer-driven)
- [ ] Live leaderboard is visible on the dashboard
- [ ] Objective question types only (no subjective in this module)
- [ ] Guests can join via code/QR with no login

**Cross-cutting**
- [ ] No-login flow works for both quizzes and competitions
- [ ] Subjective answers are graded by AI, with a teacher override option
- [ ] Subscription/upgrade screen and quota indicators exist in both Teacher and Student profiles

---

*This document is the exact functional blueprint discussed and approved. Building strictly to Sections 3–6, and passing every box in Section 7, ensures the prototype matches the approved idea with no deviation.*
