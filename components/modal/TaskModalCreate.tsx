import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { TaskItem } from "../../provider/modules/task";
import { addTask } from "../../provider/modules/column";

// interface ModalProps {
//   summary: string;
//   description?: string;
//   reporter: string;
//   estimatedTime: number;
//   usageTime?: number;
//   currentState: number;
//   activeModal: boolean;
// }

const ModalCreate = () => {
  const columns = useSelector((state: RootState) => state.column.data);
  const tasks: TaskItem[] = [];
  columns.map((item) => item.tasks?.forEach((item) => tasks.push(item)));
  const dispatch = useDispatch<AppDispatch>();

  const isAddCompleted = useSelector(
    (state: RootState) => state.column.isAddTaskCompleted
  );

  const summaryRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const reporterRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const estimatedTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const usageTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const currentStateRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const currentStateId = columns.find((item) => {
  //   item.name = currentStateRef.current.value;
  // })?.id;

  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const enrollTask = () => {
    if (
      summaryRef.current.value.length &&
      reporterRef.current.value.length &&
      estimatedTimeRef.current.value.length &&
      currentStateRef.current.value.length
    ) {
      const task: TaskItem = {
        id: tasks.length > 0 ? tasks.length : 1,
        summary: summaryRef.current.value,
        reporter: reporterRef.current.value,
        description: descriptionRef.current?.value,
        estimatedTime: Number(estimatedTimeRef.current.value),
        currentState: Number(currentStateRef.current.value),
      };
      dispatch(addTask(task));
      toggleModal();
    } else {
      alert("Please enter the required values");
    }
  };
  useEffect(() => {
    isAddCompleted;
    console.log(currentStateRef);
    console.log(tasks);
  }, [isAddCompleted, modal]);

  return (
    <>
      <div
        className="board_btn"
        onClick={() => {
          toggleModal();
        }}
      >
        <i className="bi bi-plus-lg" />
        Task
      </div>
      {modal && (
        <div className="modal_wrap">
          <div className="modal_content">
            <div className="modal_name">Create Task (스타일 나중에)</div>
            <div className="form_body">
              <div className="project_milestone">
                <div className="task_project">
                  <div className="project_icon">
                    Project
                    <i className="bi bi-asterisk" />
                    <select className="form-select" id="inputGroupSelect01">
                      <option>Choose...</option>
                      {/* 리덕스로 갖고와서 map 해줘야 함 */}
                      <option value="1">project from redux_1</option>
                      <option value="2">project from redux_2</option>
                      <option value="3">project from redux_3</option>
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
                      <option value="1">milestone from redux_1</option>
                      <option value="2">milestone from redux_2</option>
                      <option value="3">milestone from redux_3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="task_summary">
                summary
                <i className="bi bi-asterisk" />
                <input
                  className="form-control"
                  type="text"
                  placeholder="summary"
                  ref={summaryRef}
                />
              </div>
              <div className="task_currentState">
                current state
                <i className="bi bi-asterisk" />
                <input
                  className="form-control"
                  type="text"
                  placeholder="...hours"
                  ref={currentStateRef}
                />
                {/* <select>
                  {columns.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.id}
                      </option>
                    );
                  })}
                </select> */}
              </div>
              <div className="task_reporter">
                reporter
                <i className="bi bi-asterisk" />
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  ref={reporterRef}
                >
                  {/* 리덕스로 갖고와서 map 해줘야 함 */}
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </div>
              <div className="task_description">
                description
                <form>
                  <textarea
                    className="form-control mb-1 w-100"
                    placeholder="..."
                    ref={descriptionRef}
                  />
                </form>
              </div>
              <div className="task_estimatedTime">
                estimatedTime
                <i className="bi bi-asterisk" />
                <input
                  className="form-control"
                  type="text"
                  placeholder="...hours"
                  ref={estimatedTimeRef}
                />
              </div>
            </div>
            <div className="modal_btn">
              <div
                className="cancel_btn"
                onClick={() => {
                  toggleModal();
                }}
              >
                {/* <i className="bi bi-x" /> */}
                Cancel
              </div>
              <div
                className="enroll_btn"
                onClick={() => {
                  enrollTask();
                }}
              >
                {/* <i className="bi bi-check" /> */}
                Enroll
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCreate;
