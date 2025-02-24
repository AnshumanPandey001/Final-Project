import React, { useState } from "react";
import { FaUsers, FaCreditCard, FaMoneyBill, FaTrash, FaHome } from "react-icons/fa";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <ManageUsers />;
      case "payments":
        return <ManagePayments />;
      case "cards":
        return <ManageCards />;
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setActiveTab("users")}>
          <FaUsers /> <span>Manage Users</span>
        </button>
        <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setActiveTab("payments")}>
          <FaMoneyBill /> <span>Manage Payments</span>
        </button>
        <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setActiveTab("cards")}>
          <FaCreditCard /> <span>Manage Cards</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-5">{renderContent()}</div>
    </div>
  );
};

const ManageUsers = () => {
  const users = [
    { id: 1, name: "Anshuman", email: "anshu@example.com" },
    { id: 2, name: "Rahul", email: "rahul@example.com" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Manage Users</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManagePayments = () => {
  const payments = [
    { id: 1, user: "Anshuman", amount: "$100", status: "Completed" },
    { id: 2, user: "Rahul", amount: "$50", status: "Pending" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Manage Payments</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="p-2">{payment.user}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageCards = () => {
  const cards = [
    { id: 1, user: "Anshuman", cardNumber: "**** **** **** 1234" },
    { id: 2, user: "Rahul", cardNumber: "**** **** **** 5678" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Manage Cards</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">User</th>
            <th className="p-2">Card Number</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id} className="border-b">
              <td className="p-2">{card.user}</td>
              <td className="p-2">{card.cardNumber}</td>
              <td className="p-2">
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
