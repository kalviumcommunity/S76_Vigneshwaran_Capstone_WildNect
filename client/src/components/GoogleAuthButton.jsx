// // src/components/GoogleAuthButton.jsx
// import { auth, provider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export default function GoogleAuthButton({isLogin}) {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const handleSignUp = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();

//       // Send ID token to backend
//       const res = await axios.post(
//         "http://localhost:5000/auth/google",
//         { idToken },
//         { withCredentials: true }
//       );
//       localStorage.setItem("token", res.data.token);
//       setUser(res.data.user);
//       console.log("Logged in via Google:", res.data.user);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google Sign-Up Error:", error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-3">
//       <button
//         onClick={handleSignUp}
//         className="bg-blue-600 text-white border border-green-600 px-4 py-2 rounded-lg shadow hover:bg-white hover:text-green-700 transition-all flex gap-1"
//       >
//         <img src="/src/assets/images/Google__G__logo.svg.webp" alt="google_logo" className="w-6 h-6" />
       

//         {isLogin?"Sign In with Google":"Sign Up with Google"}
        
//       </button>
//     </div>
//   );
// }
