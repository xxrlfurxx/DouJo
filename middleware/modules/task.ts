// import taskReducer, {
//   addTask,
//   modifyTask,
//   removeTask,
//   initialCompleted,
//   initialTask,
//   initialTaskItem,
// } from "../../provider/modules/task";
// import {
//   createAction,
//   // nanoid,
//   PayloadAction,
// } from "@reduxjs/toolkit";
// import { TaskItem } from "../../provider/modules/task";
// import {
//   call,
//   put,
//   // select,
//   takeEvery,
//   takeLatest,
// } from "@redux-saga/core/effects";
// import api, { TaskItemRequest, TaskItemResponse } from "../../api/task";
import { AxiosResponse } from "axios";
// // import { RootState } from "../../provider";

// /* saga action 생성 */

// // Create
// export const requestAddTask = createAction<TaskItem>(
//   `${taskReducer.name}/requestAddTask`
// );
// // Read all
// export const requestFetchTask = createAction<TaskItem>(
//   `${taskReducer.name}/requestFetchTask`
// );
// // Read 1 item
// export const requestFetchTaskItem = createAction<number>(
//   `${taskReducer.name}/requestFetchTaskItem`
// );
// // Update
// export const requestModifyTask = createAction<TaskItem>(
//   `${taskReducer.name}/requestModifyTask`
// );
// // Delete
// export const requestRemoveTask = createAction<number>(
//   `${taskReducer.name}/requestRemoveTask`
// );

// /* saga action 처리 부분 */

// // 서버에 POST
// function* addData(action: PayloadAction<TaskItem>) {
//   try {
//     // action의 payload로 넘어온 객체
//     const taskItemPayload = action.payload;
//     // rest api로 보낼 요청 객체
//     const taskItemRequest: TaskItemRequest = {
//       summary: taskItemPayload.summary,
//       description: taskItemPayload.description,
//       reporter: taskItemPayload.reporter,
//       estimatedTime: taskItemPayload.estimatedTime,
//       usageTime: taskItemPayload.usageTime,
//       currentState: taskItemPayload.currentState,
//     };
//     // ------ 1. rest api에 post로 데이터 보냄
//     // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함
//     // 함수가 Promise를 반환하면, (비동기함수)
//     // Saga 미들웨어에서 현재 yield에 대기상태로 있음
//     // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
//     // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

//     // await api.add(photoItemRequest) 이 구문과 일치함
//     // 결과값을 형식을 지졍해야함
//     const result: AxiosResponse<TaskItemResponse> = yield call(
//       api.add,
//       taskItemRequest
//     );

//     // ------ 2. redux state를 변경함
//     // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
//     const taskItem: TaskItem = {
//       id: result.data.id,
//       summary: result.data.summary,
//       description: result.data.description,
//       reporter: result.data.reporter,
//       estimatedTime: result.data.estimatedTime,
//       usageTime: result.data.usageTime,
//       currentState: result.data.currentState,
//     };
//     // dispatcher(액션)과 동일함
//     // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
//     // put이펙트를 사용함
//     yield put(addTask(taskItem));

//     // completed 속성 삭제
//     yield put(initialCompleted());

//     // 여기 alert 박스 같은거 만들어서 알려주자
//   } catch (e: any) {
//     // 에러발생
//     console.log("Add task : Error");
//   }

//   // Redux 사이드 이펙트
//   // 1. api 연동
//   // 2. 파일처리
//   // 3. 처리중 메시지 보여주기/감추기
//   // 4. 에러메시지 띄우기
//   // 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
// }
// function* fetchData() {
//   yield console.log("--fetch Data--");

//   // 백엔드에서 데이터 받아오기
//   const result: AxiosResponse<TaskItemResponse[]> = yield call(api.fetch);

//   // 응답데이터배열을 액션페이로드배열로 변환
//   // TaskItemResponse[] => TaskItem[]
//   const tasks = result.data.map(
//     (item) =>
//       ({
//         id: item.id,
//         summary: item.summary,
//         description: item.description,
//         reporter: item.reporter,
//         estimatedTime: item.estimatedTime,
//         usageTime: item.usageTime,
//         currentState: item.currentState,
//       } as TaskItem)
//   );
//   // state 초기화 reducer 실행
//   yield put(initialTask(tasks));
// }
// // 1건의 데이터만 조회
// function* fetchDataItem(action: PayloadAction<number>) {
//   yield console.log("--fetchDataItem--");

//   const id = action.payload;
//   // 백엔드에서 데이터 받아오기
//   const result: AxiosResponse<TaskItemResponse> = yield call(api.fetch);

//   const task = result.data;
//   if (task) {
//     yield put(initialTaskItem(task));
//   }
// }
// // 수정 처리
// function* modifyData(action: PayloadAction<TaskItem>) {
//   yield console.log("--modify Data--");
//   const taskItemPayload = action.payload;

//   // rest api로 보낼 요청 객체
//   const taskItemRequest: TaskItemRequest = {
//     summary: taskItemPayload.summary,
//     description: taskItemPayload.description,
//     reporter: taskItemPayload.reporter,
//     estimatedTime: taskItemPayload.estimatedTime,
//     usageTime: taskItemPayload.usageTime,
//     currentState: taskItemPayload.currentState,
//   };

//   const result: AxiosResponse<TaskItemResponse> = yield call(
//     api.modify,
//     taskItemPayload.id,
//     taskItemRequest
//   );

//   // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
//   const taskItem: TaskItem = {
//     id: result.data.id,
//     summary: result.data.summary,
//     description: result.data.description,
//     reporter: result.data.reporter,
//     estimatedTime: result.data.estimatedTime,
//     usageTime: result.data.usageTime,
//     currentState: result.data.currentState,
//   };
//   // state 변경
//   yield put(modifyTask(taskItem));
//   // completed 속성 삭제
//   yield put(initialCompleted());
// }
// // 삭제 처리
// function* removeData(action: PayloadAction<number>) {
//   yield console.log("--delete Data--");
//   // id 값
//   const id = action.payload;
//   // rest api 연동
//   const result: AxiosResponse<boolean> = yield call(api.remove, id);
//   // 반환 값이 true 면
//   if (result.data) {
//     yield put(removeTask(id));
//   }
//   yield put(initialCompleted());
// }

// /* saga action을 감지(take)하는 부분 */
// // task redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// // saga는 generator 함수로 작성
// export default function* taskSaga() {
//   // takeEvery(처리할액션, 액션을처리할함수) : 동일한 타입의 액션은 모두 처리함
//   // takeLatest(처리할액션, 액션을처리할함수) : 동일한 타입의 액션중에서 가장 마지막 액션만 처리, 이전 액션은 취소
//   yield takeEvery(requestAddTask, addData);
//   yield takeEvery(requestFetchTaskItem, fetchDataItem);
//   yield takeLatest(requestFetchTask, fetchData);
//   yield takeEvery(requestModifyTask, modifyData);
//   yield takeEvery(requestRemoveTask, removeData);
// }
