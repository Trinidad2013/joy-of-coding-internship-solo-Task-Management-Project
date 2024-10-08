import { TaskStatusBadge } from "@/app/components";
import { Task } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Flex gap="3" my="3">
        <TaskStatusBadge status={task.status} />
        <p>The Created Date is :</p>
        <Text>{task.createAt.toDateString()}</Text>
        <p className="text-red-500 font-bold">The Due Date is :</p>
        <Text>
          {task.dueDay
            ? new Date(task.dueDay).toLocaleDateString("en-US", {
                weekday: "short", // e.g., "Wed"
                year: "numeric", // e.g., "2024"
                month: "short", // e.g., "Oct"
                day: "2-digit", // e.g., "02"
                timeZone: "UTC",
              })
            : "No due date"}
        </Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TaskDetails;
