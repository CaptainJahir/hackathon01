"use client";
import React, { useEffect, useState } from 'react';

const page = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await fetch('http://localhost:4200/api/lost-items');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setLostItems(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFoundItems = async () => {
        try {
          const response = await fetch('http://localhost:4200/api/found-items');
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setFoundItems(data.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFoundItems();
    fetchLostItems();
  }, []);

  if (loading) return <div className="text-center p-4">Loading lost items...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className='text-black'>
        <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Lost Items ({lostItems.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lostItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
                {console.log(item.image)}
                <img
                src={`http://localhost:4200/uploads/${item.image}`} 
                alt={item.description}
                className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <div className="space-y-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="text-sm text-gray-500">
                    <p>Lost on: {new Date(item.lostDate).toLocaleDateString()}</p>
                    <p>Status: <span className="capitalize">{item.status}</span></p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Found Items ({foundItems.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foundItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
            {console.log(item.image)}
            <img
              src={`http://localhost:4200/uploads/${item.image}`} 
              alt={item.description}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="text-sm text-gray-500">
                <p>Lost on: {new Date(item.foundDate).toLocaleDateString()}</p>
                <p>Status: <span className="capitalize">{item.status}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
    </div>
  );
};

export default page;