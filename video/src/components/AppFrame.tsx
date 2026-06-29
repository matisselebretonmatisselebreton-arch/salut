import React from "react";
import { theme } from "../ui/theme";

type Props = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  title?: string;
  style?: React.CSSProperties;
};

/** Cadre type navigateur macOS autour d'un mockup d'app. */
export const AppFrame: React.FC<Props> = ({
  children,
  width = "82%",
  height = "auto",
  title = "app.invoicepilot.fr",
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        background: theme.surface,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow:
          "0 30px 80px rgba(15,23,42,0.18), 0 8px 24px rgba(79,70,229,0.12)",
        border: `1px solid ${theme.border}`,
        ...style,
      }}
    >
      <div
        style={{
          height: 38,
          background: "#F1F5F9",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8,
        }}
      >
        <Dot color="#FF5F57" />
        <Dot color="#FEBC2E" />
        <Dot color="#28C840" />
        <div
          style={{
            marginLeft: 18,
            background: "#fff",
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            padding: "4px 14px",
            fontSize: 13,
            color: theme.textMuted,
            fontFamily: "SF Mono, ui-monospace, monospace",
          }}
        >
          🔒 {title}
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
);
