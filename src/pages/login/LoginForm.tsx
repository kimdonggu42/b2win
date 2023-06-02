import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid blue; */
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  row-gap: 10px;
  /* border: 1px solid red; */

  > .loginTitle {
  }

  > input {
    height: 40px;
    padding: 0 10px 0 10px;
  }

  > button {
    margin-top: 10px;
    height: 35px;
    color: white;
    background-color: #2d7947;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:disabled {
      background-color: lightgray;
    }
  }
`;

function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");

  const navigate = useNavigate();

  const inputIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const inputPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const accessToken = "login";

  const onSubmit = () => {
    if (userId === "codestates1" && userPw === "12345678") {
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
      window.location.reload();
    } else if (userId === "codestates2" && userPw === "87654321") {
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
      window.location.reload();
    } else {
      alert("ID와 PASSWORD를 다시 확인해주세요.");
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <div className='loginTitle'>Login</div>
        <input placeholder='ID' onChange={inputIdChange} value={userId} />
        <input placeholder='PASSWORD' onChange={inputPwChange} value={userPw} />
        <button onClick={onSubmit} disabled={userId.length === 0 || userPw.length === 0}>
          Login
        </button>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default LoginForm;
