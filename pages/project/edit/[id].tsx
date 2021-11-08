import produce from "immer";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Alert from "../../../components/Alert";
import { ProjectItem } from "../../../components/projectSlice";



const ProjectEdit = () => {

  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  const [projectList, setProjectList] = useState<ProjectItem[]>([]);

  const [isError, setIsError] = useState(false);

  const milestone = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const trRef = useRef<HTMLTableRowElement>(null);



  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    // 이벤트 객체가 있을 때는 입력박스에서 엔터 입력
    if (e) {
      if (e.code !== "Enter") return;
    }

    // 입력값이 없으면 에러 메시지 표시
    if (!milestone.current?.value) {
      setIsError(true);
      return;
    }

    const project: ProjectItem = {
      id: projectList.length > 0 ? projectList[0].id + 1 : 1,
      // optional chaning
      milestone: milestone.current?.value,
      projectname: "",
      startdate: "",
      enddate: "",
      manager: "",
      engineer: "",
      memo: ""
    };
    setProjectList(
      // produce(([draftstate변수]) => {draft state 변수 조작})
      // 반환 객체는 변경된 state(next state)
      produce((state) => {
        // draft state 배열에 추가
        // draft state의 타입은 TodoItemState[]
        state.unshift(project);
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
    // 에러 메시지 제거
    setIsError(false);
  };

  const del = (id: number, index: number) => {
    console.log(id);

    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외하고 새로운 배열로 리턴함.
    // immer 없이 사용
    // setTodoList(todoList.filter((item) => item.id !== id));

    // immer로 state 배열 직접 조작
    // setTodoList(
    //   produce((state) => {
    //     // id로 해당 item을 찾음
    //     const item = state.find((item) => item.id === id);
    //     if (item) {
    //       // 해당 item의 index로 배열에서 삭제
    //       state.splice(state.indexOf(item), 1);
    //     }
    //   })
    // );

    // immer로 state 배열 직접 조작(index로 삭제)
    setProjectList(
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
                <input className="form-control" type="text" />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td>
                <input className="form-control" type="date" />
              </td>
            </tr>
            <tr>
              <th>종료일</th>
              <td>
                <input className="form-control" type="date" />
              </td>
            </tr>
            <tr>
              <th>PM</th>
              <td>
                <select defaultValue="default" className="form-select" aria-label="Default select example">
                  <option selected>관리자</option>
                  <option value="1">강윤석</option>
                  <option value="2">이준희</option>
                  <option value="3">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>
                <select defaultValue="default" className="form-select" aria-label="Default select example">
                  <option selected>담당자</option>
                  <option value="1">강윤석</option>
                  <option value="2">이준희</option>
                  <option value="3">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                마일스톤
              </th>
              <td>
                <form
                  className="d-flex"
                  ref={formRef}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder=" 마일스톤..."
                    ref={milestone}
                    onKeyPress={(e) => {
                      add(e);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary text-nowrap"
                    onClick={() => {
                      add(null);
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
                    {projectList.map((item, index) => (
                      <tr ref={trRef} key={item.id}>
                        <td>{item.milestone}</td>
                        <td>
                          <button className="btn btn-outline-secondary btn-sm text-nowrap"
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
            <tr>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea className="form-control" style={{ height: "15vh" }}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
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