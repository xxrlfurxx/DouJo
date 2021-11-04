import { useRouter } from "next/router";
import React, { useState } from "react";
import ProjectModal from '../../components/ProjectModal';
import ProjectDetailOffCanvas from '../../components/ProjectDetailOffCanvas';



interface StateProps {
  id: number;
  projectname: string;
  milestone: string;
  startdate: string;
  enddate: string;
  manager: string;
  enginner: string;
}

function Project() {
  const [projectState, setprojectState] = useState<StateProps[]>([
    {
      id: 1,
      projectname: "협업툴 만들기1",
      milestone: "board제작",
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "강윤석",
      enginner: "강윤석",
    },
    {
      id: 2,
      projectname: "협업툴 만들기2",
      milestone: "wiki제작",
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "이준희",
      enginner: "이준희",
    },
    {
      id: 3,
      projectname: "협업툴 만들기3",
      milestone: "프로젝트 뷰 제작",
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "허준",
      enginner: "허준",
    }
  ]);


  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  const [modalShow, setModalShow] = React.useState(false);


  return (
    <>
      <div className="mb-2"></div>
      <div style={{ width: "80vw" }} className="mx-auto">
        <h2 className="text-center">프로젝트 목록</h2>
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-primary"
            onClick={() => setModalShow(true)}
          >
            <i className="bi bi-plus" />
            생성
          </button>
          <ProjectModal show={modalShow} onHide={() => { setModalShow(false) }} />

        </div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "5%" }}>
                  No
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  프로젝트명
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  마일스톤
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  시작일
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  종료일
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  PM
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  담당자
                </th>
              </tr>
            </thead>
            <tbody>
              {projectState.map((item) => (
                <tr
                  style={{ cursor: "pointer" }}
                  className="projectList" key={item.id}
                >
                  <th scope="row">{item.id}</th>
                  <td>{item.projectname}</td>
                  <td>{item.milestone}</td>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.manager}</td>
                  <td>{item.enginner}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>생성된 프로젝트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <a href="#!" className="link-secondary fs-6 text-nowrap">More</a>
      </div>
    </>
  );
}



export default Project;
