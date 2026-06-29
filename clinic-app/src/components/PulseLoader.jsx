import { motion } from "framer-motion";

// Short "heart monitor" trace shown while the non-home pages load.
// Lighter than the full home intro: just the ECG line drawing across.
export default function PulseLoader() {
  return (
    <motion.div
      className="pulse-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
    >
      <motion.svg
        className="pulse-loader__line"
        viewBox="0 0 320 60"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {/* faint baseline */}
        <path d="M6 30 H314" stroke="rgba(95,141,128,0.18)" strokeWidth="2" strokeLinecap="round" />
        {/* traced heartbeat */}
        <motion.path
          d="M6 30 H120 l10 -19 l12 38 l13 -45 l9 26 H314"
          stroke="#5f8d80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.svg>
      <motion.span
        className="pulse-loader__name"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        Rathmines Doctors Clinic
      </motion.span>
    </motion.div>
  );
}
