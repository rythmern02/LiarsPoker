import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";

function LoginPage() {
    const okto = useOkto();
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin:any = async (credentialResponse: { credential: string }) => {
        try {
            const idToken = credentialResponse.credential;
            okto?.authenticate(idToken, (authResponse, error) => {
                if (authResponse) {
                    if (typeof authResponse.auth_token === 'string') {
                        setAuthToken(authResponse.auth_token);
                        console.log("Authenticated successfully, auth token:", authResponse.auth_token);
                    } else {
                        setError("Invalid auth token received");
                        console.error("Invalid auth token format");
                    }
                } else if (error) {
                    setError(error.message || "Authentication failed");
                    console.error("Authentication error:", error);
                }
            });
        } catch (err) {
            setError("Authentication failed");
            console.error("Login error:", err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!authToken ? (
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                        setError("Login Failed");
                        console.error("Login Failed");
                    }}
                />
            ) : (
                <p>Authenticated</p>
            )}
        </div>
    );
}

export default LoginPage;