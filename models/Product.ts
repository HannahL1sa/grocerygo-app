// Import the shared MongoDB connection.
import clientPromise from "@/lib/mongodb";

// Return the products collection from the Grocery Go database.
export async function getProductCollection() {
  // Wait for the MongoDB connection to become available.
  const client = await clientPromise;

  // Select the Grocery Go database.
  const db = client.db("grocery-go");

  // Return the existing products collection, or a reference to it
  // if the collection has not yet been created.
  return db.collection("products");
}