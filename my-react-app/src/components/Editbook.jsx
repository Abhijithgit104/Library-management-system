import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const EditBook = () => {

  const { id } = useParams();

  const [book,setBook] = useState({
    book_name:"",
    published_date:"",
    price:""
  });

  useEffect(() => {

    const fetchBook = async () => {

      const response =
      await api.get(`/api/book/${id}/`);

      setBook(response.data);
    };

    fetchBook();

  }, [id]);

  const handleSubmit = async(e) => {

    e.preventDefault();

    await api.put(
      `/api/book/${id}/`,
      book
    );

    alert("Book Updated");
  };

  return (
    <div className="container mt-4">

      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          value={book.book_name}
          onChange={(e)=>
            setBook({
              ...book,
              book_name:e.target.value
            })
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          value={book.price}
          onChange={(e)=>
            setBook({
              ...book,
              price:e.target.value
            })
          }
        />

        <button className="btn btn-primary">
          Update
        </button>

      </form>

    </div>
  );
};

export default EditBook;