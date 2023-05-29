import NewsList from "./NewsList";
import Pagination from "./Pagination";
import axios from "axios";
import { useState, useEffect } from "react";

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

  return (
    <div>
      <select value={userCountry} onChange={countryChange}>
        <option value='US'>US</option>
        <option value='CA'>CA</option>
        <option value='MX'>MX</option>
      </select>
      <select value={userTopic} onChange={topicChange}>
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
      <select value={userSearchIn} onChange={searchInChange}>
        <option value='title'>title</option>
        <option value='summary'>summary</option>
      </select>
      <input placeholder='검색어를 입력해 주세요' onChange={inputChange} value={userInput} />
      <button onClick={getData}>검색</button>
      <ol>
        {newsData?.map((value: any) => (
          <NewsList key={value._id} newsData={value} />
        ))}
      </ol>
      <Pagination
        totalPageNum={totalPageNum}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getPaginationData={getPaginationData}
        currentBlockNum={currentBlockNum}
        setCurrentBlockNum={setCurrentBlockNum}
        newsData={newsData}
      />
    </div>
  );
}

export default NewsMain;
