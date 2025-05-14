import styled from "styled-components";

export const LoginStyled = styled.div`
  &.login-wrap {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px; */

    .login-container {
      /* width: 400px; */
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
      align-items: center;
      padding: 20px;
      width: 100%;
      max-width: 416px;
      margin: auto;

      h2 {
        margin-bottom: 10px;
      }

      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        input,
        button {
          width: 100%;
          margin-right: 8px;
          padding: 15px;
          border: 1.5px solid #e7e7e9;
          border-radius: 5px;
          outline: none;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
`;
