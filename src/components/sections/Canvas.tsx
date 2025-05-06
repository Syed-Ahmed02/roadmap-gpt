"use client";
import "@xyflow/react/dist/style.css";

import { ReactFlow, Background, useNodesState, Edge } from "@xyflow/react";
import ToggleCardNode from "../ToggleCardNode";

const nodeTypes = {
  custom: ToggleCardNode,
};

const nodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {},
  },
];

const edges: Edge[] = [];

export function Canvas() {
  return (
    <div className="h-screen p-8 mx-auto border-white border">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
