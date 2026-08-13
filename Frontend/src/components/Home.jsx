import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="home">


            <nav className="home-nav">

                {/* Logo */}
                <div className="logo">
                    Task<span>Flow</span>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                {/* Navigation Links */}
                <div
                    className={`nav-links ${
                        menuOpen ? "active" : ""
                    }`}
                >

                    <Link
                       
                        onClick={closeMenu}
                        aria-disabled
                    >
                        Dashboard
                    </Link>

                    <Link
                        
                        onClick={closeMenu}
                    >
                        Tasks
                    </Link>

                    <Link
                        
                        onClick={closeMenu}
                    >
                        Users
                    </Link>

                    <Link
                        to="/login"
                        onClick={closeMenu}
                    >
                        Login
                    </Link>

                </div>

            </nav>



            <section className="hero">

                <div className="hero-content">

                    <p className="welcome">
                        Welcome back 👋
                    </p>

                    <h1>
                        Hello, <span>Users</span>
                    </h1>

                    <p className="hero-text">
                        Manage your tasks, track your progress,
                        and stay productive with TaskFlow.
                    </p>

                    <Link
                        
                        className="hero-button"
                    >
                        Go to Dashboard
                    </Link>

                </div>


                {/* Hero Card */}

                <div className="hero-card">

                    <div className="circle-icon">
                        ✓
                    </div>

                    <h3>
                        Stay Organized
                    </h3>

                    <p>
                        Keep all your tasks in one
                        simple place.
                    </p>

                </div>

            </section>


          
            <section className="features">

                <h2>
                    Everything you need
                </h2>

                <p className="features-subtitle">
                    Simple tools to help you manage your work.
                </p>


                <div className="feature-grid">

                    {/* Feature 1 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            ✓
                        </div>

                        <h3>
                            Manage Tasks
                        </h3>

                        <p>
                            Create, update and delete
                            your tasks easily.
                        </p>

                    </div>


                    {/* Feature 2 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            👥
                        </div>

                        <h3>
                            Manage Users
                        </h3>

                        <p>
                            Add and manage users from
                            your dashboard.
                        </p>

                    </div>


                    {/* Feature 3 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Track Progress
                        </h3>

                        <p>
                            Quickly see pending and
                            completed tasks.
                        </p>

                    </div>

                </div>

            </section>



            <footer>

                <p>
                    © 2026 TaskFlow. All rights reserved.
                </p>

            </footer>

        </div>
    );
};

export default Home;