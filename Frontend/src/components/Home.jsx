import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

    return (
        <div className="home">

            <nav className="home-nav">

                <div className="logo">
                    Task<span>Flow</span>
                </div>

                <div className="nav-links">
                    <Link to="">Dashboard</Link>
                    <Link to="/#">Tasks</Link>
                    <Link to="/#">Users</Link>
                    <Link to="/login">Login</Link>

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

                
                </div>


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


            {/* Footer */}

            <footer>
                <p>
                    © 2026 TaskFlow. All rights reserved.
                </p>
            </footer>

        </div>
    );
};

export default Home;