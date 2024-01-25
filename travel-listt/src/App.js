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

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
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
      />
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
      />
      {/* its the basic input tag where we basically enter the text we wanted*/}
      <button>add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
  const [sortedBy, setSortedBy] = useState("input"); // we now use derived state (meaning we will not make another state variable we will derive all this from the sorted state variable)
  let sortedItems;

  if (sortedBy === "input") sortedItems = items;
  else if (sortedBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description)); //we are first make a copy of item array beacuse sort method is a mutable method and react is all about immutablity
  } else if (sortedBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>{" "}
      {/*we want to run this event handler on clicking*/}
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>start adding items that you need for travel ✈️</em>
      </footer>
    );
  }
  const numItems = items.length;

  const packedItems = items.filter((item) => item.packed).length;

  const packedPercentageItems = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {packedPercentageItems === 100
          ? "you have got everything to go ✈️"
          : `  
        You have ${numItems} items on your list, and you have already packed ${packedItems} (${
              packedPercentageItems ? packedPercentageItems : 0
            }%)`}
      </em>
    </footer>
  );
}
