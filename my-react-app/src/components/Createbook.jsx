import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


const CreateBook = () => {

  const [formData, setFormData] = useState({
    book_name: "",
    author:"",
    published_date: "",
    price: 0
  });
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/book/", formData);
      alert("Book Added Successfully");
      navigate('/books')

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Book Name"
          value={formData.book_name}
          onChange={(e)=>
            setFormData({
              ...formData,
              book_name:e.target.value
            })
          }
        />
        <input
          className="form-control mb-3"
          placeholder="Author"
          value={formData.author}
          onChange={(e)=>
            setFormData({
              ...formData,
              author:e.target.value
            })
          }
        />

        <input
          type="date"
          className="form-control mb-3"
          value={formData.published_date}
          onChange={(e)=>
            setFormData({
              ...formData,
              published_date:e.target.value
            })
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          value={formData.price}
          onChange={(e)=>
            setFormData({
              ...formData,
              price:e.target.value
            })
          }
        />

        <button className="btn btn-success">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;