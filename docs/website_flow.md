# Website User Flow Diagram

This document outlines the complete navigation and task flow for the College Engineering Adoor website. It is divided into **Public User Flow** and **Administrative Flow**.

## Complete User Flow (Mermaid)

```mermaid
graph TD
    %% Roles
    Start((User Access)) --> RoleChoice{User Role}
    
    RoleChoice -- "Public Visitor" --> Home[Home Page /]
    RoleChoice -- "Administrator" --> AdminLogin[Admin Login /admin/login]

    %% Public Flow
    subgraph "Public Website Flow"
        Home --> HeroSlides[Hero Slider]
        Home --> NewsTicker[Latest News Ticker]
        
        Home --> AnnouncePreview[Announcements Preview]
        AnnouncePreview --> AllAnnounce[All Announcements /all-announcements]
        
        Home --> EventsPreview[Upcoming Events]
        EventsPreview --> FullCalendar[Full Calendar /events-calendar]
        
        %% Navbar Links
        Home -.-> Navbar{{Navbar Navigation}}
        Navbar --> AdminPage[Administration /administration]
        Navbar --> AdmissionsPage[Admissions /admissions]
        Navbar --> DeptList[Departments /department]
        Navbar --> ActivityPage[Activities /activities]
        Navbar --> PlacementPage[Placement /placement]
        Navbar --> InstitPage[Institution /institution]
        Navbar --> ContactPage[Contact /contact]
        
        %% Deep Links
        DeptList --> DeptDetail[Department Detail /department/:id]
        DeptDetail --> DeptNotice[Department Notice Board]
        
        ContactPage --> SubmitQuery[Submit Query Form]
        SubmitQuery --> QueryDB[(Database)]
    end

    %% Admin Flow
    subgraph "Administrative Flow"
        AdminLogin --> Auth{Auth Check}
        Auth -- "Success" --> AdminDash[Admin Dashboard /admin/dashboard]
        Auth -- "Failure" --> AdminLogin
        
        AdminDash --> TabManager{Tab Navigation}
        
        TabManager --> ManageSlides[Manage Hero Slides]
        TabManager --> ManagePlacement[Manage Placement Slides]
        TabManager --> ManageAnnounce[Manage Announcements]
        TabManager --> ManageDeptNot[Manage Dept Notices]
        TabManager --> ManageEvents[Manage Events]
        TabManager --> ManageQueries[User Queries & Replies]
        
        %% Management Actions
        ManageAnnounce --> AnnounceActions[Add / Edit / Delete / Pinned / Send Email]
        ManageEvents --> EventActions[Add / Edit / Delete / Send Email]
        ManageQueries --> QueryActions[View / Reply via Email / Delete]
        ManageDeptNot --> DeptActions[Add / Edit / Delete / Filter by Dept]
        
        AdminDash --> Logout[Logout]
        Logout --> AdminLogin
    end

    %% Styling
    style Start fill:#f9f,stroke:#333,stroke-width:2px
    style AdminDash fill:#bbf,stroke:#333,stroke-width:2px
    style Home fill:#bfb,stroke:#333,stroke-width:2px
    style RoleChoice fill:#fff4dd,stroke:#d4a017,stroke-width:2px
```

---

## Flow Highlights

### 1. Public Navigation
- **Departmental Access**: Users can drill down from the main department list to specific department pages where notices are categorized.
- **Dynamic Updates**: Announcements and Events are synchronized across the Home page, dedicated lists, and the administrator's dashboard.
- **Engagement**: The Contact page allows direct communication with the administration via a query system.

### 2. Administrative Capabilities
- **Content Management**: Fine-grained control over sliders, news, and events.
- **Smart Notices**: Ability to mark specific announcements as "Important" to pin them or trigger system-wide emails.
- **Feedback Loop**: Integrated query management system allowing admins to reply directly to visitor inquiries via automated emails.
