"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Cart from './cart';

export default function Category() {
  const searchParams = useSearchParams();
  const category = searchParams.get("search");
  const [items, setItems] = useState([]);
  const [list, setList] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/order/${encodeURIComponent(category)}`, {
          method: 'GET',
        });

        if (response.ok) {
          const body = await response.json();
          setItems(body);

          // Initialize itemQuantities state with default values
          const initialQuantities = {};
          body.forEach((item, index) => {
            initialQuantities[index] = 1;
          });
          setItemQuantities(initialQuantities);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during GET request:', error);
      }
    };

    fetchData();
  }, [category]);


  const handleAddToList = async (item, index) => {
    const newItem = {
      name: item.name,
      price: item.price,
      quantity: itemQuantities[index].toString(),
    };

     // Update the list state with the new item
     setList([...list, newItem]);
     console.log("Item added!");
     console.log(list);
  };
  
  const handleQuantityChange = (index, operation) => {
    setItemQuantities(prevQuantities => {
      const updatedQuantities = { ...prevQuantities };

      if (operation === 'increase') {
        updatedQuantities[index] = updatedQuantities[index] + 1;
      } else if (operation === 'decrease' && updatedQuantities[index] > 1) {
        updatedQuantities[index] = updatedQuantities[index] - 1;
      }

      return updatedQuantities;
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold mb-2 text-center pb-8">Products in {category}</h1>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item, index) => (
            <li key={index} className="bg-emerald-100 rounded-md p-5">
              <img src={item.imageUrl} alt="Product Image" className="h-50 w-50 object-cover object-center" />
              <p className="mt-4 text-lg font-bold text-gray-700">{item.name}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
              <div className="quantity">
                <button
                  className="bg-rose-500 font-bold text-white border-none cursor-pointer w-12 h-auto text-center transition duration-200 hover:bg-blue-700"
                  aria-label="Decrease"
                  onClick={() => handleQuantityChange(index, 'decrease')}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 h-auto text-center border-none text-base outline-none"
                  min="1"
                  max="10"
                  value={itemQuantities[index]}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
                <button
                  className="bg-rose-500 font-bold border-none cursor-pointer text-white w-12 h-auto text-center transition duration-200 hover:bg-blue-700"
                  aria-label="Increase"
                  onClick={() => handleQuantityChange(index, 'increase')}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToList(item, index)}
                className="mt-2 bg-rose-500 text-white px-4 py-2 rounded-md"
              >
                Add Item
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Cart list={list}/>
    </div>
  );
}

/*
import React, { useEffect, useState } from 'react';
import { useSearchParams} from 'next/navigation';

export default function Category() {
  const searchParams = useSearchParams();
  const category = searchParams.get("search");
  const [items, setItems] = useState([]);
  const [list, setList] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/order/${encodeURIComponent(category)}`, {
          method: 'GET',
        });

        if (response.ok) {
          const body = await response.json();
          setItems(body);

          // Initialize itemQuantities state with default values
          const initialQuantities = {};
          body.forEach((item, index) => {
            initialQuantities[index] = 1;
          });
          setItemQuantities(initialQuantities);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during GET request:', error);
      }
    };

    fetchData();
  }, [category]);

  const handleAddToList = async (item, index) => {
    try {
      const newItem = {
        name: item.name,
        quantity: itemQuantities[index],
      };

      // Update the list state with the new item
      setList([...list, newItem]);

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({list}),
      });

      if (response.ok) {
        alert('Item successfully added to grocery list!');
      } else {
        alert('Failed to add item to grocery list. Please try again!');
      }
    } catch (error) {
      console.error('Error adding item to list:', error);
    }
  };
  
  const handleQuantityChange = (index, operation) => {
    const updatedQuantities = { ...itemQuantities };

    if (operation === 'increase') {
      updatedQuantities[index] = updatedQuantities[index] + 1;
    } else if (operation === 'decrease' && updatedQuantities[index] > 1) {
      updatedQuantities[index] = updatedQuantities[index] - 1;
    }

    setItemQuantities(updatedQuantities);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold mb-2 text-center pb-8">Products in {category}</h1>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item, index) => (
            <li key={index} className="bg-emerald-100 rounded-md p-5">
              <img src={item.imageUrl} alt="Product Image" className="h-50 w-50 object-cover object-center" />
              <p className="mt-4 text-lg font-bold text-gray-700">{item.name}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
              <div className="quantity">
                <button
                  className="bg-rose-500 font-bold text-white border-none cursor-pointer w-12 h-auto text-center transition duration-200 hover:bg-blue-700"
                  aria-label="Decrease"
                  onClick={() => handleQuantityChange(index, 'decrease')}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 h-auto text-center border-none text-base outline-none"
                  min="1"
                  max="10"
                  value={itemQuantities[index]}
                  onChange={(e) => setItemQuantities(index, parseInt(e.target.value))}
                />
                <button
                  className="bg-rose-500 font-bold border-none cursor-pointer text-white w-12 h-auto text-center transition duration-200 hover:bg-blue-700"
                  aria-label="Increase"
                  onClick={() => handleQuantityChange(index, 'increase')}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToList(item, index)}
                className="mt-2 bg-rose-500 text-white px-4 py-2 rounded-md"
              >
                Add to List
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
*/
