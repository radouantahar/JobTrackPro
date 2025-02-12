import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { JobListing } from "@/types/jobs";
import { calculateMatchScore, mockUserProfile } from "@/lib/matching";
import { Progress } from "../ui/progress";

interface JobDetailsProps {
  job: JobListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetails = ({ job, open, onOpenChange }: JobDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company and Basic Info */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <span className="text-lg">{job.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>
                Posted {new Date(job.postedDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Match Score */}
          {(() => {
            const matchScore = calculateMatchScore(job, mockUserProfile);
            return (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Match Score</h3>
                  <Badge
                    variant={
                      matchScore.overall >= 80
                        ? "success"
                        : matchScore.overall >= 60
                          ? "warning"
                          : "destructive"
                    }
                    className="text-lg px-3 py-1"
                  >
                    {matchScore.overall}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Skills Match</span>
                      <span>{matchScore.breakdown.skills}%</span>
                    </div>
                    <Progress value={matchScore.breakdown.skills} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Experience Match</span>
                      <span>{matchScore.breakdown.experience}%</span>
                    </div>
                    <Progress value={matchScore.breakdown.experience} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Location Match</span>
                      <span>{matchScore.breakdown.location}%</span>
                    </div>
                    <Progress value={matchScore.breakdown.location} />
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchScore.matchedSkills.map((skill, index) => (
                      <Badge key={index} variant="success">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {matchScore.missingSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {matchScore.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="destructive">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Select for Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetails;
