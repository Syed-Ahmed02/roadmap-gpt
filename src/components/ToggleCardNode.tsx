"use client";
import React, { useRef } from "react";
import { useNodeId } from "@xyflow/react";
import { BaseNode } from "./base-node";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Link } from "lucide-react";
function CardComponent() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="mb-0 space-y-0">
        <CardTitle>The Basics</CardTitle>
        <CardDescription>
          Introduction to Data Science and Statistics Fundamentals, 4-5 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle>Course</CardTitle>
        <CardDescription className="flex flex-row items-center">
          Introduction to Data Science In Python{" "}
          <Link className="ml-1 h-3 w-3" href="" />
        </CardDescription>
      </CardContent>
      <CardContent>
        <CardTitle>Course</CardTitle>
        <CardDescription className="flex flex-row items-center">
          Introduction to Data Science In Python{" "}
          <Link className="ml-1 h-3 w-3" href="" />
        </CardDescription>
      </CardContent>
      <CardContent>
        <CardTitle>Course</CardTitle>
        <CardDescription className="flex flex-row items-center">
          Introduction to Data Science In Python{" "}
          <Link className="ml-1 h-3 w-3" href="" />
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>Additional Tips go here</CardDescription>
      </CardFooter>
    </Card>
  );
}
const ToggleCardNode = () => {
  const nodeId = useNodeId();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <BaseNode className="rounded-xl w-[350px] text-center" ref={ref}>
          Week {nodeId}: Introduction to Data Science and Statistics, 4-5 hours
        </BaseNode>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        sideOffset={10}
        className=" z-50 p-0"
      >
        <CardComponent />
      </PopoverContent>
    </Popover>
  );
};

export default ToggleCardNode;
