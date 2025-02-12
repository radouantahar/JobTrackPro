import { UserProfile } from "@/types/profile";

interface ResumeTemplate {
  name: string;
  description: string;
  preview: string; // URL to preview image
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    name: "Modern Professional",
    description:
      "Clean and minimal design with a focus on skills and experience",
    preview: "https://api.dicebear.com/7.x/shapes/svg?seed=modern",
  },
  {
    name: "Creative Portfolio",
    description: "Visual layout perfect for creative roles",
    preview: "https://api.dicebear.com/7.x/shapes/svg?seed=creative",
  },
  {
    name: "Executive",
    description: "Traditional format ideal for senior positions",
    preview: "https://api.dicebear.com/7.x/shapes/svg?seed=executive",
  },
];

export const generateResume = async (
  profile: UserProfile,
  templateName: string,
): Promise<Blob> => {
  // In a real app, this would use a PDF generation library like PDFKit or jsPDF
  // For now, we'll create a simple HTML string and convert it to PDF
  const html = generateResumeHTML(profile, templateName);

  // Simulate PDF generation
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a mock PDF blob
  return new Blob([html], { type: "application/pdf" });
};

const generateResumeHTML = (
  profile: UserProfile,
  templateName: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${profile.education.field} Resume</title>
    </head>
    <body>
      <h1>${profile.education.field}</h1>
      
      <h2>Skills</h2>
      <p>${profile.skills.join(", ")}</p>
      
      <h2>Experience</h2>
      <p>${profile.experience} years of experience</p>
      
      <h2>Education</h2>
      <p>${profile.education.degree} in ${profile.education.field}</p>
      
      <h2>Preferred Industries</h2>
      <p>${profile.preferredIndustries.join(", ")}</p>
    </body>
    </html>
  `;
};
