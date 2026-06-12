import { Card, Row, Col } from "react-bootstrap";
import api from "../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link
        className="navbar-brand"
        to="/dashboard"
      >
        Library
      </Link>

      <div>
        <Link
          className="btn btn-light me-2"
          to="/books"
        >
          Books
        </Link>

        {/* {role === "admin" && (
          <Link
            className="btn btn-warning"
            to="/authors"
          >
            Authors
          </Link>
        )} */}
      </div>
    </nav>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({});
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    try {
      const response = await api.get("/api/dashboard/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
const role = localStorage.getItem("role");
console.log("Role:", role);
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
        <Navbar/>
      <h2 className="mb-4">
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </h2>

      <Row>
        {role === "admin" && (
          <>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Total Books</h5>
                  <h2>{data.total_books || 0}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Total Users</h5>
                  <h2>{data.total_users || 0}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Borrowed Books</h5>
                  <h2>{data.borrowed_books || 0}</h2>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}

        {role === "author" && (
          <>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>My Books</h5>
                  <h2>{data.my_books || 0}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Total Borrows</h5>
                  <h2>{data.total_borrows || 0}</h2>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}

        {role === "reader" && (
          <>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Borrowed Books</h5>
                  <h2>{data.borrowed_books || 0}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Returned Books</h5>
                  <h2>{data.returned_books || 0}</h2>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;