import React, { useState, useEffect, createRef } from "react";
import BookDataService from "../../services/BookService";
import { Alert, Box, TextField, Button, CardMedia, Grid } from "@mui/material";
import { upload } from "../../services/StorageService";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { db, storage } from "../../firebase";
const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("Draft");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [image, setImage] = useState(null);
  const inputFileRef = createRef(null);

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
      brief,
      status,
      image,
    };

    console.log(newBook);
    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated Book" });
      } else {
        await BookDataService.addBooks(newBook);

        setMessage({ error: false, msg: "New Book added" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
  };

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };
  const setNewImage = (newImage) => {
    if (image) {
      cleanup();
    }
    setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setNewImage(URL.createObjectURL(newImage));
    }
  };
  const [isfile, setFile] = useState(null);
  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let file = isfile;

    var storagePath = "uploads/" + file.name;

    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          BookDataService.addBooks({
            title,
            author,
            brief,
            status,
            image: url,
          });
          setTitle("");
          setAuthor("");
        });
      }
    );
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  const editHandler = async () => {
    setMessage("");
    try {
      // edit book entry
      const docSnap = await BookDataService.getBook(id);
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

      <Box
        component="form"
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 4,
          color: "white",
          borderRadius: "20px",
          margin: "2% auto",
          backgroundColor: "#33384e",
        }}
        onSubmit={handleUpload}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            m: "auto",
            display: "flex",
            alignContent: "space-between",
            p: 1,
          }}
        >
          <TextField
            label="Book Name"
            id="book"
            required
            sx={{ m: 2 }}
            inputProps={{ style: { color: "white" } }}
            margin="normal"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Author Name"
            id="book"
            required
            margin="normal"
            sx={{ m: 2 }}
            inputProps={{ style: { color: "white" } }}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </Grid>
        <TextField
          id="outlined-multiline"
          label="Brief"
          multiline
          rows={3}
          inputProps={{ style: { color: "white" } }}
          sx={{ m: 2 }}
          onChange={(e) => {
            setBrief(e.target.value);
          }}
        />
        <Box textAlign={"center"}>
          <Button
            variant="contained"
            component="label"
            onClick={handleClick}
            sx={{
              mt: 3,
              mb: 2,
              px: 5,
              color: "white",
              backgroundColor: "#423e4d",
            }}
          >
            {image ? "Remove" : "Upload Cover Image"}
            <input type="file" hidden accept=".png, .jpg, .jpeg" onChange={handleImageAsFile} />
          </Button>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image}
          alt="cover_image"
        />

        <Box textAlign={"center"}>
          <Button
            variant="contained"
            type="submit"
            color="success"
            sx={{
              mt: 3,
              mb: 2,
              px: 5,
              color: "white",
              backgroundColor: "#423e4d",
            }}
          >
            Publish New Book
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddBook;
