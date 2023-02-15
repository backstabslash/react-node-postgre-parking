import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/authprovider';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './login.css';

const LOGIN_URL = 'http://localhost:3001/api/sign_in';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, { username: user, password: pwd });
            const accessToken = response?.data?.token;
            localStorage.setItem("accessToken", accessToken);
            const role = response?.data?.role;
            setAuth({ role, accessToken });
            navigate("/");
        } catch (err) {
            if (!err?.response) setErrMsg('no server response');
            else if (err.response?.status === 400) setErrMsg('such user does not exist');
            // else if (err.response?.status === 401) setErrMsg('unauthorized');
            else setErrMsg('login failed');
        }
    }

    return (
        <div className="app">
            <section className="sectionReg">
                <div className="regWrapper">
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="formName">sign in</h1>
                    <form className="formReg" onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <label htmlFor="username" className={`${user ? "labelHasContent" : ""}`}>username:</label>
                        </div>
                        <div className="inputContainer">
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <label htmlFor="password" className={`${pwd ? "labelHasContent" : ""}`}>password:</label>
                        </div>
                        <button className="submitBtn" >sign in</button>
                    </form>
                </div>
                <p className="alreadyText">
                    need an account?<br />
                    <span className="line">
                        <a className="logInLink" href="/sign_up">sign up</a>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default Login