import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

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
      <div
        id="header"
        className="w-full px-7 py-2.5 bg-amber-200 border-b border-black flex justify-start items-center"
      >
        <p className="justify-center text-black text-2xl font-bold font-poppins">
          PennyWise
        </p>
      </div>
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
            <div className="w-full px-8 py-2 bg-pink-500 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-center items-start gap-2">
              <h1 className="justify-center bg-linear-to-b from-amber-200 to-white bg-clip-text text-transparent text-3xl font-bold font-poppins">
                Financial Summary
              </h1>
            </div>

            <div className="w-full px-8 py-3 bg-amber-100 rounded-bl-2xl rounded-br-2xl flex justify-center items-center gap-8">
              <div className="w-full flex flex-col justify-start items-start">
                <h2 className="justify-center text-black text-xl font-semibold font-poppins">
                  Current Balance
                </h2>
                <p className="justify-center text-black text-0.5xl font-medium font-poppins">
                  Rp{balance.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="w-full flex flex-col justify-start items-start">
                <h2 className="justify-center text-black text-xl font-semibold font-poppins">
                  Total Income
                </h2>
                <p className="justify-center text-black text-0.5xl font-medium font-poppins">
                  +Rp{totalIncome.toLocaleString("id-ID")}
                </p>
              </div>

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
                <h1 className="bg-linear-to-b from-amber-200 to-white bg-clip-text text-transparent text-3xl font-bold font-poppins">
                  Add Transaction
                </h1>
              </div>

              {/* ADD TRANSACTION FORM BODY */}
              <div className="w-full px-8 py-3 flex flex-col justify-center items-center gap-6">
                <div className="w-full flex flex-col justify-start items-start gap-5">
                  {/* TRANSACTION TYPE */}
                  <div className="w-full flex justify-between items-center gap-4">
                    <label className="w-40 shrink-0 text-black text-xl font-semibold font-poppins">
                      Transaction Type
                    </label>
                    <div className="flex-1 px-3 py-1.5 bg-amber-100 rounded-sm outline-1 outline-black flex justify-start items-center">
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
                    <div className="flex-1 px-3 py-1.5 bg-amber-100 rounded-sm outline-1 outline-black flex justify-start items-center">
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
                    <div className="flex-1 px-3 py-1.5 bg-amber-100 rounded-sm outline-1 outline-black flex justify-start items-center">
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

        <div
          id="transaction-history"
          className="w-full flex flex-col justify-start items-center gap-8"
        >
          {/* TRANSACTION HISTORY */}
          <div className="transaction-history">
            <h1>Transaction History</h1>

            {/* EXPENSES */}
            <h3>Expenses</h3>

            {expense.length === 0 && <p>No expenses yet.</p>}

            {expense.map((item) => (
              <div key={item.id}>
                {editingId === item.id && editingMode === "expense" ? (
                  <div>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />

                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                    >
                      {Object.entries(expenseType).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>

                    <button onClick={saveEdit}>Save</button>

                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p>Category: {expenseType[item.type]}</p>

                    <p>
                      Amount: Rp
                      {item.amount.toLocaleString("id-ID")}
                    </p>

                    <button onClick={() => startEdit(item, "expense")}>
                      Edit
                    </button>

                    <button onClick={() => deleteExpense(item.id)}>
                      Delete
                    </button>
                  </div>
                )}

                <hr />
              </div>
            ))}

            {/* INCOME */}
            <h3>Income</h3>

            {income.length === 0 && <p>No income yet.</p>}

            {income.map((item) => (
              <div key={item.id}>
                {editingId === item.id && editingMode === "income" ? (
                  <div>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />

                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                    >
                      {Object.entries(incomeType).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>

                    <button onClick={saveEdit}>Save</button>

                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p>Category: {incomeType[item.type]}</p>

                    <p>
                      Amount: Rp
                      {item.amount.toLocaleString("id-ID")}
                    </p>

                    <button onClick={() => startEdit(item, "income")}>
                      Edit
                    </button>

                    <button onClick={() => deleteIncome(item.id)}>
                      Delete
                    </button>
                  </div>
                )}

                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
