import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { penguin } from "../../common/data";

// 데이터구조를 interface로 만듦
export interface WikiItem {
  id: number;
  title: string;
  name: string | undefined;
  description?: string;
  createdTime: number;
}

export interface WikiPage {
  data: WikiItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

// 백엔드 연동 고려해서 state 구조를 설계
interface WikiState {
  data: WikiItem[]; // 위키 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
}


// wiki state를 목록 -> array
const initialState: WikiState = {
  data: [
    {
      id: 1,
      title: "제목입니다",
      name: "John Smith",
      createdTime: new Date().getTime(),
    },
  ],
  isFetched: false,
};

const wikiSlice = createSlice({
  name: "wiki",
  initialState,
  reducers: {
    // PayloadAction<payload타입>
    // payload로 item객체를 받음
    addWiki: (state, action: PayloadAction<WikiItem>) => {
      const wiki = action.payload;
      console.log("--in reducer function--");
      console.log(wiki);
      state.data.unshift(wiki);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },
    // payload 없는 reducer
    // completed 관련된 속성을 삭제함(undefined 상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    // payload로 id값을 받음
    // action: PayloadAction<number>
    // reducer 넘어오는 action은 payload있는 액션인데,
    // payload의 타입이 number이다.
    removeWiki: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyWiki: (state, action: PayloadAction<WikiItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const WikiItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (WikiItem) {
        WikiItem.title = modifyItem.title;
        WikiItem.description = modifyItem.description;
      }
      state.isModifyCompleted = true; // 변경 되었음을 표시
    }
  }
});

// action creator 내보내기: action creator는 action객체를 반환하는 함수
export const {
  addWiki,
  removeWiki,
  modifyWiki,
} = wikiSlice.actions;

export default wikiSlice.reducer;