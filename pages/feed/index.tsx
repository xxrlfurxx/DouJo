import { useState } from "react";
import Link from "next/link";

interface StateProps {
  id: number;
  title: string;
  name: string;
  createdTime: string;
}

function feeds() {
  const [feedState, setfeedState] = useState<StateProps[]>([
    { id: 1, title: "제목입니다", name: "이준희", createdTime: "2021-11-01"},
    { id: 2, title: "제목입니다", name: "이준희", createdTime: "2021-11-01"},
    { id: 3, title: "제목입니다", name: "이준희", createdTime: "2021-11-01"}
  ]);

  return (
    <div className="feed">
      <div>
        <h2>🔔Feed</h2>
      </div>
      <div className="card">
  <div className="card-header">
   📔Wiki
   <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button type="button" className="btn-close" aria-label="Close"></button>
  </div>
</div>
  <div className="card-body">
    <h5 className="card-title">제목입니다.</h5>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
    <a href="#" className="btn btn-warning">상세보기로 이동</a>
  </div>
 </div>
</div>
<div className="card">
  <div className="card-header">
   task
   <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button type="button" className="btn-close" aria-label="Close"></button>
  </div>
</div>
  <div className="card-body">
    <h5 className="card-title">제목입니다.</h5>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
    <a href="#" className="btn btn-warning">상세보기로 이동</a>
  </div>
 </div>
</div>
   </div>

  );
}

export default feeds;