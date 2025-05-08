"use client";
import React, { useRef, useState } from "react";
import { Node, useNodeId, Handle, NodeProps } from "@xyflow/react";
import { BaseNode } from "./base-node";
import { CustomNodeData } from "./sections/Canvas";
import {  Position } from "@xyflow/react";




const ToggleCardNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  // The parent (Canvas) will pass an onShowSidebar function in data
  const customData = data as unknown as CustomNodeData;

  const handleClick = () => {
    if (data && typeof data.onShowSidebar === "function") {
      data.onShowSidebar(id, data);
    }

  };
  return (
    <BaseNode onClick={handleClick} selected={selected} className="cursor-pointer">
      Week {id} - {customData.title }
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
};

export default ToggleCardNode;
