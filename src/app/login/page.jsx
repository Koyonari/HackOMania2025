import { login, signup } from './actions';

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full bg-black text-white justify-center items-center">
            {/* Sign Up Section */}
            <div className=" signup-panel flex flex-col justify-center items-center w-full md:w-1/3 p-8">
                <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
                <p className="text-gray-400 mb-6 text-sm text-center">Time to Bet and Earn Big</p>
                <form className="w-full max-w-sm flex flex-col gap-4">
                    <input type="text" name="name" placeholder="Name" className="bg-gray-800 p-3 rounded-lg w-full"
                           required/>
                    <input type="email" name="email" placeholder="Email" className="bg-gray-800 p-3 rounded-lg w-full"
                           required/>
                    <input type="password" name="password" placeholder="Password"
                           className="bg-gray-800 p-3 rounded-lg w-full" required/>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password"
                           className="bg-gray-800 p-3 rounded-lg w-full" required/>
                    <button formAction={signup}
                            className="bg-white text-black py-3 rounded-lg w-full font-semibold">Sign Up
                    </button>
                    <p className="text-center text-gray-500">Or</p>
                    <div className="flex gap-4">
                        <button className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold">Google</button>
                        <button className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold">Github</button>
                    </div>
                </form>
            </div>
            {/* Log In Section */}
            <div className="hidden login-panel flex flex-col justify-center items-center w-full md:w-1/3 p-8">
                <h2 className="text-3xl font-bold mb-6">Log In</h2>
                <form className="w-full max-w-sm flex flex-col gap-4">
                    <input type="email" name="email" placeholder="Email" className="bg-gray-800 p-3 rounded-lg w-full"
                           required/>
                    <input type="password" name="password" placeholder="Password"
                           className="bg-gray-800 p-3 rounded-lg w-full" required/>
                    <button formAction={login} className="bg-white text-black py-3 rounded-lg w-full font-semibold">Log
                        In
                    </button>
                    <p className="text-center text-gray-500">Or</p>
                    <div className="flex gap-4">
                        <button className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold">Google</button>
                        <button className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold">Github</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
