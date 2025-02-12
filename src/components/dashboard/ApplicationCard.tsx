import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarDays, Building2, Briefcase, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface ApplicationCardProps {
  companyName?: string;
  role?: string;
  applicationDate?: Date;
  nextAction?: string;
  status?: "applied" | "interview" | "offer" | "rejected";
  onEdit?: () => void;
}

const getStatusColor = (status: ApplicationCardProps["status"]) => {
  switch (status) {
    case "applied":
      return "bg-blue-100 text-blue-800";
    case "interview":
      return "bg-yellow-100 text-yellow-800";
    case "offer":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ApplicationCard = ({
  companyName = "Example Company",
  role = "Software Engineer",
  applicationDate = new Date(),
  nextAction = "Follow up email pending",
  status = "applied",
  onEdit = () => {},
}: ApplicationCardProps) => {
  return (
    <Card className="w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow cursor-move">
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-sm line-clamp-1">{companyName}</h3>
          </div>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-gray-500" />
          <p className="text-sm text-gray-600 line-clamp-1">{role}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4" />
          <span>Applied {format(applicationDate, "MMM d, yyyy")}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <p className="text-xs text-gray-500 line-clamp-1">{nextAction}</p>
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
