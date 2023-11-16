'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [groceryLists, setGroceryLists] = useState([]);
  const [name, setUserName]= useState('');
  const userEmail = session?.user.email; // Extract user's email from the session


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/dashboard/${encodeURIComponent(userEmail)}`, {
            method: 'GET',
      });


      if (response.ok) {
            const body = await response.json();
            // Destructure the properties directly into constants
            const { firstName, groceryLists } = body;
            setUserName(firstName);
            setGroceryLists(groceryLists);
          } else {
            console.error('Request failed with status:', response.status);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-4xl font-bold mb-4">Hi, {name}</h1>
      <h3 className="text-3xl font-bold mb-2 text-center pt-10">MY GROCERY LISTS</h3>
      <div className="">
        <ul className=" grid grid-cols-2 gap-5">
          {groceryLists.map((groceryList, index) => (
            <li key={index + 1} className="bg-emerald-100 p-4 rounded-md">
              <div className='flex flex-row justify-between'>
              <p className="text-xl font-bold">Grocery List {index + 1}</p>
              <span class="inline-flex items-center rounded-md bg-rose-100 px-2 py-1 text-base font-bold text-rose-600 ring-1 ring-inset ring-rose-700/20">{groceryList.deliveryMethod}</span>
              </div>
              <p className="font-bold">Created At: {groceryList.createdAt.substring(0, 10)}</p>
              <ul className="grid list-disc ml-5">
                {groceryList.items.map((item) => (
                  <li key={item.id}>
                    <p className="font-base"> {item.quantity} {item.name}</p>
                  </li>
                ))}
              </ul>
              <p className="pt-20 font-bold">Amount Due: $0.00</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}
