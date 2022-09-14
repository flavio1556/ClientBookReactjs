import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import  API from "..//../Services/API"
import './styles.css'
import logoImage from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import RefrashToken from "../login/RefrashToken";

export default function NewBook(){

    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [launchDate, setlaunchDate] = useState('');
    const [price, setPrice] = useState('');
    const { bookId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    async function islogin(){
        const result = await RefrashToken()
        if(result){
            navigator(`/book/new/${id}`)
        }
        else{
           navigator('/')
        }
        
     }
    async function saveOrUpdate(e){
        e.preventDefault();
        const data = {
            title,
            author,
            launchDate,
            price
        }     
        
        
        try{
            if(bookId === '0'){
                await API.post('/api/Book/v1',data, authorization); 
            }
            else{
                data.Code =id;
                await API.put('/api/Book/v1',data, authorization); 
            }
                
                            navigate('/books')       

        }catch(err){
            if(err != null){
                if(err.response.status == '401'){
                   islogin()
                }
             } 
            alert("Error while recording Book! try again!")
        }
        
    }

    useEffect(() => {
        if(bookId === '0' ) return;
        else loadBook();
    }, [bookId]);
    async function loadBook(){
        try{
            const response = await API.get(`/api/Book/v1/${bookId}`, authorization)
            let adjustedDate = response.data.LaunchDate.split("T",10)[0];
            setId(response.data.Code);
            setTitle(response.data.Title);
            setAuthor(response.data.Author);
            setPrice(response.data.Price)
            setlaunchDate(adjustedDate)
        }
        catch(err){
            if(err != null){
                if(err.response.status == '401'){
                   islogin()
                }
             } 
            alert("Erro recovering Book! try again!0")
            navigate('/books')
        }
    }
    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="logo site" />
                    <h1>{bookId === '0' ? 'Add New Book' : 'Update Book'}</h1>
                    <p>Enter the Book Information and click on {bookId === '0' ? `Add` : `Update`}! ##### ${bookId}</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251fc5"/>
                        Back to Books
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input
                         placeholder="Title"
                         value={title}
                         onChange={e => setTitle(e.target.value)}
                    />
                    <input
                         placeholder="Author"
                         value={author}
                         onChange={e => setAuthor(e.target.value)}
                    />
                    <input
                         type="date"
                         placeholder="Launch Date"
                         value={launchDate}
                         onChange={e => setlaunchDate(e.target.value)}
                    />
                    <input
                         placeholder="Price"
                         value={price}
                         onChange={e => setPrice(e.target.value)} 
                    />
                    <button className="button" type="submit">{bookId === '0' ? 'ADD' : 'Update'}</button>
                </form>
            </div>
        </div>
    );
}