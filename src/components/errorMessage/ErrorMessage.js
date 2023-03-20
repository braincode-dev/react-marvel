import image from "./error.gif";

const ErrorMessage = () => {
    const style = {
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }

  return (
    <img src={image} alt="Error message" style={style} />
  ); 
};

export default ErrorMessage;
