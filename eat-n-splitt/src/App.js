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
  const [friends, setFriends] = useState(initialFriends); // creating a lifted up state so that we can display and update this data in both children components (friendsList and AddFriendForm respectively)

  function handleSetAdd() {
    setAdd((add) => !add);
  }
  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setAdd(false)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {add && <AddFriendForm onAddFriend={handleAddFriend} />}{" "}
        {/* This is rendered conditionally */}
        <Button add={add} onSet={handleSetAdd}>
          {add ? "close" : "Add Friend"}
        </Button>
      </div>
      <Form />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
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

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    // preventing it from reloading (preventing its default behaviour of form elements)
    e.preventDefault();

    //if any field is blank return nothing
    if (!name || !image) return;

    //storing all the state variable into a new object here
    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, balance: 0, id }; // we want same image on relaoding thats why we add id in the string here
    onAddFriend(newFriend);

    // cleaning the input field after submitting
    setImage("https://i.pravatar.cc/48");
    setName("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🐶Friend name</label>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌇 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
