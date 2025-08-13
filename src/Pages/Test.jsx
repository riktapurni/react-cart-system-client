import React, { useState, useEffect } from 'react';

// Main App component
export default function Test() {
  // Static product data from the user's provided structure
  const initialProducts = [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "image1.png",
      "rating": {
        "rate": 3.9,
        "count": 120
      },
      "stock": 2, // Changed stock for testing
      sizes: ["S", "M", "L", "XL"],
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "image2.png",
      "rating": {
        "rate": 4.1,
        "count": 259
      },
      sizes: ["S", "M", "L", "XL"],
      "stock": 2, // Changed stock for testing
    },
    {
      "id": 3,
      "title": "Freshly Roasted Coffee",
      "price": 12.00,
      "description": "A dark roast with notes of chocolate and caramel.",
      "category": "groceries",
      "image": "image3.png",
      "stock": 50,
      sizes: ["250g", "500g"],
    },
    {
      "id": 4,
      "title": "Handcrafted Soap",
      "price": 7.50,
      "description": "Made with natural ingredients and essential oils.",
      "category": "beauty",
      "image": "image4.png",
      "stock": 150,
      sizes: ["One Size"],
    },
    {
      "id": 5,
      "title": "Spiced Tea Blend",
      "price": 9.99,
      "description": "Aromatic blend of black tea, cinnamon, and ginger.",
      "category": "groceries",
      "image": "image5.png",
      "stock": 80,
      sizes: ["100g", "200g"],
    },
    {
      "id": 6,
      "title": "Gourmet Chocolate",
      "price": 18.25,
      "description": "Rich dark chocolate with sea salt.",
      "category": "food",
      "image": "image6.png",
      "stock": 90,
      sizes: ["100g"],
    },
  ];

  // State to hold the list of products, the cart items, and the current view
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products'); // 'products' or 'cart'

  // Function to add a product to the cart
  const addToCart = (productToAdd) => {
    // Check if the item is in stock before adding
    if (productToAdd.stock > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productToAdd.id);
        if (existingItem) {
          // If item already exists, increase the quantity
          return prevCart.map((item) =>
            item.id === productToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Otherwise, add new item with quantity 1
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });

      // Decrease the stock for the added product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productToAdd.id
            ? { ...product, stock: product.stock - 1 }
            : product
        )
      );
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const oldItem = prevCart.find((item) => item.id === productId);
      const oldQuantity = oldItem ? oldItem.quantity : 0;
      const stockChange = newQuantity - oldQuantity;

      if (newQuantity <= 0) {
        // If quantity is 0 or less, remove the item from the cart
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, stock: product.stock + oldQuantity }
              : product
          )
        );
        return prevCart.filter((item) => item.id !== productId);
      } else {
        // Otherwise, update the quantity
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, stock: product.stock - stockChange }
              : product
          )
        );
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  // Function to remove an item from the cart
  const removeItem = (productId) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => item.id === productId);
      if (removedItem) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, stock: product.stock + removedItem.quantity }
              : product
          )
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Cart icon SVG
  const CartIcon = ({ className, onClick }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );

  // Simple Button component using Tailwind
  const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
    const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
    const primaryStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md';
    const secondaryStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    const dangerStyle = 'bg-red-600 text-white hover:bg-red-700';
    const disabledStyle = 'bg-gray-400 text-gray-700 cursor-not-allowed';

    let style = primaryStyle;
    switch (variant) {
      case 'secondary':
        style = secondaryStyle;
        break;
      case 'danger':
        style = dangerStyle;
        break;
      default:
        style = primaryStyle;
    }

    return (
      <button onClick={onClick} className={`${baseStyle} ${disabled ? disabledStyle : style} ${className}`} disabled={disabled}>
        {children}
      </button>
    );
  };

  // Product Card component
  const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4 transform transition-transform duration-300 hover:scale-105">
      <img
        src={`https://placehold.co/400x300/F1A73E/FFFFFF?text=${encodeURIComponent(product.title)}`}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
        onError={(e) => {
          e.target.src = `https://placehold.co/400x300/F1A73E/FFFFFF?text=${encodeURIComponent(product.title)}`;
        }}
      />
      <h3 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h3>
      <p className="text-gray-600 font-medium mb-4">${product.price.toFixed(2)}</p>
      <div className="flex justify-between items-center w-full mb-4">
        <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Sold Out'}
        </p>
      </div>
      <Button
        onClick={() => onAddToCart(product)}
        className="w-full"
        disabled={product.stock <= 0}
      >
        Add to Cart
      </Button>
    </div>
  );

  // Cart Item component
  const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const product = products.find(p => p.id === item.id);
    const availableStock = product ? product.stock : 0;
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3">
        <div className="flex items-center flex-grow">
          <img
            src={`https://placehold.co/400x300/F1A73E/FFFFFF?text=${encodeURIComponent(item.title)}`}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-md mr-4"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x300/F1A73E/FFFFFF?text=${encodeURIComponent(item.title)}`;
            }}
          />
          <div className="flex-grow">
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            variant="secondary"
            className="p-2 w-8 h-8 flex items-center justify-center"
          >
            -
          </Button>
          <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
          <Button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            variant="secondary"
            className="p-2 w-8 h-8 flex items-center justify-center"
            disabled={availableStock <= 0}
          >
            +
          </Button>
        </div>
        <Button
          onClick={() => onRemoveItem(item.id)}
          variant="danger"
          className="ml-4"
        >
          Remove
        </Button>
      </div>
    );
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="bg-white shadow-md rounded-xl p-4 mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900">React Shopping Cart</h1>
          <button
            onClick={() => setView(view === 'products' ? 'cart' : 'products')}
            className="relative p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <CartIcon className="w-8 h-8" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </header>

        {/* Main Content Area */}
        <main>
          {view === 'products' ? (
            // Products Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            // Shopping Cart View
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>
              {cart.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeItem}
                      />
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-900">Total:</p>
                    <p className="text-2xl font-extrabold text-blue-600">${calculateTotal()}</p>
                  </div>
                  <Button
                    onClick={() => alert('Proceed to checkout!')}
                    className="mt-6 w-full text-lg"
                  >
                    Proceed to Checkout
                  </Button>
                </>
              ) : (
                <div className="text-center p-12 text-gray-500">
                  <p className="text-lg">Your cart is empty.</p>
                  <Button onClick={() => setView('products')} className="mt-4">
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
