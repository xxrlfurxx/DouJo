import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../provider/index";

const getTimeString = (unixtime: number) => {
  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Wiki = () => {
  const wiki = useSelector((state: RootState) => state.wiki);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();


  return (
    <section style={{ width: "70vw" }} className="mx-auto">
      <div className="wiki">
        <div>
          <h2 className={`text-center`}>๐Wiki</h2>
        </div>
        <div className="features">
          <div className="search_wiki">
            <input type="text" placeholder="๐Search..." />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success"
              onClick={() => {
                router.push("/wiki/WikiCreate");
              }}
            >
              + ๊ธ ์์ฑ
            </button>
          </div>
        </div>
        <table className="table table-hover my-5">
          <thead>
            <tr>
              <th>#</th>
              <th>์ ๋ชฉ</th>
              <th>์ด๋ฆ</th>
              <th>์์ฑ์ผ์</th>
            </tr>
          </thead>
          <tbody>
            {wiki.data.map((item) => (
              <tr className="wikiList" key={item.id}
                onClick={() => {
                  router.push(`/wiki/detail/${item.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.name}</td>
                <td>{getTimeString(item.createdTime)}</td>
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
    </section>
  );
}

export default Wiki;

