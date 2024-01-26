import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItems,
  onClearAllItems,
}) {
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
        <button onClick={onClearAllItems}>Clear List</button>
      </div>
    </div>
  );
}
