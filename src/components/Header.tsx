

import { useState } from "react";

export default function Header() {
const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header
                style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgb(221,214,254)",
                    boxShadow: "0 2px 20px rgba(124,58,237,0.09)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1400px",
                        margin: "0 auto",
                        padding: "13px 28px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "13px",
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
                            }}
                        >
                            <span className="main-header-logo">
                                HR
                            </span>
                        </div>

                        <div className="main-header-logo-content">
                            <p>
                                Connect Portal
                            </p>

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
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button className="main-header-tabs">PG & Degree Colleges</button>
                        <button className="main-header-tabs">Industrial Associates</button>
                        <button className="main-header-tabs">Entrepreneur Sources</button>
                        <button className="main-header-tabs">Entrepreneur Network</button>
                    </div>
                </div>
            </header>

            <div className="nav-header">
               
                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
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