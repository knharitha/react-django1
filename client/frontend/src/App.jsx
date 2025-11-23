import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const[books,setBooks]=useState([])
  const[title,setTitle]=useState('')
  const[publishedYear,setPublishedYear]=useState(0)
  const[newTitle,setNewTtitle]=useState("")
  useEffect(()=>{
    fetchBooks()
  },[])
  const fetchBooks=async()=>{
    try{
      const res=await fetch('http://localhost:8000/api/books/')
      const data=await res.json()
      console.log(data)
      setBooks(data)
    }catch(error){
      console.error("Error fetching books:",error)
    }
  }
    const addBook=async()=>{

      const bookData={
        title,
        published_year:publishedYear
      }
      try{
      const res=await fetch('http://localhost:8000/api/books/add/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(bookData)
      })
      const data=await res.json()
      setBooks((prev)=>[...prev, data])
      setTitle('');
setPublishedYear(0);

    }
    catch(error){
      console.error("Error adding book:",error)
    }
  }
  const updateTitle = async (pk, published_year) => {
  const bookData = {
    title: newTitle,
    published_year,
  };

  try {
    const res = await fetch(`http://localhost:8000/api/books/${pk}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    const data = await res.json();

    setBooks((prev) =>
      prev.map((book) => (book.id === pk ? data : book))
    );
  } catch (error) {
    console.error("Error updating book:", error);
  }
};

  const deleteBook = async (pk) => {
  try {
    await fetch(`http://localhost:8000/api/books/${pk}`, {
      method: 'DELETE',
    });

    setBooks((prev) => prev.filter((book) => book.id !== pk));
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

  return (
    <>
     <h1>
      Book website
     </h1>
     <div className='container'>
      <form>
        <input type="text" 
        placeholder='enter book title' 
        onChange={(e)=>setTitle(e.target.value)} />
        <input type="number" 
        placeholder='enter published year' 
        onChange={(e)=>setPublishedYear(Number(e.target.value))} />
        <button type="submit" onClick={(e)=>{e.preventDefault(); addBook();}}>Add </button>
      </form>
        {books.map((book)=>(
          <div key={book.id} className='book-item'>
            <h3>Title: {book.title}</h3>
            <p>Published Year: {book.published_year}</p>
            <input type='text' placeholder='new title'
        onChange={(e)=>setNewTtitle(e.target.value)} />
            
            <button onClick={()=>updateTitle(book.id,book.published_year)}>Chnage title</button>
            <button onClick={()=>deleteBook(book.id)}>Delete</button>
          </div>
        ))}
     </div>
    </>
  )
}

export default App
