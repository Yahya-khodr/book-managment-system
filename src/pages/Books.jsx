import React from "react";
import { useState } from "react";
import AddBook from "../components/Book/AddBook";
import BooksList from "../components/Book/Books";

const Books = () => {
  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log(id);
    setBookId(id);
  };
  return (
    <>
      <AddBook id={bookId} setBookId={setBookId} />
      <BooksList getBookId={getBookIdHandler} />
    </>
  );
};

export default Books;
