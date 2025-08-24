# BASIC DESIGN - HỂ THỐNG QUẢN LÝ IDLE RESOURCE (IRMS)

## Tổng quan tài liệu

Đây là tài liệu **Basic Design (基本設計)** hoàn chỉnh cho **Hệ thống Quản lý Idle Resource (IRMS)** được xây dựng theo chuẩn IPA (Information-technology Promotion Agency, Japan) - External Design (外部設計).

Tài liệu này được tạo dựa trên **System Requirement Definition ver-5.0** và tập trung vào thiết kế giao diện người dùng, các thành phần UI, tương tác và luồng xử lý từ góc nhìn người dùng.

## Cấu trúc tài liệu

Tài liệu Basic Design được chia thành 6 file chính để đảm bảo tính dễ đọc và quản lý:

### 📋 [Phần 1-2: Screen List và Screen Transition](01-screen-list-and-transition.md)
- Danh sách 7 màn hình chính với thông tin chi tiết
- Sơ đồ luồng di chuyển màn hình theo role
- Mapping với Functional Requirements

### 🎨 [Phần 3: Screen Layout Design](02-screen-layout-design.md)
- Layout thiết kế chi tiết cho từng màn hình
- ASCII art layout design cho desktop (1200px)
- Thiết kế responsive và user-friendly

### 🧩 [Phần 4: UI Component Description](03-ui-component-description.md)
- Mô tả chi tiết tất cả UI components
- Specifications đầy đủ: Item ID, Type, I/O, Validation
- Mapping components với màn hình

### ⚡ [Phần 5: Event Description](04-event-description.md)
- Danh sách tất cả events trong hệ thống
- Mô tả chi tiết logic xử lý từng event
- Input/Output và validation rules

### 📊 [Phần 6-7: Data Structure và CSV Layout](05-data-structure-and-csv-layout.md)
- Định nghĩa cấu trúc dữ liệu cho giao diện
- Layout CSV import/export files
- API endpoint definitions

### ✅ [Phần 8-9: Verification và Requirements Mapping](06-verification-and-requirement-mapping.md)
- Verification theo chuẩn IPA
- Mapping với System Requirements
- Checklist đánh giá completeness

## Thống kê Basic Design

| Mục | Số lượng | Ghi chú |
|-----|----------|---------|
| **Screens** | 7 | S-01-01 đến S-06-01 |
| **UI Components** | ~150+ | Chi tiết theo từng màn hình |
| **Events** | ~80+ | Tất cả interactions |
| **Data Structures** | 8 | Mapping với Entities |
| **CSV Layouts** | 4 | Import/Export files |
| **API Endpoints** | ~25+ | RESTful APIs |

## UI/UX Design Principles

### 🎯 Design Goals
- **Intuitive**: Giao diện thân thiện, dễ sử dụng
- **Responsive**: Tối ưu cho desktop 1200px
- **Role-based**: Phân quyền rõ ràng theo vai trò
- **Efficient**: Workflow tối ưu cho productivity

### 🎨 UI Framework Reference
Design concept dựa trên **Argon Dashboard Material UI**:
- Modern Material Design
- Left sidebar navigation
- Dashboard-style layout
- Responsive components

### 🔐 Security & Access Control
- Session-based authentication
- Role-based UI filtering
- Field-level permissions
- Audit trail for all actions

## Technology Stack (参考)

### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **UI Library**: Material-UI (MUI) hoặc Tailwind CSS
- **State Management**: Redux Toolkit/Zustand
- **Form Handling**: React Hook Form

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT with Session
- **File Storage**: Local filesystem/S3

### Integration
- **File Upload**: Multer middleware
- **Excel/CSV**: SheetJS (xlsx)
- **PDF Generation**: jsPDF/Puppeteer

## Development Guidelines

### Naming Conventions
- **Screen IDs**: S-XX-XX (S-01-01, S-02-01, ...)
- **Component IDs**: SXX-ITM-XX (S01-ITM-01, S01-ITM-02, ...)
- **Event IDs**: SXX-EVT-XX (S01-EVT-01, S01-EVT-02, ...)
- **API IDs**: API-XX (API-01, API-02, ...)

### Responsive Design
- **Primary**: Desktop 1200px+ (main target)
- **Secondary**: Tablet 768px-1199px
- **Mobile**: 360px-767px (limited support)

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## Quality Assurance

### ✅ IPA Compliance
- **外部設計 (External Design)** standards
- Complete traceability to requirements
- Structured documentation format
- Review checkpoints defined

### 🧪 Testing Strategy
- Unit testing for components
- Integration testing for workflows
- User acceptance testing by role
- Performance testing for large datasets

## Next Steps

Tài liệu Basic Design này sẵn sàng cho giai đoạn **Detail Design (詳細設計)** với các deliverables:

1. **Database Schema Design** từ Data Structures
2. **API Implementation Specs** từ API Endpoints  
3. **Component Implementation** từ UI Components
4. **Test Cases Design** từ Event Descriptions
5. **Security Implementation** từ Role-based Access

---

**Ngày tạo**: August 10, 2025  
**Version**: 6.0  
**Người tạo**: System Designer  
**Status**: ✅ Completed - Ready for Detail Design Phase  
**Base Requirements**: System Requirement Definition ver-5.0

*Tài liệu này tuân thủ đầy đủ chuẩn IPA External Design (外部設計) cho giai đoạn Basic Design.*
