import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { X, Plus } from "lucide-react";
import { UserProfile } from "@/types/profile";

interface ProfileEditorProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

const ProfileEditor = ({ profile, onSave }: ProfileEditorProps) => {
  const [editedProfile, setEditedProfile] =
    React.useState<UserProfile>(profile);
  const [newSkill, setNewSkill] = React.useState("");
  const [newLocation, setNewLocation] = React.useState("");
  const [newIndustry, setNewIndustry] = React.useState("");

  const handleAddSkill = () => {
    if (newSkill && !editedProfile.skills.includes(newSkill)) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter((s) => s !== skill),
    });
  };

  const handleAddLocation = () => {
    if (
      newLocation &&
      !editedProfile.preferredLocations.includes(newLocation)
    ) {
      setEditedProfile({
        ...editedProfile,
        preferredLocations: [...editedProfile.preferredLocations, newLocation],
      });
      setNewLocation("");
    }
  };

  const handleAddIndustry = () => {
    if (
      newIndustry &&
      !editedProfile.preferredIndustries.includes(newIndustry)
    ) {
      setEditedProfile({
        ...editedProfile,
        preferredIndustries: [
          ...editedProfile.preferredIndustries,
          newIndustry,
        ],
      });
      setNewIndustry("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Professional Profile</h2>
        <p className="text-gray-500">
          Update your profile to improve job matches
        </p>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <Button type="button" onClick={handleAddSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {editedProfile.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="group">
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Years of Experience</Label>
            <Input
              type="number"
              value={editedProfile.experience}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  experience: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Degree</Label>
            <Input
              value={editedProfile.education.degree}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  education: {
                    ...editedProfile.education,
                    degree: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label>Field of Study</Label>
            <Input
              value={editedProfile.education.field}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  education: {
                    ...editedProfile.education,
                    field: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label>Level</Label>
            <Select
              value={editedProfile.education.level}
              onValueChange={(value: UserProfile["education"]["level"]) =>
                setEditedProfile({
                  ...editedProfile,
                  education: {
                    ...editedProfile.education,
                    level: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">Bachelor's</SelectItem>
                <SelectItem value="master">Master's</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Preferred Locations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preferred Locations</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Add a location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddLocation()}
          />
          <Button type="button" onClick={handleAddLocation}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {editedProfile.preferredLocations.map((location) => (
            <Badge key={location} variant="secondary" className="group">
              {location}
              <button
                onClick={() =>
                  setEditedProfile({
                    ...editedProfile,
                    preferredLocations: editedProfile.preferredLocations.filter(
                      (l) => l !== location,
                    ),
                  })
                }
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Preferred Industries */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preferred Industries</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Add an industry"
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddIndustry()}
          />
          <Button type="button" onClick={handleAddIndustry}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {editedProfile.preferredIndustries.map((industry) => (
            <Badge key={industry} variant="secondary" className="group">
              {industry}
              <button
                onClick={() =>
                  setEditedProfile({
                    ...editedProfile,
                    preferredIndustries:
                      editedProfile.preferredIndustries.filter(
                        (i) => i !== industry,
                      ),
                  })
                }
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Desired Salary Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Minimum ($)</Label>
            <Input
              type="number"
              value={editedProfile.desiredSalaryRange.min}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  desiredSalaryRange: {
                    ...editedProfile.desiredSalaryRange,
                    min: parseInt(e.target.value) || 0,
                  },
                })
              }
            />
          </div>
          <div>
            <Label>Maximum ($)</Label>
            <Input
              type="number"
              value={editedProfile.desiredSalaryRange.max}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  desiredSalaryRange: {
                    ...editedProfile.desiredSalaryRange,
                    max: parseInt(e.target.value) || 0,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Job Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Job Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remoteOnly"
              checked={editedProfile.jobPreferences.remoteOnly}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  jobPreferences: {
                    ...editedProfile.jobPreferences,
                    remoteOnly: e.target.checked,
                  },
                })
              }
            />
            <Label htmlFor="remoteOnly">Remote Only</Label>
          </div>

          <div>
            <Label>Employment Type</Label>
            <div className="flex gap-2 mt-2">
              {[
                { value: "full-time", label: "Full Time" },
                { value: "part-time", label: "Part Time" },
                { value: "contract", label: "Contract" },
              ].map(({ value, label }) => (
                <Button
                  key={value}
                  variant={
                    editedProfile.jobPreferences.employmentType.includes(
                      value as any,
                    )
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    const types = editedProfile.jobPreferences.employmentType;
                    setEditedProfile({
                      ...editedProfile,
                      jobPreferences: {
                        ...editedProfile.jobPreferences,
                        employmentType: types.includes(value as any)
                          ? types.filter((t) => t !== value)
                          : [...types, value as any],
                      },
                    });
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button variant="outline" onClick={() => setEditedProfile(profile)}>
          Reset
        </Button>
        <Button onClick={() => onSave(editedProfile)}>Save Profile</Button>
      </div>
    </div>
  );
};

export default ProfileEditor;
