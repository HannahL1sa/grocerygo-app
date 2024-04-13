import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function DELETE(request) {
    const session = await getServerSession(request);
    const body = await request.json();
    const {groceryListId} = body;

    // Find the user's ID based on their email
    const user = await prisma.user.findUnique({
      where: { email: session?.user.email },
    });

    // Delete associated cart items first
    await prisma.cart.deleteMany({
      where: {
          groceryListId,
      },
  });

  // Now delete the grocery list
  const deleteGroceryList = await prisma.groceryList.delete({
      where: {
          id: groceryListId,
      },
  });

    return NextResponse.json(deleteGroceryList);
}