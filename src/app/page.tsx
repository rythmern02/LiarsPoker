"use client"
import { GoogleLogin } from '@react-oauth/google';
import { LogIn } from 'lucide-react';

import { OktoContextType, useOkto } from 'okto-sdk-react';
import { useEffect, useState } from 'react';

import useGlobalStorage from './components/store';


export default function AuthForm() {
    const [authToken, setAuthToken] = useState('');
    const { setAddress } = useGlobalStorage();
    const { authenticate, createWallet } = useOkto() as OktoContextType;
    const handleGoogleLogin = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential;
        await authenticate(idToken, async (authResponse, error) => {
            if (authResponse) {
                setAuthToken(authResponse.auth_token);
            } else if (error) {
                console.error('Authentication error:', error);
            }
        });
    };

    useEffect(() => {
        if (authToken) {
            createWallet()
                .then((result) => {
                    setAddress(result.wallets[3].address);
                })
                .catch((error) => {
                    console.error(`error:`, error);
                });
        }
    }, [authToken, createWallet]);

    return (
        <div
            className="flex items-center flex-col justify-center w-full h-full"
        >
            <div className="min-h-screen flex items-center justify-center p-4 w-full">
                <div className="w-full max-w-[90%] sm:max-w-md bg-zinc-900/50 border-zinc-800">
                    <div className="pt-6 pb-8 px-4 sm:px-8 bg-zinc-950 rounded-xl">
                        <div className="flex flex-col items-center space-y-6">
                            {/* Logo/Icon */}
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                                <LogIn className="w-8 h-8 text-white" />
                            </div>

                            {/* Heading */}
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                                    Welcome to Crypto मिलन
                                </h1>
                                <p className="text-sm sm:text-base text-zinc-400">
                                    Please sign in to continue
                                </p>
                            </div>

                            <div className="w-full space-y-4 relative">
                                <div className="opacity-0 absolute top-2 w-full">
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                    />
                                </div>
                                <button
                                    className="w-full border-zinc-800 bg-transparent hover:bg-zinc-800 hover:text-white text-zinc-300 text-sm sm:text-base py-2 sm:py-3"
                                >
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}