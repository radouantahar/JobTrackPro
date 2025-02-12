import React from "react";
import MainColumn from "./MainColumn";
import SideColumn from "./SideColumn";

interface DashboardGridProps {
  onDragEnd?: (result: any) => void;
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
}

const DashboardGrid = ({
  onDragEnd = () => {},
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
}: DashboardGridProps) => {
  return (
    <div className="flex gap-4 h-[calc(100vh-80px)] bg-background p-4">
      <div className="flex-grow">
        <MainColumn onDragEnd={onDragEnd} />
      </div>
      <div className="flex-shrink-0">
        <SideColumn stats={stats} upcomingEvents={upcomingEvents} />
      </div>
    </div>
  );
};

export default DashboardGrid;
