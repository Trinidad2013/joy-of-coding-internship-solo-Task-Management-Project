"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import TaskSchema from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type TaskFormData = z.infer<typeof TaskSchema>;
const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Task data being sent:", data);
    try {
      setSubmitting(true);
      if (task) await axios.patch(`/api/tasks/${task.id}`, data);
      else await axios.post("/api/tasks", data);
      router.push("/Tasks/list");
      router.refresh();
    } catch (error: any) {
      setSubmitting(false);
      setError(error.response?.data?.error || "An Unexpected Error Occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={task?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <h4>Input the Due Date for this task</h4>
        {/* Due Day Input */}

        <TextField.Root
          type="date"
          defaultValue={
            task?.dueDay ? task.dueDay.toISOString().split("T")[0] : ""
          } // Format date if available
          placeholder="Due Day"
          {...register("dueDay")}
        />

        <ErrorMessage>{errors.dueDay?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {task ? "Update Task" : "Submit a new task"}

          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
