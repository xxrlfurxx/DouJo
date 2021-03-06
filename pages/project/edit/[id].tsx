import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { MutableRefObject, useRef, useState, useEffect } from "react";
import Alert from "../../../components/Alert";
import produce from "immer";
import { modifyProject, ProjectItem } from "../../../provider/modules/project";

interface MilestoneState {
  id: number;
  milestone: string | undefined;
}


const ProjectEdit = () => {
  const [milestoneList, setMilestoneList] = useState<MilestoneState[]>([]);

  const router = useRouter();

  const id = router.query.id as string

  const [isError, setIsError] = useState(false);

  const projectItem = useSelector((state: RootState) =>
    state.project.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.project.isModifyCompleted
  );


  const dispatch = useDispatch<AppDispatch>();

  const projectname = useRef() as MutableRefObject<HTMLInputElement>;
  const startdate = useRef() as MutableRefObject<HTMLInputElement>;
  const enddate = useRef() as MutableRefObject<HTMLInputElement>;
  const manager = useRef() as MutableRefObject<HTMLSelectElement>;
  const engineer = useRef() as MutableRefObject<HTMLSelectElement>;
  const memo = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const milestoneRef = useRef() as MutableRefObject<HTMLInputElement>;
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;
  const trRef = useRef() as MutableRefObject<HTMLTableRowElement>;


  useEffect(() => {
    isModifyCompleted && router.push("/project");
  }, [isModifyCompleted, router]);

  const handleSaveClick = () => {
    if (projectItem) {
      const item = { ...projectItem };
      item.projectname = projectname.current.value;
      item.startdate = startdate.current.value;
      item.enddate = enddate.current.value;
      item.manager = manager.current.value;
      item.engineer = engineer.current.value;
      item.milestone = milestoneRef.current.value;
      item.memo = memo.current.value;

      saveItem(item);
    }
  };
  const saveItem = (item: ProjectItem) => {
    dispatch(modifyProject(item));
  };

  // const add = () => {
  //   const milestone: MilestoneState = {
  //     id: milestoneList.length > 0 ? milestoneList[0].id + 1 : 1,
  //     milestone: milestoneRef.current.value,
  //   };
  //   setMilestoneList(
  //     produce((state) => {
  //       state.unshift(milestone);
  //     })
  //   );

  //   // 입력값 초기화
  //   formRef.current?.reset();
  // };

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
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Project Edit</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>프로젝트 명</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={projectItem?.projectname}
                  ref={projectname}
                />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={projectItem?.startdate}
                  ref={startdate}
                />
              </td>
            </tr>
            <tr>
              <th>종료일</th>
              <td>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={projectItem?.enddate}
                  ref={enddate}
                />
              </td>
            </tr>
            <tr>
              <th>PM</th>
              <td>
                <select
                  defaultValue={projectItem?.manager}
                  className="form-select"
                  aria-label="Default select example"
                  ref={manager}
                >
                  <option value="">선택 안함</option>
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>
                <select
                  defaultValue={projectItem?.engineer}
                  className="form-select"
                  aria-label="Default select example"
                  ref={engineer}
                >
                  <option value="">선택 안함</option>
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>마일스톤</th>
              <td>
                <form
                  className="d-flex"
                  ref={formRef}
                // onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder=" 마일스톤..."
                    ref={milestoneRef}
                  />
                  <button
                    type="button"
                    className="btn btn-primary text-nowrap"
                    onClick={() => {
                      // add();
                    }}
                  >
                    추가
                  </button>
                </form>
                {isError && (
                  <Alert
                    message={"내용을 입력해주세요."}
                    variant={"danger"}
                    // 닫기 버튼을 클릭할 때 처리하는 함수를 넘김
                    onClose={() => {
                      setIsError(false);
                    }}
                  />
                )}
                <table>
                  <tbody>
                    {milestoneList.map((item, index) => (
                      <tr ref={trRef}>
                        <td>{milestoneRef}</td>
                        <td>
                          <button
                            className="btn btn-outline-secondary btn-sm text-nowrap"
                            onClick={() => {
                              del(item.id, index);
                            }}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr></tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "15vh" }}
                  defaultValue={projectItem?.memo}
                  ref={memo}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
                handleSaveClick();
              }}
            >
              <i className="bi bi-pencil me-1 d-flex justify-content-right" />
              저장
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                router.push(`/project`);
              }}
            >
              <i className="bi bi-trash me-1 d-flex justify-content-right" />
              취소
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProjectEdit;

