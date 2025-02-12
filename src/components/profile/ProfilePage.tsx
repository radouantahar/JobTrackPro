import React from "react";
import ProfileEditor from "./ProfileEditor";
import MarketInsights from "./MarketInsights";
import ResumeExport from "./ResumeExport";
import ProfileCompleteness from "./ProfileCompleteness";
import ResumeParser from "./ResumeParser";
import SkillSuggestions from "./SkillSuggestions";
import { UserProfile } from "@/types/profile";
import { mockUserProfile } from "@/lib/matching";

const ProfilePage = () => {
  const [profile, setProfile] = React.useState<UserProfile>(mockUserProfile);

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    // In a real app, save to backend
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  const handleParsedResume = (parsedProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...parsedProfile,
    }));
  };

  const handleAddSkill = (skill: string) => {
    if (!profile.skills.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Professional Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <ProfileEditor profile={profile} onSave={handleProfileUpdate} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <ResumeParser onParsed={handleParsedResume} />
              </div>
              <div className="bg-white rounded-lg shadow">
                <ProfileCompleteness profile={profile} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <SkillSuggestions
                  currentSkills={profile.skills}
                  onAddSkill={handleAddSkill}
                />
              </div>
              <div className="bg-white rounded-lg shadow">
                <MarketInsights />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <ResumeExport profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
