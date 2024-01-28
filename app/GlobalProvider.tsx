
"use client";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function GlobalProvider({children} : {children: React.ReactNode}) {
    return <>
        <Toaster 
            position="top-center"
            toastOptions={{
                style: {
                    fontSize: "14px"
                }
            }}
        />
        <SessionProvider>
            {children} 
        </SessionProvider>
        
        </>;
}