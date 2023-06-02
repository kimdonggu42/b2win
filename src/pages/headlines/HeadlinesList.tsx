import styled from "styled-components";
import { Link } from "react-router-dom";

const HeadlinesContainer = styled.li`
  > a {
    color: black;
    text-decoration: none;
  }
`;

const HeadlinesContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid gray;
  padding: 10px 15px 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  row-gap: 10px;

  > div > span {
    margin-right: 10px;
    font-weight: 500;
  }

  > :nth-child(5) {
    display: flex;

    > img {
      width: 150px;
      border-radius: 5px;
    }
  }
`;

function HeadlinesList({ headlinesData, ref }: any) {
  return (
    <HeadlinesContainer>
      <Link to={headlinesData.link} target='_blank'>
        <HeadlinesContent>
          <div>
            <span>title :</span>
            {headlinesData.title}
          </div>
          <div>
            <span>author :</span>
            {headlinesData.author}
          </div>
          <div>
            <span>published_date :</span>
            {headlinesData.published_date}
          </div>
          <div>
            <span>rights :</span>
            {headlinesData.rights}
          </div>
          <div>
            <span>media :</span>
            <img src={headlinesData.media} alt='헤드라인 이미지' />
          </div>
        </HeadlinesContent>
      </Link>
      <div ref={ref}>End Page</div>
    </HeadlinesContainer>
  );
}

export default HeadlinesList;
