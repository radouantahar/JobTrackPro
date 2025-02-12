import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddApplicationDialog from "./AddApplicationDialog";

interface DashboardHeaderProps {
  onAddApplication?: () => void;
  isDialogOpen?: boolean;
  onDialogOpenChange?: (open: boolean) => void;
}

const DashboardHeader = ({
  onAddApplication = () => {},
  isDialogOpen = true,
  onDialogOpenChange = () => {},
}: DashboardHeaderProps) => {
  return (
    <div className="w-full h-20 bg-background border-b px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Job Applications
        </h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogTrigger asChild>
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </DialogTrigger>
        <AddApplicationDialog onSubmit={onAddApplication} />
      </Dialog>
    </div>
  );
};

export default DashboardHeader;
