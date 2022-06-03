import React, { useState, useEffect } from "react";
import BookService from "../Services/DatabaseService/BookService";
import { Alert } from "@mui/material";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
      return;
    }
    const newBook = {
      title,
      author,
      status
    };

    console.log(newBook);
    try {
      if (id !== undefined && id !== "") {
        await BookService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated Book" });
      } else {
        await BookService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      // edit book entry
      const docSnap = await BookService.getBook(id);
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("Id here is", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}

      <form
        className="container mx-auto m-5 "
        style={{ width: "600px" }}
        onSubmit={handleSubmit}
      >
        <div className="d-block">
          <label className="bg-dark p-2 pl-3 pr-3" style={{ color: "white" }}>
            B
          </label>
          <input
            className="book-title p-2 my-4"
            style={{ width: "400px" }}
            placeholder="Book Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>

        <div className="d-block">
          <label className="bg-dark p-2 pl-3 pr-3" style={{ color: "white" }}>
            A
          </label>
          <input
            className="book-list p-2 "
            style={{ width: "400px" }}
            placeholder="Book Author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          ></input>
        </div>

        <div className="d-block mx-auto">
          <button
            type="button"
            className="btn btn-success p-2 my-2 mr-2"
            onClick={() => {
              setStatus("Available");
            }}
          >
            Available
          </button>
          <button
            type="button"
            className="btn btn-danger p-2 my-2"
            onClick={() => {
              setStatus("Not Available");
            }}
          >
            Not Available
          </button>
        </div>

        <button
          type="submit"
          style={{ width: "400px" }}
          className="d-block btn btn-primary mx-auto pl-8 pr-8"
        >
          Add/Update
        </button>
      </form>
    </>
  );
};

export default AddBook;