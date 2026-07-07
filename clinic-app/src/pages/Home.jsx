import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import RatingBadge from "../components/RatingBadge.jsx";
import { clinic } from "../data";
import { asset } from "../assetUrl";

const stethMask = {
  WebkitMaskImage: `url(${asset("assets/icons/checkup.svg")})`,
  maskImage: `url(${asset("assets/icons/checkup.svg")})`,
};

const heroPoints = [
  ["General practice", "Routine and ongoing medical care"],
  ["Open Mon–Fri", "12pm – 7pm"],
  ["New patients welcome", "Same trusted GP each visit"],
];

const cards = [
  { to: "/services", title: "Services", text: "A full range of general-practice care for individuals and families." },
  { to: "/doctor", title: "Meet the Doctor", text: "Dr George Joyce, serving the Rathmines community since 1988." },
  { to: "/contact", title: "Contact, Hours & Fees", text: "Our consultation fee, where to find us, opening hours and out-of-hours cover." },
];

export default function Home() {
  return (
    <Page>
      <Seo
        title="Rathmines Doctors Clinic | Dr George Joyce, GP in Rathmines, Dublin 6"
        description="Rathmines Doctors Clinic, Dr George Joyce. Friendly GP care since 1988 at 104 Lower Rathmines Road, Dublin 6. New patients welcome, by appointment. Call (01) 4979938."
        path="/"
      />
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {clinic.tagline}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              Rathmines <span className="accent">Doctors Clinic</span>
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Friendly, high-quality general practice in the heart of Rathmines.
              We listen, and help you make informed decisions about your health.
            </motion.p>

            <motion.p
              className="hero__doctor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              {clinic.doctor} · {clinic.quals}
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a className="btn btn--primary" href={clinic.phoneHref}>
                Call {clinic.phone}
              </a>
              <Link className="btn btn--ghost" to="/services">
                View services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              style={{ marginTop: 24 }}
            >
              <RatingBadge />
            </motion.div>
          </div>

          <motion.div
            className="hero__panel"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <div className="hero__panel-steth" style={stethMask} />
            <ul className="hero__panel-list">
              {heroPoints.map(([a, b]) => (
                <li key={a}>
                  <b>{a}</b>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* LINK CARDS */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Explore the clinic</span>
          </Reveal>
          <div className="linkcards" style={{ marginTop: 22 }}>
            {cards.map((c, i) => (
              <Reveal key={c.to} delay={i * 0.1}>
                <Link to={c.to} className="linkcard">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="linkcard__more">Open page →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
