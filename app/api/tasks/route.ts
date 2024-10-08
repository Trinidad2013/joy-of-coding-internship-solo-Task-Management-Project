import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'
import TaskSchema from "@/app/validationSchemas"
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {


try {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, {status: 401});

const body = await request.json()
const validation = TaskSchema.safeParse(body)
if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})
const newTask = await prisma.task.create({
    data: {
        title:body.title,
        description:body.description,
        
        dueDay: new Date(body.dueDay), 
    },
});

return NextResponse.json(newTask, {status: 201})
} catch(error) {
    console.error("Error creating task:", error);  // Log detailed error
    return NextResponse.json({ error: "An error occurred while creating the task." }, { status: 500 });
}
} 