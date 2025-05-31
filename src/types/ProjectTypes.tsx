export type ProjectType =
  | "designChallenge"
  | "devChallenge"
  | "qaChallenge"
  | "marathonMatch"
  | "ideationChallenge";

export interface ProjectData {
  title: string;
  description: string;
}

export type ProjectsData = Record<ProjectType, ProjectData>;
