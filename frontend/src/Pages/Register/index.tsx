import Container from "../Login/style";
import registerImg from "../../assets/LunaRegister.png";

export default function Register() {
  return(
    <Container>
      <img src={registerImg} alt="" />
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
          <button type="submit">Register</button>
        </form>
        <h3>Already have an account?</h3>
        <h3>Sign-In!</h3>
      </div>
    </Container>
  )
};