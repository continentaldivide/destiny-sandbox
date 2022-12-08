import React from "react";

const App = () => {
  const apiKey = process.env.REACT_APP_DESTINY_API_KEY;
  const [text, setText] = React.useState("");
  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", apiKey);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setText(result.Response.data.inventoryItem.icon);
    })
    .catch((error) => console.log("error", error));

  return (
    <div>
      <p>hello world</p>
      <img src={"https://www.bungie.net" + text} />
    </div>
  );
};

export default App;
