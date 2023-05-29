import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 50px;
  border: 2px solid skyblue;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 50px;
  column-gap: 30px;
`;

const PageMoveBtn = styled.button`
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 50px;
  background-color: pink;
  cursor: pointer;
`;

function Header() {
  return (
    <HeaderContainer>
      <ButtonWrapper>
        <Link to='/'>
          <PageMoveBtn>Login</PageMoveBtn>
        </Link>
        <Link to='headlines'>
          <PageMoveBtn>Headlines</PageMoveBtn>
        </Link>
        <Link to='news'>
          <PageMoveBtn>News</PageMoveBtn>
        </Link>
      </ButtonWrapper>
    </HeaderContainer>
  );
}

export default Header;
