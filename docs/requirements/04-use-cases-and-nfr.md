# SYSTEM REQUIREMENT DEFINITION - USE CASES & NON-FUNCTIONAL REQUIREMENTS

## 14. Use Case Diagram (mô tả văn bản)

### Use Cases theo từng Actor:

#### Admin (Quản trị viên hệ thống)
- **UC-01**: Đăng nhập hệ thống
- **UC-02**: Quản lý người dùng (thêm, sửa, xóa user)
- **UC-03**: Phân quyền cho user (gán role: RA, MNG, Viewer)
- **UC-04**: Xem toàn bộ idle resource
- **UC-05**: Thêm/sửa/xóa idle resource
- **UC-06**: Upload/Download CV
- **UC-07**: Import/Export dữ liệu
- **UC-08**: Xem lịch sử cập nhật
- **UC-09**: Xem báo cáo dashboard
- **UC-10**: Quản lý session và logout

#### RA - Resource Administrator (Quản lý tài nguyên)
- **UC-01**: Đăng nhập hệ thống
- **UC-04**: Xem toàn bộ idle resource (RA All) hoặc theo bộ phận (RA bộ phận)
- **UC-05**: Thêm/sửa/xóa idle resource
- **UC-06**: Upload/Download CV
- **UC-07**: Import/Export dữ liệu
- **UC-08**: Xem lịch sử cập nhật
- **UC-09**: Xem báo cáo dashboard
- **UC-11**: Tìm kiếm và filter resource
- **UC-12**: Ẩn/hiện cột, cố định cột
- **UC-10**: Logout

#### MNG - Manager (Quản lý bộ phận)
- **UC-01**: Đăng nhập hệ thống
- **UC-13**: Xem idle resource của bộ phận mình
- **UC-14**: Thêm/cập nhật nhân sự idle mới của bộ phận
- **UC-15**: Xem tình trạng xử lý idle resource
- **UC-06**: Upload/Download CV
- **UC-08**: Xem lịch sử cập nhật
- **UC-09**: Xem báo cáo dashboard
- **UC-11**: Tìm kiếm và filter resource
- **UC-10**: Logout

#### Viewer (Người xem)
- **UC-01**: Đăng nhập hệ thống
- **UC-16**: Xem danh sách idle toàn FJP (với hạn chế)
  - Không thấy: các case có trạng thái "Not Yet Open"
  - Không thấy: cột Process note
  - Không thấy: thông tin về Rate
- **UC-11**: Tìm kiếm và filter resource (giới hạn)
- **UC-12**: Ẩn/hiện cột, cố định cột
- **UC-10**: Logout

### Mối quan hệ Use Case:
- **Include**: UC-01 (Đăng nhập) được include trong tất cả use case khác
- **Extend**: UC-11 (Tìm kiếm) có thể extend UC-04, UC-13, UC-16
- **Generalization**: UC-04, UC-13, UC-16 đều là specialization của "Xem idle resource"

## 15. Yêu cầu phi chức năng (Non-functional Requirements)

### 15.1 Performance (Hiệu năng)
| Tiêu chí | Yêu cầu | Đo lường |
|----------|---------|----------|
| **Response Time** | Tốc độ phản hồi API dưới 500ms với 1,000 records | Thời gian phản hồi trung bình |
| **Page Load Time** | Thời gian load màn hình dưới 2 giây | First Contentful Paint |
| **Database Query** | Query time dưới 100ms cho search/filter | Execution time |
| **File Upload** | Upload CV tối đa 10MB trong 30 giây | Upload duration |
| **Concurrent Users** | Hỗ trợ tối thiểu 100 user đồng thời | Concurrent sessions |

### 15.2 Usability (Khả năng sử dụng)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **Responsive Design** | Hỗ trợ responsive web design trên desktop, tablet, mobile |
| **Multi-language** | Hỗ trợ tiếng Việt, Tiếng Anh, Tiếng Nhật (trong requirements có đề cập EN, JP) |
| **User Interface** | Giao diện trực quan, dễ sử dụng, font chữ rõ ràng |
| **Navigation** | Menu điều hướng rõ ràng với breadcrumb |
| **Error Messages** | Thông báo lỗi rõ ràng bằng ngôn ngữ người dùng hiểu |

### 15.3 Security (Bảo mật)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **Authentication** | Đăng nhập bằng username/password với validation |
| **Authorization** | Phân quyền rõ ràng theo role (Admin, RA, MNG, Viewer) |
| **Session Management** | Session timeout tự động, quản lý session token an toàn |
| **Password Security** | Mã hóa password (bcrypt hoặc tương đương) |
| **Data Protection** | Bảo vệ thông tin cá nhân theo GDPR/PDPA |
| **File Upload Security** | Kiểm tra file type, scan virus, giới hạn size |

### 15.4 Reliability (Độ tin cậy)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **System Availability** | Uptime 99.5% (trừ maintenance window) |
| **Data Backup** | Backup dữ liệu hàng ngày tự động |
| **Error Handling** | Xử lý lỗi gracefully, không crash system |
| **Data Integrity** | Đảm bảo tính toàn vẹn dữ liệu với transaction |
| **Recovery** | RTO < 4 giờ, RPO < 1 giờ |

### 15.5 Compatibility (Tương thích)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **Browser Support** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| **Operating System** | Windows 10+, macOS 10.15+, Linux Ubuntu 18+ |
| **Mobile Support** | iOS 13+, Android 8+ |
| **File Formats** | Hỗ trợ Doc, PDF, Excel cho CV upload |

### 15.6 Scalability (Khả năng mở rộng)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **Data Volume** | Hỗ trợ tối thiểu 10,000 idle resource records |
| **User Growth** | Có thể scale lên 500 concurrent users |
| **Storage** | Lưu trữ tối thiểu 1TB cho CV files |
| **Database** | Thiết kế database có thể scale horizontal |

### 15.7 Maintainability (Khả năng bảo trì)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **Code Quality** | Tuân thủ coding standards, có documentation |
| **Logging** | Log chi tiết cho debug và audit |
| **Monitoring** | Monitor system health, performance metrics |
| **Deployment** | Hỗ trợ CI/CD pipeline |

### 15.8 Compliance (Tuân thủ)
| Tiêu chí | Yêu cầu |
|----------|---------|
| **Audit Trail** | Lưu lại toàn bộ lịch sử thay đổi dữ liệu |
| **Data Retention** | Chính sách lưu trữ dữ liệu theo quy định công ty |
| **Privacy** | Tuân thủ quy định bảo vệ thông tin cá nhân |

## 16. Business Rules (Quy tắc nghiệp vụ)

### 16.1 Quy tắc về Idle Resource
- **BR-01**: Resource được coi là "idle" khi không được assign vào project
- **BR-02**: Resource có idle date ≥ 2 tháng phải được đánh dấu "urgent"
- **BR-03**: Resource chưa chốt ngày "Idle From" được highlight màu vàng
- **BR-04**: Chỉ RA và Manager của bộ phận mới có quyền cập nhật resource của bộ phận đó

### 16.2 Quy tắc về Phân quyền
- **BR-05**: Admin có toàn quyền trên hệ thống
- **BR-06**: RA có thể xem tất cả (RA All) hoặc chỉ bộ phận (RA bộ phận)
- **BR-07**: Manager chỉ xem được resource của bộ phận mình
- **BR-08**: Viewer không thấy thông tin nhạy cảm (Process note, Rate, Not Yet Open status)

### 16.3 Quy tắc về File và Data
- **BR-09**: CV file size tối đa 10MB, format: Doc, PDF, Excel
- **BR-10**: Import file phải đúng template format
- **BR-11**: Tất cả thay đổi dữ liệu phải được log lịch sử

---
*Tài liệu này là phần 4 của System Requirement Definition theo chuẩn IPA.*
