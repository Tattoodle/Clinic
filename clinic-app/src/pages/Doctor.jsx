import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { clinic } from "../data";
import { asset } from "../assetUrl";

export default function Doctor() {
  return (
    <Page>
      <Seo
        title="Meet Dr George Joyce | Rathmines Doctors Clinic"
        description="Dr George Joyce, M.I.C.G.P., D.C.H., D.Obst., has served the Rathmines community since 1988. Friendly, professional and confidential GP care in Dublin 6."
        path="/doctor"
      />
      <section className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Your GP</span>
            <h1>Meet the Doctor</h1>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container doctor">
          <motion.div
            className="doctor__photo"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={asset("assets/dr-george-joyce.jpeg")} alt="Dr George Joyce, GP at Rathmines Doctors Clinic" />
          </motion.div>

          <div className="doctor__bio">
            <Reveal>
              <h2 className="doctor__name">{clinic.doctor}</h2>
              <p className="doctor__quals">{clinic.quals}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Dr George Joyce has been serving the Rathmines community since 1988, providing
                comprehensive medical care. He believes in listening to patients and helping them
                make informed decisions about their health.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                From everyday illness to the ongoing management of long-term conditions, you will
                be seen by the same trusted GP who knows your history, with care that is
                professional, courteous and non-judgemental.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 24 }}>
                <a className="btn btn--primary" href={clinic.phoneHref}>
                  Call {clinic.phone}
                </a>
                <Link className="btn btn--ghost" to="/services">
                  View services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
