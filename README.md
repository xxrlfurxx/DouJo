_11/1 시작_

# 협업 툴 제작 프로젝트

목표 : 11월 21일까지 테스크 보드 완성

<br>

### 메뉴 구조도

<img src=https://user-images.githubusercontent.com/82828382/139599126-178dadd8-a76b-4b3a-89d6-d514ebcc6284.png width=80%>

### 와이어 프레임

<img src=https://user-images.githubusercontent.com/82828382/139599139-5c732c9a-43a2-4c7b-ba06-2621b34dbe85.png width=80%>

- 10/30

  - next.js 로 프론트엔드 작업환경 구축
    - ui 설계
    - css 미디어 쿼리
    - light/dark 모드 색상 선택
  - 어제 백신맞아서 쥰내 피곤함

- 11/01

  - task board 틀만 짬
  - react-beautiful-dnd 타입스크립트 라이브러리 설치
  - ui (사이드바) 재설계
  - 거의 하루종일 스타일만 엄청 바꿈...시간아깝다

- 11/02

  - 드래그 엔 드랍 구현 방법 후보 탐색
    - js 코드로 직접 구현
    - react-dnd
    - react-beautiful-dnd
      - 3주안에 포트폴리오까지 만들것을 생각해 atlassian 사의 라이브러리 선택 및 공부함

- 11/03

  - react-beautiful-dnd 자료 탐색 <br><img src="https://user-images.githubusercontent.com/82828382/140037047-5c978159-e624-481c-b1a7-5930e6d7a052.gif" width=80%>
  - column과 task 로직 고민...
  - task 드래그 구현
  - SSR 되는 시점에 RBD 라이브러리의 resetServerContext() 함수를 실행시켜줘야 서버와 클라이언트간의 id 값이 달라지지 않아 오류가 안생기는데 지금 값이 바뀌어서 오류가 뜬다. 어느 시점에 SSR이 일어나는지 확인해야한다.
  - 1건의 task를 드래그 엔 드랍했을 때 해당 task의 currentState의 값이 드랍한 column의 id값이 되게 하고, 드랍한 해당 column 내 배열이 사용자가 드랍한 순서대로 재배열이 일어냐야한다.

- 11/04

  - 선생님의 조언으로 SSR 시점 오류를 useEffect로 해결했다.
  - JS 객체와 배열 조작 미숙으로 데이터 조작에 거의 하루종일 시간을 사용함
    - nested object를 능숙하게 조작못했음

- 11/07

  - 테스크보드 드래그 엔 드랍 구현, 삽질 많이 했다.

- 11/08

  - 시간 분배를 위해서 스타일 만지기를 후순위로 미뤘다.
    - bootstrap 으로 일단 도배할 예정이다.
  - task를 local state에서 global state로 변경
  - column 값은 local state로 유지할 계획(리덕스 필요성 아직 못느낌)
    - task create, detail 에서 값을 갖고와야 하지만 index에서 prop 값으로 모달창 띄울 것
  - 모달창으로 card 띄워서 add 하는 것 시도함
    - 기존 redux action은 왜 오류나고, saga action 은 되는거지?

- 11/09

  - 모달창으로 task 상세보기를 구현하는데 react-beautiful-dnd와 겹처서 문제가 생김. 내가 생각한 해결 방안 2개
    - 1. draggable 안쪽의 task.map 부분 영역에 모달창을 띄울때 드래그 기능 끄기
    - 2. 바깥 영역에 task의 id값을 props로 모달영역에 줘야함

- 11/10
  - 컴터 절전시켰다가 다시 켰는데 소스코드 날라감 이유 모르겠음. 다행히 작업도중에 날아가서 머릿속에 기억이 남아있음.
    - 커밋을 자기전에 하는게 아니라 작업물 단위 혹은 컴포넌트 단위로 해야겠음.
  - 진퇴양난
    - column 내부의 task data 배열의 index를 유지해야함
    - task의 CRUD
    - column의 CRUD
    - 위의 3 조건을 충족하면서 task 따로 column 따로 데이터를 만드려는 것이 화근.... 그냥 애시당초 두가지를 합쳐서 하나의 데이터로 설계했어야 했음. 코드 통째로 뜯어고침.
  - 깊은 복사를 하기 위해서 lodash 타입스크립트 버전 설치함
    - `npm install --save @types/lodash`
    - 근데 안됨
  - let clonedArray = JSON.parse(JSON.stringify(nodesArray))
    - JSON.stringify 가 함수 인자는 못받아서 못써먹겠음.
  - 깊은 복사 제처두고 그냥 drop 전용 리듀서 새로 짜서 구현함

아 진짜 너무 피곤하다 하루만 푹 자면 코드 더 잘 칠거같은데
스타일 못고쳐서 화면볼때 스트레스받음 후
