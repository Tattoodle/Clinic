// Single source of truth for clinic content.

export const clinic = {
  name: "Rathmines Doctors Clinic",
  doctor: "Dr George Joyce",
  quals: "M.I.C.G.P., D.C.H., D.Obst.",
  tagline: "Friendly medical care since 1988",
  phone: "(01) 4979938",
  phoneHref: "tel:+35314979938",
  outOfHours: "(01) 518 0808",
  outOfHoursHref: "tel:+35315180808",
  addressLines: ["104 Lower Rathmines Road", "Dublin 6", "D06 F9P0"],
  hours: "Mon–Fri, 12pm–7pm",
  fee: "€70",
  parking:
    "Parking is available nearby, e.g. Euro Car Parks, Richmond Hill, Dublin 6, D06 XW70.",
  mapEmbed:
    "https://www.google.com/maps?q=Rathmines+Doctor's+Clinic,+104+Rathmines+Road+Lower,+Dublin+6,+D06+F9P0&z=16&output=embed",
  mapLink:
    "https://www.google.com/maps/place/Rathmines+Doctor's+Clinic/@53.3263343,-6.2649228,17z/data=!4m15!1m8!3m7!1s0x48670c1d82a65439:0x663d019207a44f9c!2s104+Rathmines+Rd+Lower,+Rathmines,+Dublin+6,+D06+F9P0,+Ireland!3b1!8m2!3d53.3263166!4d-6.2647931!16s%2Fg%2F11f15k9t07!3m5!1s0x48670c1d9d565b23:0xce3f84dbac17a7c7!8m2!3d53.3263048!4d-6.2647585!16s%2Fg%2F11b64syp12!5m1!1e1",
};

// 27 general-practice services (Women's Health and Vaccinations excluded, per brief).
export const services = [
  "General medical consultations",
  "Acute illness assessment & treatment",
  "Chronic disease management",
  "Health screening & preventive care",
  "Annual health checks",
  "Family medicine",
  "Travel health advice",
  "Blood pressure monitoring",
  "Diabetes management",
  "Asthma & respiratory care",
  "Cardiovascular risk assessment",
  "Mental health assessment & support",
  "Minor injury assessment & treatment",
  "Skin condition assessment",
  "Prescription management & medication reviews",
  "Laboratory test requests & results review",
  "Referrals to specialists & allied health professionals",
  "Medical certificates & fitness-to-work assessments",
  "Occupational health assessments",
  "Lifestyle & wellness counselling",
  "Smoking cessation support",
  "Weight management advice",
  "Preventive health advice",
  "Management of common infections",
  "Musculoskeletal pain assessment & management",
  "Follow-up consultations",
  "Coordination of ongoing medical care",
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/doctor", label: "Meet the Doctor" },
  { to: "/contact", label: "Contact" },
];
