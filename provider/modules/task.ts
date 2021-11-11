// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// task Slice

export interface TaskItem {
  id: number;
  summary: string;
  description?: string;
  reporter: string;
  estimatedTime: number;
  usageTime?: number;
  currentState: number;
}

// interface TaskState {
//   data: TaskItem[];
//   isFetched: boolean;
//   isAddCompleted?: boolean;
//   isModifyCompleted?: boolean;
//   isRemoveCompleted?: boolean;
// }
// const initialState: TaskState = {
//   data: [
//     {
//       id: 1,
//       summary:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. _ backlog",
//       description: "Description for Test-Task-1",
//       reporter: "강윤석",
//       estimatedTime: 1,
//       // usageTime:
//       currentState: 1,
//     },
//     {
//       id: 11,
//       summary: "This is Test 1 summary _ backlog",
//       description: "Description for Test-Task-1",
//       reporter: "강윤석",
//       estimatedTime: 1,
//       // usageTime:
//       currentState: 1,
//     },
//     {
//       id: 2,
//       summary: "This is Test 2 summary _ selected",
//       description: "Description for Test-Task-2",
//       reporter: "허준",
//       estimatedTime: 2,
//       // usageTime:
//       currentState: 2,
//     },
//     {
//       id: 3,
//       summary: "This is Test 3 summary _ in progress",
//       description: "Description for Test-Task-3",
//       reporter: "이준희",
//       estimatedTime: 3,
//       // usageTime:
//       currentState: 3,
//     },
//     {
//       id: 4,
//       summary:
//         "Lorem ipsum dolor sit amet consectetur adipisicing eli. __ Done",
//       description: "Description for Test-Task-33",
//       reporter: "이준희",
//       estimatedTime: 3,
//       // usageTime:
//       currentState: 3,
//     },
//     {
//       id: 5,
//       summary: "Lorem ipsum dolor sit amet consectetur __ Bug",
//       description: "Description for Test-Task-3",
//       reporter: "이준희",
//       estimatedTime: 3,
//       // usageTime:
//       currentState: 4,
//     },
//   ],
//   isFetched: false,
// };

// const taskSlice = createSlice({
//   name: "task",
//   initialState,
//   reducers: {
//     // PayloadAction<payload타입>
//     // payload로 item객체를 받음
//     addTask: (state, action: PayloadAction<TaskItem>) => {
//       const task = action.payload;
//       state.data.push(task);
//       state.isAddCompleted = true;
//     },
//     modifyTask: (state, action: PayloadAction<TaskItem>) => {
//       // 생성해서 넘긴 객체
//       const modifyItem = action.payload;
//       // state에 있는 객체
//       const taskItem = state.data.find((item) => item.id === modifyItem.id);
//       // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
//       if (taskItem) {
//         taskItem.id = modifyItem.id;
//         taskItem.summary = modifyItem.summary;
//         taskItem.description = modifyItem.description;
//         taskItem.reporter = modifyItem.reporter;
//         taskItem.estimatedTime = modifyItem.estimatedTime;
//         taskItem.usageTime = modifyItem.usageTime;
//         taskItem.currentState = modifyItem.currentState;
//       }
//       state.isModifyCompleted = true; // 변경 되었음을 표시
//     },
//     // payload로 id값을 받음
//     // action: PayloadAction<number>
//     // reducer 넘어오는 action은 payload있는 액션인데,
//     // payload의 타입이 number이다.
//     removeTask: (state, action: PayloadAction<Number>) => {
//       const id = action.payload;
//       // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
//       state.data.splice(
//         state.data.findIndex((item) => item.id === id),
//         1
//       );
//       state.isRemoveCompleted = true; // 삭제 되었음을 표시
//     },
//     // payload 없는 reducer
//     // completed 관련된 속성을 삭제함(undefined 상태)
//     initialCompleted: (state) => {
//       delete state.isAddCompleted;
//       delete state.isRemoveCompleted;
//       delete state.isModifyCompleted;
//     },
//     initialTaskItem: (state, action: PayloadAction<TaskItem>) => {
//       const task = action.payload;
//       // 백엔드에서 받아온 데이터
//       state.data = [{ ...task }];
//     },
//     // payload값으로 state를 초기화하는 reducer 필요함
//     initialTask: (state, action: PayloadAction<TaskItem[]>) => {
//       const tasks = action.payload;
//       // 백엔드에서 받아온 데이터
//       state.data = tasks;
//       // 데이터를 받아옴으로 값을 남김
//       state.isFetched = true;
//     },
//   },
// });

// export const {
//   addTask,
//   removeTask,
//   modifyTask,
//   initialTaskItem,
//   initialTask,
//   initialCompleted,
// } = taskSlice.actions;

// export default taskSlice.reducer;
