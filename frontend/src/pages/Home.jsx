import { useEffect, useState } from "react";
import { fetchSweets, purchaseSweet, searchSweets } from "../utils/api";

function Home() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");


  async function handleSearch(e) {
    e.preventDefault();
    try {
      const data = await searchSweets({
        name: searchName,
        category: searchCategory,
      });
      setSweets(data);
    } catch {
      setError("Search failed");
    }
  }


  async function loadSweets() {
    try {
      const data = await fetchSweets();
      setSweets(data);
    } catch {
      setError("Failed to load sweets, Try logging in");
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
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-4 flex-wrap"
      >
        <input
          className="border p-2 rounded"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Search
        </button>

        <button
          type="button"
          className="px-4 py-2 border rounded"
          onClick={loadSweets}
        >
          Reset
        </button>
      </form>

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