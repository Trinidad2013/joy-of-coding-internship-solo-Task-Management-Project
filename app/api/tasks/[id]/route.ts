import authOptions from "@/app/auth/authOptions";
import TaskSchema from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}:{params:{id: string}}) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, {status: 401});
    
    const body = await request.json()
    const validation = TaskSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const task = await prisma.task.findUnique({
        where: {id: parseInt(params.id)}
    })
    if (!task)
        return NextResponse.json({Error: "Invalid Task"}, {status: 404})

    const updatedTask = await prisma.task.update({
        where: {id: task.id },
        data: {
            title: body.title,
            description: body.description,
            dueDay: new Date(body.dueDay)  
        }
    })
    return NextResponse.json(updatedTask)
}

export async function DELETE(request: NextRequest, {params}:{params:{id: string}}) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, {status: 401});

await delay(1000)

    const task = await prisma.task.findUnique({
        where: {id: parseInt(params.id)}
    })
    if (!task)
        return NextResponse.json({error: "Invalid Task"}, {status: 404})

    await prisma.task.delete({
        where: {id: task.id },

    })
    return NextResponse.json({})
}