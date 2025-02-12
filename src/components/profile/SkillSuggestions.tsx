import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";

interface SkillSuggestion {
  name: string;
  relevance: number;
  trending?: boolean;
}

interface SkillSuggestionsProps {
  currentSkills: string[];
  onAddSkill: (skill: string) => void;
}

const SkillSuggestions = ({
  currentSkills,
  onAddSkill,
}: SkillSuggestionsProps) => {
  // In a real app, these would come from an API based on job market analysis
  const suggestions: SkillSuggestion[] = [
    { name: "React", relevance: 0.95, trending: true },
    { name: "TypeScript", relevance: 0.9, trending: true },
    { name: "Node.js", relevance: 0.85, trending: true },
    { name: "GraphQL", relevance: 0.8, trending: true },
    { name: "AWS", relevance: 0.75, trending: true },
    { name: "Docker", relevance: 0.7 },
    { name: "Kubernetes", relevance: 0.65 },
    { name: "Python", relevance: 0.6 },
    { name: "SQL", relevance: 0.55 },
    { name: "Git", relevance: 0.5 },
  ].filter((suggestion) => !currentSkills.includes(suggestion.name));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Recommended Skills</h3>
        <p className="text-sm text-gray-500">
          Based on current job market trends and your profile
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((skill) => (
          <div
            key={skill.name}
            className="group relative inline-flex items-center"
          >
            <Badge
              variant="outline"
              className="pr-8 hover:bg-accent transition-colors"
            >
              {skill.name}
              {skill.trending && (
                <span className="ml-2 text-xs text-blue-500">↗</span>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 h-full px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onAddSkill(skill.name)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </Badge>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500">
        Skills are ranked by relevance to current job market demands
      </div>
    </div>
  );
};

export default SkillSuggestions;
