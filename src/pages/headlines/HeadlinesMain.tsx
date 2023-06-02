import styled from "styled-components";
import HeadlinesList from "./HeadlinesList";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Topics } from "../../type";

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

function HeadlinesMain() {
  const [headlinesData, setHeadlinesData] = useState<any>([]);
  const [userCountry, setUserCountry] = useState<string>("US");
  const [userTopic, setUserTopic] = useState<string>("news");

  const [ref, inView] = useInView();

  // 검색 버튼 클릭 시 GET 요청
  const getData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/latest_headlines`, {
      params: {
        when: "7d",
        topic: userTopic,
        countries: userCountry,
        lang: "en",
        page: 1,
        page_size: 10,
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_SIX,
      },
    });
    setHeadlinesData(res.data.articles);
  };

  const countryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserCountry(e.target.value);
  };

  const topicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserTopic(e.target.value);
  };

  const getScrollToData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/latest_headlines`, {
      params: {
        when: "7d",
        topic: userTopic,
        countries: userCountry,
        lang: "en",
        page: 1,
        page_size: 10,
      },
      headers: {
        "x-api-key": process.env.REACT_APP_NEWSCATCHER_API_KEY_SIX,
      },
    });
    setHeadlinesData([...headlinesData, res.data.articles]);
  };

  useEffect(() => {
    if (inView) {
      getScrollToData();
    }
  }, [inView]);

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
          {headlinesData?.map((value: any) => (
            <HeadlinesList key={value._id} headlinesData={value} ref={ref} />
          ))}
        </NewsWrapper>
      </NewsContainer>
    </NewsMainContainer>
  );
}

export default HeadlinesMain;
