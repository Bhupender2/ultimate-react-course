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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [add, setAdd] = useState(false); // creating a state to render components
  const [frien     ds, setFriends] = useState(initialFriends); // creating a lifted up state so that we can display and update this data in both children components (friendsList and AddFriendForm respectively)

  const [selectedFriend, setSelectedFriend] = useState(null); // this is a lifted Up state so that friends and form component can communicate with each other
  function handleSetAdd() {
    setAdd((add) => !add);
  }
  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setAdd(false);
  }
  function handleSelectedFriend(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend)); //friend is the selected object here

    //closing the addFriendForm here because if we open both forms then it will look weird.
    setAdd(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null); // on clicking split bill the sptill bill form will be dissappered
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {add && <AddFriendForm onAddFriend={handleAddFriend} />}
        {/* This is rendered conditionally */}
        <Button add={add} onClick={handleSetAdd}>
          {add ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <Form selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friends({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
}

function Form({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoisPaying] = useState("user");

  function handleBillSubmit(e) {
    e.preventDefault(); // preventing the form from reloading on submission
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleBillSubmit}>
      <h2> SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        type="number"
      />
      <label>👧Your Expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) < bill ? Number(e.target.value) : paidByUser // if we exceed the bill value which is not correct so we update the state based on the following condition
          )
        }
      />
      <label>🧑‍🤝‍🧑{selectedFriend.name} Expenses</label>
      <input type="number" disabled value={paidByFriend} />
      <label>🤑 who's Paying the Bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoisPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
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
