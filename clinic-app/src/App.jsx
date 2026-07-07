import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader.jsx";
import PulseLoader from "./components/PulseLoader.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Doctor from "./pages/Doctor.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

// React Router changes pages client-side (no new HTTP request), so Cloudflare's
// request-log analytics only ever sees the very first page a visitor lands on.
// This pings the current path on every *subsequent* route change so each page
// view is a real edge request Cloudflare can count in "Most-visited pages".
function PageViewBeacon() {
  const { pathname } = useLocation();
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false; // the initial load already hit the server for this path
      return;
    }
    fetch(pathname, { cache: "no-store", keepalive: true }).catch(() => {});
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  // The homepage shows the full intro loader; the other pages show a short
  // "heart monitor" trace. Plays every time a page is loaded or navigated to.
  // loader: "home" | "pulse" | null
  const [loader, setLoader] = useState(() =>
    location.pathname === "/" ? "home" : "pulse"
  );

  useEffect(() => {
    const isHome = location.pathname === "/";
    setLoader(isHome ? "home" : "pulse");
    const t = setTimeout(() => setLoader(null), isHome ? 2400 : 950);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <PageViewBeacon />
      <Header />

      {/* Page content mounts once the loader clears, so its entrance
          animations play after the intro / heart-monitor finishes. */}
      {loader === null && (
        <>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </>
      )}

      <CookieConsent />

      <AnimatePresence>
        {loader === "home" ? (
          <Loader key="home-loader" />
        ) : loader === "pulse" ? (
          <PulseLoader key="pulse-loader" />
        ) : null}
      </AnimatePresence>
    </>
  );
}
