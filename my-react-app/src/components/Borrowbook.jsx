import api from "../api/api";

const BorrowButton = ({ bookId }) => {

  const handleBorrow = async () => {

    try {

      await api.post(
        "/api/borrow/",
        {
          book: bookId
        }
      );

      alert("Book Borrowed");

    } catch(error) {

      console.log(error);
    }
  };

  return (

    <button
      className="btn btn-warning"
      onClick={handleBorrow}
    >
      Borrow
    </button>

  );
};

export default BorrowButton;