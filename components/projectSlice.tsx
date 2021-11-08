import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectItem {
  id: number;
  projectname: string;
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  milestone: string;
  memo: string;
}


interface ProjectState {
  data: ProjectItem[]; // 프로젝트 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아올시에 대한 정보
}

const initialState: ProjectState = {
  data: [
    {
      id: 3,
      projectname: "협업툴 만들기1",
      milestone: "board제작",
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "강윤석",
      engineer: "강윤석",
      memo: "",
    },
    {
      id: 2,
      projectname: "협업툴 만들기2",
      milestone: "wiki제작",
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "이준희",
      engineer: "이준희",
      memo: "",
    },
    {
      id: 1,
      projectname: "협업툴 만들기3",
      milestone: "프로젝트 뷰 제작",
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "허준",
      engineer: "허준",
      memo: "",
    }
  ],
  isFetched: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectItem>) => {
      const project = action.payload;
      state.data.unshift(project);
    },
  },
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;