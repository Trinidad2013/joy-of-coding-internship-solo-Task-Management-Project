import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}
const TaskDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  // if (typeof params.id !== "number") notFound();
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) notFound();
  await delay(1000);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditTaskButton taskId={task.id} />
            <DeleteTaskButton taskId={task.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default TaskDetailPage;
