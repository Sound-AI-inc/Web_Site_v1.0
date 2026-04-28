import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/company/About"));
const Team = lazy(() => import("./pages/company/Team"));
const Roadmap = lazy(() => import("./pages/company/Roadmap"));
const Careers = lazy(() => import("./pages/company/Careers"));
const ForUsers = lazy(() => import("./pages/products/ForUsers"));
const ForDevelopers = lazy(() => import("./pages/products/ForDevelopers"));
const ForInvestors = lazy(() => import("./pages/products/ForInvestors"));
const ForPartnerships = lazy(() => import("./pages/products/ForPartnerships"));
const Blog = lazy(() => import("./pages/resources/Blog"));
const Documentation = lazy(() => import("./pages/resources/Documentation"));
const Api = lazy(() => import("./pages/resources/Api"));
const Support = lazy(() => import("./pages/resources/Support"));
const Faq = lazy(() => import("./pages/resources/Faq"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const LegalCenter = lazy(() => import("./pages/legal/LegalCenter"));
const Licenses = lazy(() => import("./pages/legal/Licenses"));
const LegalInfo = lazy(() => import("./pages/legal/LegalInfo"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Auth = lazy(() => import("./pages/Auth"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-dark-deeper">
      <div className="rounded-full border border-gray-200/85 bg-white/86 px-5 py-3 text-sm font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-light-bg/75">
        Loading SoundAI...
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="/products/users" element={<ForUsers />} />
            <Route path="/products/developers" element={<ForDevelopers />} />
            <Route path="/products/investors" element={<ForInvestors />} />
            <Route path="/products/partnerships" element={<ForPartnerships />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/api" element={<Api />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faq" element={<Faq />} />

            <Route path="/legal/terms" element={<Terms />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/center" element={<LegalCenter />} />
            <Route path="/legal/licenses" element={<Licenses />} />
            <Route path="/legal/info" element={<LegalInfo />} />

            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
