import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { AlertCircle, Download, FileText, Send, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ProcessSelectedJobProps {
  job: {
    id: string;
    companyName: string;
    role: string;
    description?: string;
    requirements?: string[];
  };
  userProfile?: any;
}

const ProcessSelectedJob = ({ job, userProfile }: ProcessSelectedJobProps) => {
  const [activeTab, setActiveTab] = React.useState("analysis");
  const [generatedContent, setGeneratedContent] = React.useState<{
    analysis?: {
      keyPoints: string[];
      skillsMatch: string[];
      missingSkills: string[];
    };
    resume?: {
      suggestions: string[];
      optimizedContent: string;
    };
    coverLetter?: string;
  }>({});

  const handleAnalyzeContent = async () => {
    // Simulated AI analysis
    setGeneratedContent({
      analysis: {
        keyPoints: [
          "Strong emphasis on full-stack development",
          "Required experience with React and Node.js",
          "Focus on scalable architecture",
        ],
        skillsMatch: ["React", "TypeScript", "Node.js"],
        missingSkills: ["AWS", "Docker"],
      },
    });
  };

  const handleOptimizeResume = async () => {
    // Simulated resume optimization
    setGeneratedContent((prev) => ({
      ...prev,
      resume: {
        suggestions: [
          "Highlight your React.js projects more prominently",
          "Add metrics to your TypeScript achievements",
          "Include specific Node.js applications you've built",
        ],
        optimizedContent: "Optimized resume content would go here...",
      },
    }));
  };

  const handleGenerateCoverLetter = async () => {
    // Simulated cover letter generation
    setGeneratedContent((prev) => ({
      ...prev,
      coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the ${job.role} position at ${job.companyName}...

[Rest of the cover letter would go here...]

Best regards,
[Your name]`,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{job.role}</h1>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Submit Application
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Content Analysis</TabsTrigger>
          <TabsTrigger value="resume">Resume Optimization</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!generatedContent.analysis ? (
                <Button onClick={handleAnalyzeContent}>
                  Analyze Job Description
                </Button>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Key Points</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {generatedContent.analysis.keyPoints.map((point, i) => (
                        <li key={i} className="text-sm">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Skills Match</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.analysis.skillsMatch.map((skill, i) => (
                        <Badge key={i} variant="success">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.analysis.missingSkills.map(
                        (skill, i) => (
                          <Badge key={i} variant="destructive">
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!generatedContent.resume ? (
                <Button onClick={handleOptimizeResume}>
                  Generate Resume Suggestions
                </Button>
              ) : (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Optimization Suggestions</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {generatedContent.resume.suggestions.map((sugg, i) => (
                          <li key={i} className="text-sm">
                            {sugg}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="font-medium mb-2">Optimized Resume</h3>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      <pre className="text-sm">
                        {generatedContent.resume.optimizedContent}
                      </pre>
                    </ScrollArea>
                    <Button className="mt-4">
                      <Download className="mr-2 h-4 w-4" />
                      Download Optimized Resume
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cover-letter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Cover Letter Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!generatedContent.coverLetter ? (
                <Button onClick={handleGenerateCoverLetter}>
                  Generate Cover Letter
                </Button>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    value={generatedContent.coverLetter}
                    className="min-h-[400px] font-mono"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download as PDF
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download as Word
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessSelectedJob;
