import { useRef, useState, useEffect} from 'react';
import axios from '../api';
import './css/Login.css';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';

const Login = ({successOnClick, changeStatus, currentUserOnChange}) => {

    const encrypt = org => {
        let encrypted = '';
        for (let i = 0; i < org.length; ++i)
          encrypted += String.fromCharCode(org.charCodeAt(i) + 3);
        return encrypted;
      }

    const userRef = useRef();
    const errRef = useRef();

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
        // console.log(user);
        // console.log(user, pwd);
        try {
            console.log(user, pwd);
            const {
                data: { response },
            } = await axios.get('/check', {
                params: {
                    name: user,
                    password: encrypt(pwd),
                },
            });
            if(response === 'success')
            {
                console.log('success');
                currentUserOnChange(user);
                successOnClick();
                changeStatus(1);
                setUser('');
                setPwd('');
            }
            else if(response === 'fail')
            {
                console.log('fail');
                setErrMsg('Wrong Username or password!');
            }
        } catch (err) {
            if (!err?.response) 
            {
                setErrMsg('No Server Response');
            }  
            else 
            {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const registerOnClick = () => {
        changeStatus(2);
    }

    return (
        <div className = "login">
            <div className = "sectionWrapper">
                <section>
                    {/* <h4 ref={errRef} className="errMsg" aria-live="assertive">{errMsg}</h4> */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* <p color='red'>{errMsg}</p> */}
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor = "username"><UserOutlined></UserOutlined> Username:</label>
                        <input type="text" id="userName" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required></input>
                        <label htmlFor = "password"><KeyOutlined></KeyOutlined> Password:</label>
                        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required></input>
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need An Account?<br/>
                        <button onClick={registerOnClick}>Sign Up</button>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Login