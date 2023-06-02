import styled from "styled-components";

const NewsContainer = styled.li`
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

  > :nth-child(6) {
    display: flex;

    > img {
      width: 150px;
      border-radius: 5px;
    }
  }
`;

function NewsList({ newsData }: any) {
  return (
    <NewsContainer>
      <div>
        <span>title :</span>
        {newsData.title}
      </div>
      <div>
        <span>author :</span>
        {newsData.author}
      </div>
      <div>
        <span>published_date :</span>
        {newsData.published_date}
      </div>
      <div>
        <span>summary :</span>
        {newsData.summary}
      </div>
      <div>
        <span>rights :</span>
        {newsData.rights}
      </div>
      <div>
        <span>media :</span>
        <img src={newsData.media} alt='기사 이미지' />
      </div>
      <div>
        <span>rank :</span>
        {newsData.rank}
      </div>
    </NewsContainer>
  );
}

export default NewsList;
