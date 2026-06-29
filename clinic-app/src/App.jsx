import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader.jsx";
import PulseLoader from "./components/PulseLoader.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Doctor from "./pages/Doctor.jsx";
import Contact from "./pages/Contact.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
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
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </>
      )}

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
