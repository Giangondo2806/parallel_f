# BASIC DESIGN - PHẦN 3: SCREEN LAYOUT DESIGN

## Phần 3: Screen Layout Design

Thiết kế layout chi tiết cho tất cả 7 màn hình, tối ưu cho desktop 1200px, dựa trên Material Design principles tương tự Argon Dashboard.

### 3.1 S-01-01: Màn hình đăng nhập (Login Screen)

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                FJP - IRMS                                      │
│                        Hệ thống Quản lý Idle Resource                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                              ┌─────────────────┐                               │
│                              │  [FJP Logo]     │                               │
│                              └─────────────────┘                               │
│                                                                                 │
│                          ┌─────────────────────────┐                           │
│                          │      ĐĂNG NHẬP          │                           │
│                          │  ┌─────────────────────┐ │                           │
│                          │  │ Username:           │ │                           │
│                          │  │ [_______________]  │ │                           │
│                          │  │                    │ │                           │
│                          │  │ Password:          │ │                           │
│                          │  │ [_______________]  │ │                           │
│                          │  │                    │ │                           │
│                          │  │ □ Remember me      │ │                           │
│                          │  │                    │ │                           │
│                          │  │  [  ĐĂNG NHẬP  ]   │ │                           │
│                          │  │                    │ │                           │
│                          │  │ Forgot password?   │ │                           │
│                          │  └─────────────────────┘ │                           │
│                          └─────────────────────────┘                           │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                   © 2025 FJP. All rights reserved.                             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 S-02-01: Màn hình tổng quan (Dashboard/Top Screen)

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] FJP-IRMS    [🔔] [👤 User Name ▼] [Logout]               [📅 2025/08/10] │
├───┬─────────────────────────────────────────────────────────────────────────────┤
│   │                           DASHBOARD                                         │
│ S │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│ I │ │   Total      │ │    Urgent    │ │  Available   │ │   Assigned   │        │
│ D │ │   Idle: 45   │ │   (≥2mo):12  │ │   Now: 23    │ │  This wk: 10 │        │
│ E │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
│   │                                                                             │
│ B │ ┌─────────────────────────────────┐ ┌─────────────────────────────────────┐ │
│ A │ │      Idle by Department         │ │        Recent Activities            │ │
│ R │ │  ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐  │ │ • RA updated resource #123...      │ │
│   │ │  │█│▇│▅│▃│▆│▄│▇│█│▅│▃│▆│▄│▇│█│  │ │ • New resource added by MGR...     │ │
│ ▸ │ │  └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘  │ │ • 5 CVs downloaded...              │ │
│ M │ │        (Chart by Source)        │ │ • System backup completed...       │ │
│ E │ └─────────────────────────────────┘ │ • [View All Activities]            │ │
│ N │                                     └─────────────────────────────────────┘ │
│ U │ ┌─────────────────────────────────────────────────────────────────────────┐ │
│   │ │                        Quick Actions                                   │ │
│ • │ │ [+ Add Resource] [📁 Import] [📊 Reports] [👥 Manage Users] [📝 History] │ │
│ I │ └─────────────────────────────────────────────────────────────────────────┘ │
│ d │                                                                             │
│ l │ Left Menu Navigation:                                                       │
│ e │ ▸ 📊 Dashboard                                                              │
│   │ ▸ 📋 Idle Resources                                                         │
│ R │ ▸ 👥 User Management (Admin only)                                           │
│ e │ ▸ 📝 Update History                                                         │
│ s │ ▸ 📊 Reports                                                                │
│ o │ ▸ ⚙️  Settings                                                              │
│ u │                                                                             │
│ r │                                                                             │
│ c │                                                                             │
│ e │                                                                             │
│ s │                                                                             │
├───┴─────────────────────────────────────────────────────────────────────────────┤
│                          Status: Online | Last sync: 10:30                     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 S-03-01: Màn hình quản lý người dùng (User Management)

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] FJP-IRMS    [🔔] [👤 Admin ▼] [Logout]                   [📅 2025/08/10] │
├───┬─────────────────────────────────────────────────────────────────────────────┤
│   │ Dashboard > User Management                                                 │
│ S │ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ I │ │                        USER MANAGEMENT                                  │ │
│ D │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ E │ │ │ Search: [________________] [🔍] [+ Add User] [Import Users] [Export] │ │ │
│   │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ B │ │                                                                         │ │
│ A │ │ ┌───┬─────────────┬─────────────┬─────────┬─────────────┬─────────────┐ │ │
│ R │ │ │☐  │  Username   │    Email    │  Role   │   Status    │   Actions   │ │ │
│   │ │ ├───┼─────────────┼─────────────┼─────────┼─────────────┼─────────────┤ │ │
│ • │ │ │☐  │ admin       │admin@fjp.vn │ Admin   │   Active    │[✏️][🗑️][🔒]│ │ │
│ D │ │ │☐  │ ra001       │ra001@fjp.vn │ RA      │   Active    │[✏️][🗑️][🔒]│ │ │
│ a │ │ │☐  │ mgr_hr      │mgr@fjp.vn   │ Manager │   Active    │[✏️][🗑️][🔒]│ │ │
│ s │ │ │☐  │ viewer01    │view@fjp.vn  │ Viewer  │  Inactive   │[✏️][🗑️][🔓]│ │ │
│ h │ │ │☐  │ ...         │ ...         │ ...     │   ...       │   ...       │ │ │
│ b │ │ └───┴─────────────┴─────────────┴─────────┴─────────────┴─────────────┘ │ │
│ o │ │                                                                         │ │
│ a │ │ [◀] [1] [2] [3] [4] [5] [▶] Showing 1-10 of 25 users                    │ │
│ r │ │                                                                         │ │
│ d │ │ Bulk Actions:                                                           │ │
│   │ │ [✅ Select All] [Activate Selected] [Deactivate] [Delete Selected]      │ │
│ • │ └─────────────────────────────────────────────────────────────────────────┘ │
│ U │                                                                             │
│ s │ Left Menu:                                                                  │
│ e │ ▸ 📊 Dashboard                                                              │
│ r │ ▸ 📋 Idle Resources                                                         │
│   │ ▸ 👥 User Management [ACTIVE]                                               │
│ M │ ▸ 📝 Update History                                                         │
│ g │ ▸ 📊 Reports                                                                │
│ m │ ▸ ⚙️  Settings                                                              │
│ t │                                                                             │
├───┴─────────────────────────────────────────────────────────────────────────────┤
│ Status: 25 users total, 22 active, 3 inactive                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 S-04-01: Màn hình quản lý danh sách Idle Resources

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] FJP-IRMS    [🔔] [👤 RA001 ▼] [Logout]                  [📅 2025/08/10] │
├───┬─────────────────────────────────────────────────────────────────────────────┤
│   │ Dashboard > Idle Resources                                                  │
│ S │ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ I │ │                      IDLE RESOURCE MANAGEMENT                           │ │
│ D │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ E │ │ │Search:[___________] Department:[____▼] Status:[____▼] [🔍][Clear]  │ │ │
│   │ │ │[+ Add] [Import] [Export] [⬇️ Multiple CV] [🗑️ Bulk Delete]          │ │ │
│ B │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ A │ │                                                                         │ │
│ R │ │ ┌─┬─────┬─────────────┬──────────┬────────┬─────────┬──────┬─────────┐  │ │
│   │ │ │☐│ 🚨  │    Name     │Department│ Skills │IdleFrom │ Rate │ Actions │  │ │
│ • │ │ ├─┼─────┼─────────────┼──────────┼────────┼─────────┼──────┼─────────┤  │ │
│ I │ │ │☐│ 🔥  │ Nguyen A    │   IT     │Java,C# │01/06/25 │ 500$ │[📄][✏️] │  │ │
│ d │ │ │☐│     │ Tran B      │   QA     │Test,Auto│15/07/25│ 400$ │[📄][✏️] │  │ │
│ l │ │ │☐│ 🔥  │ Le C        │   BA     │Analysis│01/05/25 │ 600$ │[📄][✏️] │  │ │
│ e │ │ │☐│     │ Hoang D     │   IT     │.NET,SQL│20/07/25 │ 550$ │[📄][✏️] │  │ │
│   │ │ │☐│ 🔥  │ Vo E        │   HR     │Recruit │15/04/25 │ ***  │[📄][✏️] │  │ │
│ R │ │ └─┴─────┴─────────────┴──────────┴────────┴─────────┴──────┴─────────┘  │ │
│ e │ │                                                                         │ │
│ s │ │ [◀] [1][2][3][4][5] [▶] Showing 1-20 of 125 resources                   │ │
│ o │ │                                                                         │ │
│ u │ │ Legend: 🔥 = Urgent (≥2 months idle) | Rate: *** = Hidden for Viewer    │ │
│ r │ │                                                                         │ │
│ c │ │ Column Settings: [👁️ Show/Hide Columns] [📌 Pin Columns]                │ │
│ e │ └─────────────────────────────────────────────────────────────────────────┘ │
│ s │                                                                             │
│   │ Left Menu:                                                                  │
│ • │ ▸ 📊 Dashboard                                                              │
│ L │ ▸ 📋 Idle Resources [ACTIVE]                                                │
│ i │ ▸ 👥 User Management                                                        │
│ s │ ▸ 📝 Update History                                                         │
│ t │ ▸ 📊 Reports                                                                │
│   │ ▸ ⚙️  Settings                                                              │
│ • │                                                                             │
│ C │                                                                             │
│ R │                                                                             │
│ U │                                                                             │
│ D │                                                                             │
├───┴─────────────────────────────────────────────────────────────────────────────┤
│ Status: 125 resources | 23 urgent | Last updated: 2025-08-10 09:45             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 S-04-02: Màn hình chi tiết/chỉnh sửa Idle Resource

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] FJP-IRMS    [🔔] [👤 RA001 ▼] [Logout]                  [📅 2025/08/10] │
├───┬─────────────────────────────────────────────────────────────────────────────┤
│   │ Dashboard > Idle Resources > Resource Details                               │
│ S │ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ I │ │              IDLE RESOURCE DETAILS - Nguyen Van A                       │ │
│ D │ │ ┌─────────────────────────────────┬───────────────────────────────────┐ │ │
│ E │ │ │          Basic Information      │          Work Information         │ │ │
│   │ │ │                                 │                                   │ │ │
│ B │ │ │ Employee Code: [__________]     │ Department: [IT Department ▼]     │ │ │
│ A │ │ │ Full Name:     [__________]     │ Job Title:  [__________]         │ │ │
│ R │ │ │ Email:         [__________]     │ Skills:     [__________]         │ │ │
│   │ │ │ Phone:         [__________]     │ Experience: [5 years ▼]         │ │ │
│ • │ │ │ Status:        [Available ▼]   │ Rate:       [500 USD]           │ │ │
│ D │ │ └─────────────────────────────────┴───────────────────────────────────┘ │ │
│ e │ │                                                                         │ │
│ t │ │ ┌─────────────────────────────────┬───────────────────────────────────┐ │ │
│ a │ │ │         Idle Information        │          CV Management            │ │ │
│ i │ │ │                                 │                                   │ │ │
│ l │ │ │ Idle From: [01/06/2025 📅]      │ Current CV: [nguyen_cv.pdf]      │ │ │
│   │ │ │ Idle To:   [        📅]        │ [📄 Download] [🗑️ Delete]        │ │ │
│ • │ │ │ Duration:  [2 months 9 days]    │                                   │ │ │
│ E │ │ │ Urgent:    [🔥 YES - URGENT]    │ Upload New CV:                   │ │ │
│ d │ │ │                                 │ [Choose File...] [📤 Upload]     │ │ │
│ i │ │ └─────────────────────────────────┴───────────────────────────────────┘ │ │
│ t │ │                                                                         │ │
│   │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ • │ │ │                    Process Notes (Admin/RA only)                    │ │ │
│ F │ │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │
│ o │ │ │ │ Contact with client ABC on 01/08, waiting response...          │ │ │ │
│ r │ │ │ │ Updated skills based on latest training...                     │ │ │ │
│ m │ │ │ │ [Add new note...]                                               │ │ │ │
│   │ │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │
│ • │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ C │ │                                                                         │ │
│ V │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│   │ │ │              [💾 Save Changes] [↩️ Back to List] [🗑️ Delete]         │ │ │
│ M │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ g │ └─────────────────────────────────────────────────────────────────────────┘ │
│ m │                                                                             │
│ t │ Left Menu:                                                                  │
│   │ ▸ 📊 Dashboard                                                              │
│   │ ▸ 📋 Idle Resources [ACTIVE]                                                │
│   │ ▸ 👥 User Management                                                        │
│   │ ▸ 📝 Update History                                                         │
│   │ ▸ 📊 Reports                                                                │
│   │ ▸ ⚙️  Settings                                                              │
├───┴─────────────────────────────────────────────────────────────────────────────┤
│ Status: Editing Resource ID: #123 | Last saved: 2025-08-10 09:30               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.6 S-05-01: Màn hình lịch sử cập nhật (Update History)

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] FJP-IRMS    [🔔] [👤 RA001 ▼] [Logout]                  [📅 2025/08/10] │
├───┬─────────────────────────────────────────────────────────────────────────────┤
│   │ Dashboard > Update History                                                  │
│ S │ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ I │ │                          UPDATE HISTORY                                 │ │
│ D │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ E │ │ │Filter: User:[All ▼] Action:[All ▼] From:[📅] To:[📅] [🔍][Clear]  │ │ │
│   │ │ │Resource:[Search...] [Export History] [📊 Summary Report]           │ │ │
│ B │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ A │ │                                                                         │ │
│ R │ │ ┌──────────┬─────────┬──────────┬─────────────┬──────────────────────┐  │ │
│   │ │ │DateTime  │  User   │ Action   │ Resource    │     Changes          │  │ │
│ • │ │ ├──────────┼─────────┼──────────┼─────────────┼──────────────────────┤  │ │
│ H │ │ │08/10 09:30│ RA001  │ UPDATE   │ Nguyen A    │Skills: Java→Java,C#  │  │ │
│ i │ │ │08/10 09:15│ MGR01  │ CREATE   │ Tran B      │New resource added    │  │ │
│ s │ │ │08/10 08:45│ RA001  │ DELETE   │ Le C        │Resource removed      │  │ │
│ t │ │ │08/09 16:30│ ADMIN  │ UPDATE   │ Hoang D     │Rate: 500$→550$      │  │ │
│ o │ │ │08/09 14:20│ RA001  │ CV_UPLOAD│ Vo E        │New CV uploaded       │  │ │
│ r │ │ │08/09 11:15│ MGR02  │ UPDATE   │ Pham F      │Status: Idle→Assigned │  │ │
│ y │ │ │...       │ ...     │ ...      │ ...         │ ...                  │  │ │
│   │ │ └──────────┴─────────┴──────────┴─────────────┴──────────────────────┘  │ │
│ • │ │                                                                         │ │
│ L │ │ [◀] [1][2][3][4][5] [▶] Showing 1-50 of 2,345 records                  │ │
│ o │ │                                                                         │ │
│ g │ │ Summary Today:                                                          │ │
│   │ │ • 15 Updates • 3 New Resources • 2 Deletions • 8 CV Operations         │ │
│ • │ │                                                                         │ │
│ A │ │ Action Types: CREATE | UPDATE | DELETE | CV_UPLOAD | CV_DELETE |       │ │
│ u │ │              BULK_UPDATE | IMPORT | EXPORT | LOGIN | LOGOUT            │ │
│ d │ └─────────────────────────────────────────────────────────────────────────┘ │
│ i │                                                                             │
│ t │ Left Menu:                                                                  │
│   │ ▸ 📊 Dashboard                                                              │
│ T │ ▸ 📋 Idle Resources                                                         │
│ r │ ▸ 👥 User Management                                                        │
│ a │ ▸ 📝 Update History [ACTIVE]                                                │
│ i │ ▸ 📊 Reports                                                                │
│ l │ ▸ ⚙️  Settings                                                              │
├───┴─────────────────────────────────────────────────────────────────────────────┤
│ Status: Showing activities from last 30 days | Auto-refresh: ON                │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.7 S-06-01: Màn hình báo cáo Dashboard (Report Dashboard)

#### A. Screen Layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] FJP-IRMS    [🔔] [👤 RA001 ▼] [Logout]                  [📅 2025/08/10] │
├───┬─────────────────────────────────────────────────────────────────────────────┤
│   │ Dashboard > Reports                                                         │
│ S │ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ I │ │                          REPORT DASHBOARD                               │ │
│ D │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ E │ │ │Filter: Department:[All ▼] Period:[This Week ▼] [Generate] [Export] │ │ │
│   │ │ │Compare with: [Last Week ▼] [Apply Comparison]                      │ │ │
│ B │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ A │ │                                                                         │ │
│ R │ │ ┌──────────────────────┬──────────────────────┬────────────────────────┐ │ │
│   │ │ │  Current Week Stats  │   Last Week Stats    │      Comparison        │ │ │
│ • │ │ ├──────────────────────┼──────────────────────┼────────────────────────┤ │ │
│ R │ │ │ Total Idle: 45       │ Total Idle: 52       │ 📉 -7 (-13.5%)         │ │ │
│ e │ │ │ New Added: 8         │ New Added: 12        │ 📉 -4 (-33.3%)         │ │ │
│ p │ │ │ Assigned: 15         │ Assigned: 8          │ 📈 +7 (+87.5%)         │ │ │
│ o │ │ │ Urgent Cases: 12     │ Urgent Cases: 15     │ 📉 -3 (-20%)           │ │ │
│ r │ │ └──────────────────────┴──────────────────────┴────────────────────────┘ │ │
│ t │ │                                                                         │ │
│   │ │ ┌─────────────────────────────────┬───────────────────────────────────┐ │ │
│ • │ │ │     Idle by Department          │        Skill Distribution         │ │ │
│ D │ │ │  ┌──────────────────────────┐   │  ┌──────────────────────────────┐ │ │ │
│ a │ │ │  │ IT Dept:      25 (55%)   │   │  │ Java:         18             │ │ │ │
│ s │ │ │  │ QA Dept:      8 (18%)    │   │  │ .NET:         12             │ │ │ │
│ h │ │ │  │ BA Dept:      6 (13%)    │   │  │ Testing:      15             │ │ │ │
│ b │ │ │  │ HR Dept:      4 (9%)     │   │  │ Analysis:     8              │ │ │ │
│ o │ │ │  │ Others:       2 (5%)     │   │  │ Project Mgmt: 5              │ │ │ │
│ a │ │ │  └──────────────────────────┘   │  └──────────────────────────────┘ │ │ │
│ r │ │ └─────────────────────────────────┴───────────────────────────────────┘ │ │
│ d │ │                                                                         │ │
│   │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ • │ │ │                      Trend Analysis (Last 4 weeks)                  │ │ │
│ T │ │ │  Week 1: ████████████████ 64 resources                              │ │ │ │
│ r │ │ │  Week 2: ██████████████   52 resources                              │ │ │ │
│ e │ │ │  Week 3: ████████████████ 58 resources                              │ │ │ │
│ n │ │ │  Week 4: ████████████     45 resources (Current)                    │ │ │ │
│ d │ │ │                                                                     │ │ │ │
│   │ │ │ [📊 Detailed Chart View] [📑 Generate PDF Report] [📧 Email Report] │ │ │ │
│ • │ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ C │ └─────────────────────────────────────────────────────────────────────────┘ │
│ h │                                                                             │
│ a │ Left Menu:                                                                  │
│ r │ ▸ 📊 Dashboard                                                              │
│ t │ ▸ 📋 Idle Resources                                                         │
│ s │ ▸ 👥 User Management                                                        │
│   │ ▸ 📝 Update History                                                         │
│   │ ▸ 📊 Reports [ACTIVE]                                                       │
│   │ ▸ ⚙️  Settings                                                              │
├───┴─────────────────────────────────────────────────────────────────────────────┤
│ Status: Reports generated at 2025-08-10 10:00 | Auto-refresh: Every 1 hour     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Responsive Design Notes

### Desktop (1200px+) - Primary Target
- Layout như thiết kế trên
- Full sidebar navigation
- Multi-column layouts
- Comprehensive data tables

### Tablet (768px-1199px) - Secondary Support
- Sidebar collapse to icons only
- Stack columns vertically on reports
- Responsive data tables with horizontal scroll
- Touch-friendly button sizes

### Mobile (360px-767px) - Limited Support
- Hidden sidebar with hamburger menu
- Single column layouts only
- Simplified tables với essential columns
- Mobile-first forms layout

---

*Tài liệu này là Phần 3 của Basic Design theo chuẩn IPA External Design (外部設計).*
