# PHASE 3: Polish, Optimization & Deployment Prep

**Status**: ✅ Phase 2 UI Complete | 🔧 Build Errors Isolated | 🚀 Ready to Start Phase 3

## Current State Summary

### Phase 2 Completion ✅
- ✅ **4 Dashboard CRUD Pages**: LeadsPage, ProjectsPage, ClientsPage, ProposalsPage
- ✅ **All Pages Compile**: Zero TypeScript errors in page implementations
- ✅ **Custom Hooks Ready**: useLeads, useProjects, useClients, useProposals
- ✅ **Database Integration**: All hooks use `insforge.database.from()` for CRUD

### Build Status
- ✅ Fixed 22 `.from()` errors → changed to `.database.from()`
- ⚠️  Pre-existing SDK type issues in authService.ts (not blocking Phase 3)
- ✅ Dashboard pages ready for enhancement

## Phase 3 Scope (6 Major Areas)

### 1. **Real-time Subscriptions** (2-3 hours) 🔄 HIGH PRIORITY
Transform pages from polling to live WebSocket updates

**Files to Create**:
- `src/hooks/useRealtimeLeads.ts` - Real-time lead updates
- `src/hooks/useRealtimeProjects.ts` - Real-time project updates
- `src/hooks/useRealtimeClients.ts` - Real-time client updates
- `src/hooks/useRealtimeProposals.ts` - Real-time proposal updates

**Pattern**:
```typescript
export function useRealtimeLeads(teamId?: string) {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  useEffect(() => {
    // Subscribe to realtime updates on agency_leads
    const subscription = insforge.realtime
      .channel('leads:' + teamId)
      .on('*', (message) => {
        // Handle INSERT/UPDATE/DELETE events
        // Update leads state optimistically
      })
      .subscribe();
    
    return () => subscription.unsubscribe();
  }, [teamId]);
  
  return { leads, subscribe, unsubscribe };
}
```

**Database Changes Needed**:
- Add PL/pgSQL triggers to publish changes to channels
- Triggers for: INSERT, UPDATE, DELETE on all 4 tables
- Channel pattern: `leads:team_id`, `projects:team_id`, etc.

### 2. **Advanced Filtering & Search** (2 hours) 🔍 HIGH PRIORITY
Add Zustand state management with filters/pagination/sorting

**Files to Create**:
- `src/stores/leadsStore.ts` - Zustand store for Lead filters
- `src/stores/projectsStore.ts` - Zustand store for Project filters
- `src/stores/clientsStore.ts` - Zustand store for Client filters
- `src/stores/proposalsStore.ts` - Zustand store for Proposal filters
- `src/components/FilterBar.tsx` - Reusable filter UI component

**Store Pattern**:
```typescript
export interface LeadFiltersState {
  searchQuery: string;
  statusFilter: Lead['status'] | 'all';
  sortBy: 'newest' | 'oldest' | 'name';
  pagination: { page: number; limit: number };
}

export const useLeadFilters = create<LeadFiltersState & {
  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: string) => void;
  setSortBy: (s: string) => void;
  nextPage: () => void;
  prevPage: () => void;
}>((set) => ({...}));
```

**Page Integration**:
- Add FilterBar above data tables
- Filters apply automatically to useRealtimeLeads
- Update hooks to accept filter params

### 3. **Mobile Responsiveness** (3-4 hours) 📱 MEDIUM PRIORITY
Optimize for tablet/mobile (< 768px)

**Current**: Basic md: and lg: breakpoints
**Target**: Full mobile-first responsive design

**Changes**:
- Modal forms: Full-screen on mobile (not centered)
- Tables: Horizontal scroll or card layout on mobile
- Sidebar: Hamburger menu on mobile
- Button sizes: Larger touch targets (48px min)
- Typography: Adjust font sizes for readability
- Spacing: Reduce padding/margins on very small screens

**Files to Update**:
- `src/pages/dashboard/LeadsPage.tsx` - Add mobile layouts
- `src/pages/dashboard/ProjectsPage.tsx` - Add mobile layouts
- `src/pages/dashboard/ClientsPage.tsx` - Add mobile layouts
- `src/pages/dashboard/ProposalsPage.tsx` - Add mobile layouts
- `src/components/dashboard/DashboardLayout.tsx` - Mobile sidebar
- `src/components/dashboard/Sidebar.tsx` - Hamburger menu

### 4. **Performance Optimization** (2-3 hours) ⚡ MEDIUM PRIORITY
React performance tuning and code splitting

**Techniques**:
- `React.memo()` on table rows (avoid re-renders)
- `useCallback` for event handlers (already present)
- Lazy loading for dashboard pages
- Code splitting in App.tsx routes
- Image optimization (if any)

**Implementation**:
```typescript
// src/pages/dashboard/index.ts - Lazy load pages
export const LeadsPage = lazy(() => import('./LeadsPage'));
export const ProjectsPage = lazy(() => import('./ProjectsPage'));
export const ClientsPage = lazy(() => import('./ClientsPage'));
export const ProposalsPage = lazy(() => import('./ProposalsPage'));

// src/App.tsx - Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Route path="leads" element={<LeadsPage />} />
  ...
</Suspense>
```

### 5. **E2E Testing** (3 hours) 🧪 MEDIUM PRIORITY
Playwright tests for critical user flows

**Test Coverage**:
- Login flow → Access dashboard
- Create lead → View in table
- Edit lead → Update saves
- Delete lead → Removed from table
- Navigation between pages

**Setup**:
```bash
npm install -D @playwright/test @testing-library/react
```

**Test File**: `e2e/auth-and-crud.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test('User can create and edit a lead', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=Login');
  // ... fill form
  // ... submit
  // ... verify dashboard loads
  // ... click Add Lead
  // ... verify lead in table
});
```

### 6. **Deployment Preparation** (2 hours) 🚀 MEDIUM PRIORITY
CI/CD, environment setup, database deployment

**Files to Create**:
- `.github/workflows/deploy.yml` - GitHub Actions CI/CD
- `Dockerfile` - Container for production
- `.env.example` - Environment template
- `deployment/sql/phase3-realtime-triggers.sql` - Database triggers

**Steps**:
1. Deploy database triggers via insforge CLI
2. Set up environment variables on Vercel
3. Configure GitHub Actions for auto-deploy on push
4. Test production build locally

## Implementation Sequence

### Week 1 (Priority 1 & 2)
- **Day 1-2**: Real-time subscriptions (2-3 hrs)
- **Day 2-3**: Advanced filtering with Zustand (2 hrs)
- **Day 4**: Mobile responsiveness (3 hrs)
- Test and iterate

### Week 2 (Priority 3 & 4)
- **Day 1-2**: Performance optimization (2-3 hrs)
- **Day 2-3**: E2E testing setup (3 hrs)
- **Day 4**: Deployment preparation (2 hrs)

## Pre-Phase-3 Checklist

Before starting each section:

```
Real-time Subscriptions:
- [ ] Install @types/realtime if needed
- [ ] Read InsForge realtime documentation
- [ ] Design channel naming convention
- [ ] Create database triggers
- [ ] Test subscription with one page
- [ ] Migrate remaining pages

Filtering:
- [ ] Install zustand: npm install zustand
- [ ] Design store structure
- [ ] Create FilterBar component
- [ ] Integrate with each page hook
- [ ] Test filter updates

Mobile:
- [ ] Run lighthouse audit on mobile
- [ ] Test on iOS/Android simulators
- [ ] Check touch target sizes
- [ ] Test modal form on small screens

Performance:
- [ ] Profile with React DevTools
- [ ] Measure initial load time
- [ ] Measure dashboard page load
- [ ] Check code bundle size

Testing:
- [ ] Set up Playwright
- [ ] Create test helpers
- [ ] Write happy path tests
- [ ] Write error path tests
- [ ] Integrate into CI

Deployment:
- [ ] Document all env vars
- [ ] Set up prod database
- [ ] Create GitHub Actions workflow
- [ ] Test production build
- [ ] Prepare rollback plan
```

## Dependencies to Install

```bash
# Zustand for state management
npm install zustand

# Playwright for E2E testing
npm install -D @playwright/test

# Testing utilities
npm install -D @testing-library/react @testing-library/user-event

# Optional: Shadcn for UI components
npm install @radix-ui/react-dialog clsx
```

## Architecture Decisions

**Real-time vs Polling**: 
- Use real-time subscriptions for live data
- Fallback to polling if connection fails
- Refresh on tab focus

**State Management**:
- Zustand for UI filters (lightweight)
- React Context for auth (already exists)
- Keep hooks for CRUD operations

**Testing Strategy**:
- E2E tests for critical flows (login, CRUD)
- Skip unit tests for hooks (high integration)
- Visual regression tests optional

## Success Criteria

- ✅ All 4 pages show live updates from other users
- ✅ Filter UI works on all pages
- ✅ Mobile layout looks good on 320px-768px screens
- ✅ Dashboard loads in < 3 seconds
- ✅ All E2E tests pass
- ✅ Deploy to production successfully

## Post-Phase-3

- Analytics dashboard
- User profile management
- Team management
- AI integration (use existing Summoner agent)
- Advanced reporting

---

**Next Step**: Pick Phase 3 section to start (recommend: Real-time Subscriptions first)
