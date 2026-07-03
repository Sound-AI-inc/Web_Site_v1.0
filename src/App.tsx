import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { marketingPages } from "./data/marketingPages";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/company/About"));
const ProductPhilosophy = lazy(() => import("./pages/product/Philosophy"));
const Technology = lazy(() => import("./pages/Technology"));
const Comparison = lazy(() => import("./pages/Comparison"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Team = lazy(() => import("./pages/company/Team"));
const Roadmap = lazy(() => import("./pages/company/Roadmap"));
const Careers = lazy(() => import("./pages/company/Careers"));
const ForUsers = lazy(() => import("./pages/products/ForUsers"));
const ForDevelopers = lazy(() => import("./pages/products/ForDevelopers"));
const ForInvestors = lazy(() => import("./pages/products/ForInvestors"));
const ForPartnerships = lazy(() => import("./pages/products/ForPartnerships"));
const Documentation = lazy(() => import("./pages/resources/Documentation"));
const Api = lazy(() => import("./pages/resources/Api"));
const Support = lazy(() => import("./pages/resources/Support"));
const Faq = lazy(() => import("./pages/resources/Faq"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Cookies = lazy(() => import("./pages/legal/Cookies"));
const LegalCenter = lazy(() => import("./pages/legal/LegalCenter"));
const Licenses = lazy(() => import("./pages/legal/Licenses"));
const LegalInfo = lazy(() => import("./pages/legal/LegalInfo"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const AuthRedirect = lazy(() => import("./pages/AuthRedirect"));
const WaitlistRedirect = lazy(() => import("./pages/WaitlistRedirect"));
const EarlyAccess = lazy(() => import("./pages/EarlyAccess"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const UseCases = lazy(() => import("./pages/UseCases"));
const UCProducers = lazy(() => import("./pages/use-cases/Producers"));
const UCSoundDesign = lazy(() => import("./pages/use-cases/SoundDesign"));
const UCGameAudio = lazy(() => import("./pages/use-cases/GameAudio"));
const UCCreators = lazy(() => import("./pages/use-cases/Creators"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="rounded-full border border-text/10 bg-white/86 px-5 py-3 text-sm font-medium text-text/70 shadow-flat-sm">
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
            <Route path="/product/philosophy" element={<ProductPhilosophy />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/team" element={<Team />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/use-cases/producers" element={<UCProducers />} />
            <Route path="/use-cases/sound-design" element={<UCSoundDesign />} />
            <Route path="/use-cases/game-audio" element={<UCGameAudio />} />
            <Route path="/use-cases/creators" element={<UCCreators />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="/products/users" element={<ForUsers />} />
            <Route path="/products/developers" element={<ForDevelopers />} />
            <Route path="/products/investors" element={<ForInvestors />} />
            <Route path="/products/partnerships" element={<ForPartnerships />} />

            <Route path="/blog" element={<Navigate to="/resources/blog" replace />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/api" element={<Api />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faq" element={<Faq />} />

            <Route path="/legal/terms" element={<Terms />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/cookies" element={<Cookies />} />
            <Route path="/legal/center" element={<LegalCenter />} />
            <Route path="/legal/licenses" element={<Licenses />} />
            <Route path="/legal/info" element={<LegalInfo />} />

            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/auth" element={<AuthRedirect />} />
            <Route path="/waitlist" element={<WaitlistRedirect />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/sign-in" element={<AuthRedirect />} />
            <Route path="/sign-up" element={<AuthRedirect />} />
            <Route path="/welcome" element={<AuthRedirect />} />

            {marketingPages.map((page) => (
              <Route key={page.path} path={page.path} element={<MarketingPage />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
