import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const EditBook = () => {

  const { id } = useParams();

  const [book,setBook] = useState({
    book_name:"",
    published_date:"",
    price:0
  });

useEffect(() => {
    const fetchBook = async (id) => {
        const response = await api.get(`api/book/${id}`)
        setBook(response.data)
    }
    fetchBook(id)
    if (id) {
    console.log("Fetching book with ID:", id); 
    fetchBook();
  } else {
    console.warn("ID param is currently undefined from the route configuration.");
  }
}, [id])

const handleSubmit = async (e) => {
    e.preventDefault()
    await api.put(`api/book/${id}`, book) 
    alert("Book Updated")
}

  return (
    <div className="container mt-4">

      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          value={book.book_name}
          placeholder="Book Name"
          onChange={(e)=>
            setBook({
              ...book,
              book_name:e.target.value
            })
          }
        />
        <input
        type="date"
          className="form-control mb-3"
          value={book.published_date}
          placeholder="Date"
          onChange={(e)=>
            setBook({
              ...book,
              published_date:e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="form-control mb-3"
          value={book.price}
          onChange={(e)=>
            setBook({
              ...book,
              price:e.target.value
            })
          }
        />

        <button className="btn btn-primary" type="submit">
          Update
        </button>

      </form>

    </div>
  );
};

export default EditBook;