// Import necessary libraries
import { getServerSession } from "next-auth/next";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request) {
  const session = await getServerSession(request);
  const body = await request.json();
  const { items, deliveryMethod, deliveryLocation } = body;

  // Validate input
  if (!items || items.length === 0) {
    return new NextResponse('Missing list', { status: 400 });
  }

  // Find the user's ID based on their name
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  // Create a new grocery list
  const groceryList = await prisma.groceryList.create({
    data: {
      user: {
        connect: { email: user.email },
      },
      deliveryMethod: deliveryMethod,
      deliveryLocation: deliveryLocation     
    },
  });

  // Iterate through items and create records
  const createdItems = [];

  for (const item of items) {
    const { name, quantity } = item;

    // Create a record for each item with a connection to the grocery list
    const createdItem = await prisma.item.create({
      data: {
        name,
        quantity,
        groceryList: {
          connect: { id: groceryList.id },
        },
      },
    });

    createdItems.push(createdItem);
  }

  return NextResponse.json(createdItems);
}
