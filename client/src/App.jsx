import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-4">🌿 Welcome to Wild Nect</h1>
   
      {!submitted ? (
        <>
          <p className="text-lg mb-2">Enter your explorer name to begin:</p>
          <input
            type="text"
            className="border p-2 rounded shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            onClick={() => setSubmitted(true)}
          >
            Start Exploring
          </button>
        </>
      ) : (
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-4">🌎 Hello, {name}!</h2>
          <p className="text-md">
            Here are some wildlife species you might love:
          </p>
          <ul className="mt-2">
            <li>🦜 Scarlet Macaw</li>
            <li>🦊 Arctic Fox</li>
            <li>🐢 Green Sea Turtle</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
