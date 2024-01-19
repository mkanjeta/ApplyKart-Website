export default {
    control: {
      backgroundColor: "transparent",
      fontSize: 14,
      fontWeight: "normal",
    },
  
    "&multiLine": {
      highlighter: {
        padding: 9,
        border: "1px solid transparent",
      },
    
    },
  
    "&singleLine": {
      display: "inline-block",
      width: 180,
  
      highlighter: {
        padding: 1,
        border: "2px inset transparent",
      },
   
    },
  
    suggestions: {
      backgroundColor: "transparent",
      zIndex: "999",
      list: {
        backgroundColor: "white",
        paddingTop: ".7rem",
        paddingBottom: ".7rem",
        border: "1px solid rgba(0,0,0,0.15)",
        fontSize: "1.36rem",
        borderRadius: "1rem",
        overflow: "hidden"
      },
      item: {
        padding: "5px 15px",
        color: "#262626",
        fontFamily: "Open Sans",
        fontSize: "1.36rem",
        fontWeight: "500",
        "&focused": {
          backgroundColor: "#2474f4",
          color: "#ffffff"
        },
      },
    },
  };
  