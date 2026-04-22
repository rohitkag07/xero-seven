import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useThemeStore } from './stores/useThemeStore';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './pages/DemoPage';
import ProductionPage from './pages/ProductionPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Loader } from 'lucide-react';
import { GradientDots } from './components/ui/gradient-dots';

// Dashboard (Lazy loaded)
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout').then(module => ({ default: module.DashboardLayout })));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome').then(module => ({ default: module.DashboardHome })));
const LeadsPage = lazy(() => import('./pages/dashboard/LeadsPage').then(module => ({ default: module.LeadsPage })));
const ProjectsPage = lazy(() => import('./pages/dashboard/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ClientsPage = lazy(() => import('./pages/dashboard/ClientsPage').then(module => ({ default: module.ClientsPage })));
const AnalyticsPage = lazy(() => import('./pages/dashboard/AnalyticsPage').then(module => ({ default: module.AnalyticsPage })));
const AgentsPage = lazy(() => import('./pages/dashboard/AgentsPage').then(module => ({ default: module.AgentsPage })));
const ProposalsPage = lazy(() => import('./pages/dashboard/ProposalsPage').then(module => ({ default: module.ProposalsPage })));
const MissionControl = lazy(() => import('./pages/dashboard/MissionControl').then(module => ({ default: module.MissionControl })));

// Loading Component
function PageLoader() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-emerald-500" />
    </div>
  );
}

// A wrapper for the public-facing pages (Navbar + Footer)
function PublicLayout() {
  const { theme, grain } = useThemeStore();
  return (
    <div className={`gp-root theme-${theme}${grain ? ' gp-grain' : ''} min-h-[100dvh]`}>
      <Navbar />
      <main id="main-content" className="pt-24 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/production" element={<ProductionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
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
          <Route index element={<DashboardHome />} />
          <Route path="mission-control" element={<MissionControl />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="proposals" element={<ProposalsPage />} />
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
