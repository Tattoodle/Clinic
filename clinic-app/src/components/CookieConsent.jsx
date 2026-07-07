import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useConsent } from "../consent";

// GDPR consent banner. Shows until the visitor makes a choice.
// "Accept" enables the Google Maps embed; "Decline" keeps only essential storage.
export default function CookieConsent() {
  const [consent, setConsent] = useConsent();

  return (
    <AnimatePresence>
      {consent == null && (
        <motion.div
          className="cookie"
          role="dialog"
          aria-label="Cookie notice"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <p className="cookie__title">Your privacy</p>
          <p className="cookie__text">
            We use only essential storage to run this site, and Google Maps to show our
            location. Accepting enables the map. See our{" "}
            <Link to="/privacy">Privacy &amp; Cookies</Link> policy.
          </p>
          <div className="cookie__actions">
            <button className="btn btn--ghost" onClick={() => setConsent("declined")}>
              Decline
            </button>
            <button className="btn btn--primary" onClick={() => setConsent("accepted")}>
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
