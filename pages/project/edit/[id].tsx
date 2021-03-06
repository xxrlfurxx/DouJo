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

  //   // ????????? ?????????
  //   formRef.current?.reset();
  // };

  const del = (id: number, index: number) => {
    console.log(id);
    // immer??? state ?????? ?????? ??????(index??? ??????)
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
              <th>???????????? ???</th>
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
              <th>?????????</th>
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
              <th>?????????</th>
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
                  <option value="">?????? ??????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="??????">??????</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>?????????</th>
              <td>
                <select
                  defaultValue={projectItem?.engineer}
                  className="form-select"
                  aria-label="Default select example"
                  ref={engineer}
                >
                  <option value="">?????? ??????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="??????">??????</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>????????????</th>
              <td>
                <form
                  className="d-flex"
                  ref={formRef}
                // onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder=" ????????????..."
                    ref={milestoneRef}
                  />
                  <button
                    type="button"
                    className="btn btn-primary text-nowrap"
                    onClick={() => {
                      // add();
                    }}
                  >
                    ??????
                  </button>
                </form>
                {isError && (
                  <Alert
                    message={"????????? ??????????????????."}
                    variant={"danger"}
                    // ?????? ????????? ????????? ??? ???????????? ????????? ??????
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
                            ??????
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
              <th>??????</th>
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
              ??????
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                router.push(`/project`);
              }}
            >
              <i className="bi bi-trash me-1 d-flex justify-content-right" />
              ??????
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProjectEdit;

