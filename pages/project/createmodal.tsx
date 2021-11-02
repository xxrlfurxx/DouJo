
import { useRef } from "react";
import Project from ".";
import { ProjectItemState } from "./type"

interface ModalProp {
  item: ProjectItemState;
  onClose: () => void; // 콜백함수
  onSave: (editItem: ProjectItemState) => void; // 콜백함수
}

const CreateProject = ({ item, onClose, onSave }: ModalProp) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const project: ProjectItemState = {
      id: item.id,
      projectname: item.projectname,
      startdate: item.startdate,
      enddate: item.enddate, // 수정된 입력값
      manager: item.manager,
      enginner: item.enginner,
    };

    onSave(project);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">CREATE PROJECT</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              defaultValue={item.projectname}
              className="w-100"
              ref={inputRef}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                save();
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;