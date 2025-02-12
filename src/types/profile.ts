export interface UserProfile {
  id: string;
  skills: string[];
  experience: number; // years
  preferredIndustries: string[];
  preferredLocations: string[];
  education: {
    degree: string;
    field: string;
    level: "bachelor" | "master" | "phd" | "other";
  };
  desiredSalaryRange: {
    min: number;
    max: number;
  };
  jobPreferences: {
    remoteOnly: boolean;
    employmentType: ("full-time" | "part-time" | "contract")[];
  };
}

export interface MatchScore {
  overall: number;
  breakdown: {
    skills: number;
    experience: number;
    location: number;
    industry: number;
    salary: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
}
