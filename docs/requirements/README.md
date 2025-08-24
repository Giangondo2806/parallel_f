# SYSTEM REQUIREMENT DEFINITION - HỆ THỐNG QUẢN LÝ IDLE RESOURCE

## Tổng quan tài liệu

Đây là tài liệu **System Requirement Definition** hoàn chỉnh cho **Hệ thống Quản lý Idle Resource (IRMS)** được xây dựng theo chuẩn IPA (Information-technology Promotion Agency, Japan).

## Cấu trúc tài liệu

Tài liệu được chia thành 5 phần chính để đảm bảo tính đầy đủ và dễ đọc:

### 📋 [Phần 1: Tổng quan và Chức năng](01-system-requirement-definition-overview.md)
- Tên hệ thống và mục tiêu
- Vai trò người dùng (Admin, RA, Manager, Viewer)
- Danh sách đầy đủ 22 functional requirements
- Phân tích độ ưu tiên chức năng

### 🖥️ [Phần 2: Màn hình và Luồng công việc](02-screens-and-workflows.md)
- 7 màn hình chính được phân loại theo pattern
- Batch jobs (5 jobs: scheduled và manual)
- Reports (4 loại báo cáo)
- Interfaces với hệ thống ngoài
- Luồng thao tác cho từng vai trò

### 📊 [Phần 3: Mô hình dữ liệu và Sơ đồ](03-data-model-and-diagrams.md)
- 8 entities với ER Diagram đầy đủ
- Sơ đồ di chuyển chức năng (Mermaid flowchart)
- 5 luồng nghiệp vụ chính chi tiết
- Mối quan hệ dữ liệu rõ ràng

### 🎯 [Phần 4: Use Cases và Yêu cầu phi chức năng](04-use-cases-and-nfr.md)
- 16 use cases cho 4 actors
- Yêu cầu phi chức năng đầy đủ (Performance, Security, Usability...)
- Business rules chi tiết
- Compliance requirements

### ✅ [Phần 5: Checklist đánh giá IPA](05-ipa-compliance-checklist.md)
- Đánh giá tuân thủ chuẩn IPA: **97.25/100**
- Phân tích điểm mạnh và điểm cần cải thiện
- Khuyến nghị cho giai đoạn Basic Design
- Tài liệu tham khảo và glossary

## Thống kê tài liệu

| Mục | Số lượng | Ghi chú |
|-----|----------|---------|
| **Functional Requirements** | 22 | FR-01 đến FR-22 |
| **Screens** | 7 | S-01-01 đến S-06-01 |
| **Entities** | 8 | E-01 đến E-08 |
| **Use Cases** | 16 | UC-01 đến UC-16 |
| **Batch Jobs** | 5 | B-01 đến B-05 |
| **Reports** | 4 | R-01 đến R-04 |
| **Interfaces** | 4 | IF-01 đến IF-04 |
| **Business Rules** | 11 | BR-01 đến BR-11 |

## Vai trò người dùng

| Vai trò | Mô tả | Quyền chính |
|---------|-------|-------------|
| **Admin** | Quản trị hệ thống | Toàn quyền + quản lý user |
| **RA** | Resource Administrator | CRUD idle resources + reports |
| **Manager** | Quản lý bộ phận | Xem/sửa resources của bộ phận |
| **Viewer** | Người xem | Xem danh sách (có hạn chế) |

## Tính năng chính

### 🔐 Authentication & Authorization
- Đăng nhập với session timeout
- Phân quyền theo vai trò rõ ràng
- Bảo mật và audit trail

### 📋 Idle Resource Management
- CRUD operations với bulk actions
- Import/Export Excel/CSV
- Upload/Download CV files
- Search và filter nâng cao

### 📊 Reporting & Dashboard
- Dashboard theo bộ phận
- So sánh với baseline data
- Export reports đa định dạng
- Real-time highlighting

### 🔄 Business Logic
- Auto-highlight urgent cases (≥ 2 tháng)
- History tracking cho mọi thay đổi
- Column customization
- Multi-language support

## Tuân thủ IPA Standards

✅ **97.25% IPA Compliance Score**

- ✅ Functional Requirements đầy đủ
- ✅ Screen Design patterns chuẩn
- ✅ Data Model với ER Diagram
- ✅ Use Cases và Business Flows
- ✅ Non-functional Requirements
- ✅ Traceability Matrix rõ ràng

## Kế hoạch triển khai

### Phase 1 - Core Functions (Độ ưu tiên 1-2)
- Authentication & User Management
- Basic CRUD cho Idle Resources
- Import/Export functionality
- Basic reporting

### Phase 2 - Advanced Features (Độ ưu tiên 3)
- Advanced search và filtering
- Bulk operations
- CV management
- Dashboard với comparison

### Phase 3 - Integration (Future)
- Integration với FPT SSO
- Sync với Fsoft HR system
- Mobile app support

## Next Steps

Tài liệu này sẵn sàng làm **input cho giai đoạn Basic Design** với các deliverables tiếp theo:

1. **Screen Wireframes** dựa trên Screen List
2. **API Specifications** dựa trên Functional Requirements  
3. **Database Schema** dựa trên ER Diagram
4. **Test Scenarios** dựa trên Use Cases
5. **Technical Architecture** dựa trên Non-functional Requirements

---

**Ngày tạo**: August 3, 2025  
**Version**: 1.0  
**Người tạo**: System Designer  
**Status**: ✅ Completed - Ready for Basic Design Phase

*Tài liệu này tuân thủ đầy đủ chuẩn IPA (Information-technology Promotion Agency, Japan) cho giai đoạn System Requirement Definition.*
