import { useRouter } from "next/router";
import React, { useState } from "react";
import ProjectModal from '../../components/ProjectModal';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { ProjectItem } from "../../provider/modules/project";
import { useEffect, useRef } from "react";



const Project = () => {
  const [projectList, setProjectList] = useState<ProjectItem[]>([
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

  const project = useSelector((state: RootState) => state.project);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!project.isFetched) {
      const projectPageSize = localStorage.getItem("project_page_size");

      dispatch(
        requestFetchPagingProjectos({
          page: 0,
          size: projectPageSize ? +projectPageSize : project.pageSize,
        })
      );
    }
  }, [dispatch, project.isFetched, project.pageSize]);

  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    // setCurrentPage(page);
    dispatch(
      requestFetchPagingProjects({
        page,
        size: project.pageSize,
      })
    );
  };

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingProjects({
        page: project.page,
        size: +e.currentTarget.value,
      })
    );
  };

}
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
            {projectList.map((item) => (
              <tr
                style={{ cursor: "pointer" }}
                className="projectList" key={item.id}
                onClick={() => {
                  // id값을 물고 이동해야함
                  router.push(`/project/detail/${item.id}`);
                }}
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
              {(!project.isFetched || project.data.length === 0) && (
                <td colSpan={8} style={{ textAlign: "center" }}>생성된 프로젝트가 없습니다.</td>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    {!project.isLast && (
      <div className="d-flex justify-content-center mt-4">
        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault(); // 기본 동작 방지
            dispatch(
              requestFetchNextPhotos({
                page: project.page + 1,
                size: project.pageSize,
              })
            );
          }}
          className="link-secondary fs-6 text-nowrap"
        >
          More
        </a>
      </div>
    )}
  </>
);
        }




export default Project;
