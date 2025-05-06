"use client";
import React, { useState, useRef, useEffect } from "react";
import { useReactFlow, useNodeId } from "@xyflow/react";
import { BaseNode } from "./base-node";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
function CardComponent() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
const ToggleCardNode = () => {
  const [showCard, setShowCard] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const { getViewport } = useReactFlow();
  const nodeId = useNodeId();
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const { x, y } = rect;
    const { zoom } = getViewport();

    setCardPos({
      x: x + window.scrollX,
      y: y + window.scrollY + 60 / zoom, 
    });

    setShowCard((prev) => !prev);
  };

  return (
    <>
      <BaseNode onClick={handleToggle} ref={ref}>Node {nodeId}</BaseNode>

      {showCard && (
        <div
          style={{
            position: "absolute",
            left: cardPos.x,
            top: cardPos.y,
            zIndex: 1000,
          }}
        >
          <CardComponent />
        </div>
      )}
    </>
  );
};

export default ToggleCardNode;
