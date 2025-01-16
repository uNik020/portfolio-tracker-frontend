import React, { useState, useEffect, useRef } from "react";
import { fetchStocks, addStock, deleteStock, updateStock } from "../utils/api";
import gsap from "gsap";

const StockManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ name: "", ticker: "", quantity: 1, buyPrice: "" });
  const [editStockId, setEditStockId] = useState(null);
  const [editedStock, setEditedStock] = useState({});
  
  const formRef = useRef(); // Reference for form
  const portfolioValueRef = useRef(); // Reference for portfolio value
  const gsapContext = useRef(); // GSAP context for cleanup

  const predefinedStocks = [
    { name: "Apple Inc.", ticker: "AAPL" },
    { name: "Microsoft Corporation", ticker: "MSFT" },
    { name: "Tesla Inc.", ticker: "TSLA" },
    { name: "Amazon.com Inc.", ticker: "AMZN" },
    { name: "Alphabet Inc.", ticker: "GOOGL" },
    { name: "NVIDIA Corporation", ticker: "NVDA" },
    { name: "Meta Platforms, Inc.", ticker: "META" },
    { name: "Berkshire Hathaway Inc.", ticker: "BRK.B" },
    { name: "Johnson & Johnson", ticker: "JNJ" },
    { name: "Procter & Gamble Co.", ticker: "PG" },
  ];
  

  useEffect(() => {
    // Fetch stock data
    const loadStocks = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        setError("Failed to fetch stocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadStocks();

    // GSAP Animation
    gsapContext.current = gsap.context(() => {
      // Animate form items
      gsap.from(formRef.current.querySelectorAll("select, input, button"), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Animate portfolio value
      gsap.from(portfolioValueRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    });

    // Cleanup GSAP context on component unmount
    return () => {
      gsapContext.current.revert();
    };
  }, []);

  const handleChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (newStock.name && newStock.ticker && newStock.buyPrice) {
      try {
        const addedStock = await addStock(newStock);
        setStocks([...stocks, addedStock]);
        setNewStock({ name: "", ticker: "", quantity: 1, buyPrice: "" });
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await deleteStock(id);
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleEditClick = (stock) => {
    setEditStockId(stock.id);
    setEditedStock(stock);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStock({ ...editedStock, [name]: value });
  };

  const handleUpdateStock = async () => {
    try {
      const updatedStock = await updateStock(editStockId, editedStock);
      setStocks(
        stocks.map((stock) =>
          stock.id === editStockId ? { ...stock, ...updatedStock } : stock
        )
      );
      setEditStockId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const totalPortfolioValue = stocks.reduce(
    (sum, stock) => sum + stock.quantity * (stock.currentPrice || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-100 rounded-xl bg-gradient-to-r from-sky-300 to-indigo-400 dark:from-gray-700 dark:to-gray-900 overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Stock Management <i className="ri-funds-box-fill"></i></h2>
      {loading && <p>Loading stocks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Add Stock Form */}
      <form
        className="bg-white dark:bg-gray-500 p-4 rounded-lg shadow mb-6"
        onSubmit={handleAddStock}
        ref={formRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
  {/* Stock Name Field */}
  <div>
    <label htmlFor="name" className="block mb-1 text-sm font-medium">
      Stock Name
    </label>
    <div className="relative">
      <select
        name="name"
        value={newStock.name}
        onChange={(e) => {
          const selectedStock = predefinedStocks.find(
            (stock) => stock.name === e.target.value
          );
          setNewStock({
            ...newStock,
            name: selectedStock?.name || e.target.value,
            ticker: selectedStock?.ticker || "",
          });
        }}
        className="p-2 border rounded w-full dark:bg-zinc-600"
      >
        <option value="" disabled>
          Select Stock Name
        </option>
        {predefinedStocks.map((stock) => (
          <option key={stock.ticker} value={stock.name}>
            {stock.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or Enter Your Stock Name"
        value={newStock.name}
        onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
        className="p-2 border mt-2 rounded w-full dark:bg-zinc-600"
      />
    </div>
  </div>

  {/* Ticker Field */}
  <div>
    <label htmlFor="ticker" className="block mb-1 text-sm font-medium">
      Ticker
    </label>
    <div className="relative">
      <select
        name="ticker"
        value={newStock.ticker}
        onChange={(e) => {
          const selectedStock = predefinedStocks.find(
            (stock) => stock.ticker === e.target.value
          );
          setNewStock({
            ...newStock,
            ticker: selectedStock?.ticker || e.target.value,
            name: selectedStock?.name || "",
          });
        }}
        className="p-2 border rounded w-full dark:bg-zinc-600"
      >
        <option value="" disabled>
          Select Ticker
        </option>
        {predefinedStocks.map((stock) => (
          <option key={stock.name} value={stock.ticker}>
            {stock.ticker}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or Enter Your Ticker"
        value={newStock.ticker}
        onChange={(e) => setNewStock({ ...newStock, ticker: e.target.value })}
        className="p-2 border mt-2 rounded w-full dark:bg-zinc-600"
      />
    </div>
  </div>

  {/* Quantity Field */}
  <div>
    <label htmlFor="quantity" className="block mb-1 text-sm font-medium">
      Quantity
    </label>
    <input
      type="number"
      name="quantity"
      placeholder="Quantity"
      value={newStock.quantity}
      onChange={handleChange}
      className="p-2 border rounded w-full dark:bg-zinc-600"
    />
  </div>

  {/* Buy Price Field */}
  <div>
    <label htmlFor="buyPrice" className="block mb-1 text-sm font-medium">
      Buy Price
    </label>
    <input
      type="number"
      name="buyPrice"
      placeholder="Buy Price"
      value={newStock.buyPrice}
      onChange={handleChange}
      className="p-2 border rounded w-full dark:bg-zinc-600"
    />
  </div>
</div>

        <button type="submit" className="bg-cyan-400 text-black dark:bg-yellow-400 px-4 py-2 rounded-md">
          Add Stock
        </button>
      </form>

     {/* Portfolio Value */}
<div className="flex flex-wrap justify-between items-start w-full max-w-full">
  {/* Total Portfolio Value */}
  <div
    className="bg-white p-4 rounded-lg shadow w-full md:w-1/4 mb-6 dark:bg-slate-300"
    ref={portfolioValueRef}
  >
    <h3 className="text-xl font-semibold">Total Portfolio Value</h3>
    <p className="text-2xl font-bold text-green-600">
      ${totalPortfolioValue.toFixed(2)}
    </p>
  </div>

  {/* Note */}
  <div
    className="bg-white p-4 rounded-lg shadow w-full md:w-3/5 mb-6 dark:bg-slate-300"
    ref={portfolioValueRef}
  >
    <h3 className="text-xl font-semibold">Note:</h3>
    <div className="text-black px-4">
      <ul className="list-disc">
        <li>This App is using Alpha Vantage Api for Real time data.</li>
        <li>The daily limit for data Fetching is 25 responses per day, Hence the refresh time for realtime data is 10 min.</li>
      </ul>
    </div>
  </div>
</div>

{/* Stocks Table */}
<div className="w-full overflow-x-auto">
  <table className="min-w-full bg-white rounded shadow">
    <thead>
      <tr className="bg-gray-200 dark:bg-slate-600 dark:text-white">
        <th className="p-2 text-left">Name</th>
        <th className="p-2 text-left">Ticker</th>
        <th className="p-2 text-left">Quantity</th>
        <th className="p-2 text-left">Buy Price</th>
        <th className="p-2 text-left">Current Price</th>
        <th className="p-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {stocks.map((stock) => (
        <tr key={stock.id} className="border-b">
          <td className="p-2">
            {editStockId === stock.id ? (
              <input
                type="text"
                name="name"
                value={editedStock.name || ""}
                onChange={handleEditChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              stock.name
            )}
          </td>
          <td className="p-2">
            {editStockId === stock.id ? (
              <input
                type="text"
                name="ticker"
                value={editedStock.ticker || ""}
                onChange={handleEditChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              stock.ticker
            )}
          </td>
          <td className="p-2">
            {editStockId === stock.id ? (
              <input
                type="number"
                name="quantity"
                value={editedStock.quantity || ""}
                onChange={handleEditChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              stock.quantity
            )}
          </td>
          <td className="p-2">
            {editStockId === stock.id ? (
              <input
                type="number"
                name="buyPrice"
                value={editedStock.buyPrice || ""}
                onChange={handleEditChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              `$${stock.buyPrice}`
            )}
          </td>
          <td className="p-2">${stock.currentPrice || "Fetching..."}</td>
          <td className="p-2">
            {editStockId === stock.id ? (
              <button
                className="bg-yellow-400 text-blue-900 hover:underline mr-2"
                onClick={handleUpdateStock}
              >
                Save
              </button>
            ) : (
              <button
                className="text-cyan-400 hover:underline mr-2"
                onClick={() => handleEditClick(stock)}
              >
                Edit
              </button>
            )}
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDeleteStock(stock.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default StockManagement;