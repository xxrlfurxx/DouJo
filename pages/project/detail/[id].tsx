import { useRouter } from "next/router";


const ProjectDetail = () => {
  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);




  return (
    <>
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Project Detail</h2>
        <div className="text-center my-5">데이터가 없습니다.</div>
        <table className="table">
          <tbody>
            <tr>
              <th>프로젝트 명</th>
              <td></td>
            </tr>
            <tr>
              <th>시작일</th>
              <td></td>
            </tr>
            <tr>
              <th>종료일</th>
              <td> </td>
            </tr>
            <tr>
              <th>PM</th>
              <td></td>
            </tr>
            <tr>
              <th>담당자</th>
              <td></td>
            </tr>
            <tr>
              <th>마일스톤</th>
              <td></td>
            </tr>
            <tr>
              <th>메모</th>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
                router.push("/project");
              }}
            >
              <i className="bi bi-grid-3x3-gap me-1"></i>
              목록
            </button>
          </div>
          <div style={{ width: "50%" }} className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-1"
              onClick={() => {
                router.push(`/project/edit/${id}`);
              }}
            >
              <i className="bi bi-pencil me-1" />
              수정
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {

              }}
            >
              <i className="bi bi-trash me-1" />
              삭제
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProjectDetail;