import projectReducer, {
  addProject,
  removeProject,
  modifyProject,
  addMilestone,
  removeMilestone,
  modifyMilestone,
  initialMilestoneItem,
  initialMilestone,
  initialProjectItem,
  initialProject,
  initialCompleted,
  addTotalpages,
  initialPagedProject,
  initialNextProject,
  ProjectPage,
} from "../../provider/modules/project";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ProjectItem } from "../../provider/modules/project";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  ProjectItemRequest,
  ProjectItemResponse,
  ProjectPagingReponse,
} from "../../api/project";
import { AxiosResponse } from "axios";
import { RootState } from "../../provider";

export interface PageRequest {
  page: number;
  size: number;
}

// 전체 데이터 조회에서 추가 할 때
export const requestAddProject = createAction<ProjectItem>(
  `${projectReducer.name}/requestAddProject`
);

//더보기 페이징에서 추가 할 때
export const requestAddProjectNext = createAction<ProjectItem>(
  `${projectReducer.name}/requestAddProjectNext`
);

// project를 가져오는 action
export const requestFetchProjects = createAction(
  `${projectReducer.name}/requestFetchProjects`
);

// project를 페이징으로 가져오는 action
export const requestFetchPagingProjects = createAction<PageRequest>(
  `${projectReducer.name}/requestFetchPagingProjects`
);

// 다음 페이즈 project를 가져오는 action
export const requestFetchNextProjects = createAction<PageRequest>(
  `${projectReducer.name}/requestFetchNextProjects`
);

export const requestFetchProjectItem = createAction<number>(
  `${projectReducer.name}/requestFetchProjectItem`
);

export const requestRemoveProject = createAction<number>(
  `${projectReducer.name}/requestRemoveProject`
);

export const requestRemoveProjectNext = createAction<number>(
  `${projectReducer.name}/requestRemoveProjectNext`
);

export const requestModifyProject = createAction<ProjectItem>(
  `${projectReducer.name}/requestModifyProject`
);

// saga action처리 부분

// 서버에 post로 데이터를 보내 추가하고, redux state를 변경
function* addDataPaging(action: PayloadAction<ProjectItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {
    const projectItemPayload = action.payload;
    const projectItemRequest: ProjectItemRequest = {
      projectname: projectItemPayload.projectname,
      startdate: projectItemPayload.startdate,
      enddate: projectItemPayload.enddate,
      manager: projectItemPayload.manager,
      engineer: projectItemPayload.engineer,
    };

    const result: AxiosResponse<ProjectItemResponse> = yield call(
      api.add,
      projectItemRequest
    );

    const projectData: ProjectItem[] = yield select(
      (state: RootState) => state.project.data
    );

    const projectPageSize: number = yield select(
      (state: RootState) => state.project.pageSize
    );

    // 현제 redux state에 데이터가 있으며, 페이지크기와 데이터 크기가 같으면
    if (projectData.length > 0 && projectData.length == projectPageSize) {
      // redux state의 가장 마지막 요소 삭제
      const deleteId = projectData[projectData.length - 1].id;
      yield put(removeProject(deleteId));
      // 전체 페이지 수를 증가
      yield put(addTotalpages);
    }

    const projectItem: ProjectItem = {
      id: result.data.id,
      projectname: result.data.projectname,
      startdate: result.data.startdate,
      enddate: result.data.enddate,
      manager: result.data.manager,
      engineer: result.data.engineer,
      milestone: [],
      memo: result.data.memo,
    };

    yield put(addProject(projectItem));

    yield put(initialCompleted());
  } catch (e: any) {
    console.log("Add Status: Error");
  }
}
function* addDataNext(action: PayloadAction<ProjectItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    const projectItemPayload = action.payload;

    const projectItemRequest: ProjectItemRequest = {
      projectname: projectItemPayload.projectname,
      startdate: projectItemPayload.startdate,
      enddate: projectItemPayload.enddate,
      manager: projectItemPayload.manager,
      engineer: projectItemPayload.engineer,
    };

    const result: AxiosResponse<ProjectItemResponse> = yield call(
      api.add,
      projectItemRequest
    );

    const projectItem: ProjectItem = {
      id: result.data.id,
      projectname: result.data.projectname,
      startdate: result.data.startdate,
      enddate: result.data.enddate,
      manager: result.data.manager,
      engineer: result.data.engineer,
      milestone: [],
      memo: result.data.memo,
    };

    yield put(addProject(projectItem));

    yield put(initialCompleted());
  } catch (e: any) {
    console.log("Add Status: Error");
  }
}
function* fetchData() {
  yield console.log("--fetchData--");

  const result: AxiosResponse<ProjectItemResponse[]> = yield call(api.fetch);

  const projects = result.data.map(
    (item) =>
      ({
        id: item.id,
        projectname: item.projectname,
        startdate: item.startdate,
        enddate: item.enddate,
        manager: item.manager,
        engineer: item.engineer,
        milestone: item.milestone,
        memo: item.memo,
      } as ProjectItem)
  );

  yield put(initialProject(projects));
}

function* fethNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNextData--");

  const page = action.payload.page;
  const size = action.payload.size;

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<ProjectPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    const projectPage: ProjectPage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            projectname: item.projectname,
            startdate: item.startdate,
            enddate: item.enddate,
            manager: item.manager,
            engineer: item.engineer,
            milestone: item.milestone,
            memo: item.memo,
          } as ProjectItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    yield put(initialNextProject(projectPage));
  } catch (e: any) {
    console.log("Add Status: Error");
  }
}
function* fetchDataItem(action: PayloadAction<number>) {
  yield console.log("--fetchDataItem--");

  const id = action.payload;

  const result: AxiosResponse<ProjectItemResponse> = yield call(api.get, id);

  const project = result.data;
  if (project) {
    yield put(initialProjectItem(project));
  }
}

function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  const id = action.payload;
}
