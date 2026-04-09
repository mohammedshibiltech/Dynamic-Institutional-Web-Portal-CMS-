# Data Flow and ER Diagrams

This document focuses on the data-centric aspects of the website, illustrating how information moves through the system and how it is structured in the database.

## 1. Data Flow Diagram (DFD)

### Level 0: Context Diagram
The system as a single central process.

```mermaid
graph LR
    User((Public User)) -- "1. View Request" --> System[0. College Website System]
    System -- "2. Rendered Web Pages / Content" --> User
    
    Admin((Administrator)) -- "3. Auth Credentials / Content Updates" --> System
    Admin -- "4. Binary Image Uploads" --> System
    System -- "5. JWT Token / Dashboard View" --> Admin
```

---

### Level 1: Functional Data Flow
Deepening the system to show major sub-processes and data stores.

```mermaid
graph TD
    User((Public User))
    Admin((Administrator))

    subgraph Processes
        P1[1.0 Render Public Interface]
        P2[2.0 Validate Credentials]
        P3[3.0 Manage DB Entities]
        P4[4.0 Handle Local Storage]
    end

    subgraph Data Stores
        D1[(D1. MySQL Database)]
        D2[D2. Local /uploads/ Folder]
    end

    %% Flows
    User -- "Page View Request" --> P1
    D1 -- "Textual Content" --> P1
    D2 -- "Media Assets" --> P1
    P1 -- "HTML/JS/CSS Bundle" --> User

    Admin -- "Login Info" --> P2
    P2 -- "Verify" --> D1
    D1 -- "Admin Data" --> P2
    P2 -- "JWT Auth Token" --> Admin

    Admin -- "CRUD Ops + JWT" --> P3
    P3 -- "Query/Update" --> D1
    D1 -- "Update Confirmation" --> P3
    P3 -- "Success Status" --> Admin

    Admin -- "Image Files" --> P4
    P4 -- "File Write" --> D2
    P4 -- "File Path / URL" --> P3
```

---

## 2. Entity Relationship Diagram (ERD)
The logical structure of the database, showing entities, attributes, and relationships.

```mermaid
erDiagram
    ADMIN {
        int id PK
        string email UK
        string password
        timestamp created_at
    }

    HOME_SLIDE {
        int id PK
        string image_url
        string title
        text subtitle
        timestamp created_at
    }

    ANNOUNCEMENT {
        int id PK
        string title
        text description
        timestamp created_at
    }

    EVENT {
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

    %% Relationships (Logical)
    ADMIN ||--o{ HOME_SLIDE : "manages"
    ADMIN ||--o{ ANNOUNCEMENT : "manages"
    ADMIN ||--o{ EVENT : "manages"
    ADMIN ||--o{ ABOUT : "updates"
    ADMIN ||--o{ MISSION_VISION : "updates"
```

## Data Definitions

| Entity | Description | Key Attributes |
| :--- | :--- | :--- |
| **Admin** | Authorized users who can manage website content. | `email`, `password` |
| **Home Slide** | Images and text for the homepage hero carousel. | `image_url`, `title` |
| **Announcement** | Short updates or news alerts displayed on the home page. | `title`, `description` |
| **Event** | Calendar items with specific dates and descriptions. | `event_date`, `title` |
| **About/MV** | Static content sections representing college information. | `type`, `content` |
