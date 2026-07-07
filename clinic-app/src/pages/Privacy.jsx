import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { clinic } from "../data";
import { clearConsent } from "../consent";

export default function Privacy() {
  return (
    <Page>
      <Seo
        title="Privacy & Cookies | Rathmines Doctors Clinic"
        description="How Rathmines Doctors Clinic's website handles your privacy, and the cookies it uses."
        path="/privacy"
      />
      <section className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Legal</span>
            <h1>Privacy &amp; Cookies</h1>
            <p className="lede" style={{ marginTop: 16, maxWidth: "60ch" }}>
              This policy covers how this website handles your information. It does not cover
              medical records or care at the clinic, which are managed separately under the
              clinic's own data-protection obligations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container legal">
          <Reveal>
            <h2>Information we collect</h2>
            <p>
              This website does not collect personal information and does not use analytics or
              advertising trackers. There are no contact or booking forms that submit your data.
              To make an appointment, please telephone the clinic on {clinic.phone}.
            </p>
          </Reveal>

          <Reveal>
            <h2>Cookies &amp; storage</h2>
            <p>
              We use a small amount of essential, first-party browser storage to remember your
              cookie choice and to show the introductory animation only once per visit. This is
              not shared with anyone.
            </p>
            <p>
              With your consent, we load an <strong>embedded Google Map</strong> so you can see
              our location and get directions. Google may set its own cookies when the map loads.
              If you decline, the map is not loaded and you can still reach us using the written
              address and the "Get directions" link. We also load fonts from Google Fonts for the
              site's typography.
            </p>
          </Reveal>

          <Reveal>
            <h2>Your choice</h2>
            <p>
              You can accept or decline non-essential cookies using the banner shown on your first
              visit. You can change your mind at any time:
            </p>
            <p>
              <button className="btn btn--ghost" onClick={clearConsent}>
                Change cookie preferences
              </button>
            </p>
          </Reveal>

          <Reveal>
            <h2>Contact</h2>
            <p>
              For any question about privacy, contact Rathmines Doctors Clinic,{" "}
              {clinic.addressLines.join(", ")}, or telephone{" "}
              <a href={clinic.phoneHref}>{clinic.phone}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
