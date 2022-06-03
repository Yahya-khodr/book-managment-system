import useAuth from "../hooks/useAuth"
import { Box, CssBaseline, Typography } from "@mui/material";
import book1 from '../assets/book1.jpg'
import book2 from '../assets/book2.jpg'
import book3 from '../assets/book3.jpg'
import book4 from '../assets/book4.jpg'
import CarouselCard from "../components/CarouselSlider";
import CarouselItem from "../components/CarouselSlider/CarouselItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

const Home = () => {


  const theme = createTheme();
  return (
    
    <>
        <Box sx={{ px: 0 }}>
          <Typography
            align="center"
            fontSize="2em"
            color="#FFFF"
            fontWeight="bold"
            py={1}
          >
            Top Trending Books
          </Typography>
          <CarouselCard>
            {books.map((book, index) => (
              <CarouselItem
                key={index}
                image={book.image}
                title={book.name}
              />
            ))}
          </CarouselCard>
        </Box>
  </>

  )
}

export default Home