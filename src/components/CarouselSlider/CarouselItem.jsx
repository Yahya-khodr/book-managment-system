import { Box, CardMedia , Typography} from "@mui/material";

const CarouselItem = (props) => {
  return (
    <Box sx={{ p: 5 , alignContent: "center", height:"80%"}}>
      <CardMedia

        component="img"
        height="100%"
        image={props.image}
        sx={{ cursor: "pointer", borderRadius: "20px" }}
        
      />
    <Typography variant="h4" sx = {{color: "#1f1716" , textAlign: "center"}}>{props.title}</Typography>
    </Box>
  );
};

export default CarouselItem;