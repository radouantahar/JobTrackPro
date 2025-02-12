import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Download, FileDown, Loader2 } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { generateResume, resumeTemplates } from "@/lib/resume-export";

interface ResumeExportProps {
  profile: UserProfile;
}

const ResumeExport = ({ profile }: ResumeExportProps) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState("");

  const handleExport = async () => {
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      const pdfBlob = await generateResume(profile, selectedTemplate);

      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${profile.education.field.toLowerCase()}-resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <FileDown className="mr-2 h-4 w-4" />
          Export Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export Resume</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          {resumeTemplates.map((template) => (
            <Card
              key={template.name}
              className={`cursor-pointer transition-all ${selectedTemplate === template.name ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedTemplate(template.name)}
            >
              <CardContent className="p-4 space-y-4">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full aspect-[3/4] object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-500">
                    {template.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleExport}
            disabled={!selectedTemplate || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeExport;
