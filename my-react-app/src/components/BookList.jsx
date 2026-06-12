import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const BookList = () => {
  const [search, setSearch] = useState("");
  const[filtered,setFiltered]=useState([])
  const [borrow,Setborrow]=useState(false)
  const [Status,SetStatus]=useState([])
  const role =localStorage.getItem('role')

 const[data,setData]=useState([])

 const fetchData=async()=>{
    const response = await api.get('api/book/')
    setData(response.data)
    setFiltered(response.data)
    return response.data 
 console.log("Role:", role);
console.log("Books:", data);


 }

 const handleDelete = async(id) =>{

if (!window.confirm("Are you sure you want to delete this item?")) return;
try{
const response = await api.delete(`api/book/${id}`)
alert("Book Deleted Success")
await fetchData() 
}
catch(error){
    alert("Deletion Failed")
}
 }
const handleUpdateStatus = async (id, currentAvailability) => {
    try {
        await api.put(`api/book/${id}`, { is_available: !currentAvailability });
        alert("Status updated successfully!");
        await fetchData()
        await handleStatus()     
    } catch (error) {
        console.error("Error updating status:", error);
    }
}

const handleStatus = async()=>{
const borrow= await api.get('api/borrow/')
SetStatus(borrow.data)
return borrow

}
const handleBorrow = async (id) => {
    try {
        await api.post(`api/borrow/${id}`)
        alert("Book Borrowed")
        await fetchData()        
        await handleStatus()     
    } catch(error) {
        console.log(error)
    }
}

const FilterSearch = () => {
    const filt = data.filter((a) =>
        a.book_name.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(filt)
}
useEffect(() => {
    const timer = setTimeout(() => {
        FilterSearch()
    }, 1000)
    return () => clearTimeout(timer)
}, [search])
 
useEffect(() => {
  const timer = setTimeout(() => {
    fetchData();
   handleStatus()
  }, 1000);

  return () => clearTimeout(timer);
}, []);


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
             {role =="admin" && (
                 <th> <Link to='/create'>
            <button className="btn btn-primary btn-sm me-2">
              Create
            </button></Link></th>
             )}
          </tr>
        </thead>

        <tbody>
  {filtered.map((book) => (
    <tr key={book.id}>
      <td>{book.book_name}</td>
      <td>{book.author}</td>

      <td>
        {Status.some(b => b.book === book.id ) ? (
  <span className="badge bg-danger">Borrowed</span>
) : (
  <span className="badge bg-success">Available</span>
)}
      </td>

      <td>{book.published_date}</td>
      <td>{book.price}</td>

      <td>
        {role === "admin" ? (
          <>
          <Link to={`/edit/${book.id}`}>
            <button className="btn btn-primary btn-sm me-2">
              Edit
            </button></Link>
             <Link>
            <button className="btn btn-danger btn-sm me-2" onClick={()=>handleDelete(book.id)}>
              Delete
            </button></Link>
          </>
        ) : role === "reader"  ? (
          <button
  className="btn btn-warning btn-sm"
  onClick={() => handleBorrow(book.id)}
  disabled={!book.is_available}
>
  {book.is_available ? "Borrow" : "Borrowed"}
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