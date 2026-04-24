import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy, Component, type ReactNode } from 'react';
import { useThemeStore } from './stores/useThemeStore';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TweaksPanel } from './components/TweaksPanel';
import { WhatsAppToggle } from './components/WhatsAppToggle';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Loader } from 'lucide-react';
import { GradientDots } from './components/ui/gradient-dots';

// Public pages — lazy loaded for code splitting (#1)
const HomePage      = lazy(() => import('./pages/HomePage'));
const ServicesPage  = lazy(() => import('./pages/ServicesPage'));
const AboutPage     = lazy(() => import('./pages/AboutPage'));
const ContactPage   = lazy(() => import('./pages/ContactPage'));
const DemoPage      = lazy(() => import('./pages/DemoPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));

// Dashboard — lazy loaded
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const DashboardHome   = lazy(() => import('./pages/dashboard/DashboardHome').then(m => ({ default: m.DashboardHome })));
const LeadsPage       = lazy(() => import('./pages/dashboard/LeadsPage').then(m => ({ default: m.LeadsPage })));
const ProjectsPage    = lazy(() => import('./pages/dashboard/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ClientsPage     = lazy(() => import('./pages/dashboard/ClientsPage').then(m => ({ default: m.ClientsPage })));
const AnalyticsPage   = lazy(() => import('./pages/dashboard/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const AgentsPage      = lazy(() => import('./pages/dashboard/AgentsPage').then(m => ({ default: m.AgentsPage })));
const ProposalsPage   = lazy(() => import('./pages/dashboard/ProposalsPage').then(m => ({ default: m.ProposalsPage })));
const MissionControl  = lazy(() => import('./pages/dashboard/MissionControl').then(m => ({ default: m.MissionControl })));

// #10 — ErrorBoundary for public pages
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '96px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--charcoal)', margin: '0 0 16px' }}>
            SOMETHING WENT WRONG.
          </h2>
          <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 16, color: 'var(--charcoal)', opacity: 0.7 }}>
            Reload the page or <a href="/" style={{ color: 'var(--red)' }}>go home</a>.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function PageLoader() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-emerald-500" />
    </div>
  );
}

// #28 pt-24 restored to main so non-hero pages sit below navbar
// #3  TweaksPanel moved here from HomePage so it's available site-wide
function PublicLayout() {
  const { theme, grain } = useThemeStore();
  return (
    <div className={`gp-root theme-${theme}${grain ? ' gp-grain' : ''} min-h-[100dvh]`}>
      <Navbar />
      <main id="main-content" className="pb-16 relative z-10">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppToggle />
      <TweaksPanel />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/"            element={<HomePage />} />
          <Route path="/services"    element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/demo"        element={<DemoPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index                      element={<DashboardHome />} />
          <Route path="mission-control"     element={<MissionControl />} />
          <Route path="leads"               element={<LeadsPage />} />
          <Route path="projects"            element={<ProjectsPage />} />
          <Route path="clients"             element={<ClientsPage />} />
          <Route path="analytics"           element={<AnalyticsPage />} />
          <Route path="agents"              element={<AgentsPage />} />
          <Route path="proposals"           element={<ProposalsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GradientDots />
        <div className="relative z-10 min-h-screen">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
