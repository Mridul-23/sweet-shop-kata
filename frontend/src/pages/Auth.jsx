import { useState } from "react";
import { login, register } from "../utils/api";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const data = await login(username, password);
        localStorage.setItem("token", data.access);
        alert("Login successful");
      } else {
        await register(username, password);
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch {
      setError("Something went wrong");
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">
        {isLogin ? "Login" : "Register"}
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isLogin ? "current-password" : "new-password"}
        />

        <button className="w-full bg-black text-white p-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        className="mt-4 text-sm text-blue-600"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New user? Register here"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Auth