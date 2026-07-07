import { Link } from "react-router-dom";
import { clinic, nav } from "../data";
import { asset } from "../assetUrl";
import { clearConsent } from "../consent";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">
              <img src={asset("assets/logo.svg")} alt="" />
              <strong>Rathmines Doctors Clinic</strong>
            </div>
            <p className="site-footer__tag">
              Professional, courteous, non-judgemental care provided since 1988.
            </p>
          </div>

          <div>
            <h4>Visit</h4>
            <p>
              {clinic.addressLines.map((l, i) => (
                <span key={i}>
                  {l}
                  <br />
                </span>
              ))}
            </p>
            <p style={{ marginTop: 10 }}>Open {clinic.hours}</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>
              <a href={clinic.phoneHref}>{clinic.phone}</a>
              <br />
              Out of hours: <a href={clinic.outOfHoursHref}>{clinic.outOfHours}</a>
            </p>
            <p style={{ marginTop: 10, display: "flex", gap: 14, flexWrap: "wrap" }}>
              {nav.slice(1).map((n) => (
                <Link key={n.to} to={n.to}>
                  {n.label}
                </Link>
              ))}
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Rathmines Doctors Clinic, Dublin 6. Dr George Joyce.</span>
          <span className="site-footer__legal">
            <Link to="/privacy">Privacy &amp; Cookies</Link>
            <button type="button" className="linklike" onClick={clearConsent}>
              Cookie preferences
            </button>
          </span>
          <span className="guarantee">Absolute confidentiality guaranteed.</span>
        </div>
      </div>
    </footer>
  );
}
