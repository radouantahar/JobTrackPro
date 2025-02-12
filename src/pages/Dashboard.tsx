import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";

interface DashboardProps {
  onDragEnd?: (result: any) => void;
  onAddApplication?: () => void;
  stats?: {
    totalApplications: number;
    responseRate: number;
    interviewsScheduled: number;
  };
  upcomingEvents?: Array<{
    id: string;
    title: string;
    date: Date;
    type: "interview" | "followup";
  }>;
  isDialogOpen?: boolean;
  onDialogOpenChange?: (open: boolean) => void;
}

const Dashboard = ({
  onDragEnd = () => {},
  onAddApplication = () => {},
  stats = {
    totalApplications: 25,
    responseRate: 40,
    interviewsScheduled: 3,
  },
  upcomingEvents = [
    {
      id: "1",
      title: "Technical Interview with Google",
      date: new Date("2024-03-25T10:00:00"),
      type: "interview",
    },
    {
      id: "2",
      title: "Follow up with Amazon",
      date: new Date("2024-03-26T14:00:00"),
      type: "followup",
    },
  ],
  isDialogOpen = true,
  onDialogOpenChange = () => {},
}: DashboardProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onAddApplication={onAddApplication}
        isDialogOpen={isDialogOpen}
        onDialogOpenChange={onDialogOpenChange}
      />
      <DashboardGrid
        onDragEnd={onDragEnd}
        stats={stats}
        upcomingEvents={upcomingEvents}
      />
    </div>
  );
};

export default Dashboard;
