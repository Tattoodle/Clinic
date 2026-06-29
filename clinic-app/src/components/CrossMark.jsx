// The clinic cross, inlined from the original logo.svg so it can be animated.
export default function CrossMark({ className, fill = "#c0473d", style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 156.988 203.23"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rathmines Doctors Clinic"
    >
      <path
        fill={fill}
        d="M86.392,0l0.035,203.23c-13.431-7.591-26.808-15.216-40.184-22.896l-0.007-49.75L0,130.626l0.055-61.236l47.468,0.054l0.045-46.275L86.392,0z"
      />
      <path
        fill={fill}
        d="M88.951,24.609h20.355l-0.038,46.259l47.72,0.009c-0.074,27.541-0.068,47.981,0,60.5l-47.828,0.065c-0.091,15.865-0.019,31.729-0.036,47.594l-8.567,0.076L100.65,34.46L88.951,34.47V24.609z"
      />
    </svg>
  );
}
