# SYSTEM REQUIREMENT DEFINITION - SCREENS & WORKFLOWS

## 6. Danh sách các Màn hình cần thiết (Screen List)

| ID | Loại màn hình | Tên màn hình | Vai trò sử dụng | Mô tả/Chức năng chính |
|----|---------------|--------------|-----------------|----------------------|
| **S-01-01** | Authentication | Màn hình đăng nhập | Tất cả | Xác thực người dùng, kiểm tra session timeout |
| **S-02-01** | Dashboard | Màn hình tổng quan (Top Screen) | Tất cả | Hiển thị dashboard, left menu, thông tin tổng quan |
| **S-03-01** | User Management | Màn hình quản lý người dùng | Admin | Quản lý người dùng và phân quyền |
| **S-04-01** | List + CRUD | Màn hình quản lý danh sách Idle Resources | Admin, RA, MNG, Viewer | Hiển thị, tìm kiếm, filter, CRUD idle resources |
| **S-04-02** | Detail/Edit | Màn hình chi tiết/chỉnh sửa Idle Resource | Admin, RA, MNG | Xem chi tiết, chỉnh sửa thông tin idle resource |
| **S-05-01** | History Log | Màn hình lịch sử cập nhật | Admin, RA, MNG | Xem lịch sử thay đổi của từng record |
| **S-06-01** | Report Dashboard | Màn hình báo cáo Dashboard | Admin, RA, MNG | Hiển thị các dashboard báo cáo theo bộ phận |

### Phân loại Pattern màn hình:
- **Authentication Pattern**: Màn hình đăng nhập và xác thực
- **Dashboard Pattern**: Màn hình tổng quan với menu và thống kê
- **Master Data Management Pattern**: Quản lý người dùng và phân quyền  
- **List + CRUD Pattern**: Hiển thị danh sách với chức năng tìm kiếm, filter, thêm/sửa/xóa
- **Detail/Edit Pattern**: Màn hình chi tiết và chỉnh sửa
- **History Log Pattern**: Màn hình hiển thị lịch sử thay đổi
- **Report Dashboard Pattern**: Màn hình báo cáo và dashboard

## 7. Danh sách các Batch cần thiết (Batch List)

| ID | Loại batch | Tên batch | Lịch chạy | Mô tả chức năng |
|----|------------|-----------|-----------|-----------------|
| **B-01** | Schedule | Session Timeout Cleanup | Mỗi 30 phút | Dọn dẹp session hết hạn |
| **B-02** | Schedule | Idle Date Calculation | Hàng ngày (00:00) | Tính toán và cập nhật trạng thái urgent cho resource có idle date ≥ 2 tháng |
| **B-03** | Schedule | Daily Backup | Hàng ngày (02:00) | Backup dữ liệu hệ thống |
| **B-04** | Manual | Import Idle Resource Data | Theo nhu cầu | Import dữ liệu idle resource từ file Excel/CSV |
| **B-05** | Manual | Export Report Data | Theo nhu cầu | Export báo cáo theo yêu cầu người dùng |

## 8. Danh sách các Report cần thiết (Report List)

| ID | Định dạng | Tên báo cáo | Mô tả/chức năng |
|----|-----------|-------------|-----------------|
| **R-01** | CSV/Excel | Báo cáo danh sách Idle Resource | Export danh sách idle resource theo filter tùy chỉnh |
| **R-02** | PDF/CSV | Báo cáo tình hình idle theo bộ phận | Dashboard report tình hình idle theo bộ phận filter by Source |
| **R-03** | PDF/CSV | Báo cáo so sánh với tuần trước | Dashboard report so sánh baseline data với tuần trước filter by Source |
| **R-04** | CSV | Báo cáo lịch sử cập nhật | Lịch sử thay đổi của idle resource theo khoảng thời gian |

## 9. Danh sách các I/F (liên kết với hệ thống ngoài) cần thiết (I/F List)

| ID | Loại I/F | Tên I/F | Hệ thống đích | Mô tả chức năng |
|----|----------|---------|---------------|-----------------|
| **IF-01** | File Upload | Upload CV Interface | File System | Upload và lưu trữ CV với định dạng Doc, PDF, Excel |
| **IF-02** | File Download | Download CV Interface | File System | Download single hoặc multiple CV files |
| **IF-03** | Data Import | Excel/CSV Import Interface | File System | Import dữ liệu idle resource từ file |
| **IF-04** | Data Export | Excel/CSV Export Interface | File System | Export dữ liệu idle resource ra file |

*Lưu ý: Các I/F với hệ thống ngoài như FPT SSO, Fsoft HR, FJP Onboarding sẽ được bổ sung trong các phase tiếp theo.*

## 10. Luồng thao tác màn hình cho từng vai trò

### Admin Flow:
```
Login (S-01-01) 
    ↓
Top Screen/Dashboard (S-02-01) 
    ↓
    ├── Quản lý người dùng (S-03-01)
    ├── Quản lý Idle Resources (S-04-01) → Chi tiết/Chỉnh sửa (S-04-02)
    ├── Lịch sử cập nhật (S-05-01)
    └── Báo cáo Dashboard (S-06-01)
```

### RA (Resource Administrator) Flow:
```
Login (S-01-01) 
    ↓
Top Screen/Dashboard (S-02-01) 
    ↓
    ├── Quản lý Idle Resources (S-04-01) → Chi tiết/Chỉnh sửa (S-04-02)
    ├── Lịch sử cập nhật (S-05-01)
    └── Báo cáo Dashboard (S-06-01)
```

### Manager Flow:
```
Login (S-01-01) 
    ↓
Top Screen/Dashboard (S-02-01) 
    ↓
    ├── Quản lý Idle Resources (S-04-01) → Chi tiết/Chỉnh sửa (S-04-02)
    ├── Lịch sử cập nhật (S-05-01)
    └── Báo cáo Dashboard (S-06-01)
```

### Viewer Flow:
```
Login (S-01-01) 
    ↓
Top Screen/Dashboard (S-02-01) 
    ↓
    └── Xem Idle Resources (S-04-01) [Chỉ đọc, có hạn chế]
```

---
*Tài liệu này là phần 2 của System Requirement Definition theo chuẩn IPA.*
