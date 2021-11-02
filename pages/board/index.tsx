import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface StateProps {
  id: number;
  name: string;
}

function Boards() {
  const [taskState, setTaskState] = useState<StateProps[]>([
    { id: 1, name: "Backlog" },
    { id: 2, name: "Selected" },
    { id: 3, name: "In progress" },
    { id: 4, name: "Done" },
    { id: 5, name: "Bug" },
  ]);

  return (
    <div className="board">
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
          <div className="board_btn">
            <i className="bi bi-plus-lg" />
            State
          </div>
        </div>
      </div>
      <div className="d-flex">
        {taskState.map((item) => (
          <div className="taskboard" key={item.id}>
            <div className="task-state-name">
              <div>{item.name}</div>
              <div>
                <i className="bi bi-three-dots" />
              </div>
            </div>
            <div className="tasks">Task data</div>
            <div className="tasks">Task data2</div>
            <div className="tasks">Task data3</div>
          </div>
        ))}
        <div className="edit-task-state"></div>
      </div>
    </div>
  );
}

export default Boards;
