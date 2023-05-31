import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
  margin: 50px 0 50px 0;

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
  const PAGING_NUM: number = 10;
  const blockArea: number = currentBlockNum * PAGING_NUM; // 각 페이지에서 첫 페이지네이션의 위치 계산

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
    } else if (currentPage - 1 <= PAGING_NUM * currentBlockNum) {
      setCurrentBlockNum(currentBlockNum - 1);
    }
    setCurrentPage(currentPage - 1);
    getPaginationData();
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (currentPage >= totalPageNum) {
      return;
    } else if (PAGING_NUM * (currentBlockNum + 1) < currentPage + 1) {
      setCurrentBlockNum(currentBlockNum + 1);
    }
    setCurrentPage(currentPage + 1);
    getPaginationData();
  };

  return (
    <PaginationContainer>
      <button className='prevHandle' onClick={prevPageHandler} disabled={currentPage === 1}>
        prev
      </button>
      {allArr.slice(blockArea, PAGING_NUM + blockArea).map((value) => {
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
    </PaginationContainer>
  );
}

export default Pagination;
