import styled from "styled-components";
import NewsMain from "../components/news/NewsMain";

const NewsMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function NewsPage() {
  return (
    <NewsMainContainer>
      <NewsMain />
    </NewsMainContainer>
  );
}

export default NewsPage;
