import { RoadmapForm } from "@/components/RoadmapForm";
import z from "zod";
import Image from "next/image";
import { Chat } from "@/components/Chat";
import type {FormSchema} from "@/components/RoadmapForm"
interface Props {
    formData: z.infer<typeof FormSchema>;
    
}


export default function ChatPage({ formData }: { formData: z.infer<typeof FormSchema> }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Chat formData={formData}/>

    </div>
  );
}
