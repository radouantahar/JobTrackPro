import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import StatusBoard from "./dashboard/StatusBoard";
import QuickStats from "./dashboard/QuickStats";
import DashboardCalendar from "./dashboard/DashboardCalendar";
import AddApplicationDialog from "./dashboard/AddApplicationDialog";

interface HomeProps {
  onAddApplication?: (data: any) => void;
  onUpdateStatus?: (result: any) => void;
}

const Home = ({
  onAddApplication = () => {},
  onUpdateStatus = () => {},
}: HomeProps) => {
  const [showAddDialog, setShowAddDialog] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1512px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Application
          </Button>
        </div>

        {/* Quick Stats Section */}
        <QuickStats />

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Status Board */}
          <div className="flex-1">
            <StatusBoard onDragEnd={onUpdateStatus} />
          </div>

          {/* Calendar Sidebar */}
          <div className="hidden xl:block">
            <DashboardCalendar />
          </div>
        </div>

        {/* Add Application Dialog */}
        <AddApplicationDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onSubmit={(data) => {
            onAddApplication(data);
            setShowAddDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
