import React, { useState, useContext } from 'react'
import CartContext from './CartContext';
import UserContext from './UserContext';

export default function LoginForm(props) {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let {user, setUser} = useContext(UserContext);

  let loggedOut = <div>
    <input value={username} onChange={(event) => {
        setUsername(event.target.value)
      }}></input>
      <input value={password} onChange={(event) => {
        setPassword(event.target.value)
      }}></input>
      <button onClick={() => {
        let loadData = async () => {
          let response = await fetch("/api/login/", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
          });
          let data = await response.json();
          if(data.success) {
            //Inloggade
            setUser(username);
          }
        }
        loadData();
      }}>
        Login
      </button>
  </div>

      let loggedIn = <button onClick={() => {
        let loadData = async () => {
          let response = await fetch("/api/logout/", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({})
          });
          setUser(null);
        }
        loadData();
      }}>
        Log out
      </button>

  return (
    <div>
      {user ? loggedIn : loggedOut}
    </div>
  )
}
