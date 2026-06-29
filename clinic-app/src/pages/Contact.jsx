import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { clinic } from "../data";

export default function Contact() {
  return (
    <Page>
      <Seo
        title="Contact & Opening Hours | Rathmines Doctors Clinic, Dublin 6"
        description="Rathmines Doctors Clinic, 104 Lower Rathmines Road, Dublin 6, D06 F9P0. Open Mon–Fri 12pm–7pm. Consultation €70. Call (01) 4979938. Out-of-hours (01) 518 0808."
        path="/contact"
      />
      <section className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Visit us</span>
            <h1>Contact &amp; Hours</h1>
            <p className="lede" style={{ marginTop: 16, maxWidth: "54ch" }}>
              We aim to provide prompt appointments for both routine and urgent concerns.
              To book, please telephone the clinic.
            </p>
          </Reveal>
        </div>
      </section>

      {/* contact + map */}
      <section className="section--tight">
        <div className="container contact-grid">
          <Reveal className="surface-card info-block">
            <h3>Get in touch</h3>

            <div className="info-row">
              <span className="info-row__icon" style={{ WebkitMaskImage: "url(/assets/icons/checkup.svg)", maskImage: "url(/assets/icons/checkup.svg)" }} />
              <div>
                <div className="info-row__label">Telephone</div>
                <div className="info-row__value">
                  <a href={clinic.phoneHref}>{clinic.phone}</a>
                </div>
              </div>
            </div>

            <div className="info-row">
              <span className="info-row__icon" style={{ WebkitMaskImage: "url(/assets/icons/card.svg)", maskImage: "url(/assets/icons/card.svg)" }} />
              <div>
                <div className="info-row__label">Address</div>
                <div className="info-row__value">
                  {clinic.addressLines.join(", ")}
                </div>
              </div>
            </div>

            <div className="info-row">
              <span className="info-row__icon" style={{ WebkitMaskImage: "url(/assets/icons/compass.svg)", maskImage: "url(/assets/icons/compass.svg)" }} />
              <div>
                <div className="info-row__label">Parking</div>
                <div className="info-row__value">{clinic.parking}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="map-wrap">
              <iframe
                title="Map showing Rathmines Doctor's Clinic, 104 Lower Rathmines Road, Dublin 6"
                src={clinic.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a className="map-link" href={clinic.mapLink} target="_blank" rel="noopener">
              <span className="map-link__icon" />
              Get directions in Google Maps
            </a>
          </Reveal>
        </div>
      </section>

      {/* fees + hours */}
      <section className="section--tight">
        <div className="container contact-grid">
          <Reveal className="surface-card info-block">
            <h3>Fees</h3>
            <div className="fee-big">{clinic.fee}</div>
            <div className="fee-label">Standard consultation fee</div>
            <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 15 }}>
              New patients welcome. A clear, standard fee with no surprises.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="surface-card info-block">
            <h3>Opening hours</h3>
            <div className="hours-row">
              <b>Monday – Friday</b>
              <span>12pm – 7pm</span>
            </div>
            <div className="hours-row">
              <b>Saturday &amp; Sunday</b>
              <span>Closed</span>
            </div>
            <div className="ooh">
              <div className="ooh__label">Out-of-hours service</div>
              <a className="ooh__phone" href={clinic.outOfHoursHref}>
                {clinic.outOfHours}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
