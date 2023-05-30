import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { selectNewsIndexAtom } from "../../recoil/atom";

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid blue; */
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 800px;
  word-break: keep-all;
  /* border: 1px solid red; */

  > div > .title {
    font-weight: 500;
  }
`;

function DetailMain() {
  const detailNewsData = JSON.parse(window.localStorage.getItem("newsData")!);
  const selectNewsIndex = useRecoilValue<number>(selectNewsIndexAtom);

  console.log(selectNewsIndex);

  return (
    <DetailContainer>
      <DetailWrapper>
        <div>
          <span className='title'>title : </span>
          {detailNewsData[selectNewsIndex].title}
        </div>
        <div>
          <span className='title'>author : </span>
          {detailNewsData[selectNewsIndex].author}
        </div>
        <div>
          <span className='title'>published_date : </span>
          {detailNewsData[selectNewsIndex].published_date}
        </div>
        <div>
          <span className='title'>summary : </span>
          {detailNewsData[selectNewsIndex].summary}
        </div>
        <div>
          <span className='title'>rights : </span>
          {detailNewsData[selectNewsIndex].rights}
        </div>
        <div>
          <span className='title'>media : </span>
          {detailNewsData[selectNewsIndex].media}
        </div>
        <div>
          <span className='title'>rank : </span>
          {detailNewsData[selectNewsIndex].rank}
        </div>
      </DetailWrapper>
    </DetailContainer>
  );
}

export default DetailMain;
