import { motion } from "framer-motion";

// Intro splash: the clinic cross draws in, the name fades up, and a
// heartbeat line traces across. Soft, calm, ~2.2s before the site reveals.
export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <motion.div
        className="loader__mark"
        initial={{ scale: 0.6, opacity: 0, y: 8 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, delay: 0.9 }}
          style={{ width: "100%", height: "100%" }}
        >
          <svg viewBox="0 0 156.988 203.23" width="100%" height="100%" aria-hidden="true">
            <motion.path
              fill="#c0473d"
              d="M86.392,0l0.035,203.23c-13.431-7.591-26.808-15.216-40.184-22.896l-0.007-49.75L0,130.626l0.055-61.236l47.468,0.054l0.045-46.275L86.392,0z"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              stroke="#c0473d"
              strokeWidth="1"
            />
            <motion.path
              fill="#c0473d"
              d="M88.951,24.609h20.355l-0.038,46.259l47.72,0.009c-0.074,27.541-0.068,47.981,0,60.5l-47.828,0.065c-0.091,15.865-0.019,31.729-0.036,47.594l-8.567,0.076L100.65,34.46L88.951,34.47V24.609z"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              stroke="#c0473d"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <motion.div
          className="loader__title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          Rathmines Doctors Clinic
        </motion.div>
        <motion.div
          className="loader__sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
          style={{ marginTop: 8 }}
        >
          Friendly medical care since 1988
        </motion.div>
      </div>

      <motion.svg
        className="loader__pulse"
        viewBox="0 0 220 40"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <motion.path
          d="M0 20 H78 l7 -13 l8 26 l9 -30 l6 17 H220"
          stroke="#5f8d80"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.95, duration: 1.1, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}
