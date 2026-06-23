import Propexample from "./componenets/Propexample";
import Card from "./componenets/Card";
import React from "react";
import UseStatee from "./hooks/UseStatee";


function App() {

  return (
    <>
      {/*  <Propexample movie={[{title:"titanic", hero:"Sharukh khan", image:"https://images.nationalgeographic.org/image/upload/v1638882458/EducationHub/photos/titanic-sinking.jpg"},{title:"Mission Impossible", hero: "tom cruise", image:"https://m.media-amazon.com/images/I/61E-neUYgJL._UF1000,1000_QL80_.jpg"},{title:"Inception", hero:"Leonardo",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0mig3IIp6m7WW8uHGU4AwpFbv9QhnOmDhLA&s"},{title:"The Matrix", hero: "Keanu Reeves",image:"https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Matrix.png/250px-The_Matrix.png"}]} /> */}
      
      <Card age={21} status="Offline" />
      <UseStatee />
      
      </>

  );
}

export default App;