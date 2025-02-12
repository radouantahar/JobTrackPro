import React from "react";
import { Card } from "@/components/ui/card";
import DashboardCalendar from "./DashboardCalendar";
import QuickStats from "./QuickStats";

interface SideColumnProps {
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

const SideColumn = ({
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
}: SideColumnProps) => {
  return (
    <div className="w-full h-full bg-background p-4 space-y-4 max-w-[380px]">
      <Card className="p-4">
        <QuickStats
          totalApplications={stats.totalApplications}
          responseRate={stats.responseRate}
          interviewsScheduled={stats.interviewsScheduled}
        />
      </Card>

      <Card className="p-4">
        <DashboardCalendar events={upcomingEvents} />
      </Card>
    </div>
  );
};

export default SideColumn;
