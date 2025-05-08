import styled from "styled-components";

export const FindIdStyled = styled.div`
  &.findid-wrap {
    width: 100%;
    max-width: 1280px;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px; */
    margin: 0 auto;

    .findid-container {
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
      align-items: center;
      padding: 20px;

      h2 {
        margin-bottom: 10px;
      }

      form {
        width: 400px;
        display: flex;
        flex-direction: column;

        input,
        button {
          padding: 15px;
        }
      }
    }
  }
`;
