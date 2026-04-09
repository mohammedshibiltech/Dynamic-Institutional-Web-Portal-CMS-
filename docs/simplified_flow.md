# Website Flowchart

This flowchart illustrates the navigation and logic paths for both public users and administrators.

```mermaid
graph TD
    %% Start
    Start((User Enters Site)) --> Home[Home Page]

    %% Public Flow
    subgraph Public_UI [Public Sections]
        Home -->|Scroll| Hero[Hero Slider]
        Home -->|Scroll| News[Announcements]
        Home -->|Scroll| Cal[Events Calendar]
        Home -->|Scroll| Abt[About Section]
    end

    Home -->|Navbar| AdminEntry[Admin Login Link]

    %% Admin Entry Flow
    AdminEntry --> Login{Login Page}
    Login -->|Invalid| Login
    Login -->|Valid JWT| Dashboard[Admin Dashboard]

    %% Admin Management Flow
    subgraph Admin_Logic [Admin Modules]
        Dashboard -->|Tab: Slides| SlideMgr[Manage Hero Images]
        Dashboard -->|Tab: News| AnnMgr[Manage Announcements]
        Dashboard -->|Tab: Events| EventMgr[Manage Events]
        Dashboard -->|Tab: Content| ContentMgr[Edit Static Copy]
    end

    %% Logic Loops
    SlideMgr -->|Update| Home
    AnnMgr -->|Update| News
    EventMgr -->|Update| Cal
    ContentMgr -->|Update| Abt

    %% Exit
    Dashboard -->|Logout| Home
```

## Flow Description

1.  **Entry**: Users land on the **Home Page**, which dynamically aggregates content from the database.
2.  **Public Navigation**: Users can browse the hero slider, read announcements, view the event calendar, and learn about the college.
3.  **Admin Access**: Administrators can access the login portal via the navbar. 
4.  **Authentication**: Access to the dashboard is strictly protected by **JWT authentication**.
5.  **Dynamic Updates**: Any changes made in the **Admin Dashboard** (Slides, Events, etc.) are immediately reflected on the public-facing home page sections.
