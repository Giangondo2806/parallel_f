# SYSTEM REQUIREMENT DEFINITION - HỆ THỐNG QUẢN LÝ IDLE RESOURCE

## 1. Tên hệ thống
**Hệ thống Quản lý Idle Resource (Idle Resource Management System - IRMS)**

## 2. Mục tiêu hệ thống
Xây dựng hệ thống quản lý nhân lực đang rảnh rỗi (idle) trong công ty FJP, giúp:
- Theo dõi và quản lý thông tin nhân sự đang không được phân bổ vào dự án
- Tối ưu hóa việc phân bổ nguồn nhân lực
- Cung cấp báo cáo và dashboard để hỗ trợ quyết định quản lý
- Đảm bảo phân quyền rõ ràng cho từng vai trò người dùng

## 3. Vai trò người dùng

| Vai trò | Mô tả | Quyền hạn chính |
|---------|-------|----------------|
| **Admin** | Quản trị viên hệ thống | - Quản lý người dùng và phân quyền<br>- Toàn quyền truy cập mọi chức năng<br>- Xem lịch sử cập nhật |
| **RA (Resource Administrator)** | Quản lý tài nguyên nhân sự | - Input/Import/Export/Update thông tin idle resource<br>- Xem và chỉnh sửa thông tin idle resource<br>- Xem lịch sử cập nhật |
| **MNG (Manager)** | Quản lý bộ phận | - Xem thông tin idle của bộ phận mình<br>- Cập nhật/thêm nhân sự idle mới<br>- Xem tình trạng xử lý |
| **Viewer** | Người xem | - Xem danh sách idle toàn FJP (hạn chế)<br>- Không thấy: trạng thái "Not Yet Open", cột Process note, thông tin Rate |

## 4. Danh sách chức năng (Feature List)

| Mã chức năng | Mô tả chức năng | Đầu vào | Đầu ra | Actor | Độ ưu tiên | Ràng buộc/Điều kiện |
|--------------|-----------------|---------|--------|-------|------------|---------------------|
| **FR-01** | Đăng nhập hệ thống | Username, Password | Token xác thực, thông tin user, session | Tất cả | 2 | Tài khoản phải tồn tại và active |
| **FR-02** | Kiểm tra bảo mật và session timeout | Session token | Trạng thái session hợp lệ | Hệ thống | 1 | Session timeout theo cấu hình |
| **FR-03** | Quản lý phân quyền người dùng | Thông tin user, role | Cập nhật quyền thành công | Admin | 2 | Chỉ Admin có quyền |
| **FR-04** | Xem danh sách idle resource | Filter criteria, role permissions | Danh sách idle resource | RA, MNG, Viewer | 2 | Theo quyền của từng role |
| **FR-05** | Thêm mới idle resource | Thông tin nhân sự, CV | Record mới được tạo | RA, MNG | 3 | Thông tin bắt buộc phải đầy đủ |
| **FR-06** | Cập nhật idle resource | ID resource, thông tin cập nhật | Record được cập nhật | RA, MNG | 3 | Resource phải tồn tại |
| **FR-07** | Cập nhật nhiều idle resource | Danh sách ID, thông tin cập nhật | Danh sách record được cập nhật | RA | 3 | Có quyền sửa tất cả record |
| **FR-08** | Xóa idle resource | ID resource | Xác nhận xóa thành công | RA | 3 | Có quyền xóa |
| **FR-09** | Xóa nhiều idle resource | Danh sách ID | Xác nhận xóa thành công | RA | 3 | Có quyền xóa tất cả record |
| **FR-10** | Tìm kiếm idle resource | Từ khóa, filter | Kết quả tìm kiếm | RA, MNG, Viewer | 3 | - |
| **FR-11** | Ẩn/hiện và cố định cột | Cấu hình cột | Giao diện được cập nhật | RA, MNG, Viewer | 3 | - |
| **FR-12** | Import dữ liệu idle | File Excel/CSV | Dữ liệu được import | RA | 2 | File đúng format |
| **FR-13** | Export dữ liệu idle | Filter criteria | File Excel/CSV | RA | 2 | - |
| **FR-14** | Upload CV | File CV (Doc, PDF, Excel) | CV được lưu trữ | RA, MNG | 3 | File size và format hợp lệ |
| **FR-15** | Download CV | ID CV | File CV | RA, MNG, Viewer | 3 | CV phải tồn tại |
| **FR-16** | Download nhiều CV | Danh sách ID CV | File ZIP chứa CV | RA, MNG | 1 | - |
| **FR-17** | Highlight resource theo idle date | Idle date, filter | Hiển thị highlight | Tất cả | 1 | Idle date > ngày hiện tại |
| **FR-18** | Hiển thị icon urgent | Idle date ≥ 2 tháng | Icon urgent | Tất cả | 2 | Tính toán tự động |
| **FR-19** | Lưu lịch sử cập nhật | Thao tác cập nhật | Log history | Hệ thống | 3 | Mọi thay đổi đều được log |
| **FR-20** | Export báo cáo | Criteria báo cáo | File báo cáo | RA, MNG | 3 | - |
| **FR-21** | Dashboard báo cáo theo bộ phận | Filter by Source | Dashboard data | RA, MNG | 2 | - |
| **FR-22** | Dashboard so sánh với tuần trước | Filter by Source, baseline data | Dashboard comparison | RA, MNG | 2 | Có dữ liệu tuần trước |

## 5. Phân tích độ ưu tiên
- **Độ ưu tiên 1 (Cao nhất)**: Các chức năng cơ bản, cần thiết ngay lập tức
- **Độ ưu tiên 2 (Trung bình)**: Các chức năng quan trọng, cần có trong phiên bản đầu tiên  
- **Độ ưu tiên 3 (Thấp)**: Các chức năng nâng cao, có thể phát triển trong các phiên bản sau

---
*Tài liệu này tuân thủ chuẩn IPA (Information-technology Promotion Agency, Japan) cho giai đoạn System Requirement Definition.*
