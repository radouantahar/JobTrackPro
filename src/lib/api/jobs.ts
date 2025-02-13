import { JobListing, SavedSearch, JobSearchFilters } from "@/types/jobs";
import { searchPoleEmploiJobs } from "./pole-emploi";

export const fetchJobs = async (params: JobSearchFilters) => {
  const jobs = await searchPoleEmploiJobs({
    keywords: params.search,
    location: params.location,
    contractType: params.experience,
    minSalary: params.salaryMin,
    maxSalary: params.salaryMax,
    page: params.page,
    limit: params.limit,
  });

  return {
    jobs,
    total: jobs.length,
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
