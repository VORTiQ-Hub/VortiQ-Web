import React from 'react';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
                    🔐 Auth
                </h1>
                <p className="text-lg text-white">
                    A simple authencication service
                </p>
                <div>
                    <LoginButton>
                        <Button variant="secondary" size={"lg"}>SignIn</Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    );
}
