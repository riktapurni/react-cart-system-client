import React, { useState } from 'react';
// import { Plus, Minus, X, ShoppingCart } from 'lucide-react';

const CartSystem = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      stock: 15,
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
      stock: 8,
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: "Sneakers",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      stock: 12,
      sizes: ['7', '8', '9', '10', '11', '12']
    }
  ]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (text, type = 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const addToCart = (product, selectedSize) => {
    if (!selectedSize) {
      showMessage('Please select a size', 'error');
      return;
    }

    if (product.stock <= 0) {
      showMessage('Product is out of stock', 'error');
      return;
    }

    const existingItem = cart.find(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        size: selectedSize,
        quantity: 1,
        cartId: `${product.id}-${selectedSize}`
      }]);
      showMessage(`${product.name} (Size ${selectedSize}) added to cart!`, 'success');
    }

    // Decrease product stock
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - 1 }
        : p
    ));
  };

  const updateQuantity = (cartId, newQuantity) => {
    const cartItem = cart.find(item => item.cartId === cartId);
    if (!cartItem) return;

    const product = products.find(p => p.id === cartItem.id);
    if (!product) return;

    if (newQuantity === 0) {
      // Remove item and restore stock
      const quantityToRestore = cartItem.quantity;
      setCart(cart.filter(item => item.cartId !== cartId));
      setProducts(products.map(p =>
        p.id === cartItem.id
          ? { ...p, stock: p.stock + quantityToRestore }
          : p
      ));
    } else if (newQuantity > cartItem.quantity) {
      // Increasing quantity - check stock
      if (product.stock > 0) {
        setCart(cart.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: newQuantity }
            : item
        ));
        setProducts(products.map(p =>
          p.id === cartItem.id
            ? { ...p, stock: p.stock - 1 }
            : p
        ));
      } else {
        showMessage('Not enough stock available', 'error');
      }
    } else {
      // Decreasing quantity - restore stock
      setCart(cart.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      ));
      setProducts(products.map(p =>
        p.id === cartItem.id
          ? { ...p, stock: p.stock + 1 }
          : p
      ));
    }
  };

  const removeFromCart = (cartId) => {
    const cartItem = cart.find(item => item.cartId === cartId);
    if (!cartItem) return;

    // Restore stock when removing item
    const quantityToRestore = cartItem.quantity;
    setCart(cart.filter(item => item.cartId !== cartId));
    setProducts(products.map(p =>
      p.id === cartItem.id
        ? { ...p, stock: p.stock + quantityToRestore }
        : p
    ));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const ProductCard = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState('');

    return (
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">${product.price}</p>
        <p className="text-gray-600 mb-4">Stock: {product.stock} items</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Size:</label>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`p-2 border rounded-md text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => addToCart(product, selectedSize)}
          disabled={product.stock <= 0}
          className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${
            product.stock <= 0
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          +
          {/* <Plus size={16} /> */}
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    );
  };

  const CartItem = ({ item }) => (
    <div className="flex items-center gap-3 p-4 border-b">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-gray-600">Size: {item.size}</p>
        <p className="text-blue-600 font-semibold">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          -
          {/* <Minus size={16} /> */}
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          +
          {/* <Plus size={16} /> */}
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.cartId)}
        className="p-1 text-red-500 hover:bg-red-50 rounded"
      >
        <X size={16} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Store</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {/* <ShoppingCart size={24} /> */}
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Message Display */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cart.map(item => (
                  <CartItem key={item.cartId} item={item} />
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Items: {getTotalItems()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSystem;