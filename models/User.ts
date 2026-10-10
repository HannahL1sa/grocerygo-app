// Import the shared MongoDB connection. 
import clientPromise from "@/lib/mongodb";

// Return the users collection from the Grocery Go database. 
export async function getUserCollection() {
  // Wait for the MongoDB connection to become available. 
  const client = await clientPromise;

  // Select the Grocery Go database. 
  const db = client.db("grocery-go");

  /* Return the existing users collection, or a reference to it 
    if the collection has not yet been created. 
  */
  return db.collection("users");
}
