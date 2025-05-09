"use client";
import "@xyflow/react/dist/style.css";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

import { ReactFlow, Background, useNodesState, Edge, NodeProps, Node as FlowNode } from "@xyflow/react";
import ToggleCardNode from "../ToggleCardNode";
import StyledMarkdown from "../StyledMarkdown";

export interface CustomNodeData extends Record<string, unknown> {
  title: string;
  content: string;
  onShowSidebar?: (id: string, data: CustomNodeData) => void;
}

const nodeTypes = {
  custom: ToggleCardNode,
};
const roadmapData: Record<string, { title: string; content: string }> = 
{
  "1": {
    "title": "Foundations of Data Structures",
    "content": "## Getting Started with Data Structures\n\n- **Course**: [Python Data Structures - Coursera](https://www.coursera.org/learn/python-data) (Focus on Week 1 materials only, ~2 hours)\n- **Reading**: Review the basics of Python lists and dictionaries in the [Python Documentation](https://docs.python.org/3/tutorial/datastructures.html) (~1 hour)\n- **Practice**: Solve 2-3 easy array/list problems on [LeetCode](https://leetcode.com/tag/array/) (~1 hour)"
  },
  "2": {
    "title": "Arrays and Lists Deep Dive",
    "content": "## Understanding Arrays and Lists\n\n- **Video**: [Arrays vs Lists in Python](https://www.youtube.com/watch?v=BrZ5OoYzfN8) (~30 minutes)\n- **Reading**: [Time Complexity Analysis for List Operations](https://wiki.python.org/moin/TimeComplexity) (~1 hour)\n- **Practice**: Implement a dynamic array from scratch in Python (~2 hours)\n- **Mini-Project**: Create a simple to-do list application using Python lists (~1 hour)"
  },
  "3": {
    "title": "Stacks and Queues",
    "content": "## Stack and Queue Data Structures\n\n- **Reading**: [Stacks and Queues in Python](https://realpython.com/how-to-implement-python-stack/) (~1 hour)\n- **Video**: [Stack and Queue Visualization](https://www.youtube.com/watch?v=wjI1WNcIntg) (~30 minutes)\n- **Practice**: Implement a stack and queue using Python lists (~2 hours)\n- **Mini-Project**: Build a simple expression evaluator using stacks (~1 hour)"
  },
  "4": {
    "title": "Linked Lists",
    "content": "## Understanding Linked Lists\n\n- **Reading**: [Introduction to Linked Lists](https://realpython.com/linked-lists-python/) (~1 hour)\n- **Video**: [Linked List Implementation in Python](https://www.youtube.com/watch?v=JlMyYuY1aXU) (~45 minutes)\n- **Practice**: Implement a singly linked list with basic operations (insert, delete, search) (~3 hours)"
  },
  "5": {
    "title": "Recursion Basics",
    "content": "## Introduction to Recursion\n\n- **Reading**: [Thinking Recursively in Python](https://realpython.com/python-thinking-recursively/) (~1 hour)\n- **Video**: [Recursion Explained](https://www.youtube.com/watch?v=wMNrSM5RFMc) (~30 minutes)\n- **Practice**: Solve 3 basic recursion problems:\n  - Factorial calculation\n  - Fibonacci sequence\n  - Sum of array elements (~3 hours total)"
  },
  "6": {
    "title": "Hash Tables",
    "content": "## Understanding Hash Tables\n\n- **Reading**: [Hash Tables Explained](https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/) (~1 hour)\n- **Video**: [Hash Tables and Dictionaries](https://www.youtube.com/watch?v=9HFbhPscPU0) (~45 minutes)\n- **Practice**: Implement a simple hash table in Python (~3 hours)"
  },
  "7": {
    "title": "Trees - Part 1",
    "content": "## Introduction to Trees\n\n- **Reading**: [Tree Data Structure Basics](https://www.geeksforgeeks.org/introduction-to-tree-data-structure/) (~1 hour)\n- **Video**: [Tree Data Structures](https://www.youtube.com/watch?v=oSWTXtMglKE) (~45 minutes)\n- **Practice**: Implement a basic binary tree structure with node creation and traversal methods (~3 hours)"
  },
  "8": {
    "title": "Trees - Part 2",
    "content": "## Binary Search Trees\n\n- **Reading**: [Binary Search Tree Implementation](https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/) (~1 hour)\n- **Video**: [Binary Search Trees Explained](https://www.youtube.com/watch?v=pYT9F8_LFTM) (~45 minutes)\n- **Practice**: Implement a binary search tree with insert, search, and delete operations (~3 hours)"
  },
  "9": {
    "title": "Graphs - Basics",
    "content": "## Introduction to Graphs\n\n- **Reading**: [Graph Data Structure And Algorithms](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/) (~1 hour)\n- **Video**: [Graph Theory Introduction](https://www.youtube.com/watch?v=gXgEDyodOJU) (~45 minutes)\n- **Practice**: Implement a simple graph using adjacency list in Python (~3 hours)"
  },
  "10": {
    "title": "Basic Sorting Algorithms",
    "content": "## Understanding Sorting Algorithms\n\n- **Reading**: [Sorting Algorithms in Python](https://realpython.com/sorting-algorithms-python/) (~1 hour)\n- **Video**: [Visualization of Sorting Algorithms](https://www.youtube.com/watch?v=kPRA0W1kECg) (~30 minutes)\n- **Practice**: Implement bubble sort and insertion sort algorithms (~2 hours)\n- **Mini-Project**: Create a program that compares the performance of different sorting algorithms (~1 hour)"
  },
  "11": {
    "title": "Basic Searching Algorithms",
    "content": "## Understanding Searching Algorithms\n\n- **Reading**: [Linear and Binary Search in Python](https://www.geeksforgeeks.org/python-program-for-binary-search/) (~1 hour)\n- **Video**: [Search Algorithms Explained](https://www.youtube.com/watch?v=P3YID7liBug) (~45 minutes)\n- **Practice**: Implement linear search and binary search algorithms (~2 hours)\n- **Mini-Project**: Create a simple search application that allows searching through a dataset (~1 hour)"
  },
  "12": {
    "title": "Final Project & Review",
    "content": "## Consolidating Your Knowledge\n\n- **Review**: Go through all the data structures learned and create a cheat sheet (~1 hour)\n- **Final Project**: Build a data structure library in Python that implements at least 4 different data structures with their basic operations (~3 hours)\n- **Next Steps**: Explore resources for intermediate data structures and algorithms:\n  - [Competitive Programming on Codeforces](https://codeforces.com/)\n  - [Advanced Data Structures Course on edX](https://www.edx.org/course/data-structures-fundamentals)\n  - [Algorithm Specialization on Coursera](https://www.coursera.org/specializations/algorithms)"
  }
}

interface CanvasProps {
  nodes: FlowNode<CustomNodeData>[];
  edges: Edge[];
}

export function Canvas({ nodes, edges }: CanvasProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<{ id: string; data: CustomNodeData } | null>(null);

  const handleShowSidebar = (id: string, data: CustomNodeData) => {
    setSelectedNode({ id, data });
    setSidebarOpen(true);
  };

  // Inject the handler into each node's data
  const nodesWithHandler = nodes.map((node) => ({
    ...node,
    data: { ...node.data, onShowSidebar: handleShowSidebar },
  }));

  return (
    <div className="h-screen p-8 mx-auto border-white border flex">
      <div className="flex-1">
        <ReactFlow
          nodes={nodesWithHandler}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen} direction="right">
        <DrawerContent className="min-h-64 h-fit">
          <DrawerHeader>
            <DrawerTitle>Node Details</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            {selectedNode ? (
              <StyledMarkdown content={selectedNode.data.content}/>
            ) : (
              <p>No node selected</p>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
