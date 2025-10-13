import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        const data = await api(`/complaints/${id}`);
        setComplaint(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading complaint details...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  if (!complaint) {
    return <div className="text-center p-8">Complaint not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link to="/complaints" className="text-blue-600 hover:underline">
          &larr; Back to All Complaints
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{complaint.title}</h1>
            <span className="capitalize text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {complaint.status || 'Received'}
            </span>
          </div>
          
          <p className="mt-4 text-lg text-gray-600">{complaint.description}</p>

          <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-800">Details</h3>
              <ul className="mt-2 space-y-1">
                <li><strong>Priority:</strong> {complaint.priority || 'Not set'}</li>
                <li><strong>Type:</strong> {complaint.type || 'Not set'}</li>
                <li><strong>Address:</strong> {complaint.address || 'Not provided'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Reported By</h3>
              <ul className="mt-2 space-y-1">
                <li><strong>Name:</strong> {complaint.user?.name || 'N/A'}</li>
                <li><strong>Email:</strong> {complaint.user?.email || 'N/A'}</li>
              </ul>
            </div>
          </div>
        </div>

        {complaint.photos && complaint.photos.length > 0 && (
          <div className="p-6 border-t">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {complaint.photos.map((photoUrl, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1">
                  <img 
                    src={photoUrl} 
                    alt={`Complaint photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-md shadow-sm" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* THIS CLOSING TAG WAS MISSING */}
    </div> 
  );
}