import React from 'react';
import { useWishlist } from '../Context/WishlistContext';

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <ul>
          {wishlist.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} width="50" />
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
