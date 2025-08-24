# SYSTEM REQUIREMENT DEFINITION - DATA MODEL & DIAGRAMS

## 11. Danh sách các Entity cần thiết và ER diagram

### Entity List:

| ID | Tên Entity | Mô tả |
|----|------------|-------|
| **E-01** | User | Thông tin người dùng hệ thống |
| **E-02** | Role | Vai trò và quyền hạn |
| **E-03** | UserRole | Liên kết người dùng với vai trò |
| **E-04** | IdleResource | Thông tin nhân sự đang idle |
| **E-05** | Department | Thông tin phòng ban |
| **E-06** | CV | Thông tin curriculum vitae |
| **E-07** | UpdateHistory | Lịch sử cập nhật |
| **E-08** | Session | Thông tin phiên đăng nhập |

### ER Diagram:

```mermaid
erDiagram
    User {
        int user_id PK
        string username
        string email
        string full_name
        string password_hash
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    
    Role {
        int role_id PK
        string role_name
        string role_description
        datetime created_at
    }
    
    UserRole {
        int user_role_id PK
        int user_id FK
        int role_id FK
        datetime assigned_at
        boolean is_active
    }
    
    Department {
        int department_id PK
        string department_name
        string department_code
        string description
        datetime created_at
        datetime updated_at
    }
    
    IdleResource {
        int resource_id PK
        int department_id FK
        string employee_code
        string full_name
        string email
        string phone
        string job_title
        string skill_set
        date idle_from
        date idle_to
        string status
        string process_note
        decimal rate
        boolean is_urgent
        int created_by FK
        int updated_by FK
        datetime created_at
        datetime updated_at
    }
    
    CV {
        int cv_id PK
        int resource_id FK
        string file_name
        string file_path
        string file_type
        long file_size
        int uploaded_by FK
        datetime uploaded_at
    }
    
    UpdateHistory {
        int history_id PK
        int resource_id FK
        string table_name
        string action_type
        text old_values
        text new_values
        int updated_by FK
        datetime updated_at
    }
    
    Session {
        int session_id PK
        int user_id FK
        string session_token
        datetime login_time
        datetime last_activity
        datetime expires_at
        boolean is_active
    }

    User ||--o{ UserRole : "has"
    Role ||--o{ UserRole : "assigned to"
    Department ||--o{ IdleResource : "contains"
    User ||--o{ IdleResource : "created by"
    User ||--o{ IdleResource : "updated by"
    IdleResource ||--o{ CV : "has"
    User ||--o{ CV : "uploaded by"
    IdleResource ||--o{ UpdateHistory : "tracked in"
    User ||--o{ UpdateHistory : "performed by"
    User ||--o{ Session : "owns"
```

## 12. Sơ đồ di chuyển chức năng trong hệ thống

```mermaid
flowchart TD
    A[S-01-01: Login Screen] --> B[S-02-01: Dashboard/Top Screen]
    
    B --> C[S-03-01: User Management]
    B --> D[S-04-01: Idle Resource List]
    B --> E[S-05-01: Update History]
    B --> F[S-06-01: Report Dashboard]
    
    D --> G[S-04-02: Resource Detail/Edit]
    G --> D
    
    C --> B
    E --> B
    F --> B
    
    %% Role-based access
    B -.->|Admin only| C
    B -.->|Admin, RA, MNG| D
    B -.->|Admin, RA, MNG| E
    B -.->|Admin, RA, MNG| F
    B -.->|Viewer| H[S-04-01: Read-only Resource List]
    
    %% Actions within Resource List
    D --> I[Add New Resource]
    D --> J[Edit Resource]
    D --> K[Delete Resource]
    D --> L[Import Data]
    D --> M[Export Data]
    D --> N[Upload CV]
    D --> O[Download CV]
    D --> P[Search/Filter]
    
    I --> D
    J --> D
    K --> D
    L --> D
    M --> D
    N --> D
    O --> D
    P --> D
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#fff8e1
    style F fill:#fce4ec
    style G fill:#e8f5e8
    style H fill:#f1f8e9
```

## 13. Luồng nghiệp vụ chính (Main Business Flows)

### Luồng 1: Đăng nhập hệ thống
**Actor**: Tất cả người dùng  
**Mục đích**: Xác thực và khởi tạo phiên làm việc

1. Người dùng truy cập màn hình đăng nhập (S-01-01)
2. Nhập username và password
3. Hệ thống xác thực thông tin
4. Nếu thành công: tạo session và chuyển đến Dashboard (S-02-01)
5. Nếu thất bại: hiển thị thông báo lỗi
6. Hệ thống kiểm tra session timeout định kỳ

### Luồng 2: Quản lý Idle Resource (RA/MNG)
**Actor**: RA, Manager  
**Mục đích**: Thêm, sửa, xóa thông tin nhân sự idle

1. Từ Dashboard, chọn "Quản lý Idle Resource" → S-04-01
2. Xem danh sách idle resource hiện tại
3. **Thêm mới**:
   - Nhấn "Add New" → S-04-02
   - Nhập thông tin bắt buộc (tên, email, idle from, department, etc.)
   - Upload CV (tùy chọn)
   - Lưu → Hệ thống tạo record mới + log history
4. **Chỉnh sửa**:
   - Chọn record → S-04-02
   - Cập nhật thông tin → Lưu → Log history
5. **Xóa**: Chọn record(s) → Xác nhận xóa → Log history

### Luồng 3: Tìm kiếm và Filter (Tất cả role)
**Actor**: Admin, RA, MNG, Viewer  
**Mục đích**: Tìm thông tin idle resource theo tiêu chí

1. Tại S-04-01, sử dụng search box hoặc filter
2. Nhập từ khóa tìm kiếm trên header hoặc title
3. Áp dụng filter theo department, status, idle date, etc.
4. Hệ thống hiển thị kết quả phù hợp với quyền của user
5. **Highlight logic**:
   - Màu vàng: Resource chưa chốt ngày Idle From
   - Icon urgent: Idle date ≥ 2 tháng

### Luồng 4: Import/Export dữ liệu (RA)
**Actor**: RA  
**Mục đích**: Xử lý dữ liệu hàng loạt

**Import**:
1. Từ S-04-01, chọn "Import"
2. Upload file Excel/CSV đúng format
3. Hệ thống validate dữ liệu
4. Hiển thị preview → Xác nhận import
5. Tạo batch job B-04 → Log tất cả thay đổi

**Export**:
1. Từ S-04-01, áp dụng filter mong muốn
2. Chọn "Export" → Chọn format (CSV/Excel)
3. Tạo batch job B-05 → Download file

### Luồng 5: Xem báo cáo Dashboard (RA/MNG)
**Actor**: RA, Manager  
**Mục đích**: Phân tích tình hình idle resource

1. Từ Dashboard, chọn "Reports" → S-06-01
2. Chọn loại báo cáo:
   - Tình hình idle theo bộ phận
   - So sánh với tuần trước
3. Áp dụng filter by Source
4. Hệ thống generate dashboard real-time
5. Option export báo cáo ra PDF/CSV

---
*Tài liệu này là phần 3 của System Requirement Definition theo chuẩn IPA.*
