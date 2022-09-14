import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import padlock from '../../assets/padlock.png'
import API from "../../Services/API";

export default function Login(){
    
    const Navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   async function login(e){
        e.preventDefault();
        const data = {
            username,
            password,
        };
        try{
            
            const response =  await API.post('api/Auth/v1/signin', data)
            localStorage.setItem('userName', username);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);          
            Navigate('books')

        }catch(error){
            console.log(error)
            alert('login failed! try again!')
        }
    }
    return (
        <div>
           <div className="login-container">
            <section className="form">
           
            <form  onSubmit={login}>
               <img src={logoImage} alt="sistema Logo" />
                <h1>Acess your Account</h1>
                <input
                 placeholder="Username" 
                 value={username}
                 onChange={e => setUsername(e.target.value)}
                 />

                 
                <input
                 placeholder="Password" 
                 type="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                />
                <button className="button" type="submit"> login</button>
            </form>
            </section>
            <img className="img-padlock" src={padlock} alt="login" />
            </div>         
        </div>
    );
}