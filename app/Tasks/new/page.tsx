import React from "react";
import dynamic from "next/dynamic";
import TaskFormSkeleton from "./loading";

const TaskForm = dynamic(() => import("@/app/Tasks/_components/TaskForm"), {
  ssr: false,
  loading: () => <TaskFormSkeleton />,
});

const NewTaskPage = () => {
  return <TaskForm />;
};

export default NewTaskPage;
