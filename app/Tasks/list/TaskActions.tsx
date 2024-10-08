import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TaskActions = () => {
  return (
    <Flex mb="5" justify="between">
      <Button>
        <Link href="/Tasks/new">New Task</Link>
      </Button>
    </Flex>
  );
};

export default TaskActions;
