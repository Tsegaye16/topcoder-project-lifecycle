import React, { useState } from "react";
import { ProjectType } from "../../types/ProjectTypes";
import { KANBAN_DATA } from "../../constants/kanbanData";
import ProjectSelector from "./ProjectSelector";
import KanbanBoard from "../Kanban/KanbanBoard";
import "./ProjectLifecycle.scss";

const ProjectLifecycle: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectType>("designChallenge");

  const handleProjectChange = (project: ProjectType) => {
    setSelectedProject(project);
  };

  return (
    <div className="project-lifecycle">
      <h1 className="project-lifecycle__title">
        <span>Project </span>
        <span className="project-lifecycle__title--highlight">Lifecycle</span>
      </h1>

      <div className="project-lifecycle__selector-container">
        <ProjectSelector
          selectedProject={selectedProject}
          onProjectChange={handleProjectChange}
        />
      </div>

      <div className="project-lifecycle__description">
        {KANBAN_DATA[selectedProject]?.description}
      </div>

      <div className="project-lifecycle__board-container">
        <p style={{ marginLeft: "100px" }}>
          Click the next column's header to see the interaction
        </p>
        <KanbanBoard
          columns={KANBAN_DATA[selectedProject]?.columns || []}
          key={selectedProject}
        />
      </div>
    </div>
  );
};

export default ProjectLifecycle;
