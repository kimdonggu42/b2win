import styled from "styled-components";
import HeadlinesList from "./HeadlinesList";
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
    width: 70px;
    padding: 0 10px 0 10px;
  }

  > .topic,
  .searchIn,
  .sortby {
    width: 120px;
    padding: 0 10px 0 10px;
  }

  > .searchBtn {
    width: 70px;
    font-size: 15px;
    color: white;
    border: none;
    border-radius: 5px;
    background-color: #2d7947;
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const NewsWrapper = styled.ul`
  list-style: none;
  /* border: 1px solid orange; */
`;

enum Topics {
  news = "news",
  sport = "sport",
  tech = "tech",
  world = "world",
  finance = "finance",
  politics = "politics",
  business = "business",
  economics = "economic",
  entertainment = "entertainment",
  beauty = "beauty",
  travel = "travel",
  music = "music",
  food = "food",
  science = "science",
  gaming = "gaming",
}

function HeadlinesMain() {
  const [headlinesData, setHeadlinesData] = useState<any>(
    () => JSON.parse(window.localStorage.getItem("headlinesData")!) || []
  );
  const [userCountry, setUserCountry] = useState<string>("US");
  const [userTopic, setUserTopic] = useState<string>("news");

  const [currentPage, setCurrentPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("currentPage")!) || 1
  );
  const [currentBlockNum, setCurrentBlockNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("currentBlockNum")!) || 0
  );

  // 검색 버튼 클릭 시 GET 요청
  const getData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/latest_headlines`, {
      params: {
        when: "7d",
        topic: "news", // 주제 -> selector
        countries: "US", // 국가 -> selector
        lang: "en",
        page: 1, // 몇번째 페이지인지
        page_size: 10, // 한 페이지에 몇 개씩 볼건지
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_SIX,
      },
    });
    setHeadlinesData(res.data);
    setCurrentPage(1);
    setCurrentBlockNum(0);
  };

  // 페이지네이션 버튼 클릭 시 GET 요청
  const getPaginationData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/lastest_headlines`, {
      params: {
        when: "7d",
        topic: userTopic,
        countries: userCountry,
        lang: "en",
        page: currentPage,
        page_size: 10,
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_SIX,
      },
    });
    setHeadlinesData(res.data);
  };

  useEffect(() => {
    window.localStorage.setItem("headlinesData", JSON.stringify(headlinesData));
  }, [headlinesData]);

  useEffect(() => {
    window.localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    window.localStorage.setItem("currentBlockNum", JSON.stringify(currentBlockNum));
  }, [currentBlockNum]);

  const countryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserCountry(e.target.value);
  };

  const topicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserTopic(e.target.value);
  };

  console.log(headlinesData);

  return (
    <NewsMainContainer>
      <NewsContainer>
        <SelectWrapper>
          <select className='country' value={userCountry} onChange={countryChange}>
            <option value='KR'>KR</option>
            <option value='US'>US</option>
            <option value='CA'>CA</option>
            <option value='MX'>MX</option>
            <option value='CN'>CN</option>
          </select>
          <select className='topic' value={userTopic} onChange={topicChange}>
            {Object.keys(Topics).map((topic: any, index: number) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <button className='searchBtn' onClick={getData}>
            search
          </button>
        </SelectWrapper>
        <NewsWrapper>
          {headlinesData.articles?.map((value: any) => (
            <HeadlinesList key={value._id} headlinesData={value} />
          ))}
        </NewsWrapper>
        {/* <Pagination
          totalPageNum={headlinesData.total_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getPaginationData={getPaginationData}
          currentBlockNum={currentBlockNum}
          setCurrentBlockNum={setCurrentBlockNum}
        /> */}
      </NewsContainer>
    </NewsMainContainer>
  );
}

export default HeadlinesMain;
