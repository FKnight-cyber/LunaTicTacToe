import styled from "styled-components";

interface Props {
  loading: boolean
}

const Container = styled.div<Props>`
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
    width: 90%;
    max-width: 580px;
    height: 44%;
    object-fit: cover;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 150px;
    width: 9  0%;
    max-width: 280px;
    
    input {
      width: 100%;
      height: 42px;
      padding-left: 6px;

      font-weight: 400;
      font-size: 20px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 86%;
      background-color: ${props => props.loading ? "#ffffff" : "#4385F2"};
      color: #ffffff;
      height: 30px;
      margin-bottom: 10px;
      border: ${props => props.loading ? "0.2rem solid #fff" : "default"};
      border-radius: ${props => props.loading ? "2rem" : "default"};
      padding: ${props => props.loading ? "0.4em" : "default"};
      box-shadow: ${props => props.loading ? 
      "0 0 .2rem #fff,0 0 .2rem #fff,0 0 2rem #bc13fe,0 0 0.8rem #bc13fe,0 0 2.8rem #bc13fe,inset 0 0 1.3rem #bc13fe" 
      : 
      "default"
      }; 

      cursor: pointer;
    }
  }

  @media only screen and (min-width: 500px)  {
    img{
    height: 50%;
    }
  }

  @media only screen and (min-width: 940px)  {
    flex-direction: row;
    padding-right: 40px;
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