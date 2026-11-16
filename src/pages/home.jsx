import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Logo from "../assets/Logo.svg";

// Categories
const expenseType = {
  food: "Food & Drinks",
  transportation: "Transportation",
  shopping: "Shopping",
  entertainment: "Entertainment",
  education: "Education",
  housing: "Housing & Rent",
  bills: "Bills & Subscriptions",
  health: "Health & Personal Care",
  savings: "Savings",
  other: "Other",
};

const incomeType = {
  allowance: "Allowance",
  salary: "Salary",
  freelance: "Freelance",
  business: "Business",
  scholarship: "Scholarship",
  gift: "Gift",
  investment: "Investment",
  other: "Other",
};

export default function Home() {
  const [expense, setExpense] = useState(() => {
    try {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [income, setIncome] = useState(() => {
    try {
      const saved = localStorage.getItem("income");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Form states
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("food");
  const [transactionMode, setTransactionMode] = useState("expense");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("");

  // Save transactions
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  // CREATE
  function createExpense(amount, type) {
    setExpense((prev) => [
      ...prev,
      {
        id: nanoid(),
        amount: Number(amount),
        type: type,
      },
    ]);
  }

  function createIncome(amount, type) {
    setIncome((prev) => [
      ...prev,
      {
        id: nanoid(),
        amount: Number(amount),
        type: type,
      },
    ]);
  }

  // DELETE
  function deleteExpense(id) {
    setExpense((prev) => prev.filter((item) => item.id !== id));
  }

  function deleteIncome(id) {
    setIncome((prev) => prev.filter((item) => item.id !== id));
  }

  // EDIT
  function editExpense(id, newAmount, newType) {
    setExpense((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              amount: Number(newAmount),
              type: newType,
            }
          : item,
      ),
    );
  }

  function editIncome(id, newAmount, newType) {
    setIncome((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              amount: Number(newAmount),
              type: newType,
            }
          : item,
      ),
    );
  }

  // FORM SUBMISSION
  function handleSubmit(e) {
    e.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (transactionMode === "expense") {
      createExpense(value, type);
    } else {
      createIncome(value, type);
    }

    setAmount("");
  }

  function changeMode(mode) {
    setTransactionMode(mode);
    setType(mode === "expense" ? "food" : "allowance");
  }

  // EDIT CONTROLS
  function startEdit(item, mode) {
    setEditingId(item.id);
    setEditingMode(mode);
    setEditAmount(String(item.amount));
    setEditType(item.type);
  }

  function saveEdit() {
    const value = Number(editAmount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (editingMode === "expense") {
      editExpense(editingId, value, editType);
    } else {
      editIncome(editingId, value, editType);
    }

    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingMode(null);
    setEditAmount("");
    setEditType("");
  }

  // FINANCIAL SUMMARY
  const totalIncome = income.reduce((total, item) => total + item.amount, 0);

  const totalExpense = expense.reduce((total, item) => total + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      {/* HEADER */}
      <header
        id="header"
        className="w-full px-7 py-2.5 bg-amber-100 border-b border-black flex justify-start items-center gap-2"
      >
        <img
          src={Logo}
          alt="Logo"
          className="w-7 h-auto shrink-0 object-contain"
        />
        <p className="justify-center text-black text-2xl font-bold font-poppins">
          PennyWise
        </p>
      </header>
      {/* MAIN */}
      <div className="w-full p-10 flex justify-start items-start gap-8">
        {/* LEFT */}
        <div
          id="financial-summary-and-add-transaction"
          className="w-full flex flex-col justify-start items-start gap-8"
        >
          {/* FINANCIAL SUMMARY */}
          <div
            id="financial-summary"
            className="w-full rounded-2xl outline-1 outline-black flex flex-col justify-start items-start overflow-hidden"
          >
            {/* HEADER */}
            <div className="w-full px-8 py-2 bg-pink-500 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-center items-start gap-2">
              <h1 className="justify-center bg-linear-to-b from-amber-200 to-white bg-clip-text text-transparent text-2xl font-bold font-poppins">
                Financial Summary
              </h1>
            </div>

            {/* CONTENT CONTAINER */}
            <div className="w-full px-8 py-3 bg-amber-100 rounded-bl-2xl rounded-br-2xl flex justify-center items-center gap-8">
              {/* CURRENT BALANCE */}
              <div className="w-full flex flex-col justify-start items-start">
                <h2 className="justify-center text-black text-xl font-semibold font-poppins">
                  Current Balance
                </h2>
                <p className="justify-center text-black text-0.5xl font-medium font-poppins">
                  Rp{balance.toLocaleString("id-ID")}
                </p>
              </div>

              {/* TOTAL INCOME */}
              <div className="w-full flex flex-col justify-start items-start">
                <h2 className="justify-center text-black text-xl font-semibold font-poppins">
                  Total Income
                </h2>
                <p className="justify-center text-black text-0.5xl font-medium font-poppins">
                  +Rp{totalIncome.toLocaleString("id-ID")}
                </p>
              </div>

              {/* TOTAL EXPENSES */}
              <div className="w-full flex flex-col justify-start items-start">
                <h2 className="justify-center text-black text-xl font-semibold font-poppins">
                  Total Expenses
                </h2>
                <p className="justify-center text-black text-0.5xl font-medium font-poppins">
                  -Rp{totalExpense.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          {/* ADD TRANSACTION */}
          <div
            id="add-transaction"
            className="w-full max-w-xl rounded-2xl outline-1 outline-black flex flex-col justify-start items-start overflow-hidden bg-amber-100"
          >
            <form onSubmit={handleSubmit} className="w-full">
              {/* HEADER */}
              <div className="w-full px-8 py-3 bg-pink-500 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-center items-start gap-2">
                <h1 className="bg-linear-to-b from-amber-200 to-white bg-clip-text text-transparent text-2xl font-bold font-poppins">
                  Add Transaction
                </h1>
              </div>

              {/* CONTENT CONTAINER */}
              <div className="w-full px-8 py-3 flex flex-col justify-center items-center gap-6">
                {/* FORM */}
                <div className="w-full flex flex-col justify-start items-start gap-5">
                  {/* TRANSACTION TYPE */}
                  <div className="w-full flex justify-between items-center gap-4">
                    <label className="w-40 shrink-0 text-black text-xl font-semibold font-poppins">
                      Transaction Type
                    </label>
                    <div className="flex-1 px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                      <select
                        value={transactionMode}
                        onChange={(e) => changeMode(e.target.value)}
                        className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                  </div>

                  {/* AMOUNT */}
                  <div className="w-full flex justify-between items-center gap-4">
                    <label className="w-40 shrink-0 text-black text-xl font-semibold font-poppins">
                      Amount (Rp)
                    </label>
                    <div className="flex-1 px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                      <input
                        type="number"
                        min="1"
                        step="any"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                        required
                      />
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div className="w-full flex justify-between items-center gap-4">
                    <label className="w-40 shrink-0 text-black text-xl font-semibold font-poppins">
                      Category
                    </label>
                    <div className="flex-1 px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                      >
                        {Object.entries(
                          transactionMode === "expense"
                            ? expenseType
                            : incomeType,
                        ).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full h-11 px-3 py-1 bg-orange-300 rounded-sm outline-1 outline-black flex justify-center items-center text-black text-xl font-medium font-poppins hover:bg-orange-400 transition-colors cursor-pointer"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* TRANSACTION HISTORY */}
        <div
          id="transaction-history"
          className="w-full max-w-xl rounded-[20px] outline-1 outline-black flex flex-col justify-start items-start overflow-hidden"
        >
          {/* HEADER */}
          <div className="w-full px-8 py-2 bg-pink-500 rounded-tl-[20px] rounded-tr-[20px] flex flex-col justify-center items-start gap-2">
            <h1 className="bg-linear-to-b from-amber-200 to-white bg-clip-text text-transparent text-2xl font-bold font-poppins">
              Transaction History
            </h1>
          </div>

          {/* CONTENT CONTAINER */}
          <div className="w-full px-8 py-3 bg-amber-100 flex flex-col justify-center items-start gap-3">
            {/* EXPENSES */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <h2 className="w-full text-black text-xl font-semibold font-poppins">
                Expenses
              </h2>

              {expense.length === 0 ? (
                <p className="text-black text-sm font-medium font-poppins">
                  No expenses yet.
                </p>
              ) : (
                <div className="w-full grid grid-cols-2 gap-3">
                  {expense.map((item) => (
                    <div key={item.id} className="w-full flex flex-col">
                      {editingId === item.id && editingMode === "expense" ? (
                        <div className="w-full p-3 rounded-lg outline-1 outline-black flex flex-col justify-start items-center gap-2">
                          <div className="w-full px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                            <input
                              type="number"
                              min="1"
                              step="any"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                            />
                          </div>
                          <div className="w-full px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                            <select
                              value={editType}
                              onChange={(e) => setEditType(e.target.value)}
                              className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                            >
                              {Object.entries(expenseType).map(
                                ([key, label]) => (
                                  <option key={key} value={key}>
                                    {label}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                          <div className="w-full flex justify-center items-center gap-2.5">
                            <button
                              onClick={saveEdit}
                              className="w-full h-9 px-3 py-1 bg-orange-300 rounded-sm outline-1 outline-black flex justify-center items-center text-black text-sm font-medium font-poppins hover:bg-orange-400 transition-colors cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="w-full h-9 px-3 py-1 rounded-sm outline-1 outline-red-600 flex justify-center items-center text-red-600 text-sm font-medium font-poppins hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full p-3 rounded-lg outline-1 outline-black flex flex-col justify-between items-center gap-2 h-full">
                          <div className="w-full flex flex-col justify-start items-start gap-1">
                            <div className="w-full flex justify-between items-center">
                              <p className="text-black text-sm font-medium font-poppins">
                                Category:
                              </p>
                              <p className="text-black text-sm font-medium font-poppins">
                                {expenseType[item.type]}
                              </p>
                            </div>
                            <div className="w-full flex justify-between items-center">
                              <p className="text-black text-sm font-medium font-poppins">
                                Amount:
                              </p>
                              <p className="text-black text-sm font-medium font-poppins">
                                Rp{item.amount.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                          <div className="w-full flex justify-center items-center gap-2.5 mt-1">
                            <button
                              onClick={() => startEdit(item, "expense")}
                              className="w-full h-9 px-3 py-1 bg-orange-300 rounded-sm outline-1 outline-black flex justify-center items-center text-black text-sm font-medium font-poppins hover:bg-orange-400 transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteExpense(item.id)}
                              className="w-full h-9 px-3 py-1 rounded-sm outline-1 outline-red-600 flex justify-center items-center text-red-600 text-sm font-medium font-poppins hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INCOME */}
            <div className="w-full flex flex-col justify-start items-start gap-3 mt-2">
              <h2 className="w-full text-black text-xl font-semibold font-poppins">
                Income
              </h2>

              {income.length === 0 ? (
                <p className="text-black text-sm font-medium font-poppins">
                  No income yet.
                </p>
              ) : (
                <div className="w-full grid grid-cols-2 gap-3">
                  {income.map((item) => (
                    <div key={item.id} className="w-full flex flex-col">
                      {editingId === item.id && editingMode === "income" ? (
                        <div className="w-full p-3 rounded-lg outline-1 outline-black flex flex-col justify-start items-center gap-2">
                          <div className="w-full px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                            <input
                              type="number"
                              min="1"
                              step="any"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                            />
                          </div>
                          <div className="w-full px-3 py-1.5 rounded-sm outline-1 outline-black flex justify-start items-center bg-amber-50">
                            <select
                              value={editType}
                              onChange={(e) => setEditType(e.target.value)}
                              className="w-full bg-transparent outline-none text-black text-base font-medium font-poppins"
                            >
                              {Object.entries(incomeType).map(
                                ([key, label]) => (
                                  <option key={key} value={key}>
                                    {label}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                          <div className="w-full flex justify-center items-center gap-2.5">
                            <button
                              onClick={saveEdit}
                              className="w-full h-9 px-3 py-1 bg-orange-300 rounded-sm outline-1 outline-black flex justify-center items-center text-black text-sm font-medium font-poppins hover:bg-orange-400 transition-colors cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="w-full h-9 px-3 py-1 rounded-sm outline-1 outline-red-600 flex justify-center items-center text-red-600 text-sm font-medium font-poppins hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full p-3 rounded-lg outline-1 outline-black flex flex-col justify-between items-center gap-2 h-full">
                          <div className="w-full flex flex-col justify-start items-start gap-1">
                            <div className="w-full flex justify-between items-center">
                              <p className="text-black text-sm font-medium font-poppins">
                                Category:
                              </p>
                              <p className="text-black text-sm font-medium font-poppins">
                                {incomeType[item.type]}
                              </p>
                            </div>
                            <div className="w-full flex justify-between items-center">
                              <p className="text-black text-sm font-medium font-poppins">
                                Amount:
                              </p>
                              <p className="text-black text-sm font-medium font-poppins">
                                Rp{item.amount.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                          <div className="w-full flex justify-center items-center gap-2.5 mt-1">
                            <button
                              onClick={() => startEdit(item, "income")}
                              className="w-full h-9 px-3 py-1 bg-orange-300 rounded-sm outline-1 outline-black flex justify-center items-center text-black text-sm font-medium font-poppins hover:bg-orange-400 transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteIncome(item.id)}
                              className="w-full h-9 px-3 py-1 rounded-sm outline-1 outline-red-600 flex justify-center items-center text-red-600 text-sm font-medium font-poppins hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
