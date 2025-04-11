import React, { useState, useEffect } from "react";
import "./ExpenseTracker.css";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!name || !amount) return alert("Please enter both fields.");

    const newExpense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container">
      <h1>Expense Tracker 💸</h1>

      <form onSubmit={addExpense} className="form">
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses</h2>
      <ul className="expenses-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span>
              {expense.name}: ${expense.amount.toFixed(2)}
            </span>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
