interface ProjectItemState {
  id: number;
  projectname: string | undefined,
  startdate: number;
  enddate: number;
  manager: string;
  enginner: string;
}

export type { ProjectItemState };