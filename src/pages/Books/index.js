import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles.css'
import logoImage from '../../assets/logo.svg'
import {FiPower, FiEdit, FiTrash2} from 'react-icons/fi'
import  API from "..//../Services/API"
import RefrashToken from "../login/RefrashToken";

export default function Books(){
   const [books, setBooks] = useState([]);
   const [page, setPage] = useState(0);
   
   const userName = localStorage.getItem('userName');
   const accessToken = localStorage.getItem('accessToken');
   
   const authorization = {
      headers: {
         Authorization: `Bearer ${accessToken}`
      }
   };
      async function islogin(){
         const result = await RefrashToken()
         if(result){
            navigator('/books')
         }
         else{
            navigator('/')
         }
         
      }
   const navigator = useNavigate();
    useEffect(() => {
           
            fetchMoreBooks();
        
   }, [accessToken]);
   async function  fetchMoreBooks(){
      try{
         const response = await API.get(`api/Book/v1/asc/4/${page}`,authorization);
            setBooks([...books,...response.data.list]);
            setPage(page + 1);
      }catch(err){
         
         if(err != null){
            if(err.response.status == '401'){
               islogin()
            }
         } 
         
      }
         
   }
   async function logout(){
      try{
        await API.get('api/Auth/v1/revoke',authorization);
            localStorage.clear();
            navigator('/')
      }catch(err){
         if(err != null && err.response.status == '401'){
            navigator('/') 
         }
         alert('logout failed! try again')
      }
   }
   async function editBook(id){
      try{
         navigator(`/book/new/${id}`)
         
      }catch(err){         
         alert('edited book failed! try again')
      }
   }
   async function deleteBook(id){
      try{
            await API.delete(`api/Book/v1/${id}`,authorization);
            setBooks(books.filter(book => book.Code !== id))
      }catch(err){
         if(err != null){
            if(err.response.status == '401'){
               islogin()
            }
         } 
         alert('Deleted failed! try again')
      }
   }
  
   return (
      <div className="book-container">
         <header>
            <img src={logoImage} alt="logo site"></img>
            <span>Welcome, <strong>{userName.toLowerCase()}</strong>!</span>
            <Link className="button" to="/book/new/0">Add New Book</Link>
            <button onClick={logout} type="button">
               <FiPower size={18} color="#251fc5"/>
            </button>
         </header>
         <h1> Registed books</h1>
         <ul>
            {books.map((book) => (
               <li key={book.Code}>
                  <strong>Title:</strong>
                  <p>{book.Title}</p>
                  <strong>Author:</strong>
                  <p>{book.Author}</p>
                  <strong>Price:</strong>
                  <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(book.Price)}</p>
                  <strong>Release Date:</strong>
                  <p>{Intl.DateTimeFormat('pt-Br').format(new Date(book.LaunchDate))}</p>
                  <button onClick={() =>editBook(book.Code)} type="button">
                     <FiEdit size={25} color="#251fc5" />                  
                  </button>
                  <button onClick={() => deleteBook(book.Code)} type="button">
                     <FiTrash2 size={25} color="#251fc5" />                  
                  </button>
               </li>       
            ))}     
         </ul>
         <button className="button" type="button" onClick={fetchMoreBooks}>Load More</button>
      </div>
   )
}