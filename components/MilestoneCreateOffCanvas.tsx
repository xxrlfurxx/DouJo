import { Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import { MutableRefObject, useRef, useState } from "react";
import { addProject, MilestonItem } from "../provider/modules/project";
import produce from "immer";
import { ProjectItem } from "../provider/modules/project";
import { useRouter } from "next/router";


interface MilestoneCreateOffCanvasProp {
  show: boolean;
  onHide: () => void;
  selectedId: number;
}

function MilestoneCreateOffCanvas({
  show,
  onHide,
  selectedId,
}: MilestoneCreateOffCanvasProp) {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const projectItem = useSelector((state: RootState) =>
    state.project.data.find((item) => item.id === selectedId)
  );

  const [milestoneList, setMilestoneList] = useState<MilestonItem[]>([])

  const milestoneRef = useRef() as MutableRefObject<HTMLInputElement>;
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;
  const ulRef = useRef() as MutableRefObject<HTMLUListElement>;

  const handleAddClick = () => {
    const item: ProjectItem = {
      id: projectItem.length > 0 ? projectItem[0].id + 1 : 1,
      milestone: milestoneRef.current.value,
      projectname: "",
      startdate: "",
      enddate: "",
      manager: "",
      engineer: "",
      memo: ""
    };
    dispatch(addProject(item));
    router.push(`/project`);
  };

  const add = () => {
    const milestone: MilestonItem = {
      id: milestoneList.length > 0 ? milestoneList[0].id + 1 : 1,
      milestone: milestoneRef.current.value,

    };
    setMilestoneList(
      produce((state) => {
        state.unshift(milestone);
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
  };

  const del = (id: number, index: number) => {
    console.log(id);
    // immer로 state 배열 직접 조작(index로 삭제)
    setMilestoneList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mx-auto">
            <h2 className="text-center my-5">마일스톤 추가</h2>
            <form
              className="d-flex"
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="form-control me-2"
                placeholder="마일 스톤 ..."
                ref={milestoneRef}
              />
              <button
                type="button"
                className="btn btn-primary text-nowrap"
                onClick={() => {
                  add();
                }}
              >
                추가
              </button>
            </form>
            <ul id="ul-list" className="list-group list-group-flush mt-3" ref={ulRef}>
              {/* 데이터와 UI요소 바인딩 */}
              {milestoneList.map((item, index) => (
                <li className="list-group-item d-flex" key={item.id}>
                  <div className="w-100">
                    <span className="me-1">{item.milestone}</span>

                  </div>

                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      del(item.id, index);
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
            <div className="d-flex">
              <div style={{ width: "50%" }}>
                {/* <button
                  className="btn btn-secondary me-1"
                  onClick={() => {
                    router.push(`/project`);
                  }}
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>
                  목록
                </button> */}
              </div>
              <div
                style={{ width: "50%" }}
                className="d-flex justify-content-end"
              >
                <button
                  className="btn btn-primary me-1"
                  onClick={() => {
                    onHide();
                  }}
                >
                  <i className="bi bi-trash me-1 d-flex justify-content-right" />
                  취소
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleAddClick();
                    onHide();
                  }}
                >
                  <i className="bi bi-pencil me-1" />
                  저장
                </button>
              </div>
            </div>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default MilestoneCreateOffCanvas;
