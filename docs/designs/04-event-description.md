# BASIC DESIGN - PHẦN 5: EVENT DESCRIPTION

## Phần 5: Event Description

Mô tả chi tiết tất cả events trong hệ thống IRMS theo từng màn hình.

### 5.1 S-01-01: Login Screen Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-01-01 | Login Screen | S01-EVT-01 | User Login | Username, Password | Username required, Password min 8 chars | 1. Validate input fields<br>2. Hash password<br>3. Check credentials against database<br>4. Create session if valid<br>5. Generate JWT token<br>6. Log login activity | Success: User object + token + session<br>Error: Error message | S-02-01 |
| S-01-01 | Login Screen | S01-EVT-02 | Remember Me Toggle | Checkbox state | None | 1. Save checkbox state<br>2. If checked, extend session duration to 30 days<br>3. Store preference in localStorage | Remember preference saved | - |
| S-01-01 | Login Screen | S01-EVT-03 | Forgot Password Click | None | None | 1. Navigate to forgot password flow<br>2. Log action | Navigation to password reset | Password Reset Screen |
| S-01-01 | Login Screen | S01-EVT-04 | Form Field Focus | Field name | None | 1. Clear previous errors for that field<br>2. Highlight field border<br>3. Show field helper text | Field UI state updated | - |
| S-01-01 | Login Screen | S01-EVT-05 | Form Validation | All form data | Real-time validation rules | 1. Check username format<br>2. Check password strength<br>3. Enable/disable login button<br>4. Show validation messages | Validation state + messages | - |

### 5.2 S-02-01: Dashboard Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-02-01 | Dashboard | S02-EVT-01 | Page Load | User session | Valid session required | 1. Verify user session<br>2. Load user permissions<br>3. Fetch dashboard statistics<br>4. Load recent activities<br>5. Generate department charts<br>6. Apply role-based UI filtering | Dashboard data + user context | - |
| S-02-01 | Dashboard | S02-EVT-02 | Navigation Menu Click | Menu item ID | User permission check | 1. Check user permission for target page<br>2. Save current state<br>3. Navigate to target screen<br>4. Log navigation activity | Navigation successful | Target Screen |
| S-02-01 | Dashboard | S02-EVT-03 | User Dropdown Toggle | None | Authenticated user | 1. Show user info menu<br>2. Display user profile options<br>3. Show logout option | Dropdown menu displayed | - |
| S-02-01 | Dashboard | S02-EVT-04 | Logout Click | None | None | 1. Clear user session<br>2. Clear localStorage<br>3. Invalidate JWT token<br>4. Log logout activity<br>5. Redirect to login | Logout successful | S-01-01 |
| S-02-01 | Dashboard | S02-EVT-05 | Notification Bell Click | None | None | 1. Mark notifications as read<br>2. Show notification panel<br>3. Load recent system notifications | Notification list displayed | - |
| S-02-01 | Dashboard | S02-EVT-06 | Quick Action Click | Action type | Permission required | 1. Check user permission<br>2. Navigate to appropriate screen<br>3. Pre-fill context if needed | Action initiated | Target Screen |
| S-02-01 | Dashboard | S02-EVT-07 | Dashboard Refresh | None | None | 1. Reload all dashboard statistics<br>2. Update charts and graphs<br>3. Refresh recent activities<br>4. Update timestamps | Updated dashboard data | - |
| S-02-01 | Dashboard | S02-EVT-08 | Chart Interaction | Chart element | None | 1. Show detailed tooltip<br>2. Highlight related data<br>3. Enable drill-down if applicable | Chart interaction feedback | - |

### 5.3 S-03-01: User Management Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-03-01 | User Management | S03-EVT-01 | Load User List | Page number, page size | Admin permission required | 1. Verify admin permission<br>2. Query users from database<br>3. Apply pagination<br>4. Calculate total count<br>5. Format user data for display | User list + pagination info | - |
| S-03-01 | User Management | S03-EVT-02 | Search Users | Search term | None | 1. Validate search input<br>2. Query users by username/email<br>3. Apply filters<br>4. Update table display | Filtered user results | - |
| S-03-01 | User Management | S03-EVT-03 | Add New User | User form data | All required fields + validation | 1. Validate all input fields<br>2. Check username uniqueness<br>3. Hash password<br>4. Create user record<br>5. Log creation activity<br>6. Refresh user list | New user created + success message | - |
| S-03-01 | User Management | S03-EVT-04 | Edit User | User ID + updated data | Admin permission + valid user | 1. Load existing user data<br>2. Validate changes<br>3. Update user record<br>4. Log modification activity<br>5. Refresh user list | User updated + success message | - |
| S-03-01 | User Management | S03-EVT-05 | Delete User | User ID | Admin permission + user exists | 1. Check if user can be deleted<br>2. Confirm deletion<br>3. Soft delete user record<br>4. Log deletion activity<br>5. Refresh user list | User deleted + success message | - |
| S-03-01 | User Management | S03-EVT-06 | Toggle User Status | User ID | Admin permission | 1. Check current user status<br>2. Toggle active/inactive<br>3. Update database<br>4. Log status change<br>5. Refresh display | Status updated + success message | - |
| S-03-01 | User Management | S03-EVT-07 | Bulk Actions | Selected user IDs + action | Admin permission + valid selection | 1. Validate selected users<br>2. Confirm bulk action<br>3. Process each user<br>4. Log bulk activity<br>5. Refresh user list | Bulk action completed + summary | - |
| S-03-01 | User Management | S03-EVT-08 | Import Users | CSV/Excel file | Admin permission + valid file format | 1. Validate file format<br>2. Parse user data<br>3. Validate each user record<br>4. Check for duplicates<br>5. Import valid users<br>6. Generate import report | Import results + error report | - |
| S-03-01 | User Management | S03-EVT-09 | Export Users | Export format | None | 1. Query all users (with permission filter)<br>2. Format data for export<br>3. Generate file<br>4. Log export activity | Export file download | - |

### 5.4 S-04-01: Resource List Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-04-01 | Resource List | S04-EVT-01 | Load Resource List | Page, filters, role | Valid session + permission | 1. Check user role and permissions<br>2. Apply role-based data filtering<br>3. Query resources with filters<br>4. Calculate urgent status (≥2 months)<br>5. Apply column visibility based on role<br>6. Format data for display | Resource list + metadata | - |
| S-04-01 | Resource List | S04-EVT-02 | Search Resources | Search term + filters | None | 1. Validate search input<br>2. Build search query (name, skills, department)<br>3. Apply additional filters<br>4. Execute search<br>5. Update table display | Filtered resource results | - |
| S-04-01 | Resource List | S04-EVT-03 | Apply Filters | Filter criteria | None | 1. Validate filter values<br>2. Build WHERE clause<br>3. Apply department, status, date filters<br>4. Execute filtered query<br>5. Update display with results | Filtered resource list | - |
| S-04-01 | Resource List | S04-EVT-04 | Add New Resource | None | RA/MNG permission | 1. Check user permission<br>2. Initialize empty resource form<br>3. Set default values<br>4. Navigate to detail screen | Form initialized | S-04-02 |
| S-04-01 | Resource List | S04-EVT-05 | Edit Resource | Resource ID | Edit permission + resource exists | 1. Check edit permission for resource<br>2. Load resource data<br>3. Navigate to edit form<br>4. Pre-fill form data | Resource loaded for editing | S-04-02 |
| S-04-01 | Resource List | S04-EVT-06 | Delete Resource | Resource ID | Delete permission | 1. Check delete permission<br>2. Confirm deletion with user<br>3. Soft delete resource<br>4. Delete associated CV files<br>5. Log deletion activity<br>6. Refresh list | Resource deleted + success message | - |
| S-04-01 | Resource List | S04-EVT-07 | Bulk Delete | Selected resource IDs | RA permission + valid selection | 1. Validate selected resources<br>2. Check delete permissions for each<br>3. Confirm bulk deletion<br>4. Delete resources and CVs<br>5. Log bulk deletion<br>6. Refresh list | Bulk deletion completed + summary | - |
| S-04-01 | Resource List | S04-EVT-08 | Import Resources | CSV/Excel file | RA permission + valid file | 1. Validate file format and structure<br>2. Parse resource data<br>3. Validate each resource record<br>4. Check for duplicates<br>5. Import valid resources<br>6. Generate import report | Import results + error report | - |
| S-04-01 | Resource List | S04-EVT-09 | Export Resources | Export format + filters | None | 1. Apply current filters<br>2. Query filtered resources<br>3. Format data based on user role<br>4. Generate export file<br>5. Log export activity | Export file download | - |
| S-04-01 | Resource List | S04-EVT-10 | Download CV | Resource ID | CV exists | 1. Check CV file exists<br>2. Verify download permission<br>3. Generate secure download link<br>4. Log download activity<br>5. Serve file to user | CV file download | - |
| S-04-01 | Resource List | S04-EVT-11 | Download Multiple CVs | Selected resource IDs | Valid selection + CVs exist | 1. Validate selected resources<br>2. Check CV files exist<br>3. Create ZIP archive<br>4. Add CVs to archive<br>5. Log download activity<br>6. Serve ZIP file | ZIP file with CVs download | - |
| S-04-01 | Resource List | S04-EVT-12 | Column Visibility | Column settings | None | 1. Save user column preferences<br>2. Update table display<br>3. Persist settings to user profile | Column display updated | - |
| S-04-01 | Resource List | S04-EVT-13 | Pin Columns | Column IDs | None | 1. Set column pin status<br>2. Reorder table columns<br>3. Save preference<br>4. Update display | Columns pinned/unpinned | - |

### 5.5 S-04-02: Resource Detail/Edit Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-04-02 | Resource Detail | S04E-EVT-01 | Load Resource Form | Resource ID (or null for new) | Valid session + permission | 1. Check user permission<br>2. Load resource data if editing<br>3. Initialize form with data/defaults<br>4. Load department options<br>5. Check CV file existence<br>6. Set form mode (create/edit) | Form initialized with data | - |
| S-04-02 | Resource Detail | S04E-EVT-02 | Form Field Change | Field name + new value | Field-specific validation | 1. Validate field input<br>2. Update form state<br>3. Trigger cross-field validation<br>4. Update form validation status<br>5. Show/hide error messages | Field updated + validation status | - |
| S-04-02 | Resource Detail | S04E-EVT-03 | Date Field Change | Date field + new date | Valid date + business rules | 1. Validate date format<br>2. Check business rules (idle to > idle from)<br>3. Calculate duration<br>4. Update urgent status<br>5. Update form state | Date updated + calculated fields | - |
| S-04-02 | Resource Detail | S04E-EVT-04 | Upload CV | CV file | File validation rules | 1. Validate file type (PDF, DOC, DOCX, XLS)<br>2. Check file size (≤10MB)<br>3. Generate unique filename<br>4. Upload file to server<br>5. Update resource CV reference<br>6. Log upload activity | CV uploaded + success message | - |
| S-04-02 | Resource Detail | S04E-EVT-05 | Download CV | None | CV exists | 1. Check CV file exists<br>2. Generate secure download URL<br>3. Log download activity<br>4. Serve file to user | CV file download | - |
| S-04-02 | Resource Detail | S04E-EVT-06 | Delete CV | None | Permission + CV exists | 1. Check delete permission<br>2. Confirm CV deletion<br>3. Delete file from server<br>4. Remove CV reference<br>5. Log deletion activity<br>6. Update form display | CV deleted + success message | - |
| S-04-02 | Resource Detail | S04E-EVT-07 | Save Resource | Complete form data | All validation rules | 1. Validate all required fields<br>2. Check business rules<br>3. Create/update resource record<br>4. Save CV association<br>5. Log create/update activity<br>6. Generate success message | Resource saved + success message | S-04-01 |
| S-04-02 | Resource Detail | S04E-EVT-08 | Delete Resource | Resource ID | Delete permission + resource exists | 1. Check delete permission<br>2. Confirm resource deletion<br>3. Delete associated CV files<br>4. Soft delete resource record<br>5. Log deletion activity<br>6. Redirect to list | Resource deleted + success message | S-04-01 |
| S-04-02 | Resource Detail | S04E-EVT-09 | Cancel/Back | None | None | 1. Check for unsaved changes<br>2. Confirm if changes exist<br>3. Navigate back to list<br>4. Discard form state | Navigation to resource list | S-04-01 |
| S-04-02 | Resource Detail | S04E-EVT-10 | Auto-save Draft | Form data | Form partially valid | 1. Validate fillable fields<br>2. Save draft to temporary storage<br>3. Show auto-save indicator<br>4. Set auto-save timer | Draft saved notification | - |

### 5.6 S-05-01: Update History Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-05-01 | Update History | S05-EVT-01 | Load History | Page, filters, role | Valid session + permission | 1. Check user permission (role-based filtering)<br>2. Apply date range filters<br>3. Apply user/action filters<br>4. Query history records<br>5. Apply pagination<br>6. Calculate summary statistics | History records + summary | - |
| S-05-01 | Update History | S05-EVT-02 | Apply Filters | Filter criteria | Valid date range | 1. Validate date range<br>2. Validate user/action selections<br>3. Build query with filters<br>4. Execute filtered search<br>5. Update display with results<br>6. Update summary statistics | Filtered history results | - |
| S-05-01 | Update History | S05-EVT-03 | Search Resource | Resource search term | None | 1. Validate search input<br>2. Search across resource names<br>3. Apply additional active filters<br>4. Execute search query<br>5. Update table display | Filtered history by resource | - |
| S-05-01 | Update History | S05-EVT-04 | Export History | Export format + filters | None | 1. Apply current filters<br>2. Query all matching records<br>3. Format data for export<br>4. Generate export file<br>5. Log export activity | Export file download | - |
| S-05-01 | Update History | S05-EVT-05 | Generate Summary Report | Report parameters | Permission check | 1. Validate report parameters<br>2. Aggregate history data<br>3. Calculate statistics<br>4. Generate summary report<br>5. Format for display/export | Summary report generated | - |
| S-05-01 | Update History | S05-EVT-06 | Clear Filters | None | None | 1. Reset all filter values<br>2. Reload default history view<br>3. Update summary statistics<br>4. Reset pagination | Filters cleared + default view | - |
| S-05-01 | Update History | S05-EVT-07 | Auto Refresh | None | Auto-refresh enabled | 1. Check auto-refresh setting<br>2. Reload current view<br>3. Maintain current filters<br>4. Update timestamps<br>5. Show refresh indicator | Updated history data | - |
| S-05-01 | Update History | S05-EVT-08 | View Change Details | History record ID | Valid record | 1. Load detailed change information<br>2. Format old vs new values<br>3. Show change details modal<br>4. Highlight differences | Change details displayed | - |

### 5.7 S-06-01: Report Dashboard Events

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| S-06-01 | Report Dashboard | S06-EVT-01 | Load Dashboard | Filters, role | Valid session + permission | 1. Check user permission and role<br>2. Apply role-based department filtering<br>3. Load current period statistics<br>4. Generate department charts<br>5. Calculate trends<br>6. Load recent activities | Dashboard data + charts | - |
| S-06-01 | Report Dashboard | S06-EVT-02 | Apply Filters | Department + period | Valid selections | 1. Validate filter selections<br>2. Apply department filter (role-based)<br>3. Apply period filter<br>4. Recalculate statistics<br>5. Regenerate charts<br>6. Update display | Filtered dashboard data | - |
| S-06-01 | Report Dashboard | S06-EVT-03 | Generate Report | Report parameters | Valid parameters | 1. Validate report parameters<br>2. Query data with filters<br>3. Calculate statistics<br>4. Generate report content<br>5. Format for display<br>6. Log report generation | Report generated successfully | - |
| S-06-01 | Report Dashboard | S06-EVT-04 | Apply Comparison | Comparison period | Valid period selection | 1. Validate comparison period<br>2. Query historical data<br>3. Calculate comparison metrics<br>4. Generate percentage changes<br>5. Update comparison display<br>6. Add trend indicators | Comparison data displayed | - |
| S-06-01 | Report Dashboard | S06-EVT-05 | Export Report | Export format | None | 1. Prepare current report data<br>2. Format for selected export type<br>3. Generate export file<br>4. Include charts as images<br>5. Log export activity | Export file download | - |
| S-06-01 | Report Dashboard | S06-EVT-06 | View Detailed Chart | Chart type | None | 1. Load detailed chart data<br>2. Open chart in fullscreen mode<br>3. Enable chart interactions<br>4. Provide export options | Detailed chart displayed | - |
| S-06-01 | Report Dashboard | S06-EVT-07 | Generate PDF Report | Report settings | None | 1. Compile current dashboard data<br>2. Format for PDF layout<br>3. Include all charts and tables<br>4. Generate PDF file<br>5. Log PDF generation | PDF report download | - |
| S-06-01 | Report Dashboard | S06-EVT-08 | Email Report | Email settings + recipients | Valid email addresses | 1. Validate email addresses<br>2. Generate report content<br>3. Format email template<br>4. Attach report files<br>5. Send email<br>6. Log email activity | Email sent successfully | - |
| S-06-01 | Report Dashboard | S06-EVT-09 | Toggle Auto Refresh | Refresh setting | None | 1. Update auto-refresh preference<br>2. Start/stop refresh timer<br>3. Save user preference<br>4. Update UI indicator | Auto-refresh setting updated | - |
| S-06-01 | Report Dashboard | S06-EVT-10 | Manual Refresh | None | None | 1. Reload all dashboard data<br>2. Recalculate statistics<br>3. Regenerate charts<br>4. Update timestamps<br>5. Show refresh indicator | Dashboard refreshed | - |

### 5.8 Common Events (Toàn hệ thống)

| Screen ID | Screen Name | Event ID | Event Name | Input Information | Validation Rule | Event Process Description | Output Data | Next Screen ID |
|-----------|-------------|----------|------------|-------------------|-----------------|---------------------------|-------------|----------------|
| ALL | All Screens | CMN-EVT-01 | Session Timeout Check | Current session | Valid session token | 1. Check session expiry time<br>2. Validate JWT token<br>3. If expired, clear session<br>4. Redirect to login<br>5. Show timeout message | Session status + redirect | S-01-01 |
| ALL | All Screens | CMN-EVT-02 | Permission Check | User role + requested action | Valid user session | 1. Load user permissions<br>2. Check action against role<br>3. Return permission status<br>4. Log unauthorized attempts | Permission granted/denied | - |
| ALL | All Screens | CMN-EVT-03 | Error Handling | Error object | None | 1. Classify error type<br>2. Generate user-friendly message<br>3. Log error details<br>4. Show appropriate feedback<br>5. Provide recovery actions | Error message + recovery options | - |
| ALL | All Screens | CMN-EVT-04 | Form Validation | Form data + validation rules | Form-specific rules | 1. Apply field-level validation<br>2. Check cross-field rules<br>3. Validate business logic<br>4. Generate error messages<br>5. Update form state | Validation results + messages | - |
| ALL | All Screens | CMN-EVT-05 | Loading State | Operation type | None | 1. Show loading indicator<br>2. Disable user interactions<br>3. Set timeout for long operations<br>4. Handle operation completion<br>5. Hide loading state | Loading state managed | - |

---

*Tài liệu này là Phần 5 của Basic Design theo chuẩn IPA External Design (外部設計).*
