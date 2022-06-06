import React, { useState, useEffect } from "react";
import BookDataService from "../../services/BookService";
import {
    Box,
      Button,
      Card,
      CardActions,
      CardContent,
      CardMedia,
      Container,
      Grid,
      Typography
    } from "@mui/material";
const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();

    // console.log(data.docs);
    setBooks(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  return (
    //referesh list on adding a book
    <>
      <div className="mb-2">
        <button className="btn btn-dark" onClick={getBooks}>
          Refresh
        </button>
      </div>

      <Grid container spacing={3} align="center">
          {books.map((book, index) => (
            <Grid item key={book} xs={12} sm={6} md={6}>
              <Card sx={{ display: 'flex', height : "100%"}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {book.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                      by {book.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                                    {book.brief}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={book.image}
                    alt="Live from space album cover"
                  />
                </Card>
            </Grid>
          ))}
        </Grid>
      {/* <pre> {JSON.stringify(books,undefined,2)}</pre> */}
      {/* <table className="table mx-auto" style={{ width: "700px" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book Title</th>
            <th scope="col">Book Author</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <button
                    className="edit btn btn-success"
                    onClick={(e) => getBookId(doc.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete btn btn-danger"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </>
  );
};

export default BooksList;