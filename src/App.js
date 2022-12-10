import React, { useEffect } from "react";

const App = () => {
  const apiKey = process.env.REACT_APP_DESTINY_API_KEY;
  const [item, setItem] = React.useState("");
  const playerArray = [];
  const [fetchedPlayer, setFetchedPlayer] = React.useState({});
  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", apiKey);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await fetch(
        "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/",
        requestOptions
      );
      const itemJson = await itemData.json();

      setItem(itemJson.Response.data.inventoryItem);
    };

    const fetchPlayer = async () => {
      const playerData = await fetch(
        "https://www.bungie.net/platform/Destiny2/3/Profile/4611686018467284386/?components=200",
        requestOptions
      );
      const playerJson = await playerData.json();
      setFetchedPlayer(playerJson.Response.characters.data);
      playerArray.push(player);
    };
    fetchItem();
    fetchPlayer();
  }, []);

  console.log(item, player);

  return (
    <div>
      <p>hello world</p>
      <img src={"https://www.bungie.net" + item.icon} />
      <p>
        Datto's hunter has been played for{" "}
        {player["2305843009300406282"]?.minutesPlayedTotal} minutes
      </p>{" "}
    </div>
  );
};

export default App;
