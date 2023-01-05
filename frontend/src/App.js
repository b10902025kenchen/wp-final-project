import React, { useState } from 'react';
import './App.css';
import GoBang from './containers/GoBang';
import Login from './components/Login';
import Register from './components/register';

const App = () => {
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(1);
  const [currentUser, setcurrentUser] = useState('');

  console.log(currentUser);

  const currentUserOnChange = ( user ) => {
    setcurrentUser(user);
  }

  const successOnClick = () => {
    setSuccess(true);
  }

  const LogOut = () => {
    setSuccess(false);
    // something else TODO
  }

  const changeStatus = ( value ) => {
    setStatus(value);
  }
  return (
    <div className='App'>
      { success? <GoBang LogOut={LogOut} currentUserOnChange={currentUserOnChange} currentUser={currentUser}/>: status === 1? <Login successOnClick={successOnClick} changeStatus={changeStatus} currentUserOnChange={currentUserOnChange}></Login>: <Register changeStatus={changeStatus}></Register>}
    </div>
  );
}

export default App;
