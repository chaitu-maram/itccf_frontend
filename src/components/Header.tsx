

import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  return (
    <>
      <header
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgb(221,214,254)",
          boxShadow: "0 2px 20px rgba(124,58,237,0.09)",
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          className="header-inner"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "13px 28px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "15px",
                background:
                  "linear-gradient(135deg,rgb(76,29,149),rgb(124,58,237))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span className="main-header-logo">HR</span>
            </div>

            <div className="main-header-logo-content header-logo-text">
              <p>Connect Portal</p>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "#2e1065",
                  fontWeight: 800,
                }}
              >
                HR Network
              </p>
            </div>
          </div>

          <div
            style={{
              width: "1px",
              height: "34px",
              background: "#ddd6fe",
              flexShrink: 0,
            }}
          />

          <div
            className="tabs-scroll"
            style={{
              display: "flex",
              gap: "10px",
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            <button className="main-header-tabs">PG &amp; Degree Colleges</button>
            <button className="main-header-tabs">Industrial Associates</button>
            <button className="main-header-tabs">Entrepreneur Sources</button>
            <button className="main-header-tabs">Entrepreneur Network</button>
          </div>
        </div>
      </header>

      {/*
       * nav-header is position:relative + overflow:visible so the in-flow
       * dropdown naturally pushes content below it downward.
       */}
      <div
        className="nav-header"
        style={{
          position: "relative",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <button
          className="menu-btn"
          onClick={onMenuToggle}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-header-inner ${menuOpen ? "open" : ""}`}>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Authorised HRs</a>
          <a href="#">Core Committee</a>
          <a href="#">Services</a>
          <a href="#">Projects</a>
          <a href="#">Associates</a>
          <a href="#">Gallery</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </>
  );
}