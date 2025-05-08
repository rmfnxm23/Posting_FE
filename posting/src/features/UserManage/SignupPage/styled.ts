import styled from "styled-components";

export const SignupStyled = styled.div`
  /* 에러 메세지 */
  .error-message {
    color: red;
    font-size: 11px;
  }

  &.signup-wrap {
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 0 auto;
  }

  .signup-container {
    width: 100%;
    max-width: 416px;
    margin: auto;

    h2 {
      text-align: center;
    }

    input {
      width: 100%;
      margin-right: 8px;
      padding: 15px;
      border: 1.5px solid #e7e7e9;
      border-radius: 5px;
      outline: none;
    }

    .duplicate-btn {
      white-space: nowrap;
      padding: 0 10px;
      border: 1.5px solid #e7e7e9;
      border-radius: 5px;
      outline: none;
    }
  }
  .signup-submit {
    margin-top: 20px;
    width: 100%;
    padding: 15px;
    border-radius: 40px;
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;
