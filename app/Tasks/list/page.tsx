import React from "react";
import { Flex, Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import prisma from "@/prisma/client";
import TaskStatusBadge from "../../components/TaskStatusBadge";
import delay from "delay";
import TaskActions from "./TaskActions";
import DueDateFilter from "./DueDateFilter";

const TasksPage = async ({
  searchParams,
}: {
  searchParams: { filterDate?: string };
}) => {
  //  Extract filter date from searchParams
  const { filterDate } = searchParams || {};
  const tasks = await prisma.task.findMany({
    where: {
      ...(filterDate
        ? {
            dueDay: {
              lt: new Date(filterDate),
            },
          }
        : {}),
    },
  });

  await delay(1000);
  return (
    <div className="bg-white text-black">
      <Flex mb="5" justify="between">
        <DueDateFilter />
        <TaskActions />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link href={`/Tasks/${task.id}`}>{task.title}</Link>

                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createAt.toDateString()}
              </Table.Cell>
              <Table.Cell>
                {/* {task.dueDay
                  ? new Date(
                      new Date(task.dueDay).toISOString().slice(0, 10) +
                        "T00:00:00Z"
                    ).toDateString()
                  : "No due date"} */}

                {task.dueDay
                  ? new Date(task.dueDay).toLocaleDateString("en-US", {
                      weekday: "short", // e.g., "Wed"
                      year: "numeric", // e.g., "2024"
                      month: "short", // e.g., "Oct"
                      day: "2-digit", // e.g., "02"
                      timeZone: "UTC",
                    })
                  : "No due date"}

                {/* {task.dueDay ? task.dueDay.toDateString() : "No due date"} */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TasksPage;
