import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectNewsIndexAtom } from "../../recoil/atom";

const NewsListContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border: 1px solid gray;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

function NewsList({ newsData, index }: any) {
  const setSelectNewsIndex = useSetRecoilState<number>(selectNewsIndexAtom);
  const navigate = useNavigate();

  const moveDetailPage = () => {
    navigate(`/detailnews/${newsData._id}`);
  };

  const getIndex = (index: number) => {
    setSelectNewsIndex(index);
  };

  return (
    <NewsListContainer
      onClick={() => {
        moveDetailPage();
        getIndex(index);
      }}
    >
      <div>{newsData.title}</div>
    </NewsListContainer>
  );
}

export default NewsList;
