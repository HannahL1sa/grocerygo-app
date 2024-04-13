/*
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request, { params }){
    const category = params.category

    // Fetching all items with specific category and selecting only 'name' and 'price' fields
    const itemsInCategory = await prisma.item.findMany({
        where: {
            category: category,
        },
        select: {
            name: true,
            price: true,
        },
    });
  
      if (!itemsInCategory) {
          // Handle the case where the user is not found
          return NextResponse.json({ error: 'Incorrect category' }, { status: 404 });
      }

      // Extracting 'name' and 'price' fields for each item into a new array
    const itemsData = itemsInCategory.map((item) => ({
        name: item.name,
        price: item.price,
      }));
    
      return NextResponse.json(itemsData);
  }
  */
  import { PrismaClient } from '@prisma/client';
  import { NextResponse } from 'next/server';
  
  const prisma = new PrismaClient();
  
  export async function GET(request, { params }) {
    try {
      const category = params.category;
  
      // Fetching all items with specific category and selecting only 'name' and 'price' fields
      const itemsInCategory = await prisma.item.findMany({
        where: {
          category: category,
        },
        select: {
          name: true,
          price: true,
          imageUrl: true,
        },
      });
  
      if (!itemsInCategory || itemsInCategory.length === 0) {
        // Handle the case where no items are found for the category
        return NextResponse.json({ error: 'No items found for the category' }, { status: 404 });
      }
  
      // Extracting 'name' and 'price' fields for each item into a new array
      const itemsData = itemsInCategory.map((item) => ({
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
      }));
  
      return NextResponse.json(itemsData);
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  