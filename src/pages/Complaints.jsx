// src/pages/Complaints.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth
import { api } from '../api/client'; // Your API client

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const { user: loggedInUser } = useAuth(); // 2. Get the logged-in user

  useEffect(() => {
    // Fetch all complaints when the component loads
    const fetchComplaints = async () => {
      try {
        const data = await api('/complaints');
        setComplaints(data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (complaintId) => {
    // 4. Create the delete handler function
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }

    try {
      await api(`/complaints/${complaintId}`, { method: 'DELETE' });
      // Remove the deleted complaint from the state to update the UI
      setComplaints(complaints.filter(c => c._id !== complaintId));
    } catch (err) {
      console.error("Failed to delete complaint:", err);
      alert("You can only delete your own complaints.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Complaints</h1>
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{complaint.title}</h2>
              <p className="text-gray-600">{complaint.description}</p>
              <p className="text-sm text-gray-500">Type: {complaint.type} | Priority: {complaint.priority}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* 3. Add the "View Details" and conditional "Delete" buttons */}
              <Link to={`/complaints/${complaint._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
              
              {loggedInUser && loggedInUser.id === complaint.user && (
                <button 
                  onClick={() => handleDelete(complaint._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete 🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}