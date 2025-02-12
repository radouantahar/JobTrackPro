import { JobListing } from "@/types/jobs";
import { MatchScore, UserProfile } from "@/types/profile";

export const calculateMatchScore = (
  job: JobListing,
  profile: UserProfile,
): MatchScore => {
  // Extract skills from job requirements
  const jobSkills = job.requirements.map((req) =>
    req
      .toLowerCase()
      .replace(
        /experience with |knowledge of |proficiency in |expertise in |\+/g,
        "",
      )
      .trim(),
  );

  // Calculate skills match
  const matchedSkills = profile.skills.filter((skill) =>
    jobSkills.some((jobSkill) => jobSkill.includes(skill.toLowerCase())),
  );
  const skillsScore = matchedSkills.length / jobSkills.length;

  // Calculate experience match
  const requiredYears = parseInt(job.experience) || 0;
  const experienceScore =
    requiredYears > 0 ? Math.min(profile.experience / requiredYears, 1) : 1;

  // Calculate location match
  const locationScore = profile.preferredLocations.some(
    (loc) =>
      job.location.toLowerCase().includes(loc.toLowerCase()) ||
      job.location.toLowerCase() === "remote",
  )
    ? 1
    : 0;

  // Calculate industry match
  const industryScore = profile.preferredIndustries.includes(job.industry)
    ? 1
    : 0;

  // Calculate salary match
  const jobSalaryRange = job.salary
    .replace(/[^0-9-]/g, "")
    .split("-")
    .map(Number);
  const salaryScore =
    jobSalaryRange.length === 2
      ? jobSalaryRange[0] >= profile.desiredSalaryRange.min &&
        jobSalaryRange[1] <= profile.desiredSalaryRange.max
        ? 1
        : 0
      : 0.5;

  // Calculate overall score with weighted components
  const weights = {
    skills: 0.4,
    experience: 0.25,
    location: 0.15,
    industry: 0.1,
    salary: 0.1,
  };

  const overall =
    (skillsScore * weights.skills +
      experienceScore * weights.experience +
      locationScore * weights.location +
      industryScore * weights.industry +
      salaryScore * weights.salary) *
    100;

  return {
    overall: Math.round(overall),
    breakdown: {
      skills: Math.round(skillsScore * 100),
      experience: Math.round(experienceScore * 100),
      location: Math.round(locationScore * 100),
      industry: Math.round(industryScore * 100),
      salary: Math.round(salaryScore * 100),
    },
    matchedSkills,
    missingSkills: jobSkills.filter(
      (skill) =>
        !matchedSkills.some((match) => skill.includes(match.toLowerCase())),
    ),
  };
};

// Mock profile for testing
export const mockUserProfile: UserProfile = {
  id: "1",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Frontend Development",
    "REST APIs",
    "Git",
  ],
  experience: 4,
  preferredIndustries: ["Technology", "Software", "Finance"],
  preferredLocations: ["San Francisco", "Remote"],
  education: {
    degree: "Computer Science",
    field: "Software Engineering",
    level: "bachelor",
  },
  desiredSalaryRange: {
    min: 100000,
    max: 180000,
  },
  jobPreferences: {
    remoteOnly: false,
    employmentType: ["full-time"],
  },
};
