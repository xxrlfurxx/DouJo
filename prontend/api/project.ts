import axios from "axios";

export interface ProjectPagingReponse {
  content: ProjectItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProjectItemResponse {
  id: number;
  projectname: string;
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  memo: string;
  milestone: [];
}

export interface ProjectItemRequest {
  projectname: string;
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
}

const projectApi = {
  get: (id: number) =>
    axios.get<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project/${id}`
    ),

  fetch: () =>
    axios.get<ProjectItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project`
    ),

  fetchPaging: (page: number, size: number) =>
    axios.get<ProjectPagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project/paging?page=${page}&size=${size}`
    ),

  add: (projectItem: ProjectItemRequest) =>
    axios.post<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project`,
      projectItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/project/${id}`),

  modify: (id: number, projectItem: ProjectItemRequest) =>
    axios.put<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project/${id}`,
      projectItem
    ),
};

export default projectApi;
