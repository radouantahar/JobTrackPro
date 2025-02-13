import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ApplicationCard from "./ApplicationCard";

interface Application {
  id: string;
  companyName: string;
  role: string;
  applicationDate: Date;
  nextAction: string;
  status: "selected" | "applied" | "interview" | "offer" | "rejected";
}

interface StatusBoardProps {
  applications: Application[];
  onDragEnd?: (result: any) => void;
}

const defaultApplications: Application[] = [
  {
    id: "1",
    companyName: "Tech Corp",
    role: "Frontend Developer",
    applicationDate: new Date(),
    nextAction: "Follow up next week",
    status: "applied",
  },
  {
    id: "2",
    companyName: "Startup Inc",
    role: "Full Stack Engineer",
    applicationDate: new Date(),
    nextAction: "Technical interview scheduled",
    status: "interview",
  },
  {
    id: "3",
    companyName: "Big Tech Co",
    role: "Senior Developer",
    applicationDate: new Date(),
    nextAction: "Waiting for offer letter",
    status: "offer",
  },
];

const StatusBoard = ({
  applications,
  onDragEnd = () => {},
}: StatusBoardProps) => {
  const items = applications?.length ? applications : defaultApplications;
  const columns = [
    { id: "selected", title: "Selected", color: "bg-purple-50" },
    { id: "applied", title: "Applied", color: "bg-blue-50" },
    { id: "interview", title: "Interview", color: "bg-yellow-50" },
    { id: "offer", title: "Offer", color: "bg-green-50" },
    { id: "rejected", title: "Rejected", color: "bg-red-50" },
  ];

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 h-full">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`flex-1 ${column.color} rounded-lg p-4`}
            >
              <h3 className="font-semibold text-gray-700 mb-4">
                {column.title}
              </h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {items
                      .filter((app) => app.status === column.id)
                      .map((application, index) => (
                        <Draggable
                          key={application.id}
                          draggableId={application.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ApplicationCard
                                id={application.id}
                                companyName={application.companyName}
                                role={application.role}
                                applicationDate={application.applicationDate}
                                nextAction={application.nextAction}
                                status={application.status}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default StatusBoard;
