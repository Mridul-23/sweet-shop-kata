import { useEffect, useState } from "react";
import { fetchSweets, purchaseSweet } from "../utils/api";

function Home() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");

  async function loadSweets() {
    try {
      const data = await fetchSweets();
      setSweets(data);
    } catch {
      setError("Failed to load sweets");
    }
  }

  async function handlePurchase(id) {
    try {
      await purchaseSweet(id);
      loadSweets();
    } catch {
      alert("Purchase failed");
    }
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Available Sweets</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {sweets.map((sweet) => (
          <div
            key={sweet.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-medium">{sweet.name}</h2>
              <p className="text-sm text-gray-600">
                {sweet.category} · ₹{sweet.price}
              </p>
              <p className="text-sm">
                Quantity: {sweet.quantity}
              </p>
            </div>

            <button
              className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-400"
              disabled={sweet.quantity === 0}
              onClick={() => handlePurchase(sweet.id)}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home