import { useRouter } from "next/router";
import React, { useState } from "react";
import ProjectModal from '../../components/ProjectModal';
import { useSelector } from "react-redux";
import { RootState } from "../../provider";


function Project() {
  const project = useSelector((state: RootState) => state.project);

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
              {project.data.map((item, index) => (
                <tr
                  key={`project-tr-${index}`}
                  className="table"
                  style={{ cursor: "pointer" }}
                  onClick={() => {

                  }}
                >
                  <th scope="row"></th>
                  <td>{item.projectname}</td>
                  <td>{item.milestone}</td>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.manager}</td>
                  <td>{item.engineer}</td>
                </tr>
              ))}

            </tbody>
            {!project.data.length && (
              <tfoot>
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>생성된 프로젝트가 없습니다.</td>
                </tr>
              </tfoot>
            )}
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