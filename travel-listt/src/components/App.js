import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]); // we are updating the new value from the previous value so we use callback function inside the setter function and we can't mutate the array beacuse react is all about immutability so we will make a new array out of it
  }

  // event handler function for deleting the items

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id)); // we have to upadate the state with the help of previous state so we have to use callback so that we will not got an error because of js asynchronous behaviour
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearItems() {
    const confirmed = window.confirm("Are You sure you want to delete it"); //just a Dom function not a part of js but its a part of web api
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />{" "}
      {/*we can pass anything as a function here*/}
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        onClearAllItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
