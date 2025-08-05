
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import SevenPIcon from "@/components/icons/seven-p-logo";
import { useAuth } from '@/hooks/use-auth';

export default function AuthPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('login');

    useEffect(() => {
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p>Loading...</p>
            </div>
        );
    }
    
    if (user) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <div className="flex items-center gap-4 mb-8">
                <SevenPIcon className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold">7Plates</h1>
            </div>
            <Tabs defaultValue="login" className="w-full max-w-md" onValueChange={setActiveTab}>
                <TabsList className="relative">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <div 
                        className="absolute top-1/2 left-1 -translate-y-1/2 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] bg-primary rounded-full transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(${activeTab === 'login' ? '0%' : '100%'}) translateY(-50%)`
                        }}
                    />
                </TabsList>
                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                    <SignupForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
