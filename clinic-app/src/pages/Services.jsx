import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { services, clinic } from "../data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <Page>
      <Seo
        title="GP Services | Rathmines Doctors Clinic, Dublin 6"
        description="General-practice services at Rathmines Doctors Clinic: consultations, chronic disease management, health checks, prescriptions and referrals. Call (01) 4979938."
        path="/services"
      />
      <section className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">What we offer</span>
            <h1>Services</h1>
            <p className="lede" style={{ marginTop: 16, maxWidth: "56ch" }}>
              A full range of general-practice services for individuals and families,
              delivered with continuity of care by {clinic.doctor}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <motion.ul
            className="services-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {services.map((s) => (
              <motion.li key={s} className="service-item" variants={item}>
                <span className="service-item__dot" aria-hidden="true" />
                <span>{s}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <h2>We’re here when you need us</h2>
            <p>
              If your concern isn’t listed, please call the clinic. We’ll let you know how we
              can help or arrange the right referral.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn--primary" href={clinic.phoneHref}>
                Call {clinic.phone}
              </a>
              <Link className="btn btn--ghost" to="/contact">
                Contact &amp; hours
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
