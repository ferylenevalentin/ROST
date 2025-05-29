import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
      setError(""); // Clear previous errors
      console.log("Login Data:", { username, password }); // Debugging: Log the login data
      try {
          const res = await fetch("http://localhost:1337/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });
          const data = await res.json();
          console.log("Login Response:", data); // Debugging: Log the response
          if (res.ok && data.success) {
              navigate("/admin"); // Redirect to admin dashboard
          } else {
              setError(data.error || "Login failed");
          }
      } catch (err) {
          console.error("Network error:", err);
          setError("Network error");
      }
  };

    return (
        <div className="login-bg">
            <div className="login-container">
                <div className="login-form">
                    <div className="login-form-content">
                        <div className="logo-container">
                            
                        </div>
                        <TextField
                            variant="outlined"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            className="login-input"
                            InputProps={{
                                classes: { notchedOutline: "input-outline" },
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="PASSWORD"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            className="login-input"
                            InputProps={{
                                classes: { notchedOutline: "input-outline" },
                            }}
                        />
                        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
                        <div className="login-links">
                            
                            <Button className="login-link" variant="text" fullWidth={false} component={Link} to="/signup">
                                NEW HERE? SIGN UP
                            </Button>
                        </div>
                        <Button
                            variant="contained"
                            className="login-btn"
                            fullWidth
                            onClick={handleLogin}
                            disabled={!username || !password}
                        >
                            LOGIN
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;