export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  industry: string;
  description: string;
  postedDate: string;
  requirements: string[];
  benefits: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    search?: string;
    industry?: string;
    experience?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
  };
  createdAt: string;
}

export interface JobSearchFilters {
  search?: string;
  industry?: string;
  experience?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}
