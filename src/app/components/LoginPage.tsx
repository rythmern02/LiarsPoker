import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";

function LoginPage() {
    const okto = useOkto();
    const [authToken, setAuthToken] = useState<string | null>(null);

    const handleGoogleLogin: any = async (credentialResponse: { credential: string }) => {
        const idToken = credentialResponse.credential;
        okto?.authenticate(idToken, (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);
      } else if (error) {
            console.error("Authentication error:", error);
        }
    });
 };

 return (
    <div>
        <h1>Login</h1>
        {!authToken ? (
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Login Failed")}
        />
        ) : (
            <p>Authenticated</p>
        )}
    </div>
    );
}

export default LoginPage;