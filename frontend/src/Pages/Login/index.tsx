import Container from "./style";
import loginImg from "../../assets/LunaLogin.png";

export default function Login() {
  return(
    <Container loading={false}>
      <img src={loginImg} alt="" />
      <div className="pageInfo">
        <form>
          <input 
            type="text" 
            value=""
            placeholder="Username"
          />
          <input 
            type="password" 
            value=""
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <h3>Don't have an account?</h3>
        <h3>Register now</h3>
      </div>
    </Container>
  )
};