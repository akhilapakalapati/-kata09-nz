import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const products = [
  { id: 1, name: "A", price: 10.0 },
  { id: 2, name: "B", price: 15.5 },
];

const Scan = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cart, setCart] = useState([]);

  // Load cart from local storage when component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    console.log("Cart updated:", cart);

    // Adding a slight delay to ensure the state is fully updated
    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Cart saved to local storage:", cart);
    }, 100); // 100 milliseconds delay
}, [cart]);

  const handleProductSelect = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = products.find(product => product.name === selectedProduct);
      setCart([...cart, productToAdd]);
      setSelectedProduct(''); // Reset selection after adding
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <div>
      <nav className="scan-nav-container-styling">
        <h1>Scan</h1>
      </nav>
      <div className="para-styling">
        <p>Select a product to add to the cart:</p>
        <select value={selectedProduct} onChange={handleProductSelect} className="select-styling">
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link to={{
            pathname: "/Checkout",
            state: { cart: cart }, // Pass cart state to Checkout
        }}>
          <button className="check-btn">Checkout</button>
        </Link>
      </div>
      <ul className="main-list-style">
        {cart.map((item, index) => (
          <li key={index} className='sub-list-scan'>
            {item.name} - ${item.price.toFixed(2)}{' '}
            <button onClick={() => handleRemoveFromCart(index)} className="remove-btn">
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scan;
