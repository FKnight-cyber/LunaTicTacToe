import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #ECBBBE;

  .pageInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      cursor: pointer;
    }
  }

  img{
    width: 300px;
    height: 300px;
    object-fit: cover;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 150px;
    
    input {
      width: 280px;
      height: 42px;
    }

    button {
      width: 200px;
      background-color: #4385F2;
      color: #ffffff;
      height: 30px;
      margin-bottom: 10px;

      cursor: pointer;
    }
  }

  @media only screen and (min-width: 940px)  {
    flex-direction: row;
    padding-right: 40px;

    img {
      height: 500px;
      width: 50%;
    }
  }

  @media only screen and (min-width: 1160px)  {
    position: relative;
    img {
      height: 600px;
      width: 50%;
   
    }

    .pageInfo {
      position: absolute;
      bottom: auto;
      right: 26%;
    }
  }
`

export default Container;