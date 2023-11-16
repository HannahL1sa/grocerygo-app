import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request){
    const body = await request.json();
    const { firstName, lastName, email, password } = body.data;

     // Validate input
     if ( !firstName || !lastName || !email || !password ) {
        return new NextResponse("Missing name, email, or password", { status: 400 });
      }
      
      
      // By unique identifier
      const existingUser = await prisma.user.findUnique({
        where: {
          email : email
        }
      });
  
  
      if (existingUser) {
        return new NextResponse('User already exists!', { status: 400 });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          fname: firstName,
          lname: lastName,
          email,
          hashedPassword
        },
      })
  
      return NextResponse.json(user);
}