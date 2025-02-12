import React from "react";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { calculateProfileCompleteness } from "@/lib/resume-parser";

interface ProfileCompletenessProps {
  profile: UserProfile;
}

const ProfileCompleteness = ({ profile }: ProfileCompletenessProps) => {
  const { score, improvements } = calculateProfileCompleteness(profile);

  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Profile Completeness</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Overall completion</span>
          <span className="text-sm font-medium">{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
      </div>

      {improvements.length > 0 ? (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Improve your profile</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="text-sm">
                  {improvement}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Profile Complete!</AlertTitle>
          <AlertDescription>
            Your profile is fully optimized for job matching.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProfileCompleteness;
