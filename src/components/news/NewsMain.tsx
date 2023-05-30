import styled from "styled-components";
import NewsList from "./NewsList";
import Pagination from "./Pagination";
import axios from "axios";
import { useState, useEffect } from "react";

const NewsContainer = styled.div`
  width: 800px;
  /* border: 1px solid red; */
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 20px 0 40px 0;
  column-gap: 5px;
  /* border: 1px solid blue; */

  > .country {
    width: 50px;
  }

  > .topic,
  .searchIn {
    width: 120px;
  }

  > .keyword {
    width: 200px;
    padding: 0 10px 0 10px;
  }

  > .searchBtn {
    width: 70px;
  }
`;

const SortedButtonArea = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 5px;
  list-style: none;
  margin-bottom: 10px;
  /* border: 1px solid red; */

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    min-width: 50px;
    height: 30px;
    text-align: center;
    padding: 0 10px 0 10px;
    cursor: pointer;
    /* border: 1px solid blue; */

    > .el {
      color: gray;
      font-weight: 500;
    }
  }

  .focused > .el {
    color: black;
    font-weight: 600;
  }
`;

const NewsWrapper = styled.ul`
  /* border: 1px solid orange; */
  margin: 0;
  padding: 0;
  list-style: none;
`;

function NewsMain() {
  const [userCountry, setUserCountry] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userCountry")!) || "US"
  );
  const [userTopic, setUserTopic] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userTopic")!) || "news"
  );
  const [userInput, setUserInput] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userInput")!) || ""
  );
  const [userSearchIn, setUserSearchIn] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userSearchIn")!) || "title"
  );
  const [newsData, setNewsData] = useState<any>(
    () => JSON.parse(window.localStorage.getItem("newsData")!) || []
  );
  const [currentPage, setCurrentPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("currentPage")!) || 1
  );
  const [currentBlockNum, setCurrentBlockNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("currentBlockNum")!) || 0
  );
  const [totalPageNum, setTotalPageNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("totalPageNum")!) || 0
  );
  const [sortedCurrentPage, setSortedCurrentPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("sortedCurrentPage")!) || 0
  ); // 현재 정렬 버튼 index

  // 검색 버튼 클릭 시 GET 요청
  const getData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/search`, {
      params: {
        q: userInput,
        topic: userTopic, // 주제 -> selector
        countries: userCountry, // 국가 -> selector
        search_in: userSearchIn,
        lang: "en",
        sort_by: "relevancy", // 정렬 기준
        page: 1, // 몇번째 페이지인지
        page_size: "100", // 한 페이지에 몇 개씩 볼건지
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_FOUR,
      },
    });
    setNewsData(res.data.articles);
    setTotalPageNum(res.data.total_pages);
    setCurrentPage(1);
    setCurrentBlockNum(0);
    window.localStorage.setItem("userInput", JSON.stringify(userInput));
    window.localStorage.setItem("userCountry", JSON.stringify(userCountry));
    window.localStorage.setItem("userTopic", JSON.stringify(userTopic));
    window.localStorage.setItem("userSearchIn", JSON.stringify(userSearchIn));
  };

  // 페이지네이션 버튼 클릭 시 GET 요청
  const getPaginationData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/search`, {
      params: {
        q: userInput,
        topic: userTopic,
        countries: userCountry,
        search_in: userSearchIn,
        lang: "en",
        sort_by: "relevancy",
        page: currentPage,
        page_size: "100",
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_FOUR,
      },
    });
    setNewsData(res.data.articles);
    setTotalPageNum(res.data.total_pages);
  };

  useEffect(() => {
    window.localStorage.setItem("newsData", JSON.stringify(newsData));
  }, [newsData]);

  useEffect(() => {
    window.localStorage.setItem("totalPageNum", JSON.stringify(totalPageNum));
  }, [totalPageNum]);

  useEffect(() => {
    window.localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    window.localStorage.setItem("currentBlockNum", JSON.stringify(currentBlockNum));
  }, [currentBlockNum]);

  useEffect(() => {
    window.localStorage.setItem("sortedCurrentPage", JSON.stringify(sortedCurrentPage));
  }, [sortedCurrentPage]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const countryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserCountry(e.target.value);
  };

  const topicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserTopic(e.target.value);
  };

  const searchInChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSearchIn(e.target.value);
  };

  const sortedArr = [{ sorting: "relevancy" }, { sorting: "date" }, { sorting: "rank" }];

  // 날짜 내림차순
  const sortedDateNewsData = [...newsData].sort(
    (a, b) => Number(new Date(b.published_date)) - Number(new Date(a.published_date))
  );
  // 랭크 오름차순
  const sortedRankNewsData = [...newsData].sort((a, b) => a.rank - b.rank);

  const selectSortedHandler = (index: number) => {
    setSortedCurrentPage(index);
  };

  return (
    <NewsContainer>
      <SelectWrapper>
        <select className='country' value={userCountry} onChange={countryChange}>
          <option value='US'>US</option>
          <option value='CA'>CA</option>
          <option value='MX'>MX</option>
        </select>
        <select className='topic' value={userTopic} onChange={topicChange}>
          <option value='news'>news</option>
          <option value='sport'>sport</option>
          <option value='tech'>tech</option>
          <option value='world'>world</option>
          <option value='finance'>finance</option>
          <option value='politics'>politics</option>
          <option value='business'>business</option>
          <option value='economics'>economics</option>
          <option value='entertainment'>entertainment</option>
          <option value='beauty'>beauty</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
          <option value='food'>food</option>
          <option value='science'>science</option>
          <option value='gaming'>gaming</option>
        </select>
        <select className='searchIn' value={userSearchIn} onChange={searchInChange}>
          <option value='title'>title</option>
          <option value='summary'>summary</option>
        </select>
        <input
          className='keyword'
          placeholder='검색어를 입력해 주세요'
          onChange={inputChange}
          value={userInput}
        />
        <button className='searchBtn' onClick={getData}>
          search
        </button>
      </SelectWrapper>
      <SortedButtonArea>
        {sortedArr.map((tab, index) => {
          return (
            <li
              className={sortedCurrentPage === index ? "tab focused" : "tab"}
              key={index}
              onClick={() => selectSortedHandler(index)}
            >
              <div className='el'>{tab.sorting}</div>
            </li>
          );
        })}
      </SortedButtonArea>
      <NewsWrapper>
        {sortedCurrentPage === 0 ? (
          <>
            {newsData?.map((value: any, index: any) => (
              <NewsList key={value._id} newsData={value} index={index} />
            ))}
          </>
        ) : sortedCurrentPage === 1 ? (
          <>
            {sortedDateNewsData?.map((value: any) => (
              <NewsList key={value._id} newsData={value} />
            ))}
          </>
        ) : (
          <>
            {sortedRankNewsData?.map((value: any) => (
              <NewsList key={value._id} newsData={value} />
            ))}
          </>
        )}
      </NewsWrapper>
      <Pagination
        totalPageNum={totalPageNum}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getPaginationData={getPaginationData}
        currentBlockNum={currentBlockNum}
        setCurrentBlockNum={setCurrentBlockNum}
        newsData={newsData}
      />
    </NewsContainer>
  );
}

export default NewsMain;
