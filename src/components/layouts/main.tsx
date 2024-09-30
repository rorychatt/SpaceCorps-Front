import { useState } from 'react';
import { LoginForm, RegisterForm } from '../main-components';

export function Main() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
                {isLogin ? <LoginForm /> : <RegisterForm />}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-1 text-indigo-600 hover:underline"
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}