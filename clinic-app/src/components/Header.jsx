import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { clinic, nav } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on every route change.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="brand">
          <img className="brand__logo" src="/assets/logo.svg" alt="" />
          <span className="brand__text">
            <span className="brand__name">Rathmines</span>
            <span className="brand__sub">Doctors Clinic</span>
          </span>
        </NavLink>

        <nav className="nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
          <a className="btn btn--primary nav__cta" href={clinic.phoneHref}>
            Call {clinic.phone}
          </a>
        </nav>

        <button
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="container">
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="mobile-nav__inner"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                  closed: {},
                }}
              >
                {nav.map((item) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -8 },
                    }}
                  >
                    <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "active" : undefined)}>
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.a
                  className="btn btn--primary"
                  href={clinic.phoneHref}
                  style={{ marginTop: 10 }}
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -8 } }}
                >
                  Call {clinic.phone}
                </motion.a>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
