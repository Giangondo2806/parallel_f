# BASIC DESIGN - PHẦN 6-7: DATA STRUCTURE VÀ CSV LAYOUT

## Phần 6: Data Structure Definition

Định nghĩa cấu trúc dữ liệu phục vụ giao diện và validation, mapping với entities trong database.

### 6.1 Bảng quản lý Data Structure List

| ID | Tên cấu trúc dữ liệu | Mục đích sử dụng | Màn hình liên quan | Mô tả |
|----|---------------------|------------------|-------------------|-------|
| 1  | UserInfo           | Hiển thị thông tin user | S-02-01, S-03-01 | Cấu trúc dữ liệu người dùng hệ thống |
| 2  | IdleResourceData   | Hiển thị danh sách idle resource | S-04-01, S-04-02 | Cấu trúc dữ liệu resource đang idle |
| 3  | DepartmentInfo     | Dropdown departments | S-04-01, S-04-02, S-06-01 | Thông tin phòng ban |
| 4  | CVFileInfo         | Quản lý CV files | S-04-01, S-04-02 | Thông tin file CV |
| 5  | UpdateHistoryData  | Lịch sử cập nhật | S-05-01 | Dữ liệu lịch sử thay đổi |
| 6  | DashboardStats     | Dashboard statistics | S-02-01, S-06-01 | Thống kê dashboard |
| 7  | ReportData         | Báo cáo dữ liệu | S-06-01 | Dữ liệu cho các báo cáo |
| 8  | SessionInfo        | Thông tin phiên đăng nhập | All screens | Dữ liệu session và authentication |

### 6.2 Data Structure Definition

#### 6.2.1 UserInfo Structure
```typescript
interface UserInfo {
  userId: number;              // ID người dùng (required)
  username: string;            // Tên đăng nhập (required, max: 50)
  email: string;               // Email (required, max: 100, email format)
  fullName: string;            // Họ tên đầy đủ (optional, max: 100)
  role: 'Admin' | 'RA' | 'Manager' | 'Viewer';  // Vai trò (required)
  isActive: boolean;           // Trạng thái hoạt động (required)
  createdAt: Date;             // Ngày tạo (required)
  updatedAt: Date;             // Ngày cập nhật cuối (required)
  lastLoginAt?: Date;          // Lần đăng nhập cuối (optional)
  departmentId?: number;       // ID phòng ban (optional, for Manager role)
}
```

#### 6.2.2 IdleResourceData Structure
```typescript
interface IdleResourceData {
  resourceId: number;          // ID resource (required)
  employeeCode: string;        // Mã nhân viên (required, max: 20)
  fullName: string;            // Họ tên (required, max: 100)
  email: string;               // Email (required, max: 100)
  phone?: string;              // Số điện thoại (optional, max: 20)
  jobTitle?: string;           // Chức danh (optional, max: 100)
  skillSet?: string;           // Kỹ năng (optional, max: 200)
  departmentId: number;        // ID phòng ban (required)
  departmentName: string;      // Tên phòng ban (required)
  idleFrom: Date;              // Ngày bắt đầu idle (required)
  idleTo?: Date;               // Ngày kết thúc idle (optional)
  status: 'Available' | 'Assigned' | 'On Leave' | 'Training';  // Trạng thái
  processNote?: string;        // Ghi chú xử lý (optional, max: 1000)
  rate?: string;               // Mức lương (optional, max: 20)
  isUrgent: boolean;           // Trạng thái urgent (≥2 months)
  idleDuration: number;        // Số ngày idle (calculated)
  cvFileId?: number;           // ID file CV (optional)
  cvFileName?: string;         // Tên file CV (optional)
  createdBy: number;           // Người tạo (required)
  updatedBy: number;           // Người cập nhật cuối (required)
  createdAt: Date;             // Ngày tạo (required)
  updatedAt: Date;             // Ngày cập nhật cuối (required)
}
```

#### 6.2.3 DepartmentInfo Structure
```typescript
interface DepartmentInfo {
  departmentId: number;        // ID phòng ban (required)
  departmentName: string;      // Tên phòng ban (required, max: 100)
  departmentCode: string;      // Mã phòng ban (required, max: 20)
  description?: string;        // Mô tả (optional, max: 500)
  isActive: boolean;           // Trạng thái hoạt động (required)
  createdAt: Date;             // Ngày tạo (required)
  updatedAt: Date;             // Ngày cập nhật (required)
}
```

#### 6.2.4 CVFileInfo Structure
```typescript
interface CVFileInfo {
  cvId: number;                // ID file CV (required)
  resourceId: number;          // ID resource sở hữu (required)
  fileName: string;            // Tên file gốc (required, max: 255)
  filePath: string;            // Đường dẫn file (required, max: 500)
  fileType: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX';  // Loại file
  fileSize: number;            // Kích thước file (bytes)
  uploadedBy: number;          // Người upload (required)
  uploadedAt: Date;            // Thời gian upload (required)
}
```

#### 6.2.5 UpdateHistoryData Structure
```typescript
interface UpdateHistoryData {
  historyId: number;           // ID lịch sử (required)
  resourceId?: number;         // ID resource liên quan (optional)
  resourceName?: string;       // Tên resource (optional)
  tableName: string;           // Tên bảng bị thay đổi (required)
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'CV_UPLOAD' | 
             'CV_DELETE' | 'BULK_UPDATE' | 'IMPORT' | 'EXPORT' | 
             'LOGIN' | 'LOGOUT';  // Loại thao tác
  oldValues?: string;          // Giá trị cũ (JSON string)
  newValues?: string;          // Giá trị mới (JSON string)
  changeDescription: string;   // Mô tả thay đổi (required, max: 500)
  updatedBy: number;           // Người thực hiện (required)
  updatedByName: string;       // Tên người thực hiện (required)
  updatedAt: Date;             // Thời gian thực hiện (required)
}
```

#### 6.2.6 DashboardStats Structure
```typescript
interface DashboardStats {
  totalIdle: number;           // Tổng số idle resource
  urgentCases: number;         // Số resource urgent (≥2 months)
  availableNow: number;        // Số resource available
  assignedThisWeek: number;    // Số resource được assign tuần này
  departmentBreakdown: Array<{
    departmentName: string;
    count: number;
    percentage: number;
  }>;
  skillBreakdown: Array<{
    skillName: string;
    count: number;
  }>;
  recentActivities: Array<{
    activity: string;
    timestamp: Date;
    user: string;
  }>;
  lastUpdated: Date;           // Thời gian cập nhật cuối
}
```

#### 6.2.7 ReportData Structure
```typescript
interface ReportData {
  reportId: string;            // ID báo cáo (required)
  reportType: 'DEPARTMENT' | 'COMPARISON' | 'TREND' | 'SUMMARY';
  title: string;               // Tiêu đề báo cáo (required)
  period: string;              // Kỳ báo cáo (required)
  filters: {
    departmentIds?: number[];
    dateFrom?: Date;
    dateTo?: Date;
    status?: string[];
  };
  currentPeriodStats: {
    totalIdle: number;
    newAdded: number;
    assigned: number;
    urgent: number;
  };
  previousPeriodStats?: {
    totalIdle: number;
    newAdded: number;
    assigned: number;
    urgent: number;
  };
  comparisonData?: Array<{
    metric: string;
    current: number;
    previous: number;
    change: number;
    changePercent: number;
  }>;
  chartData: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  generatedAt: Date;           // Thời gian tạo báo cáo
  generatedBy: number;         // Người tạo báo cáo
}
```

#### 6.2.8 SessionInfo Structure
```typescript
interface SessionInfo {
  sessionId: string;           // ID session (required)
  userId: number;              // ID người dùng (required)
  userInfo: UserInfo;          // Thông tin người dùng (required)
  token: string;               // JWT token (required)
  permissions: string[];       // Danh sách permissions (required)
  loginTime: Date;             // Thời gian đăng nhập (required)
  lastActivity: Date;          // Hoạt động cuối (required)
  expiresAt: Date;             // Thời gian hết hạn (required)
  isActive: boolean;           // Trạng thái session (required)
}
```

## Phần 7: CSV Layout Definition

### 7.1 Bảng quản lý CSV Layout List

| ID | Tên file CSV | Mục đích sử dụng | Màn hình liên quan | Mô tả |
|----|--------------|------------------|-------------------|-------|
| CSV-01 | idle_resources_import.csv | Import dữ liệu idle resource | S-04-01 | File import danh sách idle resource |
| CSV-02 | idle_resources_export.csv | Export dữ liệu idle resource | S-04-01 | File export danh sách idle resource |
| CSV-03 | users_import.csv | Import danh sách người dùng | S-03-01 | File import danh sách users |
| CSV-04 | update_history_export.csv | Export lịch sử cập nhật | S-05-01 | File export lịch sử thay đổi |

### 7.2 CSV Layout Definition

#### 7.2.1 CSV-01: idle_resources_import.csv

**Mục đích**: Import dữ liệu idle resource vào hệ thống

| Column Index | Column Name | Data Type | Required | Max Length | Validation Rules | Description |
|--------------|-------------|-----------|----------|------------|------------------|-------------|
| 1 | employee_code | string | Yes | 20 | Alphanumeric, unique | Mã nhân viên |
| 2 | full_name | string | Yes | 100 | No special chars | Họ và tên |
| 3 | email | string | Yes | 100 | Valid email format | Địa chỉ email |
| 4 | phone | string | No | 20 | Phone number format | Số điện thoại |
| 5 | department_code | string | Yes | 20 | Must exist in department table | Mã phòng ban |
| 6 | job_title | string | No | 100 | - | Chức danh |
| 7 | skill_set | string | No | 200 | - | Kỹ năng (comma separated) |
| 8 | idle_from | date | Yes | - | Valid date, YYYY-MM-DD format | Ngày bắt đầu idle |
| 9 | idle_to | date | No | - | Valid date, after idle_from | Ngày kết thúc idle |
| 10 | status | string | Yes | 20 | Available/Assigned/On Leave/Training | Trạng thái |
| 11 | rate | string | No | 20 | Number format | Mức lương |
| 12 | process_note | string | No | 1000 | - | Ghi chú xử lý |

**Sample Data**:
```csv
employee_code,full_name,email,phone,department_code,job_title,skill_set,idle_from,idle_to,status,rate,process_note
EMP001,Nguyen Van A,nguyen.a@fjp.vn,0901234567,IT,Senior Developer,Java C# SQL,2025-06-01,,Available,500 USD,Contact with client ABC
EMP002,Tran Thi B,tran.b@fjp.vn,0902345678,QA,QA Engineer,Testing Automation,2025-07-15,,Available,400 USD,
```

#### 7.2.2 CSV-02: idle_resources_export.csv

**Mục đích**: Export dữ liệu idle resource từ hệ thống

| Column Index | Column Name | Data Type | Description |
|--------------|-------------|-----------|-------------|
| 1 | resource_id | number | ID resource trong hệ thống |
| 2 | employee_code | string | Mã nhân viên |
| 3 | full_name | string | Họ và tên |
| 4 | email | string | Địa chỉ email |
| 5 | phone | string | Số điện thoại |
| 6 | department_name | string | Tên phòng ban |
| 7 | job_title | string | Chức danh |
| 8 | skill_set | string | Kỹ năng |
| 9 | idle_from | date | Ngày bắt đầu idle |
| 10 | idle_to | date | Ngày kết thúc idle |
| 11 | idle_duration_days | number | Số ngày idle |
| 12 | status | string | Trạng thái |
| 13 | is_urgent | boolean | Có urgent không |
| 14 | rate | string | Mức lương (ẩn với Viewer) |
| 15 | cv_file_name | string | Tên file CV |
| 16 | process_note | string | Ghi chú xử lý (ẩn với Viewer) |
| 17 | created_at | datetime | Ngày tạo |
| 18 | updated_at | datetime | Ngày cập nhật cuối |

#### 7.2.3 CSV-03: users_import.csv

**Mục đích**: Import danh sách người dùng vào hệ thống

| Column Index | Column Name | Data Type | Required | Max Length | Validation Rules | Description |
|--------------|-------------|-----------|----------|------------|------------------|-------------|
| 1 | username | string | Yes | 50 | Alphanumeric, unique | Tên đăng nhập |
| 2 | email | string | Yes | 100 | Valid email, unique | Địa chỉ email |
| 3 | full_name | string | Yes | 100 | No special chars | Họ và tên |
| 4 | role | string | Yes | 20 | Admin/RA/Manager/Viewer | Vai trò |
| 5 | department_code | string | No | 20 | Must exist (for Manager) | Mã phòng ban |
| 6 | is_active | boolean | No | - | true/false, default true | Trạng thái hoạt động |
| 7 | password | string | No | 100 | Min 8 chars, if empty = temp password | Mật khẩu |

**Sample Data**:
```csv
username,email,full_name,role,department_code,is_active,password
ra001,ra001@fjp.vn,Nguyen Resource Admin,RA,,true,TempPass123
mgr_it,mgr.it@fjp.vn,Le IT Manager,Manager,IT,true,TempPass456
```

#### 7.2.4 CSV-04: update_history_export.csv

**Mục đích**: Export lịch sử cập nhật từ hệ thống

| Column Index | Column Name | Data Type | Description |
|--------------|-------------|-----------|-------------|
| 1 | history_id | number | ID lịch sử |
| 2 | timestamp | datetime | Thời gian thực hiện |
| 3 | user_name | string | Tên người thực hiện |
| 4 | action_type | string | Loại thao tác |
| 5 | resource_id | number | ID resource liên quan |
| 6 | resource_name | string | Tên resource |
| 7 | table_name | string | Tên bảng bị thay đổi |
| 8 | change_description | string | Mô tả thay đổi |
| 9 | old_values | string | Giá trị cũ (JSON) |
| 10 | new_values | string | Giá trị mới (JSON) |

## Phần 8: API Endpoint Definition

### 8.1 Bảng quản lý API Endpoint List

| API ID | Tên API | Phương thức | Đường dẫn | Event ID liên quan | Mô tả |
|--------|---------|-------------|-----------|-------------------|-------|
| API-01 | User Authentication | POST | /api/auth/login | S01-EVT-01 | Đăng nhập người dùng |
| API-02 | User Logout | POST | /api/auth/logout | S02-EVT-04 | Đăng xuất người dùng |
| API-03 | Get Dashboard Stats | GET | /api/dashboard/stats | S02-EVT-01 | Lấy thống kê dashboard |
| API-04 | Get User List | GET | /api/users | S03-EVT-01 | Lấy danh sách người dùng |
| API-05 | Create User | POST | /api/users | S03-EVT-03 | Tạo người dùng mới |
| API-06 | Update User | PUT | /api/users/{id} | S03-EVT-04 | Cập nhật người dùng |
| API-07 | Delete User | DELETE | /api/users/{id} | S03-EVT-05 | Xóa người dùng |
| API-08 | Get Resource List | GET | /api/resources | S04-EVT-01 | Lấy danh sách idle resource |
| API-09 | Get Resource Detail | GET | /api/resources/{id} | S04E-EVT-01 | Lấy chi tiết resource |
| API-10 | Create Resource | POST | /api/resources | S04E-EVT-07 | Tạo resource mới |
| API-11 | Update Resource | PUT | /api/resources/{id} | S04E-EVT-07 | Cập nhật resource |
| API-12 | Delete Resource | DELETE | /api/resources/{id} | S04E-EVT-08 | Xóa resource |
| API-13 | Upload CV | POST | /api/resources/{id}/cv | S04E-EVT-04 | Upload CV file |
| API-14 | Download CV | GET | /api/resources/{id}/cv | S04E-EVT-05 | Download CV file |
| API-15 | Delete CV | DELETE | /api/resources/{id}/cv | S04E-EVT-06 | Xóa CV file |
| API-16 | Import Resources | POST | /api/resources/import | S04-EVT-08 | Import resources từ CSV |
| API-17 | Export Resources | GET | /api/resources/export | S04-EVT-09 | Export resources ra CSV |
| API-18 | Download Multiple CVs | POST | /api/resources/download-cvs | S04-EVT-11 | Download nhiều CV |
| API-19 | Get Update History | GET | /api/history | S05-EVT-01 | Lấy lịch sử cập nhật |
| API-20 | Export History | GET | /api/history/export | S05-EVT-04 | Export lịch sử |
| API-21 | Get Report Data | GET | /api/reports/dashboard | S06-EVT-01 | Lấy dữ liệu báo cáo |
| API-22 | Generate Report | POST | /api/reports/generate | S06-EVT-03 | Tạo báo cáo |
| API-23 | Export Report | GET | /api/reports/export | S06-EVT-05 | Export báo cáo |
| API-24 | Get Departments | GET | /api/departments | Multiple | Lấy danh sách phòng ban |
| API-25 | Session Check | GET | /api/auth/check | CMN-EVT-01 | Kiểm tra session |

### 8.2 API Endpoint Detail Definition

#### 8.2.1 API-01: User Authentication

```yaml
/api/auth/login:
  post:
    summary: Đăng nhập người dùng
    tags: [Authentication]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              username:
                type: string
                maxLength: 50
                description: Tên đăng nhập
              password:
                type: string
                minLength: 8
                description: Mật khẩu
              rememberMe:
                type: boolean
                default: false
                description: Ghi nhớ đăng nhập
            required: [username, password]
    responses:
      200:
        description: Đăng nhập thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    user: { $ref: '#/components/schemas/UserInfo' }
                    token:
                      type: string
                      description: JWT token
                    expiresIn:
                      type: number
                      description: Thời gian hết hạn (seconds)
      401:
        description: Thông tin đăng nhập không đúng
      429:
        description: Quá nhiều lần thử đăng nhập
```

#### 8.2.2 API-08: Get Resource List

```yaml
/api/resources:
  get:
    summary: Lấy danh sách idle resource
    tags: [Resources]
    security:
      - BearerAuth: []
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          minimum: 1
          default: 1
      - name: limit
        in: query
        schema:
          type: integer
          minimum: 1
          maximum: 100
          default: 20
      - name: search
        in: query
        schema:
          type: string
          maxLength: 100
      - name: departmentId
        in: query
        schema:
          type: integer
      - name: status
        in: query
        schema:
          type: string
          enum: [Available, Assigned, "On Leave", Training]
      - name: isUrgent
        in: query
        schema:
          type: boolean
    responses:
      200:
        description: Danh sách resource thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    resources:
                      type: array
                      items:
                        $ref: '#/components/schemas/IdleResourceData'
                    pagination:
                      type: object
                      properties:
                        total: { type: integer }
                        page: { type: integer }
                        limit: { type: integer }
                        totalPages: { type: integer }
      403:
        description: Không có quyền truy cập
```

#### 8.2.3 API-02: User Logout

```yaml
/api/auth/logout:
  post:
    summary: Đăng xuất người dùng
    tags: [Authentication]
    security:
      - BearerAuth: []
    responses:
      200:
        description: Đăng xuất thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                message:
                  type: string
      401:
        description: Token không hợp lệ
```

#### 8.2.4 API-03: Get Dashboard Stats

```yaml
/api/dashboard/stats:
  get:
    summary: Lấy thống kê dashboard
    tags: [Dashboard]
    security:
      - BearerAuth: []
    parameters:
      - name: departmentId
        in: query
        schema:
          type: integer
          description: Filter theo phòng ban (cho Manager)
    responses:
      200:
        description: Thống kê dashboard thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/DashboardStats'
      403:
        description: Không có quyền truy cập
```

#### 8.2.5 API-04: Get User List

```yaml
/api/users:
  get:
    summary: Lấy danh sách người dùng
    tags: [Users]
    security:
      - BearerAuth: []
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          minimum: 1
          default: 1
      - name: limit
        in: query
        schema:
          type: integer
          minimum: 1
          maximum: 100
          default: 10
      - name: search
        in: query
        schema:
          type: string
          maxLength: 100
      - name: role
        in: query
        schema:
          type: string
          enum: [Admin, RA, Manager, Viewer]
      - name: isActive
        in: query
        schema:
          type: boolean
    responses:
      200:
        description: Danh sách người dùng thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    users:
                      type: array
                      items:
                        $ref: '#/components/schemas/UserInfo'
                    pagination:
                      type: object
                      properties:
                        total: { type: integer }
                        page: { type: integer }
                        limit: { type: integer }
                        totalPages: { type: integer }
      403:
        description: Chỉ Admin mới có quyền
```

#### 8.2.6 API-05: Create User

```yaml
/api/users:
  post:
    summary: Tạo người dùng mới
    tags: [Users]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              username:
                type: string
                maxLength: 50
                description: Tên đăng nhập (unique)
              email:
                type: string
                maxLength: 100
                format: email
                description: Địa chỉ email (unique)
              fullName:
                type: string
                maxLength: 100
                description: Họ và tên
              role:
                type: string
                enum: [Admin, RA, Manager, Viewer]
                description: Vai trò
              departmentId:
                type: integer
                description: ID phòng ban (bắt buộc cho Manager)
              password:
                type: string
                minLength: 8
                description: Mật khẩu
              isActive:
                type: boolean
                default: true
                description: Trạng thái hoạt động
            required: [username, email, fullName, role, password]
    responses:
      201:
        description: Tạo người dùng thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/UserInfo'
      400:
        description: Dữ liệu không hợp lệ
      409:
        description: Username hoặc email đã tồn tại
      403:
        description: Chỉ Admin mới có quyền
```

#### 8.2.7 API-06: Update User

```yaml
/api/users/{id}:
  put:
    summary: Cập nhật người dùng
    tags: [Users]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email:
                type: string
                maxLength: 100
                format: email
              fullName:
                type: string
                maxLength: 100
              role:
                type: string
                enum: [Admin, RA, Manager, Viewer]
              departmentId:
                type: integer
              isActive:
                type: boolean
    responses:
      200:
        description: Cập nhật thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/UserInfo'
      400:
        description: Dữ liệu không hợp lệ
      404:
        description: Người dùng không tồn tại
      403:
        description: Chỉ Admin mới có quyền
```

#### 8.2.8 API-07: Delete User

```yaml
/api/users/{id}:
  delete:
    summary: Xóa người dùng
    tags: [Users]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      200:
        description: Xóa thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                message:
                  type: string
      404:
        description: Người dùng không tồn tại
      403:
        description: Chỉ Admin mới có quyền
      409:
        description: Không thể xóa (có dữ liệu liên quan)
```

#### 8.2.9 API-09: Get Resource Detail

```yaml
/api/resources/{id}:
  get:
    summary: Lấy chi tiết resource
    tags: [Resources]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      200:
        description: Chi tiết resource thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/IdleResourceData'
      404:
        description: Resource không tồn tại
      403:
        description: Không có quyền truy cập
```

#### 8.2.10 API-10: Create Resource

```yaml
/api/resources:
  post:
    summary: Tạo resource mới
    tags: [Resources]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              employeeCode:
                type: string
                maxLength: 20
                description: Mã nhân viên (unique)
              fullName:
                type: string
                maxLength: 100
                description: Họ và tên
              email:
                type: string
                maxLength: 100
                format: email
                description: Địa chỉ email
              phone:
                type: string
                maxLength: 20
                description: Số điện thoại
              departmentId:
                type: integer
                description: ID phòng ban
              jobTitle:
                type: string
                maxLength: 100
                description: Chức danh
              skillSet:
                type: string
                maxLength: 200
                description: Kỹ năng
              idleFrom:
                type: string
                format: date
                description: Ngày bắt đầu idle
              idleTo:
                type: string
                format: date
                description: Ngày kết thúc idle
              status:
                type: string
                enum: [Available, Assigned, "On Leave", Training]
                default: Available
              rate:
                type: string
                maxLength: 20
                description: Mức lương
              processNote:
                type: string
                maxLength: 1000
                description: Ghi chú xử lý
            required: [employeeCode, fullName, email, departmentId, idleFrom]
    responses:
      201:
        description: Tạo resource thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/IdleResourceData'
      400:
        description: Dữ liệu không hợp lệ
      409:
        description: Mã nhân viên đã tồn tại
      403:
        description: Không có quyền tạo
```

#### 8.2.11 API-11: Update Resource

```yaml
/api/resources/{id}:
  put:
    summary: Cập nhật resource
    tags: [Resources]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              fullName:
                type: string
                maxLength: 100
              email:
                type: string
                maxLength: 100
                format: email
              phone:
                type: string
                maxLength: 20
              departmentId:
                type: integer
              jobTitle:
                type: string
                maxLength: 100
              skillSet:
                type: string
                maxLength: 200
              idleFrom:
                type: string
                format: date
              idleTo:
                type: string
                format: date
              status:
                type: string
                enum: [Available, Assigned, "On Leave", Training]
              rate:
                type: string
                maxLength: 20
              processNote:
                type: string
                maxLength: 1000
    responses:
      200:
        description: Cập nhật thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/IdleResourceData'
      400:
        description: Dữ liệu không hợp lệ
      404:
        description: Resource không tồn tại
      403:
        description: Không có quyền cập nhật
```

#### 8.2.12 API-12: Delete Resource

```yaml
/api/resources/{id}:
  delete:
    summary: Xóa resource
    tags: [Resources]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      200:
        description: Xóa thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                message:
                  type: string
      404:
        description: Resource không tồn tại
      403:
        description: Không có quyền xóa
```

#### 8.2.13 API-13: Upload CV

```yaml
/api/resources/{id}/cv:
  post:
    summary: Upload CV file cho resource
    tags: [Resources, Files]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    requestBody:
      required: true
      content:
        multipart/form-data:
          schema:
            type: object
            properties:
              cv:
                type: string
                format: binary
                description: CV file (PDF, DOC, DOCX, XLS, XLSX)
            required: [cv]
    responses:
      200:
        description: Upload CV thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/CVFileInfo'
      400:
        description: File không hợp lệ hoặc định dạng không đúng
      413:
        description: File quá lớn (>10MB)
      403:
        description: Không có quyền upload
      404:
        description: Resource không tồn tại
```

#### 8.2.14 API-14: Download CV

```yaml
/api/resources/{id}/cv:
  get:
    summary: Download CV file
    tags: [Resources, Files]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      200:
        description: Download CV thành công
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
        headers:
          Content-Disposition:
            description: Tên file attachment
            schema:
              type: string
          Content-Type:
            description: MIME type của file
            schema:
              type: string
      404:
        description: CV không tồn tại
      403:
        description: Không có quyền download
```

#### 8.2.15 API-15: Delete CV

```yaml
/api/resources/{id}/cv:
  delete:
    summary: Xóa CV file
    tags: [Resources, Files]
    security:
      - BearerAuth: []
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      200:
        description: Xóa CV thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                message:
                  type: string
      404:
        description: CV không tồn tại
      403:
        description: Không có quyền xóa
```

#### 8.2.16 API-16: Import Resources

```yaml
/api/resources/import:
  post:
    summary: Import resources từ CSV/Excel
    tags: [Resources, Import/Export]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        multipart/form-data:
          schema:
            type: object
            properties:
              file:
                type: string
                format: binary
                description: CSV hoặc Excel file
              validateOnly:
                type: boolean
                default: false
                description: Chỉ validate không import
            required: [file]
    responses:
      200:
        description: Import thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    totalRows:
                      type: integer
                    successfulRows:
                      type: integer
                    failedRows:
                      type: integer
                    errors:
                      type: array
                      items:
                        type: object
                        properties:
                          row: { type: integer }
                          field: { type: string }
                          error: { type: string }
      400:
        description: File không hợp lệ hoặc format sai
      403:
        description: Chỉ RA mới có quyền import
```

#### 8.2.17 API-17: Export Resources

```yaml
/api/resources/export:
  get:
    summary: Export resources ra CSV/Excel
    tags: [Resources, Import/Export]
    security:
      - BearerAuth: []
    parameters:
      - name: format
        in: query
        schema:
          type: string
          enum: [csv, excel]
          default: csv
      - name: search
        in: query
        schema:
          type: string
      - name: departmentId
        in: query
        schema:
          type: integer
      - name: status
        in: query
        schema:
          type: string
      - name: isUrgent
        in: query
        schema:
          type: boolean
    responses:
      200:
        description: Export thành công
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
        headers:
          Content-Disposition:
            description: Tên file download
            schema:
              type: string
      403:
        description: Không có quyền export
```

#### 8.2.18 API-18: Download Multiple CVs

```yaml
/api/resources/download-cvs:
  post:
    summary: Download nhiều CV files trong ZIP
    tags: [Resources, Files]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              resourceIds:
                type: array
                items:
                  type: integer
                minItems: 1
                maxItems: 50
                description: Danh sách resource IDs
            required: [resourceIds]
    responses:
      200:
        description: Download ZIP thành công
        content:
          application/zip:
            schema:
              type: string
              format: binary
        headers:
          Content-Disposition:
            description: Tên file ZIP
            schema:
              type: string
      400:
        description: Danh sách resource IDs không hợp lệ
      404:
        description: Một số CVs không tồn tại
      403:
        description: Không có quyền download
```

#### 8.2.19 API-19: Get Update History

```yaml
/api/history:
  get:
    summary: Lấy lịch sử cập nhật
    tags: [History]
    security:
      - BearerAuth: []
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          minimum: 1
          default: 1
      - name: limit
        in: query
        schema:
          type: integer
          minimum: 1
          maximum: 100
          default: 50
      - name: userId
        in: query
        schema:
          type: integer
          description: Filter theo user
      - name: actionType
        in: query
        schema:
          type: string
          enum: [CREATE, UPDATE, DELETE, CV_UPLOAD, CV_DELETE, BULK_UPDATE, IMPORT, EXPORT, LOGIN, LOGOUT]
      - name: resourceId
        in: query
        schema:
          type: integer
          description: Filter theo resource
      - name: fromDate
        in: query
        schema:
          type: string
          format: date
      - name: toDate
        in: query
        schema:
          type: string
          format: date
      - name: search
        in: query
        schema:
          type: string
          maxLength: 100
          description: Tìm theo tên resource
    responses:
      200:
        description: Lịch sử thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    history:
                      type: array
                      items:
                        $ref: '#/components/schemas/UpdateHistoryData'
                    pagination:
                      type: object
                      properties:
                        total: { type: integer }
                        page: { type: integer }
                        limit: { type: integer }
                        totalPages: { type: integer }
                    summary:
                      type: object
                      properties:
                        todayUpdates: { type: integer }
                        todayCreates: { type: integer }
                        todayDeletes: { type: integer }
                        todayCVOperations: { type: integer }
      403:
        description: Không có quyền truy cập
```

#### 8.2.20 API-20: Export History

```yaml
/api/history/export:
  get:
    summary: Export lịch sử ra CSV
    tags: [History, Import/Export]
    security:
      - BearerAuth: []
    parameters:
      - name: userId
        in: query
        schema:
          type: integer
      - name: actionType
        in: query
        schema:
          type: string
      - name: fromDate
        in: query
        schema:
          type: string
          format: date
      - name: toDate
        in: query
        schema:
          type: string
          format: date
    responses:
      200:
        description: Export lịch sử thành công
        content:
          text/csv:
            schema:
              type: string
        headers:
          Content-Disposition:
            description: Tên file CSV
            schema:
              type: string
      403:
        description: Không có quyền export
```

#### 8.2.21 API-21: Get Report Data

```yaml
/api/reports/dashboard:
  get:
    summary: Lấy dữ liệu báo cáo dashboard
    tags: [Reports]
    security:
      - BearerAuth: []
    parameters:
      - name: departmentId
        in: query
        schema:
          type: integer
          description: Filter theo phòng ban
      - name: period
        in: query
        schema:
          type: string
          enum: ["This Week", "Last Week", "This Month", "Last Month"]
          default: "This Week"
      - name: compareWith
        in: query
        schema:
          type: string
          enum: ["Last Week", "Last Month", "Last Quarter"]
          description: Kỳ so sánh
    responses:
      200:
        description: Dữ liệu báo cáo thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  $ref: '#/components/schemas/ReportData'
      403:
        description: Không có quyền truy cập
```

#### 8.2.22 API-22: Generate Report

```yaml
/api/reports/generate:
  post:
    summary: Tạo báo cáo
    tags: [Reports]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              reportType:
                type: string
                enum: [DEPARTMENT, COMPARISON, TREND, SUMMARY]
              title:
                type: string
                maxLength: 200
              period:
                type: string
              filters:
                type: object
                properties:
                  departmentIds:
                    type: array
                    items:
                      type: integer
                  dateFrom:
                    type: string
                    format: date
                  dateTo:
                    type: string
                    format: date
                  status:
                    type: array
                    items:
                      type: string
            required: [reportType, title, period]
    responses:
      200:
        description: Tạo báo cáo thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    reportId:
                      type: string
                    downloadUrl:
                      type: string
      400:
        description: Tham số báo cáo không hợp lệ
      403:
        description: Không có quyền tạo báo cáo
```

#### 8.2.23 API-23: Export Report

```yaml
/api/reports/export:
  get:
    summary: Export báo cáo
    tags: [Reports, Import/Export]
    security:
      - BearerAuth: []
    parameters:
      - name: reportId
        in: query
        required: true
        schema:
          type: string
      - name: format
        in: query
        schema:
          type: string
          enum: [pdf, excel, csv]
          default: pdf
    responses:
      200:
        description: Export báo cáo thành công
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
        headers:
          Content-Disposition:
            description: Tên file báo cáo
            schema:
              type: string
      404:
        description: Báo cáo không tồn tại
      403:
        description: Không có quyền export
```

#### 8.2.24 API-24: Get Departments

```yaml
/api/departments:
  get:
    summary: Lấy danh sách phòng ban
    tags: [Departments]
    security:
      - BearerAuth: []
    parameters:
      - name: isActive
        in: query
        schema:
          type: boolean
          default: true
          description: Chỉ lấy phòng ban đang hoạt động
    responses:
      200:
        description: Danh sách phòng ban thành công
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: array
                  items:
                    $ref: '#/components/schemas/DepartmentInfo'
      403:
        description: Không có quyền truy cập
```

#### 8.2.25 API-25: Session Check

```yaml
/api/auth/check:
  get:
    summary: Kiểm tra session và token validity
    tags: [Authentication]
    security:
      - BearerAuth: []
    responses:
      200:
        description: Session hợp lệ
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                data:
                  type: object
                  properties:
                    user:
                      $ref: '#/components/schemas/UserInfo'
                    permissions:
                      type: array
                      items:
                        type: string
                    expiresIn:
                      type: integer
                      description: Thời gian còn lại (seconds)
      401:
        description: Token không hợp lệ hoặc đã hết hạn
      403:
        description: Session đã bị khóa
```

### 8.3 API Error Response Standards

#### 8.3.1 Standard Error Response Format

```yaml
components:
  schemas:
    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          properties:
            code:
              type: string
              description: Mã lỗi
            message:
              type: string
              description: Thông báo lỗi
            details:
              type: array
              items:
                type: object
                properties:
                  field: { type: string }
                  message: { type: string }
            timestamp:
              type: string
              format: date-time
            path:
              type: string
              description: API endpoint path
```

#### 8.3.2 Common HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| **200** | OK | Request thành công |
| **201** | Created | Tạo resource thành công |
| **400** | Bad Request | Dữ liệu input không hợp lệ |
| **401** | Unauthorized | Chưa đăng nhập hoặc token hết hạn |
| **403** | Forbidden | Không có quyền truy cập |
| **404** | Not Found | Resource không tồn tại |
| **409** | Conflict | Dữ liệu bị trùng lặp |
| **413** | Payload Too Large | File upload quá lớn |
| **422** | Unprocessable Entity | Validation errors |
| **429** | Too Many Requests | Rate limiting |
| **500** | Internal Server Error | Lỗi server |

#### 8.3.3 Authentication Security

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: |
        JWT token obtained from login endpoint.
        Format: Authorization: Bearer <token>
        
        Token contains:
        - User ID and role information
        - Permissions array
        - Expiration time (30 minutes default)
        - Session ID for tracking
```

---

*Tài liệu này là Phần 6-7 của Basic Design theo chuẩn IPA External Design (外部設計).*
