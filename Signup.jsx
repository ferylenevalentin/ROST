import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./SignUp.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:1337/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Signup successful:", data);
                alert("Account created successfully!");
                navigate("/login"); // Redirect to login page
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Error creating account. Please try again.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error creating account. Please try again.");
        }
    };

    return (
        <div className="signup-bg">
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup-form-content">
                        <h2 style={{ textAlign: "center", color: "#433628", marginBottom: 10 }}>
                            SIGN UP
                        </h2>
                        <TextField
                            variant="outlined"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            className="signup-input"
                        />
                        <TextField
                            variant="outlined"
                            placeholder="PASSWORD"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            className="signup-input"
                        />
                        <TextField
                            variant="outlined"
                            placeholder="CONFIRM PASSWORD"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            className="signup-input"
                        />
                        <Button
                            variant="contained"
                            className="signup-btn"
                            fullWidth
                            onClick={handleSignup}
                        >
                            SIGN UP
                        </Button>
                        <Button
                            className="signup-link"
                            variant="text"
                            component={Link}
                            to="/login"
                        >
                            ALREADY HAVE AN ACCOUNT? LOGIN
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;