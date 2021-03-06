import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { MutableRefObject, useRef } from "react";
import { ProjectItem, addProject } from "../provider/modules/project";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import { useRouter } from "next/router";

// const [modalShow, setModalShow] = React.useState(false);

interface ProjectModalProp {
  show: boolean;
  onHide: () => void;
}

function ProjectModal({ show, onHide }: ProjectModalProp) {
  const router = useRouter();

  const projectData = useSelector((state: RootState) => state.project.data);

  const dispatch = useDispatch<AppDispatch>();

  const projectname = useRef() as MutableRefObject<HTMLInputElement>;
  const startdate = useRef() as MutableRefObject<HTMLInputElement>;
  const enddate = useRef() as MutableRefObject<HTMLInputElement>;
  const manager = useRef() as MutableRefObject<HTMLSelectElement>;
  const engineer = useRef() as MutableRefObject<HTMLSelectElement>;
  const memo = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const handleAddClick = () => {
    const item: ProjectItem = {
      id: projectData.length > 0 ? projectData[0].id + 1 : 1,
      projectname: projectname.current.value,
      startdate: startdate.current.value,
      enddate: enddate.current.value,
      manager: manager.current.value,
      engineer: engineer.current.value,
      memo: memo.current.value,
      milestone: "",
    };
    dispatch(addProject(item));
    router.push(`/project`);
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          ???????????? ??????
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <table className="table">
          <tbody>
            <tr>
              <th>???????????? ???</th>
              <td>
                <input className="form-control" type="text" ref={projectname} />
              </td>
            </tr>
            <tr>
              <th>?????????</th>
              <td>
                <input className="form-control" type="date" ref={startdate} />
              </td>
            </tr>
            <tr>
              <th>?????????</th>
              <td>
                <input className="form-control" type="date" ref={enddate} />
              </td>
            </tr>
            <tr>
              <th>PM</th>
              <td>
                <select
                  defaultValue="default"
                  className="form-select"
                  aria-label="Default select example"
                  ref={manager}
                >
                  <option selected>?????????</option>
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
                  defaultValue="default"
                  className="form-select"
                  aria-label="Default select example"
                  ref={engineer}
                >
                  <option selected>?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="?????????">?????????</option>
                  <option value="??????">??????</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>??????</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "15vh" }}
                  ref={memo}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          className="primary"
          onClick={() => {
            handleAddClick();
            onHide();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ProjectModal;
