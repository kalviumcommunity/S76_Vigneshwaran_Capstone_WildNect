// SignIn.jsx
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

export default function SignIn() {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
