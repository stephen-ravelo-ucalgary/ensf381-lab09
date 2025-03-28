import "./Login.css";
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const backendEndpoint = "http://127.0.0.1:5000/validate_login";
        try {
            const response = await fetch (backendEndpoint , {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({"username" : username, "password" : password}),
            });

            const data = await response.json();
            if (data["success"] == true) {
                console.log('Form submitted successfully!');
                setError(null);
                navigate("/predict");

            } else {
                console.error('Form submission failed.');
                setError("Form submission failed.");
                return (<div>{error ? <p>Form submission failed.</p> : null}</div>);
            }
        }
        catch (error) {
            console.error('Error during form submission:', error);
        }
    };
            
    return (
        <div className="login">
            <form className="login" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
