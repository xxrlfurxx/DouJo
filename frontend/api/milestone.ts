import axios from "axios";

interface MilestoneItemResponse {
  id: number;
  name: string;
  startdate: string;
  enddate: string;
  prijectId: number;
}

interface MilestoneItemRequest {
  name: string;
  startdate: string;
  enddate: string;
}

const milestoneApi = {
  get: (id: number) =>
    axios.get<MilestoneItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project/{id}`
    ),

  fetch: () =>
    axios.get<MilestoneItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project`
    ),

  add: (milestoneItem: MilestoneItemRequest) =>
    axios.post<MilestoneItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project`,
      milestoneItem
    ),
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/project/{id}`),

  modify: (id: number, milestoneItem: MilestoneItemRequest) =>
    axios.put<MilestoneItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/project/{id}`,
      milestoneItem
    ),
};

export default milestoneApi;
