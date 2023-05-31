import styled from "styled-components";
import NewsList from "./NewsList";
import Pagination from "../../components/Pagination";
import axios from "axios";
import { useState, useEffect } from "react";

const NewsMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
  .searchIn,
  .sortby {
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

const NewsWrapper = styled.ul`
  list-style: none;
  /* border: 1px solid orange; */
`;

function NewsMain() {
  const [newsData, setNewsData] = useState<any>(
    () => JSON.parse(window.localStorage.getItem("newsData")!) || []
  );
  const [userInput, setUserInput] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userInput")!) || ""
  );
  const [userCountry, setUserCountry] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userCountry")!) || "US"
  );
  const [userTopic, setUserTopic] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userTopic")!) || "news"
  );
  const [userSearchIn, setUserSearchIn] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userSearchIn")!) || "title"
  );
  const [userSortBy, setUserSortBy] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("userSortBy")!) || "relevancy"
  );
  const [currentPage, setCurrentPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("currentPage")!) || 1
  );
  const [currentBlockNum, setCurrentBlockNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("currentBlockNum")!) || 0
  );

  // 검색 버튼 클릭 시 GET 요청
  const getData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/search`, {
      params: {
        q: userInput,
        topic: userTopic, // 주제 -> selector
        countries: userCountry, // 국가 -> selector
        search_in: userSearchIn,
        lang: "en",
        sort_by: userSortBy, // 정렬 기준
        page: 1, // 몇번째 페이지인지
        page_size: "10", // 한 페이지에 몇 개씩 볼건지
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_FIVE,
      },
    });
    setNewsData(res.data);
    setCurrentPage(1);
    setCurrentBlockNum(0);
    window.localStorage.setItem("userInput", JSON.stringify(userInput));
    window.localStorage.setItem("userCountry", JSON.stringify(userCountry));
    window.localStorage.setItem("userTopic", JSON.stringify(userTopic));
    window.localStorage.setItem("userSearchIn", JSON.stringify(userSearchIn));
    window.localStorage.setItem("userSortBy", JSON.stringify(userSortBy));
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
        sort_by: userSortBy,
        page: currentPage,
        page_size: "10",
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_FIVE,
      },
    });
    setNewsData(res.data);
  };

  useEffect(() => {
    window.localStorage.setItem("newsData", JSON.stringify(newsData));
  }, [newsData]);

  useEffect(() => {
    window.localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    window.localStorage.setItem("currentBlockNum", JSON.stringify(currentBlockNum));
  }, [currentBlockNum]);

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

  const sortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSortBy(e.target.value);
  };

  // console.log(newsData);
  // console.log(newsData.articles);
  // console.log(newsData.total_pages);

  return (
    <NewsMainContainer>
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
          <select className='sortby' value={userSortBy} onChange={sortByChange}>
            <option value='relevancy'>relevancy</option>
            <option value='date'>date</option>
            <option value='rank'>rank</option>
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
        <NewsWrapper>
          {newsData.articles?.map((value: any) => (
            <NewsList key={value._id} newsData={value} />
          ))}
        </NewsWrapper>
        <Pagination
          totalPageNum={newsData.total_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getPaginationData={getPaginationData}
          currentBlockNum={currentBlockNum}
          setCurrentBlockNum={setCurrentBlockNum}
        />
      </NewsContainer>
    </NewsMainContainer>
  );
}

export default NewsMain;
