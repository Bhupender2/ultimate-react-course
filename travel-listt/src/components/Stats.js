export default function Stats({ items }) {
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
