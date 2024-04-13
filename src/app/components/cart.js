"use client"
import React, { useState } from 'react';

export default function Cart({ list }) {
  const [isOpen, setIsOpen] = useState(false);

  const openList = () => {
    setIsOpen(true);
  };

  const closeList = () => {
    setIsOpen(false);
  };

  const calculateTotal = () => {
    return list.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const DeliveryMethod = {
    PICKUP: 'PICKUP',
    DELIVERY: 'DELIVERY',
  };

  const [deliveryMethod, setDeliveryMethod] = useState(DeliveryMethod.PICKUP);

  const [deliveryLocation, setDeliveryLocation] = useState('');
   
  const handleCheckout = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const subtotal = calculateTotal();
      console.log('Subtotal:', subtotal);

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list, subtotal, deliveryMethod, deliveryLocation }),
      });

      if (response.ok) {
        alert('Order successfully placed!');
      } else {
        alert('Failed to place order. Please try again!');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  return (
    <div className="flex justify-center items-center">
      <button onClick={openList} className="w-96 bg-indigo-600 text-white px-4 py-2 mt-4 rounded font-medium hover:bg-indigo-500">
        View List
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Grocery List</h3>
              <button onClick={closeList} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div className="mt-4">
              <ul>
                {list.map((item, index) => (
                  <li key={index}>
                    <p className="mt-2 font-semibold">{item.quantity} {item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                  {/* Delivery Method */}
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-base font-bold text-gray-900 dark:text-white">Delivery Method</label>
                        <select id="deliveryMethod" name="deliveryMethod" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select a delivery method</option>
                            <option value="PICKUP">PICKUP</option>
                            <option value="DELIVERY">DELIVERY</option>
                        </select>
                    </div>
                  {/* If Delivery is selected, show Location input */}
                  {deliveryMethod === 'DELIVERY' && (
                    <div>
                      <label htmlFor="deliveryLocation" className="block text-base font-bold leading-6 text-gray-900">
                        Delivery Location
                      </label>
                      <div className="mt-2">
                        <input
                          id="deliveryLocation"
                          name="deliveryLocation"
                          type="text"
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          required
                          className="block w-full px-4 py-2 rounded-md border-gray-300 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <p className="font-bold">Subtotal</p>
                    <p className="font-bold">${calculateTotal().toFixed(2)}</p>
                  </div>
                  <button
                    type="submit"
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 text-white px-4 py-2 mt-4 rounded font-medium hover:bg-indigo-500"
                  >
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
