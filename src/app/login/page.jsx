'use client'
import { signInWithGithub, signInWithGoogle } from './actions';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full bg-black text-white justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 p-8">
        <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
        <p className="text-gray-400 mb-6 text-sm text-center">Time to Bet and Earn Big</p>
        <div className="flex gap-4 w-full">
          <button onClick={signInWithGoogle} className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold">
            Sign In with Google
          </button>
          <button onClick={signInWithGithub} className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold">
            Sign In with Github
          </button>
        </div>
      </div>
    </div>
  );
}