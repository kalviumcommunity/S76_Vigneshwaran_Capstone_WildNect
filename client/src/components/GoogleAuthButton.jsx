// src/components/GoogleAuthButton.jsx
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function GoogleAuthButton() {
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log("User Info:", user);
    } catch (error) {
      console.error("Google Sign-Up Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <button
        onClick={handleSignUp}
        className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-500 hover:text-white transition-all flex gap-1"
      >
        <img src="/src/assets/images/Google__G__logo.svg.webp" alt="google_logo" className="w-6 h-6" />
        Sign Up with Google
      </button>
      {user && (
        <div className="mt-4 text-sm text-gray-700">
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
