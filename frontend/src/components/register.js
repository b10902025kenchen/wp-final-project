import {useRef, useState, useEffect } from "react";
import axios from '../api';
import './css/Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { KeyOutlined, UserOutlined } from '@ant-design/icons';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,11}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,24}$/;

const Register = ({changeStatus}) => {

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
    const [matchPwd, setMatchPwd] = useState('');
    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) 
        {
            setErrMsg("Invalid Entry");
            return;
        }
        try 
        {
            console.log(user, pwd);
            const {
                data: { response },
            } = await axios.post('/add', {
                name: user,
                password: encrypt(pwd),
            });
            if(response === 'success')
            {
                changeStatus(1);
                setUser('');
                setPwd('');
                setMatchPwd('');
            }
            else if(response === 'fail')
            {
                setErrMsg('Username Taken!');
                errRef.current.focus();
            }
        } 
        catch (err) 
        {
            setErrMsg("Registration Failed!")
            errRef.current.focus();
        }
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const SignInOnClick = () => {
        changeStatus(1);
    }

    return (
        <div className = "login">
            <div className = "sectionWrapper">
                <section>
                    <p ref={errRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit = {handleSubmit}>
                        <label htmlFor = "username"><UserOutlined></UserOutlined>
                            Username:
                            <FontAwesomeIcon icon = {faCheck} className = {validName ? "valid" : "hide"}></FontAwesomeIcon>
                            <FontAwesomeIcon icon = {faTimes} className = {validName || !user ? "hide" : "invalid"}></FontAwesomeIcon>
                        </label>
                        <input
                            type="text" id = "username" ref = {userRef} autoComplete = "off" onChange = {(e) => setUser(e.target.value)}
                            value = {user} required aria-invalid = {validName ? "false" : "true"} aria-describedby = "uidnote"
                            onFocus = {() => setUserFocus(true)} onBlur = {() => setUserFocus(false)}>
                        </input>
                        <p id="uidnote" className = {userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon = {faInfoCircle}></FontAwesomeIcon>
                            4 to 12 characters.<br />
                            Must begin with a letter.<br />
                        </p>
                        <label htmlFor = "password"><KeyOutlined></KeyOutlined>
                            Password:
                            <FontAwesomeIcon icon = {faTimes} className = {validPwd || !pwd ? "hide" : "invalid"}></FontAwesomeIcon>
                            <FontAwesomeIcon icon = {faCheck} className = {validPwd ? "valid" : "hide"}></FontAwesomeIcon>
                        </label>
                        <input
                            type="password" id="password" value={pwd} required aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote"
                            onChange={(e) => setPwd(e.target.value)} onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)}>
                        </input>
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                            8 to 24 characters.<br/>
                            Must include both letters and numbers.<br/>
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"}></FontAwesomeIcon>
                        </label>
                        <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd} required aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)}>
                        </input>
                        <p id="confirmnote" className = {matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                            Must match the first password input field.
                        </p>
                        <button disabled={validName && validPwd && validMatch ? false : true}>Sign Up</button>
                    </form>
                    <p>
                        Already have an account?<br/>
                        <button onClick = {SignInOnClick}>Sign In</button>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Register