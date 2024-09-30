export const LoginForm = () => {
    return (
        <form className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <div className="space-y-1 text-sm">
                <label htmlFor="email" className="block text-gray-600">Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-400" required />
            </div>
            <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block text-gray-600">Password</label>
                <input type="password" id="password" className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-400" required />
            </div>
            <button type="submit" className="block w-full p-3 text-center rounded-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Login
            </button>
        </form>
    );
};