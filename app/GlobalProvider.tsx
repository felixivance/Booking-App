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
        {children} 
        </>;
}