# Copilot Instructions for IRMS Project

## Pre-Development Checklist

### 1. Infrastructure Analysis
- **ALWAYS** check existing routing infrastructure before creating new routes
- Review `frontend/src/app/` structure to understand current page organization
- Check if navigation components already exist in `components/layout/`
- Verify API endpoints exist in backend before implementing frontend calls

### 2. Frontend Component Guidelines

#### Layout Components
- **USE Box instead of Grid** for layout purposes
- Box provides better responsive design and alignment
- Grid should only be used for simple containers, not complex layouts

```jsx
// ✅ GOOD - Use Box for layouts
<Box sx={{ display: 'flex', flexDirection: 'column' }}>
  <Box sx={{ flex: 1 }}>
    <ResourceForm />
  </Box>
  <Box sx={{ flex: 1 }}>
    <CVManagement />
  </Box>
</Box>

// ❌ AVOID - Grid for complex layouts
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <ResourceForm />
  </Grid>
  <Grid item xs={12} md={6}>
    <CVManagement />
  </Grid>
</Grid>
```

#### Component Structure
- Check existing components in `components/` before creating new ones
- Reuse existing UI components from `components/ui/`
- Follow Material-UI patterns consistently
- Always implement responsive design with Box system

### 3. Routing Best Practices
- Verify page structure exists before adding new routes
- Check `middleware.ts` for auth requirements
- Follow Next.js 15 app router conventions
- **Use static routes like `/add` instead of dynamic `[id]/new`**
- Ensure proper navigation breadcrumbs

### 4. API Integration
- Check backend controllers exist before implementing frontend API calls
- Verify DTOs match between frontend types and backend
- Use existing API service patterns from `lib/api-service.ts`
- Handle loading and error states properly

### 5. Common Bug Prevention
- **Router Infrastructure**: Always check if routing structure exists
- **Component Reuse**: Verify existing components before creating new ones
- **Layout System**: Use Box for responsive layouts, not Grid
- **Routing Pattern**: Use static routes `/add` not dynamic `[id]/new`
- **API Endpoints**: Confirm backend endpoints exist and work
- **Type Safety**: Ensure TypeScript types match across frontend/backend

## Development Workflow
1. **Analyze existing code** - Check what's already implemented
2. **Review architecture** - Understand current patterns and structure  
3. **Plan components** - Identify reusable vs new components needed
4. **Implement incrementally** - Test each piece before moving forward
5. **Follow conventions** - Use established patterns and naming
6. **TypeScript check** - Always run `tsc --noEmit` after coding
7. **No server startup** - Don't start backend/frontend servers unless specifically requested

## Code Quality Standards
- Use TypeScript strict mode
- Implement proper error handling
- Add loading states for async operations
- Ensure responsive design on all components
- Follow accessibility guidelines
- Write clear, descriptive variable names
- **Always check TypeScript compilation** with `tsc --noEmit`
- **Don't automatically start servers** - code review first