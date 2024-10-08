import React from "react";
import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import TaskFormSkeleton from "./loading";
const prisma = new PrismaClient();

const TaskForm = dynamic(() => import("@/app/Tasks/_components/TaskForm"), {
  ssr: false,
  loading: () => <TaskFormSkeleton />,
});

interface Props {
  params: { id: string };
}
const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound;
  return <TaskForm task={task ?? undefined} />;
};

export default EditTaskPage;
