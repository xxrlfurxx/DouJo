import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { removeTask, RemoveTaskProps } from "../../provider/modules/column";
import { TaskItem } from "../../provider/modules/task";
import { showTaskModal } from "../../provider/modules/taskModal";

// interface TaskModalProps {
//   isOn: boolean;
//   taskItemId?: Number;
// }

function TaskModal() {
  // { isOn, taskItemId }: TaskModalProps
  const columns = useSelector((state: RootState) => state.column.data);
  const tasks: TaskItem[] = [];
  columns.map((item) => item.tasks?.forEach((item) => tasks.push(item)));
  const taskModalState = useSelector((state: RootState) => state.taskModal);
  const taskItem = tasks.find((item) => item.id == taskModalState.taskItemId);

  const dispatch = useDispatch<AppDispatch>();

  const [modal, setModal] = useState<boolean>(taskModalState.isOn);

  const hideModal = () => {
    const offModal = showTaskModal({
      isOn: false,
      // taskItemId: undefined,
    });
    dispatch(offModal);
    setModal(taskModalState.isOn);
  };
  useEffect(() => {
    setModal(taskModalState.isOn);
    // console.log(tasks);
    // console.log("task modal state ↓");
    // console.log(taskModalState);
    // console.log("클릭한 task ↓");
    // console.log(taskItem);
  }, [taskModalState]);

  const currentModalState = () => {
    console.log("모달창 현재 상태 ↓");
    console.log(modal);
  };

  const modifyTask = () => {};
  const deleteTask = () => {
    if (taskItem) {
      const deleteTaskItem: RemoveTaskProps = {
        taskId: taskItem.id,
        columnId: taskItem.currentState,
      };

      console.log(taskItem.id);
      console.log(taskItem.currentState);
      dispatch(removeTask(deleteTaskItem));
      hideModal();
    }
  };

  return (
    <>
      {modal && (
        <div
          className="modal_wrap"
          // onClick={() => {
          //   hideModal();
          // }}
        >
          <div
            className="modal_content"
            // onClick={(e) => {
            //   e.preventDefault();
            // }}
          >
            <div className="modal_name">Task Detail (스타일 나중에)</div>
            <div className="form_body">
              <div className="project_milestone">
                <div className="task_project">
                  <div className="project_icon">
                    Project
                    <i className="bi bi-asterisk" />
                    <select className="form-select" id="inputGroupSelect01">
                      <option>Choose...</option>
                      {/* 리덕스로 갖고와서 map 해줘야 함 */}
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div className="task_milestone">
                  <div className="milestone_icon">
                    Milestone
                    <i className="bi bi-asterisk" />
                    <select className="form-select" id="inputGroupSelect01">
                      <option>Choose...</option>
                      {/* 리덕스로 갖고와서 map 해줘야 함 */}
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="task_summary">
                summary
                <i className="bi bi-asterisk" />
                <div className="summary_txt">{taskItem?.summary}</div>
              </div>
              <div className="task_currentState">
                current state
                <i className="bi bi-asterisk" />
                <div className="currentState_txt">{taskItem?.currentState}</div>
              </div>
              <div className="task_reporter">
                reporter
                <i className="bi bi-asterisk" />
                <div className="reporter_txt">{taskItem?.reporter}</div>
              </div>
              <div className="task_description">
                description
                <div className="description_txt">{taskItem?.description}</div>
              </div>
              <div className="task_estimatedTime">
                estimatedTime
                <i className="bi bi-asterisk" />
                <div className="estimatedTime">{taskItem?.estimatedTime}</div>
              </div>
            </div>
            <div className="modal_btn">
              <div
                className="cancel_btn"
                onClick={() => {
                  hideModal();
                }}
              >
                Cancel
              </div>
              <div
                className="delete_btn"
                onClick={() => {
                  deleteTask();
                }}
              >
                Delete
              </div>
              <div
                className="enroll_btn"
                // onClick={() => {
                //   modifyTask();
                // }}
              >
                Modify
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskModal;
