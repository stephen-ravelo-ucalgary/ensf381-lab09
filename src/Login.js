import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Login() {
    const navigate = useNavigate();

    // States to hold the username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        const backendEndpoint = "http://127.0.0.1:5000/validate_login";
        try {
            const response = await fetch(backendEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }), //Converts a JavaScript object or value into a JSON string.
            });

            //const data = await response.text();
            const data = await response.json();

            if (response.ok) {
                if (data["success"] == true) {
                    //console.log(data);
                    console.log(data["msg"]);
                    console.log("Form submitted successfully!");
                    navigate("/predict");
                } else {
                    setError(data["msg"]);
                }
            } else {
                console.error("Form submission failed.");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit} className="Login-form">
                <h2>Login</h2>
                <label for="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="error">{error}</p>
        </div>
    );
}

export default Login;
