import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function PUT(request) {
    const session = await getServerSession(request);
    const body = await request.json();
    const { name, quantity, groceryListId } = body;
  
    // Find the user's ID based on their email
    const user = await prisma.user.findUnique({
      where: { email: session?.user.email },
    });

    // Find the item's price
    const item = await prisma.item.findFirst({
      where: {
        name: name,
      },
    });

    if (!item) {
      return NextResponse.error(`Item ${name} not found.`);
    }

    // Calculate the updated price
    const updatedPrice = item.price * parseInt(quantity, 10);

    // Update the item in the cart
    const updatedItem = await prisma.cart.create({
      data: {
        groceryList: { connect: { id: groceryListId } },
        name: name,
        quantity: quantity,
        price: updatedPrice,
      }
    });

    await prisma.groceryList.update({
      where: {
        id: groceryListId,
      },
      data: {
        total: {
          increment: updatedPrice,
        }
      },
    });

    return NextResponse.json(updatedItem);
}

