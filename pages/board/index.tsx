import produce from "immer";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
// import style from "../../styles/board.module.scss";

interface ColumnProps {
  id: string;
  // RBD 라이브러리에서 id 값 참조해가야하는데 그곳 id값이 string
  name: string;
  items?: {
    id: number;
    summary: string;
    description: string;
    reporter: string;
    estimatedTime: number;
    usageTime?: number;
    currentState: number;
  }[];
}
interface TaskProps {
  id: number;
  summary: string;
  description: string;
  reporter: string;
  estimatedTime: number;
  usageTime?: number;
  currentState: number; // 현재 상태를 상태열(컬럼)의 id값으로 갖고올 것
}
// 컬럼 기본값
const defaultColumn: ColumnProps[] = [
  { id: "1", name: "Backlog", items: [] },
  { id: "2", name: "Selected", items: [] },
  { id: "3", name: "In progress", items: [] },
  { id: "4", name: "Done", items: [] },
  { id: "5", name: "Bug", items: [] },
];
// task 목업
const tasksFromBackend: TaskProps[] = [
  {
    id: 1,
    summary: "This is Test 1 summary _ backlog",
    description: "Description for Test-Task-1",
    reporter: "강윤석",
    estimatedTime: 1,
    // usageTime:
    currentState: 1,
  },
  {
    id: 2,
    summary: "This is Test 2 summary _ selected",
    description: "Description for Test-Task-2",
    reporter: "허준",
    estimatedTime: 2,
    // usageTime:
    currentState: 2,
  },
  {
    id: 3,
    summary: "This is Test 3 summary _ in progress",
    description: "Description for Test-Task-3",
    reporter: "이준희",
    estimatedTime: 3,
    // usageTime:
    currentState: 3,
  },
];

function Boards() {
  // column 상태 관리
  const [column, setColumn] = useState<ColumnProps[]>(defaultColumn);

  // task 상태 관리
  const [task, setTask] = useState<TaskProps[]>(tasksFromBackend);
  // task의 currentState 출력 함수
  const taskCurrentState = () => {
    task.filter((item) => item.currentState == 1);
  };
  const taskCurrentState2 = () => {
    document.querySelector(".board > .taskboard");
  };
  // task-state 추가 함수
  const addColumn = () => {};
  // task-state 삭제 함수
  const deleteColumn = () => {};

  function handleOnDragEnd(result: object) {
    const items = Array.from(task);
    console.log(task);
    console.log(result);
  }

  return (
    <div className="board">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <h2>Task Board</h2>
        </div>
        <div className="features">
          <div className="search_task">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="features_btn">
            <div className="board_btn">Only My Tasks</div>
          </div>
          <div className="features_btn">
            <div className="board_btn">
              <i className="bi bi-plus-lg" />
              Task
            </div>
          </div>
          <div className="features_btn">
            <div
              className="board_btn"
              onClick={() => {
                addColumn();
              }}
            >
              <i className="bi bi-plus-lg" />
              State
            </div>
          </div>
        </div>
        <div className="taskboard">
          {column.map((column) => {
            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    className="taskboard_column"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="column_name">
                      <div>{column.name}</div>
                      <div className="column_detail" onClick={() => {}}>
                        <i className="bi bi-three-dots" />
                      </div>
                    </div>
                    {task.map(
                      (item, index) =>
                        item.currentState == Number(column.id) && (
                          <Draggable
                            key={item.id}
                            draggableId={item.summary + item.reporter}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="tasks"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div className="task_summary">
                                  {item.summary}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
          <div className="edit-task-state"></div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Boards;
