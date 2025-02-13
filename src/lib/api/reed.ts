import { JobListing } from "@/types/jobs";

const REED_API_KEY = import.meta.env.VITE_REED_API_KEY;
const REED_API_URL = "https://www.reed.co.uk/api/1.0/search";

export async function searchReedJobs(params: {
  keywords?: string;
  location?: string;
  distanceFromLocation?: number;
  permanent?: boolean;
  contract?: boolean;
  temp?: boolean;
  partTime?: boolean;
  fullTime?: boolean;
  minimumSalary?: number;
  maximumSalary?: number;
  postedByRecruitmentAgency?: boolean;
  postedByDirectEmployer?: boolean;
  graduate?: boolean;
}) {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${REED_API_URL}?${queryParams.toString()}`, {
      headers: {
        Authorization: `Basic ${btoa(REED_API_KEY + ":")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();
    return data.results.map(
      (job: any): JobListing => ({
        id: job.jobId.toString(),
        title: job.jobTitle,
        company: job.employerName,
        location: job.locationName,
        salary: job.salary || "Competitive",
        experience: job.minimumExperience || "Not specified",
        industry: job.jobCategory || "Not specified",
        description: job.jobDescription,
        postedDate: job.datePosted,
        requirements: job.jobDescription
          .split(".")
          .filter(
            (s: string) =>
              s.toLowerCase().includes("require") ||
              s.toLowerCase().includes("skill"),
          )
          .map((s: string) => s.trim())
          .filter(Boolean)
          .slice(0, 5),
        benefits: job.jobDescription
          .split(".")
          .filter(
            (s: string) =>
              s.toLowerCase().includes("benefit") ||
              s.toLowerCase().includes("offer"),
          )
          .map((s: string) => s.trim())
          .filter(Boolean)
          .slice(0, 5),
      }),
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
