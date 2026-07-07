import { useEffect, useState } from "react";

// Cookie/consent choice: "accepted" | "declined" | null (undecided).
const KEY = "rdc-cookie-consent";
const EVENT = "rdc-consent";

export function getConsent() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

// Clear the choice so the banner shows again ("Cookie preferences").
export function clearConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
}

// Reactive read of the consent choice, kept in sync across the app.
export function useConsent() {
  const [value, setValue] = useState(getConsent);
  useEffect(() => {
    const handler = (e) => setValue(e.detail ?? getConsent());
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);
  return [value, setConsent];
}
