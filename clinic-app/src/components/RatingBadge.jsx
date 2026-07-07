import { clinic } from "../data";

// Static Google rating as social proof. Two layered star rows: a muted row
// underneath, a gold row on top clipped to the exact score (4.4 / 5 = 88%).
export default function RatingBadge() {
  const pct = (clinic.googleRating / 5) * 100;
  return (
    <a
      className="rating"
      href={clinic.mapLink}
      target="_blank"
      rel="noopener"
      aria-label={`Rated ${clinic.googleRating} out of 5 from ${clinic.googleReviews} Google reviews`}
    >
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__stars-bg">★★★★★</span>
        <span className="rating__stars-fg" style={{ width: `${pct}%` }}>★★★★★</span>
      </span>
      <span className="rating__score">{clinic.googleRating.toFixed(1)}</span>
      <span className="rating__count">{clinic.googleReviews} Google reviews</span>
    </a>
  );
}
