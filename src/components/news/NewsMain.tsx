import NewsList from "./NewsList";
import Pagination from "./Pagination";
import axios from "axios";
import { useState } from "react";

function NewsMain() {
  const [data, setData] = useState<any>([]);

  const getData = async () => {
    const res = await axios.get(`https://api.newscatcherapi.com/v2/search`, {
      params: {
        q: "Bitcoin",
        lang: "en",
        sort_by: "relevancy",
        page: "1",
      },
      headers: {
        "x-api-key": `${process.env.REACT_APP_NEWSCATCHER_API_KEY}`,
      },
    });
    setData(res.data);
  };

  console.log(data);

  return (
    <div>
      <button onClick={getData}>test</button>
      <NewsList />
      <Pagination />
    </div>
  );
}

export default NewsMain;
