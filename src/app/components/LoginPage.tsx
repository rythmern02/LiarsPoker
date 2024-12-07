import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";

function LoginPage() {
    const okto: any = useOkto();
    const [authToken, setAuthToken] = useState<string | null>(null);

    const handleGoogleLogin: any = async (credentialResponse: { credential: string }) => {
        const idToken = credentialResponse.credential;
        okto?.authenticate(idToken, (authResponse: { auth_token: React.SetStateAction<string | null>; }, error: any) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);
      } else if (error) {
            console.error("Authentication error:", error);
        }
    });
 };

 const getwalletdetails = async () => {
    const wallet = await okto?.getUserDetails();
    console.log(wallet);
 }

 return (
    <div>
        <h1 onClick={getwalletdetails}>Login</h1>
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