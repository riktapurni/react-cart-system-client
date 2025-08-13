import { useState } from 'react';
// import { Plus, Minus, ShoppingCart, X } from 'lucide-react';

const CartClaud = () => {
  // Sample products data with stock
  const initialProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, stock: 2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop' },
    { id: 2, name: 'Smartphone Case', price: 24.99, stock: 3, image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=200&fit=crop' },
    { id: 3, name: 'Bluetooth Speaker', price: 79.99, stock: 8, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop' },
    { id: 4, name: 'Laptop Stand', price: 49.99, stock: 12, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop' },
    { id: 5, name: 'USB Cable', price: 12.99, stock: 30, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop' },
    { id: 6, name: 'Power Bank', price: 39.99, stock: 5, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=200&fit=crop' }
  ];

  // Products state to manage stock
  const [products, setProducts] = useState(initialProducts);

  // Cart state
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Add item to cart with stock management
  const addToCart = (product) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (currentProduct.stock <= 0) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Decrease stock
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
  };

  // Remove item from cart with stock restoration
  const removeFromCart = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      // Restore stock
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId
            ? { ...p, stock: p.stock + cartItem.quantity }
            : p
        )
      );
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity with stock management
  const updateQuantity = (productId, newQuantity) => {
    const cartItem = cart.find(item => item.id === productId);
    const currentProduct = products.find(p => p.id === productId);
    
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const quantityDifference = newQuantity - cartItem.quantity;
    
    // Check if we have enough stock for increase
    if (quantityDifference > 0 && currentProduct.stock < quantityDifference) {
      alert(`Sorry, only ${currentProduct.stock} items left in stock`);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Update stock based on quantity change
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock - quantityDifference }
          : p
      )
    );
  };

  // Calculate totals
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Store</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            {/* <ShoppingCart size={20} /> */}
            Cart ({getTotalItems()})
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Products Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="text-sm">
                      <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full px-4 py-2 rounded-md text-sm transition-colors ${
                      product.stock > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        {showCart && (
          <div className="w-96">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                          <p className="text-gray-600 text-xs">${item.price.toFixed(2)} each</p>
                          <p className="text-green-600 font-semibold text-sm">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 rounded flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 rounded flex items-center justify-center"
                          >
                            {/* <Plus size={12} /> */}
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          {/* <X size={16} /> */}
                          -
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Total Items:</span>
                      <span className="font-semibold">{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-gray-700">Total Price:</span>
                      <span className="text-xl font-bold text-green-600">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartClaud;