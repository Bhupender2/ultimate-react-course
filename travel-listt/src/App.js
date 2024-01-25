import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]); // we are updating the new value from the previous value so we use callback function inside the setter function and we can't mutate the array beacuse react is all about immutability so we will make a new array out of it
  }

  // event handler function for deleting the items

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id)); // we have to upadate the state with the help of previous state so we have to use callback so that we will not got an error because of js asynchronous behaviour
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />{" "}
      {/*we can pass anything as a function here*/}
      <PackingList items={items} onDeleteItems={handleDeleteItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  // state should always be defined at the Top
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem); // we are calling the new object that we are creating here
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your Trip 😍 ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {" "}
        {/*e.target.value will give a string so convert it*/}
        {/* basically used for selecting the options*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => {
          console.log(e.target.value);
          setDescription(e.target.value);
        }}
      />{" "}
      {/* its the basic input tag where we basically enter the text we wanted*/}
      <button>add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button> {/*we want to run this event handler on clicking*/}
    </li>
  );
}

function Stats({ items }) {
  return (
    <footer className="stats">
      <em>{`You have ${items.length} items on your list, and you have already packed X (X%)`}</em>
    </footer>
  );
}
