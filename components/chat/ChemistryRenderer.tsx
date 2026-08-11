import React from "react";
import Markdown from "@/components/chat/Markdown";

interface ChemistryRendererProps {
  content: string;
}

export default function ChemistryRenderer({ content }: ChemistryRendererProps) {
  if (!content) return null;

  // Clean up raw database table pipes, bad formatting artifacts, and replace <br> tags
  const cleanedContent = content
    .replace(/^\||\|$/g, "") // Remove starting/ending table pipes if any
    .replace(/\|\s*\*\*/g, "\n\n**") // Convert table columns into clean headers/paragraphs
    .replace(/\|\s*/g, " — ") // Replace middle pipes with clean dashes
    .replace(/<br\s*\/?>/gi, "\n\n"); // Convert HTML breaks to proper line spacing

  return <Markdown content={cleanedContent} />;
}