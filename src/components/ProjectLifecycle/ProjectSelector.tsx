import React from "react";
import { ProjectType } from "../../types/ProjectTypes";
import { PROJECT_DATA } from "../../constants/projectData";
import "./ProjectSelector.scss";

interface ProjectSelectorProps {
  selectedProject: ProjectType;
  onProjectChange: (project: ProjectType) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  selectedProject,
  onProjectChange,
}) => {
  return (
    <div className="project-selector">
      <select
        className="project-selector__dropdown"
        aria-label="Select project type"
        value={selectedProject}
        onChange={(e) => onProjectChange(e.target.value as ProjectType)}
      >
        {Object.entries(PROJECT_DATA).map(([key, data]) => (
          <option key={key} value={key}>
            {data.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
