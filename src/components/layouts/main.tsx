import { useState } from 'react';

export function Main() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h1>
                <form className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-400" required />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-400" required />
                    </div>
                    {!isLogin && (
                        <div className="space-y-1 text-sm">
                            <label htmlFor="confirm-password" className="block text-gray-600">Confirm Password</label>
                            <input type="password" id="confirm-password" className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-400" required />
                        </div>
                    )}
                    <button type="submit" className="block w-full p-3 text-center rounded-sm text-white bg-indigo-600 hover:bg-indigo-700">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
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