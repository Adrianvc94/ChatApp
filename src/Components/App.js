import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../Context/ContactsProvider";
import { ConversationsProvider } from "../Context/ConversationsProvider";
import { SocketProvider } from "../Context/SocketProvider";
import { useState } from "react";

function App() {
  const [id, setId] = useLocalStorage("id");
  const [isLoggedIn, setIsLoggedIn] = useState("0");

  let isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} setIsLoggedIn={setIsLoggedIn}/>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  
  return isLoggedIn === "1" || isLoggedInLocalStorage ? dashboard : <Login onIdSubmit={setId} setIsLoggedIn={setIsLoggedIn}/>;

}

export default App;
