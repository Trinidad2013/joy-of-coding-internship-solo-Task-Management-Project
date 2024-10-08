import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/Tasks/edit/${taskId}`}>Edit Task</Link>
    </Button>
  );
};

export default EditTaskButton;
