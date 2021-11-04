import { useState } from "react";
import Link from "next/link";

interface StateProps {
  id: number;
  title: string;
  name: string;
  createdTime: string;
}

function wikis() {
  const [wikiState, setwikiState] = useState<StateProps[]>([
    { id: 1, title: "제목입니다", name: "이준희", createdTime: "2021-11-01" },
    { id: 2, title: "제목입니다", name: "이준희", createdTime: "2021-11-01" },
    { id: 3, title: "제목입니다", name: "이준희", createdTime: "2021-11-01" }
  ]);

  return (
    <div className="wiki">
      <div>
        <h2>📔Wiki</h2>
      </div>
      <div className="features">
        <div className="search_wiki">
          <input type="text" placeholder="🔍Search..." />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-success" type="button">
            <Link href="/wiki/first-post">
              <a> + 글 작성 </a>
            </Link>
          </button>
        </div>
      </div>
      <table className="table table-hover my-5">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>이름</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {wikiState.map((item) => (
            <tr className="wikiList" key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.name}</td>
              <td>{item.createdTime}</td>
            </tr>

          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default wikis;

