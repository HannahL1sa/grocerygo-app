import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request, { params }){
  const userEmail = params.userEmail

    const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

    if (!user) {
        // Handle the case where the user is not found
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    const groceryLists = await prisma.groceryList.findMany({
        where: {
          userId: userId,
        },
        include: {
          items: true,
        },
      });

    const response = {
      firstName: user.fname,
      groceryLists: groceryLists,
    };
  
    return NextResponse.json(response);
}