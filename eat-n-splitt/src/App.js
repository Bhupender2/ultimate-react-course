import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onSet }) {
  return (
    <button className="button" onClick={onSet}>
      {children}
    </button>
  );
}

export default function App() {
  const [add, setAdd] = useState(false); // creating a state to render components
  function handleSetAdd() {
    setAdd((add) => !add);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {add && <AddFriendForm />} {/* This is rendered conditionally */}
        <Button add={add} onSet={handleSetAdd}>
          {add ? "close" : "Add Friend"}
        </Button>
      </div>
      <Form />
    </div>
  );
}

function FriendsList() {
  const friendss = initialFriends;

  return (
    <ul>
      {friendss.map((friend) => (
        <Friends friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friends({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      {friend.name}
      {/*Conditionally rendered elements as you can see that only one element out of three will be rendered here*/}
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {friend.balance} $
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}

      <button className="button">select</button>
    </li>
  );
}

function Form() {
  return (
    <form className="form-split-bill">
      <h2> SPLIT A BILL WITH ANTHONY</h2>
      <label>💰 Bill Value</label>
      <input type="number" />
      <label>👧Your Expense</label>
      <input type="number" />
      <label>🧑‍🤝‍🧑Anthony Expenses</label>
      <input type="number" disabled />
      <label>🤑 who's Paying the Bill</label>
      <select>
        <option>You</option>
        <option>Anthony</option>
      </select>
      <Button>Split bill</Button> {/*children props passing here*/}
    </form>
  );
}

function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label> 🐶Friend name</label>
      <input type="text" />
      <label>🌇 Image Url</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}
