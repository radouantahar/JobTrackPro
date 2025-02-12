import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import StatusBoard from "./StatusBoard";

interface MainColumnProps {
  onDragEnd?: (result: any) => void;
}

const MainColumn = ({ onDragEnd = () => {} }: MainColumnProps) => {
  // Default data for the status board if no data is provided
  const defaultApplications = {
    applied: [
      {
        id: "1",
        company: "Tech Corp",
        role: "Frontend Developer",
        date: "2024-03-15",
      },
      {
        id: "2",
        company: "Digital Solutions",
        role: "Software Engineer",
        date: "2024-03-14",
      },
    ],
    interview: [
      {
        id: "3",
        company: "Startup Inc",
        role: "Full Stack Developer",
        date: "2024-03-13",
      },
    ],
    offer: [
      {
        id: "4",
        company: "Innovation Labs",
        role: "Senior Developer",
        date: "2024-03-12",
      },
    ],
    rejected: [
      {
        id: "5",
        company: "Tech Giants",
        role: "React Developer",
        date: "2024-03-11",
      },
    ],
  };

  return (
    <div className="h-full w-full bg-background p-4 rounded-lg shadow-sm">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="main-column" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="h-full"
            >
              <StatusBoard applications={defaultApplications} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MainColumn;
