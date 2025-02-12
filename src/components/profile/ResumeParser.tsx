import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, Loader2 } from "lucide-react";
import { parseResume } from "@/lib/resume-parser";
import { UserProfile } from "@/types/profile";

interface ResumeParserProps {
  onParsed: (profile: Partial<UserProfile>) => void;
}

const ResumeParser = ({ onParsed }: ResumeParserProps) => {
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleParse = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const parsedProfile = await parseResume(file);

      onParsed(parsedProfile);
    } catch (error) {
      console.error("Error parsing resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Upload Resume</h3>
        <p className="text-sm text-gray-500">
          Upload your resume to automatically fill your profile
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume (PDF or DOCX)</Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        />
      </div>

      <Button
        onClick={handleParse}
        disabled={!file || loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Parsing Resume...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Parse Resume
          </>
        )}
      </Button>
    </div>
  );
};

export default ResumeParser;
