"use client"

export default function contact() {
    return (
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h1 className="text-5xl font-semibold mb-4 text-center">Contact Us</h1>
            <p className="text-lg mb-8 text-center">
                  Feel free to get in touch with us using the contact form below. We are here to assist you with any questions or inquiries you may have.
            </p>
            <div className="md:w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
            Full Name
          </label>
          <input 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/*"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/ id="fullname" type="text" placeholder="Full Name" required/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input 
          /*class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 
          leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="you@company.com"*/
          class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" id="email" type="text" placeholder="you@company.com" required/>
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
                Message
            </label>
            <textarea
                /*class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="message"
                name="message"
                rows="4" // Adjust the number of rows as needed
                placeholder="Leave a message..."
            ></textarea>
        </div>
            <div class="flex items-center justify-between">
            <button class="bg-rose-500 hover:bg-rose-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Send message
            </button>
            </div>
        </form>    
            </div>
                 
        </div>
    )
}
