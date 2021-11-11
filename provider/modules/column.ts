import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "./task";

export interface ColumnItem {
  id: number;
  name: string;
  tasks?: TaskItem[];
}

interface ColumnState {
  data: ColumnItem[];
  isFetched: boolean;
  isAddCompleted?: boolean;
  isModifyCompleted?: boolean;
  isReorderCompleted?: boolean;
  isRemoveCompleted?: boolean;
  isAddTaskCompleted?: boolean;
  isModifyTaskCompleted?: boolean;
  isRemoveTaskCompleted?: boolean;
}

export interface RemoveTaskProps {
  columnId: Number;
  taskId: Number;
}

interface DropItem {
  taskIndex: number;
  taskItem: TaskItem;
}

const initialState: ColumnState = {
  data: [
    {
      id: 1,
      name: "Backlog",
      tasks: [
        {
          id: 1,
          summary:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. _ backlog",
          description: "Description for Test-Task-1",
          reporter: "강윤석",
          estimatedTime: 1,
          // usageTime:
          currentState: 1,
        },
        {
          id: 11,
          summary: "This is Test 1 summary _ backlog",
          description: "Description for Test-Task-1",
          reporter: "강윤석",
          estimatedTime: 1,
          // usageTime:
          currentState: 1,
        },
      ],
    },
    {
      id: 2,
      name: "Selected",
      tasks: [
        {
          id: 2,
          summary: "This is Test 2 summary _ selected",
          description: "Description for Test-Task-2",
          reporter: "허준",
          estimatedTime: 2,
          // usageTime:
          currentState: 2,
        },
      ],
    },
    {
      id: 3,
      name: "In progress",
      tasks: [
        {
          id: 3,
          summary: "This is Test 3 summary _ in progress",
          description: "Description for Test-Task-3",
          reporter: "이준희",
          estimatedTime: 3,
          // usageTime:
          currentState: 3,
        },
      ],
    },
    {
      id: 4,
      name: "Done",
      tasks: [
        {
          id: 4,
          summary:
            "Lorem ipsum dolor sit amet consectetur adipisicing eli. __ Done",
          description: "Description for Test-Task-33",
          reporter: "이준희",
          estimatedTime: 3,
          // usageTime:
          currentState: 4,
        },
      ],
    },
    {
      id: 5,
      name: "Bug",
      tasks: [
        {
          id: 5,
          summary: "Lorem ipsum dolor sit amet consectetur __ Bug",
          description: "Description for Test-Task-3",
          reporter: "이준희",
          estimatedTime: 3,
          // usageTime:
          currentState: 5,
        },
      ],
    },
  ],
  isFetched: false,
};

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    // column
    addColumn: (state, action: PayloadAction<ColumnItem>) => {
      const column = action.payload;
      state.data.push(column);
      state.isAddCompleted = true;
    },
    modifyColumn: (state, action: PayloadAction<ColumnItem>) => {
      const modifyItem = action.payload;
      const columnItem = state.data.find((item) => item.id == modifyItem.id);
      if (columnItem) {
        columnItem.id = modifyItem.id;
        columnItem.name = modifyItem.name;
        columnItem.tasks = modifyItem.tasks;
      }
      state.isModifyCompleted = true;
    },
    reorderColumn: (state, action: PayloadAction<ColumnItem[]>) => {
      const reorderedItems = action.payload;
      state.data = [...reorderedItems];
      console.log(state.data);
      state.isReorderCompleted = true;
    },
    removeColumn: (state, action: PayloadAction<Number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id == id),
        1
      );
      state.isRemoveCompleted = true;
    },
    initialColumn: (state, action: PayloadAction<ColumnItem[]>) => {
      const columns = action.payload; // 백엔드에서 받아온 column
      state.data = columns;
      state.isFetched = true;
    },
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    // task
    addTask: (state, action: PayloadAction<TaskItem>) => {
      const taskItem = action.payload;
      const parentColumn = state.data.find(
        (item) => item.id == taskItem.currentState
      );
      if (parentColumn) {
        parentColumn.tasks?.unshift(taskItem);
      }
      console.log(taskItem);
      state.isAddTaskCompleted = true;
    },
    modifyTask: (state, action: PayloadAction<TaskItem>) => {
      const modifyItem = action.payload;
      const parentColumn = state.data.find(
        (item) => item.id == modifyItem.currentState
      );
      const taskItem = parentColumn?.tasks?.find(
        (item) => item.id == modifyItem.id
      );
      if (taskItem) {
        taskItem.summary = modifyItem.summary;
        taskItem.reporter = modifyItem.reporter;
        taskItem.description = modifyItem.description;
        taskItem.estimatedTime = modifyItem.estimatedTime;
        taskItem.usageTime = modifyItem.usageTime;
        taskItem.currentState = modifyItem.currentState;
      }
      state.isModifyTaskCompleted = true;
    },
    dropTask: (state, action: PayloadAction<DropItem>) => {
      const taskIndex = action.payload.taskIndex;
      const taskItem = action.payload.taskItem;
      const parentColumn = state.data.find(
        (item) => item.id == taskItem.currentState
      );
      parentColumn?.tasks?.splice(taskIndex, 0, taskItem);
    },
    removeTask: (state, action: PayloadAction<RemoveTaskProps>) => {
      const id = action.payload.taskId;
      const currentStateId = action.payload.columnId;
      const parentColumn = state.data.find((item) => item.id == currentStateId);
      if (parentColumn) {
        parentColumn.tasks?.splice(
          parentColumn.tasks?.findIndex((item) => item.id == id),
          1
        );
        console.log("아이디 아래");
        console.log(id);
        state.isRemoveTaskCompleted = true;
      }
    },
  },
});

export const {
  addColumn,
  addTask,
  modifyColumn,
  modifyTask,
  dropTask,
  reorderColumn,
  removeColumn,
  removeTask,
  initialColumn,
  initialCompleted,
} = columnSlice.actions;

export default columnSlice.reducer;
