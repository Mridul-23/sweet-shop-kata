import { useEffect, useState } from "react";
import {
  fetchSweets,
  addSweet,
  restockSweet,
  deleteSweet,
} from "../utils/api";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [restockQty, setRestockQty] = useState({});

  async function loadSweets() {
    const data = await fetchSweets();
    setSweets(data);
  }

  useEffect(() => {
    loadSweets();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addSweet({
      ...newSweet,
      price: Number(newSweet.price),
      quantity: Number(newSweet.quantity),
    });
    setNewSweet({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  }

  async function handleRestock(id) {
    await restockSweet(id, Number(restockQty[id] || 0));
    setRestockQty({ ...restockQty, [id]: "" });
    loadSweets();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this sweet?")) return;
    await deleteSweet(id);
    loadSweets();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>

      {/* Add Sweet */}
      <form onSubmit={handleAdd} className="grid grid-cols-2 gap-2 mb-6">
        <input
          placeholder="Name"
          className="border p-2 rounded"
          value={newSweet.name}
          onChange={(e) =>
            setNewSweet({ ...newSweet, name: e.target.value })
          }
        />
        <input
          placeholder="Category"
          className="border p-2 rounded"
          value={newSweet.category}
          onChange={(e) =>
            setNewSweet({ ...newSweet, category: e.target.value })
          }
        />
        <input
          placeholder="Price"
          className="border p-2 rounded"
          value={newSweet.price}
          onChange={(e) =>
            setNewSweet({ ...newSweet, price: e.target.value })
          }
        />
        <input
          placeholder="Quantity"
          className="border p-2 rounded"
          value={newSweet.quantity}
          onChange={(e) =>
            setNewSweet({ ...newSweet, quantity: e.target.value })
          }
        />
        <button className="col-span-2 bg-black text-white p-2 rounded">
          Add Sweet
        </button>
      </form>

      {/* Manage Sweets */}
      <div className="space-y-3">
        {sweets.map((s) => (
          <div
            key={s.id}
            className="bg-white p-3 rounded shadow flex justify-between"
          >
            <div>
              <strong>{s.name}</strong> ({s.quantity})
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                className="border p-1 w-20"
                placeholder="Qty"
                value={restockQty[s.id] || ""}
                onChange={(e) =>
                  setRestockQty({ ...restockQty, [s.id]: e.target.value })
                }
              />
              <button onClick={() => handleRestock(s.id)}>Restock</button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
