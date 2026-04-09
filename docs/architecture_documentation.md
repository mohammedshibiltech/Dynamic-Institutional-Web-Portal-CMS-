# Technical Architecture Master Documentation

This document provides a deep-dive into the technical structure, data flows, and architectural patterns of the college website.

---

## 1. System Context & Architecture
The system follows a modern decoupled architecture with a **React** single-page application (SPA), a **Node.js/Express** RESTful API, and a **MySQL** relational database.

```mermaid
graph TD
    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef backend fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef storage fill:#f1f8e9,stroke:#33691e,stroke-width:2px;

    User((Public User))
    Admin((Administrator))

    subgraph Client ["Frontend Layer (Vite + React)"]
        SPA[React SPA]
        Router[React Router]
        Axios[Axios REST Client]
    end

    subgraph API ["Logic Layer (Express API)"]
        App[Express Server]
        AuthMid[JWT Auth Middleware]
        Uploads[Multer Image Upload]
        Ctrls[Controllers]
    end

    subgraph Data ["Persistence Layer (MySQL)"]
        MyDB[(MySQL DB)]
        FS[Static Image Assets]
    end

    %% Interactions
    User --> SPA
    Admin --> SPA
    SPA --> Router
    Router --> Axios
    Axios --> App
    App --> AuthMid
    AuthMid --> Ctrls
    Ctrls --> MyDB
    Ctrls --> FS

    class Client,SPA,Router,Axios frontend;
    class API,App,AuthMid,Uploads,Ctrls backend;
    class Data,MyDB,FS storage;
```

---

## 2. Data Flow Diagrams (DFD)

### Level 0: Context Diagram
The system as a single process, showing external entities and high-level data interfaces.

```mermaid
graph LR
    User((Public User)) -- "1. View Request (GET)" --> System[0. College Website System]
    System -- "2. Rendered Content/Images" --> User
    
    Admin((Administrator)) -- "3. Login Credentials" --> System
    Admin -- "4. Content Updates (CRUD)" --> System
    Admin -- "5. Binary Image Files" --> System
    System -- "6. JWT Token / Status / Data View" --> Admin
```

---

### Level 1: Functional DFD
Decomposing the system into major processes, showing interactions with data stores.

```mermaid
graph TD
    User((Public User))
    Admin((Administrator))

    subgraph Processes
        P1[1.0 Serve Public Content]
        P2[2.0 Handle Auth]
        P3[3.0 Manage Campus Data]
        P4[4.0 Process File Uploads]
    end

    subgraph Data Stores
        S1[(D1. MySQL Database)]
        S2[D2. Local File System]
    end

    %% Public Flow
    User -- "View Request" --> P1
    S1 -- "Raw Data" --> P1
    S2 -- "Image Assets" --> P1
    P1 -- "HTML/Rendered State" --> User

    %% Authentication Flow
    Admin -- "Email/Password" --> P2
    P2 -- "Verify" --> S1
    S1 -- "Admin Record" --> P2
    P2 -- "JWT Token" --> Admin

    %% Content Management Flow
    Admin -- "CRUD Request + JWT" --> P3
    P3 -- "Auth Check" --> P2
    P3 -- "SQL Query/Update" --> S1
    S1 -- "Success Notice" --> P3
    P3 -- "Update Status" --> Admin

    %% File Upload Flow
    Admin -- "Binary Image" --> P4
    P4 -- "Save File" --> S2
    P4 -- "Generate URL" --> P3
```

---

### Level 2: Detailed Process (Admin Content Management)
A granular view of the interaction between the API Controllers, Middleware, and Storage.

```mermaid
graph TD
    Admin((Administrator))
    
    subgraph P3_Expansion [3.0 Manage Campus Data - Detail]
        P3_1[3.1 Verify Token]
        P3_2[3.2 Route to Controller]
        P3_3[3.3 Execute DB Operation]
        P3_4[3.4 Package Response]
    end

    Admin -- "API Call + Bearer Token" --> P3_1
    P3_1 -- "Decoded Payload" --> P3_2
    P3_2 -- "Update Values" --> P3_3
    P3_3 -- "SQL Command" --> DB[(D1. MySQL Database)]
    DB -- "Result Set" --> P3_3
    P3_3 -- "Result Data" --> P3_4
    P3_4 -- "JSON Success/Err" --> Admin
```

---

## 3. Detailed Entity Relationship Diagram (ERD)
The logical database design supporting the application.

```mermaid
erDiagram
    ADMINS ||--o{ HOME_SLIDES : "manages"
    ADMINS ||--o{ ANNOUNCEMENTS : "manages"
    ADMINS ||--o{ EVENTS : "manages"
    
    ADMINS {
        int id PK
        string email UK
        string password "Hashed (Bcrypt)"
        timestamp created_at
    }

    HOME_SLIDES {
        int id PK
        string image_url
        string title
        text subtitle
        timestamp created_at
    }

    ANNOUNCEMENTS {
        int id PK
        string title
        text description
        timestamp created_at
    }

    EVENTS {
        int id PK
        string image_url
        string title
        date event_date
        text description
        timestamp created_at
    }

    ABOUT {
        int id PK
        text content
    }

    MISSION_VISION {
        int id PK
        enum type "mission, vision"
        text content
    }
```

---

## 4. Sequence Diagram: Admin Auth & Slide Upload
Detailed interaction timeline for a common administrative task.

```mermaid
sequenceDiagram
    participant Admin
    participant Front as Frontend (React)
    participant Back as Backend (Express)
    participant Auth as JWT Middleware
    participant DB as MySQL Database
    participant FS as File System

    %% Authentication
    Admin->>Front: Enter Email/Password
    Front->>Back: POST /api/auth/login
    Back->>DB: Fetch admin by email
    DB-->>Back: Admin record
    Back->>Back: Bcrypt compare
    Back-->>Front: Set response with JWT
    Front->>Front: Store JWT in LocalStorage

    %% Management
    Admin->>Front: Upload Slide Image
    Front->>Back: POST /api/slides (Header: Bearer JWT)
    Back->>Auth: Verify JWT
    Auth-->>Back: Valid (req.admin)
    Back->>FS: Save Image file
    FS-->>Back: filename
    Back->>DB: INSERT INTO home_slides (url)
    DB-->>Back: Success (ID)
    Back-->>Front: 201 Created
    Front-->>Admin: Show Success Notification
```

---

## 5. Summary of Technologies
- **Frontend**: Vite, React 18, Tailwind CSS (Styling), Axios (API Communication).
- **Backend**: Node.js, Express.js (REST API), Multer (File Upload), JsonWebToken (Auth).
- **Database**: MySQL 8.0, Bcrypt (Password Hashing).
