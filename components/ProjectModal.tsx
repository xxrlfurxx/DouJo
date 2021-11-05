import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Button from 'react-bootstrap/Button';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { useEffect, useRef } from "react";
import { ProjectItem } from "../provider/modules/project";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../provider';


interface ProjectModalProp {
  show: boolean;
  onHide: () => void;
}

function ProjectModal({ show, onHide }: ProjectModalProp) {
  const projectnameInput = useRef<HTMLInputElement>(null);

  const projectData = useSelector((state: RootState) => state.project.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.photo.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);
    // true이면 화면이동
    isAddCompleted && router.push("/project");
  }, [isAddCompleted, router, dispatch]);


  const handleAddClick = () => {
    const item: ProjectItem = {
      id: projectData.length ? projectData[0].id + 1 : 1,
      projectname: projectnameInput.current ? projectnameInput.current.value : "",



    };

    dispatch(requestAddProject(item));
    // dispatch(requestAddPhotoNext(item)); // 더보기 페이징
  }

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
          프로젝트 생성
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <table className="table">
          <tbody>
            <tr>
              <th>프로젝트 명</th>
              <td>
                <input className="form-control" type="text" ref={projectnameInput} />
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
                <select defaultValue="default" className="form-select" aria-label="Default select example">
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
                <select defaultValue="default" className="form-select" aria-label="Default select example">
                  <option selected>담당자</option>
                  <option value="1">강윤석</option>
                  <option value="2">이준희</option>
                  <option value="3">허준</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" onClick={onHide}>Close</Button>
        <Button
          className="primary"
          onClick={() => {
            handleAddClick();
          }}
        >
          Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectModal;
