import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface TaskItemResponse {
  id: number;
  summary: string;
  description?: string;
  reporter: string;
  estimatedTime: number;
  usageTime?: number;
  currentState: number;
}
export interface TaskItemRequest {
  summary: string;
  description?: string;
  reporter: string;
  estimatedTime: number;
  usageTime?: number;
  currentState: number;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const taskApi = {
  get: (id: number) =>
    createAxiosInstance().get<TaskItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`
    ),
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
    createAxiosInstance().get<TaskItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board`
    ),
  add: (taskItem: TaskItemRequest) =>
    createAxiosInstance().post<TaskItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board`,
      taskItem
    ),
  modify: (id: number, taskItem: TaskItemRequest) =>
    createAxiosInstance().put<TaskItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`,
      taskItem
    ),
  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`
    ),
};

export default taskApi;
