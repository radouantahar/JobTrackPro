import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { CalendarClock, Clock } from "lucide-react";

interface Interview {
  id: string;
  companyName: string;
  role: string;
  date: Date;
  time: string;
}

interface DashboardCalendarProps {
  interviews?: Interview[];
}

const DashboardCalendar = ({
  interviews = [
    {
      id: "1",
      companyName: "Tech Corp",
      role: "Senior Developer",
      date: new Date(),
      time: "10:00 AM",
    },
    {
      id: "2",
      companyName: "StartUp Inc",
      role: "Full Stack Engineer",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      time: "2:30 PM",
    },
  ],
}: DashboardCalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="w-[280px] bg-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />

        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="flex flex-col space-y-2 border-b pb-2 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{interview.companyName}</span>
                  <Badge variant="secondary">{interview.role}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <Clock className="h-4 w-4" />
                  {interview.time}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DashboardCalendar;
