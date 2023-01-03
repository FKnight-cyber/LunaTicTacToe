import Container from "./style";
import loginImg from "../../assets/LunaLogin.png";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Hearts } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const { setToken } = useContext(UserContext);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoad(true);

    const body = {
      username,
      password
    };

    try {
      const { data:token } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`,body);
      setToken(token);
      localStorage.setItem("authToken", token);
      setLoad(false);
      navigate("/choose-mode");
    } catch (error:any) {
        let timerInterval:any;
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          html: `${error.response.data}`,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading(null);
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft().toString();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          setLoad(false);
          if (result.dismiss === Swal.DismissReason.timer) {
            return;
        }
      })
    }
  }

  return(
    <Container loading={load}>
      <img src={loginImg} alt="" />
      <div className="pageInfo">
        <form onSubmit={signIn}>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">
          {
              load ? 
                <Hearts 
                  height="40"
                  width="40"
                  color="#cc5dd6"
                  ariaLabel="hearts-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                /> 
                :
                "Login"
            }
          </button>
        </form>
        <Link to="/sign-up" style={{color:"inherit", textAlign:"center"}}>
          <h3>Don't have an account?</h3>
          <h3>Register now</h3>
        </Link>
      </div>
    </Container>
  )
};