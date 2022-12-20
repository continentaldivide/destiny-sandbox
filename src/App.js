import React, { useEffect } from "react";
import "./index.css";

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
      playerArray.push(fetchedPlayer);
    };
    fetchItem();
    fetchPlayer();
  }, []);

  console.log(item, fetchedPlayer);

  if (fetchedPlayer["2305843009300406282"] == undefined) {
    return (
      <div id="loading-screen">
        <h1>loading</h1>
      </div>
    );
  }

  return (
    <div>
      <Main item={item} fetchedPlayer={fetchedPlayer} />
    </div>
  );
};

const Main = ({ item, fetchedPlayer }) => {
  return (
    <div id="main">
      <Character item={item} fetchedPlayer={fetchedPlayer} />
      <Character item={item} fetchedPlayer={fetchedPlayer} />
      <Character item={item} fetchedPlayer={fetchedPlayer} />
    </div>
  );
};

const Character = ({ item, fetchedPlayer }) => {
  return (
    <div class="character">
      {/* <img src={"https://www.bungie.net" + item.icon} />
      <p>
        Datto's hunter has been played for{" "}
        {fetchedPlayer["2305843009300406282"]?.minutesPlayedTotal} minutes
      </p>
      <p>
        Datto's hunter has been played for{" "}
        {fetchedPlayer["2305843009300406282"]?.minutesPlayedTotal} minutes
      </p> */}
      <EquippedItem2
        item={item}
        fetchedCharacter={fetchedPlayer["2305843009300406282"]}
      />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
      <EquippedItem item={item} fetchedPlayer={fetchedPlayer} />
    </div>
  );
};

const EquippedItem = ({ item, fetchedPlayer }) => {
  return (
    <div class="equipped-item">
      <img src={"https://www.bungie.net" + item.icon} />
      <p>
        Datto's hunter has been played for{" "}
        {fetchedPlayer["2305843009300406282"]?.minutesPlayedTotal} minutes
      </p>
    </div>
  );
};

const EquippedItem2 = ({ item, fetchedCharacter }) => {
  return (
    <div class="equipped-item">
      <img src={"https://www.bungie.net" + item.icon} />
      <p>
        Datto's hunter has been played for {fetchedCharacter.minutesPlayedTotal}{" "}
        minutes
      </p>
    </div>
  );
};

export default App;
