const detailopen = () => {
  return (
    <>
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

      <div className="offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas right</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">

          <h2 className="text-center">Project Detail</h2>
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
        </div>
      </div>
    </>
  )

}
export default detailopen;