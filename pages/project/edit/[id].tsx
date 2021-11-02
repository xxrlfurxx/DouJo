const ProjectEdit = () => {
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
                <select className="form-select" aria-label="Default select example">
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
                <select className="form-select" aria-label="Default select example">
                  <option selected>담당자</option>
                  <option value="1">강윤석</option>
                  <option value="2">이준희</option>
                  <option value="3">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>마일스톤</th>
              <td></td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea className="form-control" style={{ height: "20vh" }}></textarea>
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