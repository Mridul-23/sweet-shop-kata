import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-4">
        <Link to="/" className="font-medium">Home</Link>
        <Link to="/auth" className="font-medium">Login</Link>
      </nav>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
