import { useState, useEffect } from "react";
import { Check, Bell, Mail, Palette } from "lucide-react";

/* ─── Theme resolver ──────────────────────────────────────── */
function resolveTheme(theme) {
  if (theme === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

/* ─── Design tokens per theme ─────────────────────────────── */
const tokens = {
  light: {
    pageBg:      "linear-gradient(135deg,#f8fafc 0%,#eff6ff 50%,#f8fafc 100%)",
    cardBg:      "#ffffff",
    cardBorder:  "#e2e8f0",
    cardShadow:  "0 2px 12px rgba(0,0,0,.06)",
    rowHover:    "#f8fafc",
    title:       "#111827",
    subtitle:    "#6b7280",
    tipBg:       "#eff6ff",
    tipBorder:   "#bfdbfe",
    tipText:     "#1e40af",
    selectBg:    "#ffffff",
    selectColor: "#111827",
    selectBorder:"#d1d5db",
    divider:     "#f1f5f9",
  },
  dark: {
    pageBg:      "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
    cardBg:      "#1e2436",
    cardBorder:  "#334155",
    cardShadow:  "0 2px 20px rgba(0,0,0,.4)",
    rowHover:    "#252d40",
    title:       "#f1f5f9",
    subtitle:    "#94a3b8",
    tipBg:       "#1e2d4a",
    tipBorder:   "#2563eb",
    tipText:     "#93c5fd",
    selectBg:    "#1e2436",
    selectColor: "#f1f5f9",
    selectBorder:"#475569",
    divider:     "#2d3748",
  },
};

/* ─── Toggle ─────────────────────────────────────────────── */
const Toggle = ({ checked, onChange, id }) => (
  <button
    id={id}
    type="button"
    onClick={onChange}
    aria-pressed={checked}
    style={{
      flexShrink: 0,
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      width: 52,
      height: 30,
      borderRadius: 9999,
      border: "none",
      cursor: "pointer",
      backgroundColor: checked ? "#10b981" : "#6b7280",
      transition: "background-color .2s",
      padding: 0,
    }}
  >
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,.25)",
        transform: checked ? "translateX(25px)" : "translateX(3px)",
        transition: "transform .2s",
      }}
    />
  </button>
);

/* ─── Row ─────────────────────────────────────────────────── */
const Row = ({ icon, iconBg, title, desc, right, border, t }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "20px 24px",
        borderBottom: border ? `1px solid ${t.divider}` : "none",
        backgroundColor: hovered ? t.rowHover : t.cardBg,
        transition: "background .15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
        <div
          style={{
            flexShrink: 0,
            padding: 12,
            borderRadius: 10,
            backgroundColor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 16, color: t.title }}>{title}</div>
          <div style={{ fontSize: 14, color: t.subtitle, marginTop: 4 }}>{desc}</div>
        </div>
      </div>
      {right}
    </div>
  );
};

/* ─── Main ────────────────────────────────────────────────── */
export default function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("medcore-settings");
      return saved ? JSON.parse(saved) : { notifications: true, emailReminders: true, theme: "light" };
    } catch { return { notifications: true, emailReminders: true, theme: "light" }; }
  });
  const [saved, setSaved] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => resolveTheme(settings.theme));

  /* Resolve active theme whenever setting or OS preference changes */
  useEffect(() => {
    setActiveTheme(resolveTheme(settings.theme));
    if (settings.theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setActiveTheme(mq.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [settings.theme]);

  /* Clear saved badge */
  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(t);
  }, [saved]);

  const toggle = (key) => {
    setSettings((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    try { localStorage.setItem("medcore-settings", JSON.stringify(settings)); } catch {}
    setSaved(true);
  };

  const t = tokens[activeTheme];

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        background: t.pageBg,
        padding: "48px 16px",
        boxSizing: "border-box",
        transition: "background .3s",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div
              style={{
                padding: 10,
                borderRadius: 10,
                background: "linear-gradient(135deg,#3b82f6,#10b981)",
                display: "flex",
              }}
            >
              <Palette size={22} color="#fff" />
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: t.title, margin: 0, transition: "color .3s" }}>
              Settings
            </h1>
          </div>
          <p style={{ fontSize: 15, color: t.subtitle, marginLeft: 46, transition: "color .3s" }}>
            Manage your preferences and account settings
          </p>
        </div>

        {/* Active theme badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 9999,
              backgroundColor: activeTheme === "dark" ? "#1e3a5f" : "#dbeafe",
              color:           activeTheme === "dark" ? "#93c5fd"  : "#1d4ed8",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "background .3s, color .3s",
            }}
          >
            {activeTheme === "dark" ? "🌙 Dark mode active" : "☀️ Light mode active"}
          </span>
          {settings.theme === "auto" && (
            <span style={{ fontSize: 12, color: t.subtitle }}>— following system preference</span>
          )}
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: t.cardBg,
            borderRadius: 18,
            border: `1px solid ${t.cardBorder}`,
            boxShadow: t.cardShadow,
            overflow: "hidden",
            transition: "background .3s, border-color .3s",
          }}
        >
          <Row
            border t={t}
            iconBg={activeTheme === "dark" ? "#1e3a5f" : "#dbeafe"}
            icon={<Bell size={20} color={activeTheme === "dark" ? "#60a5fa" : "#2563eb"} />}
            title="Push Notifications"
            desc="Receive real-time alerts for appointments and important updates"
            right={
              <Toggle
                id="notifications-toggle"
                checked={settings.notifications}
                onChange={() => toggle("notifications")}
              />
            }
          />

          <Row
            border t={t}
            iconBg={activeTheme === "dark" ? "#052e16" : "#d1fae5"}
            icon={<Mail size={20} color={activeTheme === "dark" ? "#4ade80" : "#059669"} />}
            title="Email Reminders"
            desc="Get appointment reminders and health tips via email"
            right={
              <Toggle
                id="email-toggle"
                checked={settings.emailReminders}
                onChange={() => toggle("emailReminders")}
              />
            }
          />

          {/* Theme row */}
          <ThemeRow t={t} settings={settings} setSettings={setSettings} setSaved={setSaved} activeTheme={activeTheme} />
        </div>

        {/* Save */}
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16 }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: "12px 28px",
              background: "linear-gradient(to right,#3b82f6,#10b981)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Save Settings
          </button>

          {saved && (
            <div
              role="status"
              aria-live="polite"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#10b981",
                fontWeight: 500,
                fontSize: 15,
                animation: "fadeIn .3s ease-out",
              }}
            >
              <Check size={18} />
              Settings saved successfully
            </div>
          )}
        </div>

        {/* Tip */}
        <div
          style={{
            marginTop: 40,
            padding: "14px 18px",
            backgroundColor: t.tipBg,
            border: `1px solid ${t.tipBorder}`,
            borderRadius: 12,
            fontSize: 14,
            color: t.tipText,
            transition: "background .3s, border-color .3s, color .3s",
          }}
        >
          💡 <strong>Tip:</strong> Your preferences are saved securely. You can change them anytime from this page.
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Theme Row (extracted to avoid inline complexity) ──────── */
function ThemeRow({ t, settings, setSettings, setSaved, activeTheme }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "20px 24px",
        backgroundColor: hovered ? t.rowHover : t.cardBg,
        flexWrap: "wrap",
        transition: "background .15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <label
          htmlFor="theme-select"
          style={{ fontWeight: 600, fontSize: 16, color: t.title, display: "block", transition: "color .3s" }}
        >
          Theme
        </label>
        <p style={{ fontSize: 14, color: t.subtitle, margin: "4px 0 0", transition: "color .3s" }}>
          Choose your preferred display mode
        </p>
      </div>

      {/* Segmented control instead of a plain select */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          borderRadius: 10,
          backgroundColor: activeTheme === "dark" ? "#0f172a" : "#f1f5f9",
          border: `1px solid ${t.cardBorder}`,
          transition: "background .3s",
        }}
      >
        {[
          { value: "light", label: "☀️ Light" },
          { value: "dark",  label: "🌙 Dark"  },
          { value: "auto",  label: "⚙️ Auto"  },
        ].map(({ value, label }) => {
          const isActive = settings.theme === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSettings((p) => ({ ...p, theme: value }));
                setSaved(false);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive
                  ? (activeTheme === "dark" ? "#334155" : "#ffffff")
                  : "transparent",
                color: isActive ? t.title : t.subtitle,
                boxShadow: isActive
                  ? (activeTheme === "dark" ? "0 1px 4px rgba(0,0,0,.4)" : "0 1px 4px rgba(0,0,0,.1)")
                  : "none",
                transition: "background .2s, color .2s, box-shadow .2s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}