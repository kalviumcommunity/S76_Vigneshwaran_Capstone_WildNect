import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user from session
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Not authenticated:", err.response?.data?.msg);
      navigate("/login"); // redirect if not authenticated
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Welcome, {user.username}!
        </h1>
        <p className="text-lg text-gray-800 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg text-gray-800 mb-2">
          <strong>Points:</strong> {user.points ?? 0}
        </p>
        <p className="text-lg text-gray-800 mb-4">
          <strong>Badges:</strong> {user.badges?.join(", ") || "None yet"}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
