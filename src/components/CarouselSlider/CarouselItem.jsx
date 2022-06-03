import { Box, CardMedia , Typography} from "@mui/material";

const CarouselItem = (props) => {
  return (
    <Box sx={{ p: 5 , alignContent: "center", height:"50%"}}>
      <CardMedia

        component="img"
        image={props.image}
        sx={{ cursor: "pointer", borderRadius: "20px" }}
        
      />
    <Typography variant="h5" sx = {{color: "#fff"}}>{props.title}</Typography>
    </Box>
  );
};

export default CarouselItem;