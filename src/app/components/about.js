"use client"

export default function about() {
  return (
    <div className="container mx-auto p-6">
            <h1 className="text-5xl font-semibold mb-4">About GroceryGo</h1>
            <p className="text-lg">Welcome to GroceryGo, your go-to solution for a hassle-free grocery shopping experience. Our app is designed to streamline the process of creating and managing your grocery lists, making it easier than ever to get the items you need.</p>
            <h3 className="pt-10 text-4xl font-semibold">Features:</h3>
            <ul className="pt-4 text-lg list-disc">
                <li><strong>User-Friendly Grocery Lists:</strong> Create personalized grocery lists effortlessly with our intuitive and user-friendly interface. Add items, specify quantities, and include any special notes for each product.</li>
                <li><strong>Delivery or Pickup Options:</strong> Choose between convenient delivery or pickup options to fit your schedule and preferences. Enjoy the flexibility of getting your groceries delivered to your doorstep or picking them up at a nearby location.</li>
                <li><strong>Secure User Authentication:</strong> Our app prioritizes the security and privacy of your information. With a robust user authentication system, you can rest assured that your grocery lists are associated with your account.</li>
                <li><strong>Transparent Order Status:</strong> Stay informed about the status of your grocery orders. Track whether they are pending, approved, or on their way to delivery or pickup. Receive timely notifications to keep you in the loop.</li>
            </ul>
    
            <h3 className="pt-10 text-4xl font-semibold">How It Works:</h3>
            <ol className="pt-4 text-lg list-decimal">
                <li><strong>Sign Up or Log In:</strong> Get started by creating an account. If you are a returning customer, simply log in to access your personalized dashboard.</li>
                <li><strong>Create Your Grocery List:</strong> Use our easy-to-navigate form to create your grocery list. Specify the items you need, the desired quantities, and any specific instructions.</li>
                <li><strong>Choose Delivery or Pickup:</strong> Decide whether you want your groceries delivered to your doorstep or if you prefer to pick them up at a nearby location.</li>
                <li><strong>Submit and Await Confirmation:</strong> Once you have submitted your grocery list, our admin team will review it, send you a bill, and confirm the delivery or pickup details.</li>
                <li><strong>Track Your Order:</strong> Monitor the status of your order on your dashboard. Receive notifications for order updates, making the entire process transparent and stress-free.</li>
            </ol>
    
            <p className="pt-5 text-lg">At GroceryGo, we are committed to providing you with a seamless and efficient grocery shopping experience. Say goodbye to the traditional pen-and-paper lists and embrace the convenience of our digital platform.</p>
    
            <p className="pt-5 text-lg">Happy shopping!</p>
    
            <p className="pt-5 text-lg">GroceryGo Team</p>
        </div>
  )
}
