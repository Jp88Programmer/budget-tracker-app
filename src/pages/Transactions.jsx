import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    title: "",
  });

  const [filters, setFilters] = useState({
    date: "",
    category: "",
    amount: "",
  });
  const [page, setPage] = useState(1);

  const fetchTransactions = async () => {
    const res = await API.get(
      `/transactions?page=${page}&date=${filters.date}&category=${filters.category}&amount=${filters.amount}`
    );
    setTransactions(res.data.transactions);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data.categories);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [page, filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      amount: form.amount,
      type: form.type,
      categoryId: form.category,
      title: form.title,
      date: new Date().toISOString().split("T")[0],
    };
    await API.post("/transactions", body);
    setForm({ amount: "", type: "income", category: "", description: "" });
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md mb-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Add Transaction
        </button>
      </form>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
        />
      </div>

      {/* Transactions List */}
      <div className="bg-white shadow rounded p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              <>
                {transactions?.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="py-2">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td>{tx.type}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.category}</td>
                    <td>{tx.title}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-1 border rounded"
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
