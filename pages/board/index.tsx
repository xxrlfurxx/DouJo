import produce from "immer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "../../components/modal/TaskModalCreate";
import TaskModal from "../../components/modal/TaskModal";
import { AppDispatch, RootState } from "../../provider";
import { TaskItem } from "../../provider/modules/task";
import { showTaskModal } from "../../provider/modules/taskModal";
import {
  addColumn,
  addTask,
  ColumnItem,
  dropTask,
  modifyColumn,
  removeTask,
  reorderColumn,
} from "../../provider/modules/column";
import cloneDeep from "lodash/cloneDeep";

const Boards = () => {
  const column = useSelector((state: RootState) => state.column.data);
  const taskItems: TaskItem[] = [];
  column.map((item) => item.tasks?.forEach((item) => taskItems.push(item)));
  const taskModalState = useSelector((state: RootState) => state.taskModal);

  const dispatch = useDispatch<AppDispatch>();

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    console.log(result);

    const draggedIndex = result.source.index; // 드래그한 컬럼 내 tasks 배열 index
    const draggedColumnId = Number(result.source.droppableId);
    // 드래그한 column
    const draggedColumn = column.find((item) => item.id == draggedColumnId);
    const droppedIndex = result.destination.index; // 드랍한 컬럼 내 tasks 배열 index
    const droppedColumnId = Number(result.destination.droppableId);
    // 드랍한 column
    const droppedColumn = column.find((item) => item.id == droppedColumnId);
    const draggedTaskId = Number(result.draggableId);
    // 드래그한 task
    const draggedTask = taskItems.find((item) => item.id == draggedTaskId);
    // 드랍한 task
    // if(draggedTask){
    //   const droppedTask: TaskItem = {
    //     id: draggedTask.id,
    //     summary: draggedTask.summary,
    //     reporter: draggedTask.reporter,
    //     description: draggedTask.description,
    //     estimatedTime: draggedTask.estimatedTime,
    //     usageTime: draggedTask.usageTime,
    //     currentState: draggedTask.currentState,
    //   }
    // }

    // 드래그한 column 변경
    if (draggedTask) {
      dispatch(
        removeTask({
          taskId: draggedTask.id,
          columnId: draggedTask.currentState,
        })
      );
    }

    // 드랍한 column을 변경
    if (draggedTask) {
      const droppedTask: TaskItem = {
        id: draggedTask.id,
        summary: draggedTask.summary,
        reporter: draggedTask.reporter,
        description: draggedTask.description,
        estimatedTime: draggedTask.estimatedTime,
        usageTime: draggedTask.usageTime,
        currentState: droppedColumnId,
      };
      dispatch(dropTask({ taskIndex: droppedIndex, taskItem: droppedTask }));
    }
  };

  // 상세보기 modal 관련 로직
  const showModal = (clickedId?: Number) => {
    const offModal = showTaskModal({
      isOn: true,
      taskItemId: clickedId,
    });
    dispatch(offModal);
  };

  useEffect(() => {
    // setColumn(columnWIthTask);
    currentColumnState();
  }, [column, taskModalState]); // taskModalState 지워도됨, taskModal 자체적으로 useEffect 해놓음

  const currentColumnState = () => {
    // column에 task 넣은 데이터 콘솔창 출력 함수
    console.log("---- ↓ Column ----");
    console.log(column);
  };

  return (
    <div className="board">
      <TaskModal />
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
            <ModalCreate />
          </div>
          <div className="features_btn">
            <div className="board_btn">
              <i className="bi bi-plus-lg" />
              State
            </div>
          </div>
        </div>
        <div className="taskboard">
          {column.map((column, index) => {
            return (
              // draggable 넣어서 column 배열 조작
              <div className="taskboard_column" key={index + column.name}>
                <div className="column_name">
                  <div onClick={() => {}}>{column.name}</div>
                  <div className="column_detail" onClick={() => {}}>
                    <i className="bi bi-three-dots" />
                  </div>
                </div>
                <Droppable droppableId={String(column.id)} key={column.name}>
                  {(provided) => (
                    <div
                      key={column.id + column.name}
                      className="task_columnBox"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {column.tasks &&
                        column.tasks.map((item, index) => (
                          <Draggable
                            key={index + item.reporter + item.summary}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="tasks"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div
                                  className="task_wrap"
                                  onClick={() => {
                                    showModal(item.id);
                                  }}
                                >
                                  <div className="task_summary">
                                    {item.summary}
                                  </div>
                                  <div className="task_description">
                                    <div className="task_estimatedTime">
                                      {/* {item.estimatedTime} */}
                                    </div>
                                    <div className="task_reporter_thumb"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              // draggable 넣어서 column 배열 조작
            );
          })}
          <div className="edit-task-state"></div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Boards;
