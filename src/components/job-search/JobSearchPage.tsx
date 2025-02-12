import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Building2,
  MapPin,
  DollarSign,
  BookOpen,
  Briefcase,
  Save,
  Loader2,
} from "lucide-react";
import { JobListing, SavedSearch } from "@/types/jobs";
import { calculateMatchScore, mockUserProfile } from "@/lib/matching";
import { fetchJobs, saveSearch } from "@/lib/api/jobs";
import JobDetails from "./JobDetails";
import SavedSearches from "./SavedSearches";

const JobSearchPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [jobs, setJobs] = React.useState<JobListing[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<JobListing | null>(null);
  const [showSaveSearch, setShowSaveSearch] = React.useState(false);
  const [selectedJobs, setSelectedJobs] = React.useState<JobListing[]>([]);

  const searchJobs = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchJobs({
        search: searchTerm,
        industry,
        experience,
        location,
      });
      setJobs(result.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, industry, experience, location]);

  React.useEffect(() => {
    searchJobs();
  }, [searchJobs]);

  const handleSaveSearch = () => {
    const newSearch: Omit<SavedSearch, "id" | "createdAt"> = {
      name: `Search - ${new Date().toLocaleDateString()}`,
      criteria: {
        search: searchTerm,
        industry,
        experience,
        location,
      },
    };
    saveSearch(newSearch);
    setShowSaveSearch(false);
  };

  const applySearch = (criteria: SavedSearch["criteria"]) => {
    setSearchTerm(criteria.search || "");
    setIndustry(criteria.industry || "");
    setExperience(criteria.experience || "");
    setLocation(criteria.location || "");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1512px] mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Job Search</h1>
            {selectedJobs.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {selectedJobs.length} job{selectedJobs.length !== 1 ? "s" : ""}{" "}
                selected
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <SavedSearches onApplySearch={applySearch} />
            <Button
              variant="outline"
              size="icon"
              onClick={handleSaveSearch}
              disabled={!searchTerm && !industry && !experience && !location}
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search jobs by title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>

          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="lead">Lead/Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No jobs found matching your criteria
            </div>
          ) : (
            jobs.map((job) => {
              const matchScore = calculateMatchScore(job, mockUserProfile);
              return (
                <Card key={job.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span>{job.industry}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <Badge variant="secondary">{job.industry}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedJob(job)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                  {/* Match Score */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Match Score</span>
                      <Badge
                        variant={
                          matchScore.overall >= 80
                            ? "success"
                            : matchScore.overall >= 60
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {matchScore.overall}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      {matchScore.matchedSkills.length} of{" "}
                      {matchScore.matchedSkills.length +
                        matchScore.missingSkills.length}{" "}
                      required skills matched
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {selectedJob && (
          <JobDetails
            job={selectedJob}
            open={!!selectedJob}
            onOpenChange={(open) => {
              if (!open) {
                if (!selectedJobs.find((j) => j.id === selectedJob?.id)) {
                  setSelectedJobs([...selectedJobs, selectedJob]);
                }
                setSelectedJob(null);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;
