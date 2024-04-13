import { getServerSession } from "next-auth/next";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request) {
    const session = await getServerSession(request);
    const body = await request.json();
    const { list, subtotal, deliveryMethod, deliveryLocation } = body;
  
    // Find the user's ID based on their email
    const user = await prisma.user.findUnique({
      where: { email: session?.user.email },
    });
  
    // Create a new grocery list
    const groceryList = await prisma.groceryList.create({
      data: {
        user: {
          connect: { email: user.email },
        },
        total: subtotal, 
        deliveryMethod: deliveryMethod,
        deliveryLocation: deliveryLocation  
      },
    });

    // Create an array to store cart items
    const createdItems = [];

    // Iterate through list and create cart items
    for (const item of list) {
      const { name, quantity, price } = item;

      // Create a record for each item in the cart with a connection to the grocery list
      const createdItem = await prisma.cart.create({
        data: {
          name,
          quantity,
          price,
          groceryList: {
            connect: { id: groceryList.id },
          },
        },
      });

      createdItems.push(createdItem);
    }

    // Update the grocery list to associate the created items
    await prisma.groceryList.update({
      where: { id: groceryList.id },
      data: {
          items: {
              connect: createdItems.map(item => ({ id: item.id }))
          },
      },
    });

    return NextResponse.json(groceryList);
  }
  
