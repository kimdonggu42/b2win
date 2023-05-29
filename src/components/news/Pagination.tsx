function Pagination({
  totalPageNum,
  currentPage,
  setCurrentPage,
  getPaginationData,
  currentBlockNum,
  setCurrentBlockNum,
  newsData,
}: any) {
  const blockArea: number = currentBlockNum * 10; // 각 페이지에서 첫 페이지네이션의 위치 계산

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
    } else if (currentPage - 1 <= 10 * currentBlockNum) {
      setCurrentBlockNum((value: number) => value - 1);
    }
    setCurrentPage(currentPage - 1);
    getPaginationData();
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (currentPage >= totalPageNum) {
      return;
    } else if (10 * (currentBlockNum + 1) < currentPage + 1) {
      setCurrentBlockNum((value: number) => value + 1);
    }
    setCurrentPage(currentPage + 1);
    getPaginationData();
  };

  return (
    <div>
      <button onClick={prevPageHandler} disabled={currentPage === 1}>
        prev
      </button>
      {allArr.slice(blockArea, 10 + blockArea).map((value: any) => {
        return (
          <button
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
      <button onClick={nextPageHandler} disabled={currentPage === totalPageNum}>
        next
      </button>
    </div>
  );
}

export default Pagination;
