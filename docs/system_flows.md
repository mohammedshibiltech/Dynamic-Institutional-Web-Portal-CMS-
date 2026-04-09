# Project Flowcharts & Architecture

This document contains visual representations of the project's architecture and module workflows using Mermaid diagrams.

---

## 1. System Design (High-Level Architecture)
This chart illustrates the 3-tier architecture of the college website project.

```mermaid
graph LR
    subgraph "Client Side (Frontend)"
        User((User/Admin)) -->|Interacts| ReactApp[React.js / Vite SPA]
        ReactApp -->|State Mgmt| Hooks[React Hooks / Context API]
        ReactApp -->|Styling| CSS[Vanilla CSS / Responsive]
    end

    subgraph "Server Side (Backend)"
        ReactApp -->|REST API Calls| ExpressApp[Node.js / Express Server]
        ExpressApp -->|Routing| Router[Modular Routes]
        Router -->|Business Logic| Controllers[Controllers / Middleware]
        Controllers -->|Auth| Security[JWT / Session Verification]
    end

    subgraph "Data Layer (Database)"
        ExpressApp -->|SQL Queries| MySQL[(MySQL DB)]
        MySQL -.->|Results| ExpressApp
    end

    %% Visual Styling
    style User fill:#f9f,stroke:#333
    style ReactApp fill:#bbf,stroke:#333
    style ExpressApp fill:#bfb,stroke:#333
    style MySQL fill:#fff4dd,stroke:#d4a017
```

---

## 2. Admin Module Flow
This flow details the administrative lifecycle from authentication to content management.

```mermaid
flowchart TD
    Start([Admin Accesses /admin/login]) --> Login[Enter Credentials]
    Login --> Verify{Server Verification}
    
    Verify -- "Failure" --> Error[Invalid Message]
    Error --> Login
    
    Verify -- "Success / Token Issued" --> Dashboard[Admin Dashboard]
    
    Dashboard --> SelectTab{Select Manager}
    
    SelectTab -->|Slides/Events| MediaManager[Media Management]
    SelectTab -->|Announcements| NewsManager[News Management]
    SelectTab -->|User Queries| QueryManager[Reply System]
    
    MediaManager & NewsManager & QueryManager --> Action{Select Action}
    
    Action -->|Create/Update| Form[Input Form Data]
    Action -->|Delete| Confirm[Confirm Deletion]
    
    Form & Confirm --> DBRequest[API Request Sent]
    DBRequest --> DBLink[(Database Transaction)]
    DBLink --> Feedback[Success Notification]
    Feedback --> Dashboard
    
    Dashboard --> Logout([End Session / Clear Token])
```

---

## 3. User Module Flow
This chart tracks the public visitor journey through the institutional portal.

```mermaid
flowchart TD
    Entry([Landing on Home /]) --> Hero[View Hero Slides & News Ticker]
    
    Hero --> NavChoices{User Interests}
    
    NavChoices -->|Institutional Info| Institution[View Admissions/Hosters/Bus]
    NavChoices -->|Academics| Depts[Navigate to /department]
    NavChoices -->|Events| Calendar[View All Announcements/Calendar]
    NavChoices -->|Enquiry| Contact[Fill Contact Form /contact]
    
    Depts --> DeptList[Select Specific Department]
    DeptList --> DeptPage[Dynamic Dept Page /department/:id]
    DeptPage --> NoticeBoard[Read Dept Specific Notices]
    
    Calendar -->|Full View| FullList[Browse Archive/Calendar Views]
    
    Contact -->|Submit| APIQuery[Queries API & MySQL]
    
    FullList & NoticeBoard & Institution --> HomeBack[Return Home / Navigation Continue]
```
