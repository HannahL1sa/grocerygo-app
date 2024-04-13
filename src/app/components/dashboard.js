'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [groceryLists, setGroceryLists] = useState([]);
  const [name, setUserName]= useState('');
  const userEmail = session?.user.email; // Extract user's email from the session
  const [showModal, setShowModal] = useState(false); // Controls the first modal
  const [showAdditionalModal, setShowAdditionalModal] = useState(false); // Controls the additional modal
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [groceryListId, setGroceryListId] = useState(null);

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

  // Function to handle deletion of a grocery list item
const handleDelete = (id) => {
  // Update the state to show the delete confirmation modal
  setShowAdditionalModal(true);
  // Set the grocery list id for which the deletion is requested
  setGroceryListId(id);
};

// Function to handle confirmation of deletion
const handleConfirm = async () => {
  try {
    const response = await fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groceryListId: groceryListId,
      }),
    });

    if (response.ok) {
      alert('Grocery list successfully deleted!');
      router.refresh();
    } else {
      alert('Failed to delete. Please try again!');
    }
    // Once deletion is confirmed, you can close the modal
    setShowAdditionalModal(false);
    // You might want to reset the groceryListId state to null after deletion is confirmed
    setGroceryListId(null);

  } catch (error) {
    console.error('Error deleting:', error);
  }
};


  
  const handleUpdate = (groceryListId) => {
    setShowModal(true); // Open the modal for updating
    setGroceryListId(groceryListId); // Set the grocery list id
  };

  const handleNewItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemName,
          quantity: itemQuantity,
          groceryListId: groceryListId,
          }),
      });

      if (response.ok) {
        alert('Grocery list successfully updated!');
        router.refresh();
      } else {
        alert('Failed to update. Please try again!');
      }

      // Close the modal after submitting
      setShowModal(false);
      setItemName("");
      setItemQuantity(0);
      setGroceryListId("");

    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-4xl font-bold mb-4">Hi, {name}</h1>
      <h3 className="text-3xl font-bold mb-2 text-center pt-10">MY GROCERY LISTS</h3>
      <div className="">
        <ul className="grid grid-cols-2 gap-5">
          {groceryLists.map((groceryList, index) => (
            <li key={index + 1} className="bg-emerald-100 p-4 rounded-md">
              <div className='flex flex-row justify-between'>
                <p className="text-xl font-bold">Grocery List {index + 1}</p>
                <span class="inline-flex items-center rounded-md bg-rose-100 px-2 py-1 text-base font-bold text-rose-600 ring-1 ring-inset ring-rose-700/20">{groceryList.deliveryMethod}</span>
              </div>
              <p className="font-bold">Created At: {groceryList.createdAt.substring(0, 10)}</p>
              <p className="font-bold">Last Updated At: {groceryList.updatedAt.substring(0, 10)}</p>
              <ul className="grid list-disc ml-5">
                {groceryList.items.map((item) => (
                  <li key={item.id}>
                    <p className="font-base"> {item.quantity} {item.name}</p>
                  </li>
                ))}
              </ul>
              <p className="pt-20 font-bold">Amount Due: ${groceryList.total.toFixed(2)}</p>
              <div className="flex mt-4 md:mt-6 space-x-4">
                <button onClick={() => handleUpdate(groceryList.id)} className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-blue-600 hover:bg-blue-600 focus:z-10 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 dark:bg-blue-700 dark:text-white dark:border-blue-800 dark:hover:bg-blue-800">Update</button>
                <button onClick={() => handleDelete(groceryList.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* First Modal */}
      {showModal && (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">Update Grocery List</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleNewItemSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Item Name</label>
                    <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:outline-none" placeholder="Type the name of the item you want" required />
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 mt-4">Item Quantity</label>
                    <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:outline-none" placeholder="Type the quantity you want" required />
                  </div>
                </div>
                <button type="submit" className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            </div>
          </div>
        </div>
      )}
      {/* Second Modal */}
      {showAdditionalModal && (
        <div id="popup-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto bg-gray-800 bg-opacity-50">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={() => setShowAdditionalModal(false)}  type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
              <button onClick={handleConfirm} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I am sure
              </button>
              <button onClick={() => setShowAdditionalModal(false)}  data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
          </div>
        </div>
      </div>      
      )}
    </div>
  );
}  