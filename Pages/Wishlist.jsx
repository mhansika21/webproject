// src/Pages/Wishlist.jsx
import React from 'react';
import { useWishlist } from '../Context/WishlistContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {wishlist.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '16px', width: '200px' }}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
              </Link>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.new_price}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  borderRadius: '4px',
                }}
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
