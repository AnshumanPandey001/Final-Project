import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaCreditCard, FaMoneyBill, FaTrash, FaSignOutAlt, FaEye } from "react-icons/fa";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const storedAdminName = localStorage.getItem("adminName");
        if (storedAdminName) {
          setAdminName(storedAdminName);
          return;
        }

        const response = await axios.post("http://localhost:5271/api/Admin/login", {
          email: "admin@example.com",
          password: "admin123"
        });

        if (response.data && response.data.adminName) {
          setAdminName(response.data.adminName);
          localStorage.setItem("adminName", response.data.adminName);
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    navigate("/AdminLogin");
  };

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
      <div className="w-1/5 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <p className="text-gray-300 mb-4">Welcome, <span className="font-semibold">{adminName}</span></p>
        <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setActiveTab("users")}>
          <FaUsers /> <span>Manage Users</span>
        </button>
        <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setActiveTab("payments")}>
          <FaMoneyBill /> <span>Manage Payments</span>
        </button>
        <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setActiveTab("cards")}>
          <FaCreditCard /> <span>Manage Cards</span>
        </button>
        <button className="flex items-center space-x-2 p-2 w-full text-left bg-red-600 hover:bg-red-700 rounded mt-10" onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
      <div className="w-4/5 p-5">{renderContent()}</div>
    </div>
  );
};

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", isActive: true },
    { id: 2, name: "Bob Smith", email: "bob@example.com", isActive: false },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", isActive: true },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Manage Users</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className={`p-2 font-bold ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="p-2 flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => alert(`Viewing details of ${user.name}`)}>
                  <FaEye />
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => deleteUser(user.id)}>
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
  return <div><h2 className="text-xl font-bold mb-3">Manage Payments</h2><p>Showing dummy payment records for audit purposes.</p></div>;
};

const ManageCards = () => {
  return <div><h2 className="text-xl font-bold mb-3">Manage Cards</h2><p>Displaying sample card info, secured and anonymized.</p></div>;
};

export default AdminPanel;
