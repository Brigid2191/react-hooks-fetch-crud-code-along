import React from 'react';

function Item({ item, onUpdateItem }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => {
        // Notify parent component to remove the item
        onUpdateItem(null, item.id); // Pass 'null' for item data to indicate deletion
      });
  }

  return (
    <li className={item.isInCart ? 'in-cart' : ''}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

      <button
        onClick={handleAddToCartClick}
        className={item.isInCart ? 'remove' : 'add'}
      >
        {item.isInCart ? 'Remove From' : 'Add to'} Cart
      </button>

      <button onClick={handleDeleteClick} className="remove">
        Delete
      </button>
    </li>
  );
}

export default Item;



