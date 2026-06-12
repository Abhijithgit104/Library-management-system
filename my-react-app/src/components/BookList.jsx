import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const BookList = () => {
  const [search, setSearch] = useState("");
  const [borrow,Setborrow]=useState(false)
  const [Status,SetStatus]=useState(false)
  const role =localStorage.getItem('role')

 const[data,setData]=useState([])

 const fetchData=async()=>{
    const response = await api.get('http://127.0.0.1:8000/api/book/')
    setData(response.data)
    return response.data
 console.log("Role:", role);
console.log("Books:", data);


 }
const handleUpdateStatus = async (id, currentAvailability) => {
    try {
      await api.put(`http://127.0.0.1:8000/api/book/${id}/`, {
        is_available: !currentAvailability
      });
      
      alert("Status updated successfully!");
      fetchData(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
const handleBorrow = async(id) => {

    try {

        await api.post(
            `api/borrow/${id}`
        )


        alert("Book Borrowed")

        fetchData()

    } catch(error) {

        console.log(error)
    }
}
 
useEffect(() => {
  const timer = setTimeout(() => {
    fetchData();
    UpdateStatus();
  }, 1000);

  return () => clearTimeout(timer);
}, []);

const handledelete = ()=>{
    alert('Deleted successfully')
    document.getElementById('deleteclass').style.display = 'none';


}
  return (
    <div className="container mt-4">
      <h2>Books</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Published Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {data.map((book) => (
    <tr key={book.id}>
      <td>{book.book_name}</td>
      <td>{book.author}</td>

      <td>
        {Status ? (
          <span className="badge bg-success">
            Borrowed
          </span>
        ) : (
          <span className="badge bg-danger">
            Available
          </span>
        )}
      </td>

      <td>{book.published_date}</td>
      <td>{book.price}</td>

      <td>
        {role === "admin" ? (

          <>
          <Link to='/create'>
          <button className="btn btn-secondary" >Create</button>
          </Link>
          <Link  to='/edit'>
            <button className="btn btn-primary btn-sm me-2" >
              Edit
            </button></Link>

           <Link to='/delete'  ><button className="btn btn-danger btn-sm me-2" onClick={handledelete}>
              Delete
            </button></Link> 
          </>
        ) : role === "reader" ? (
         <button 
                    className="btn btn-warning btn-sm" 
                    onClick={() => handleBorrow(book.id)}
                    disabled={!book.is_available} 
                  >
                    {book.is_available ? "Borrow" : "Unavailable"}
                  </button>
        ) : (
          <span>No Actions</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default BookList;