import { JobListing, SavedSearch, JobSearchFilters } from "@/types/jobs";

// In a real app, these would be API calls to a backend
export const fetchJobs = async (params: JobSearchFilters) => {
  // Simulating API call with mock data
  const mockJobs: JobListing[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      salary: "$120k - $180k",
      experience: "5+ years",
      industry: "Technology",
      description:
        "We're looking for an experienced frontend developer with a passion for building beautiful, responsive web applications. You'll be working with our team to develop new features and maintain existing ones.",
      postedDate: new Date().toISOString(),
      requirements: [
        "5+ years of React experience",
        "Strong TypeScript skills",
        "Experience with modern frontend tools",
        "Excellent problem-solving abilities",
        "Strong communication skills",
      ],
      benefits: [
        "Competitive salary",
        "Remote work options",
        "Health insurance",
        "401(k) matching",
        "Unlimited PTO",
      ],
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "Startup Inc",
      location: "Remote",
      salary: "$100k - $150k",
      experience: "3+ years",
      industry: "Software",
      description:
        "Join our fast-growing team and help build the next generation of our platform. We're looking for a full stack engineer who can work across the entire stack and isn't afraid to learn new technologies.",
      postedDate: new Date().toISOString(),
      requirements: [
        "3+ years of full stack development",
        "Node.js and React experience",
        "Database design skills",
        "Experience with cloud platforms",
        "Agile development experience",
      ],
      benefits: [
        "Equity package",
        "Flexible hours",
        "Learning budget",
        "Home office stipend",
        "Health and wellness benefits",
      ],
    },
  ];

  // Simulate filtering
  let filteredJobs = [...mockJobs];

  if (params.search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        job.company.toLowerCase().includes(params.search!.toLowerCase()),
    );
  }

  if (params.industry) {
    filteredJobs = filteredJobs.filter(
      (job) => job.industry.toLowerCase() === params.industry!.toLowerCase(),
    );
  }

  if (params.experience) {
    filteredJobs = filteredJobs.filter((job) =>
      job.experience.toLowerCase().includes(params.experience!.toLowerCase()),
    );
  }

  if (params.location) {
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(params.location!.toLowerCase()),
    );
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    jobs: filteredJobs,
    total: filteredJobs.length,
    page: params.page || 1,
    limit: params.limit || 10,
  };
};

export const getSavedSearches = (): SavedSearch[] => {
  const saved = localStorage.getItem("savedSearches");
  return saved ? JSON.parse(saved) : [];
};

export const saveSearch = (
  search: Omit<SavedSearch, "id" | "createdAt">,
): SavedSearch => {
  const searches = getSavedSearches();
  const newSearch: SavedSearch = {
    ...search,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };

  searches.push(newSearch);
  localStorage.setItem("savedSearches", JSON.stringify(searches));
  return newSearch;
};

export const deleteSavedSearch = (id: string): void => {
  const searches = getSavedSearches().filter((search) => search.id !== id);
  localStorage.setItem("savedSearches", JSON.stringify(searches));
};
