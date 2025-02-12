import { UserProfile } from "@/types/profile";

interface ParsedText {
  text: string;
  confidence: number;
}

interface TextractBlock {
  BlockType: string;
  Text?: string;
  Confidence?: number;
  EntityTypes?: string[];
}

export const parseResume = async (
  file: File,
): Promise<Partial<UserProfile>> => {
  try {
    // In a real app, this would upload to S3 and use AWS Textract
    // For demo, we'll simulate the parsing
    const mockTextractResponse = await simulateTextractAPI(file);
    return extractProfileData(mockTextractResponse);
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw error;
  }
};

const simulateTextractAPI = async (file: File): Promise<ParsedText[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock Textract response
  return [
    { text: "SKILLS", confidence: 0.99 },
    { text: "React.js, TypeScript, Node.js, AWS, Docker", confidence: 0.95 },
    { text: "EXPERIENCE", confidence: 0.99 },
    {
      text: "Senior Software Engineer | Tech Corp | 2020-Present",
      confidence: 0.95,
    },
    { text: "Software Engineer | Startup Inc | 2018-2020", confidence: 0.95 },
    { text: "EDUCATION", confidence: 0.99 },
    { text: "Master of Science in Computer Science", confidence: 0.95 },
    { text: "University of Technology | 2018", confidence: 0.95 },
  ];
};

const extractProfileData = (blocks: ParsedText[]): Partial<UserProfile> => {
  const profile: Partial<UserProfile> = {
    skills: [],
    experience: 0,
    education: {
      degree: "",
      field: "",
      level: "bachelor",
    },
  };

  let currentSection = "";

  blocks.forEach((block) => {
    const text = block.text.toLowerCase();

    if (text === "skills") {
      currentSection = "skills";
    } else if (text === "experience") {
      currentSection = "experience";
    } else if (text === "education") {
      currentSection = "education";
    } else {
      switch (currentSection) {
        case "skills":
          profile.skills = text
            .split(/[,|]/) // Split by comma or pipe
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);
          break;

        case "experience":
          if (text.includes("present")) {
            const startYear = parseInt(text.match(/\d{4}/)?.[0] || "");
            if (startYear) {
              profile.experience = new Date().getFullYear() - startYear;
            }
          }
          break;

        case "education":
          if (text.includes("master")) {
            profile.education = {
              degree: "Master of Science",
              field: "Computer Science",
              level: "master",
            };
          }
          break;
      }
    }
  });

  return profile;
};

export const calculateProfileCompleteness = (
  profile: UserProfile,
): {
  score: number;
  improvements: string[];
} => {
  const improvements: string[] = [];
  let score = 0;

  // Check skills (30%)
  const skillsScore = Math.min(profile.skills.length / 5, 1) * 30;
  score += skillsScore;
  if (profile.skills.length < 5) {
    improvements.push("Add more skills (aim for at least 5)");
  }

  // Check experience (20%)
  const experienceScore = Math.min(profile.experience / 2, 1) * 20;
  score += experienceScore;
  if (profile.experience < 2) {
    improvements.push("Add more work experience details");
  }

  // Check education (15%)
  if (profile.education.degree && profile.education.field) {
    score += 15;
  } else {
    improvements.push("Complete your education information");
  }

  // Check location preferences (10%)
  if (profile.preferredLocations.length > 0) {
    score += 10;
  } else {
    improvements.push("Add preferred work locations");
  }

  // Check industry preferences (10%)
  if (profile.preferredIndustries.length > 0) {
    score += 10;
  } else {
    improvements.push("Add preferred industries");
  }

  // Check salary expectations (10%)
  if (
    profile.desiredSalaryRange.min > 0 &&
    profile.desiredSalaryRange.max > 0
  ) {
    score += 10;
  } else {
    improvements.push("Set your desired salary range");
  }

  // Check job preferences (5%)
  if (profile.jobPreferences.employmentType.length > 0) {
    score += 5;
  } else {
    improvements.push("Select preferred employment types");
  }

  return {
    score: Math.round(score),
    improvements,
  };
};
