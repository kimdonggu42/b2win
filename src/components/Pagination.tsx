import styled from "styled-components";
import { useState } from "react";

const PaginationContainer = styled.div`
  width: 800px;
  margin: 40px 0 50px 0;
  /* border: 1px solid red; */
`;

const PagingArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > .paging-title {
    font-size: 15px;
  }

  > .paging-selector {
    width: 45px;
    height: 25px;
    margin-left: 10px;
  }
`;

const PaginationBtn = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 5px;
  column-gap: 10px;
  margin-top: 20px;
  /* border: 1px solid red; */

  > .pageTab,
  .prevHandle,
  .nextHandle {
    font-size: 15px;
    min-width: 30px;
    min-height: 30px;
    background-color: transparent;
    border: none;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }

  > .pageFocused {
    color: white;
    font-weight: 600;
    background-color: #2d7947;
    border-radius: 50px;
  }
`;

function Pagination({
  totalPageNum,
  currentPage,
  setCurrentPage,
  getPaginationData,
  currentBlockNum,
  setCurrentBlockNum,
}: {
  totalPageNum: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getPaginationData: any;
  currentBlockNum: number;
  setCurrentBlockNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [paging, setPaging] = useState<number>(10);

  const blockArea: number = currentBlockNum * paging; // 각 페이지에서 첫 페이지네이션의 위치 계산

  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };

  const allArr: number[] = createArr(totalPageNum);

  // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
  const prevPageHandler = () => {
    if (currentPage <= 1) {
      return;
    } else if (currentPage - 1 <= paging * currentBlockNum) {
      setCurrentBlockNum(currentBlockNum - 1);
    }
    setCurrentPage(currentPage - 1);
    getPaginationData();
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (currentPage >= totalPageNum) {
      return;
    } else if (paging * (currentBlockNum + 1) < currentPage + 1) {
      setCurrentBlockNum(currentBlockNum + 1);
    }
    setCurrentPage(currentPage + 1);
    getPaginationData();
  };

  const pagingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaging(Number(e.target.value));
  };

  return (
    <PaginationContainer>
      <PagingArea>
        <div className='paging-title'>Rows per page :</div>
        <select className='paging-selector' value={paging} onChange={pagingChange}>
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </PagingArea>
      <PaginationBtn>
        <button className='prevHandle' onClick={prevPageHandler} disabled={currentPage === 1}>
          prev
        </button>
        {allArr.slice(blockArea, paging + blockArea).map((value) => {
          return (
            <button
              className={currentPage === value ? "pageTab pageFocused" : "pageTab"}
              key={value}
              onClick={() => {
                setCurrentPage(value);
                getPaginationData();
              }}
            >
              {value}
            </button>
          );
        })}
        <button
          className='nextHandle'
          onClick={nextPageHandler}
          disabled={currentPage === totalPageNum}
        >
          next
        </button>
      </PaginationBtn>
    </PaginationContainer>
  );
}

export default Pagination;
