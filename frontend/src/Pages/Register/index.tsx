import Container from "../Login/style";
import registerImg from "../../assets/LunaRegister.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Hearts } from 'react-loader-spinner';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoad(true);

    const body = {
      username,
      password
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`,body);
      setLoad(false);
      navigate("/");
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
      <img src={registerImg} alt="" />
      <div className="pageInfo">
        <form onSubmit={register}>
          <input 
            type="text" 
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
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
                "Register"
            }
          </button>
        </form>
        <Link to="/" style={{color:"inherit", textAlign:"center"}}>
          <h3>Already have an account?</h3>
          <h3>Sign-In!</h3>
        </Link>
      </div>
    </Container>
  )
};