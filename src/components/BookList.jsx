import {
  Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
  } from "@mui/material";
import { height } from "@mui/system";
import book1 from '../assets/book1.jpg'
import book2 from '../assets/book2.jpg'
import book3 from '../assets/book3.jpg'
import book4 from '../assets/book4.jpg'
  const books = [
    {
      name: "The Midnight Library",
      image: book1,
      author: "Matt Haig",
      brief:
        "In The Midnight Library, Nora Seed finds herself faced with the possibility of changing her life for a new one; following a different career, undoing old breakups, and realizing her dreams of becoming a glaciologist. She must search within herself to decide what makes life worth living in the first place.",
    },
    {
      name: "Malibu Rising",
      image: book2,
      author: "Taylor Jenkins Reid",
      brief:
        "The story centers on four famous siblings who throw an epic party to celebrate the end of the summer. But over the course of twenty-four hours, the family drama that ensues will change their lives forever.",
    },
    {
      name: "The Hill We Climb",
      image: book3,
      author: "Amanda Gorman",
      brief:
        "The slim volume can be returned to again and again for inspiration, hope, and affirmation.",
    },
    {
      name: "Klara and the Sun",
      image: book4,
      author: "Kazuo Ishiguro",
      brief:
        "The story of Klara, an Artificial Friend, who keenly observes passersby from her perch in the store and hopes to be chosen by a customer, is incredibly unique and memorable. The book makes us think about the ways artificial intelligence will permeate our lives and is also a timely meditation on love and loneliness",
    },
    
   
  ];
  const AllBooks = () => {
    return (
      <Container sx={{ py: 3, width: "100%" }} maxWidth="xl">
        <Typography
          align="center"
          fontSize="2em"
          color="#121721"
          fontWeight="bold"
          py={2}
        >
         List of Books
        </Typography>
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
      </Container>
    );
  };
  
  export default AllBooks;
  
