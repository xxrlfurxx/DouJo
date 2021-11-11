import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { WikiItem } from "../modules/wikis";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import { modifyWiki } from "../modules/wikis";

const WikiEdit = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const wikiItem = useSelector((state: RootState) =>
    state.wiki.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.wiki.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const titleInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isModifyCompleted && router.push("/wiki");
  }, [isModifyCompleted, router]);

  const handleSaveClick = () => {
    if (wikiItem) {
      // 기존 데이터 카피
      const item = { ...wikiItem };
      // 변경할 속성만 대입
      item.title = titleInput.current ? titleInput.current.value : "";
      item.name = nameInput.current ? nameInput.current.value : "";
      item.description = descTxta.current?.value;

      // reducer로 state 수정 및 목록으로 이동
      saveItem(item);
    }
  };

  const saveItem = (item: WikiItem) => {
    dispatch(modifyWiki(item));
  };

  return (
    <section style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Wiki Edit</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={wikiItem?.title}
                  ref={titleInput}
                />
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={wikiItem?.name}
                  ref={nameInput}
                />
              </td>
            </tr>
            <tr>
              <th>설명</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  defaultValue={wikiItem?.description}
                  ref={descTxta}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        <Button variant="secondary"
          style={{ marginLeft: "2%" }}
          className="btn btn-primary float-end"
          onClick={() => {
            router.push("/wiki");
          }}
        >
          cancel
        </Button>
        <Button variant="dark"
          className="btn btn-primary float-end"
          onClick={() => {
            handleSaveClick();
          }}
        >
          <i className="bi bi-check" />
          edit
        </Button>
      </div>
    </section>
  );
};

export default WikiEdit;