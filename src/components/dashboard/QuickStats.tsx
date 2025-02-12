import React from "react";
import { Card, CardContent } from "../ui/card";
import { Users2, Target, Calendar } from "lucide-react";

interface QuickStatsProps {
  totalApplications?: number;
  responseRate?: number;
  upcomingInterviews?: number;
}

const QuickStats = ({
  totalApplications = 25,
  responseRate = 40,
  upcomingInterviews = 3,
}: QuickStatsProps) => {
  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Applications
              </p>
              <p className="text-2xl font-bold">{totalApplications}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users2 className="h-6 w-6 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Response Rate
              </p>
              <p className="text-2xl font-bold">{responseRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="h-6 w-6 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Upcoming Interviews
              </p>
              <p className="text-2xl font-bold">{upcomingInterviews}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickStats;
