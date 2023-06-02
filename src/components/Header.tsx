import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 30px;
  /* border: 2px solid skyblue; */
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  /* border: 1px solid red; */

  > .logo {
    font-size: 25px;
    font-weight: 600;

    > a {
      color: black;
      text-decoration: none;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 15px;
`;

const PageMoveBtn = styled.button`
  width: 90px;
  height: 38px;
  font-size: 15px;
  color: #2d7947;
  border: 1px solid #2d7947;
  border-radius: 5px;
  background-color: transparent;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #2d7947;
  }
`;

function Header() {
  const isLogin = window.localStorage.getItem("accessToken");

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <div className='logo'>
          <Link to='/'>B2WIN</Link>
        </div>
        <ButtonWrapper>
          {isLogin === null ? (
            <Link to='/login'>
              <PageMoveBtn>Login</PageMoveBtn>
            </Link>
          ) : (
            <PageMoveBtn onClick={logout}>Loout</PageMoveBtn>
          )}

          <Link to='headlines'>
            <PageMoveBtn>Headlines</PageMoveBtn>
          </Link>
          <Link to='news'>
            <PageMoveBtn>News</PageMoveBtn>
          </Link>
        </ButtonWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;
