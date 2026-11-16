import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
        <Link to="/shop" className="text-green-700 hover:underline">Go to the shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div className="bg-white rounded-2xl shadow-md divide-y">
        {items.map(item => (
          <div key={item._id} className="flex items-center gap-4 p-5">
            <div className="text-5xl">{item.image}</div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-green-700 font-bold">${item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={clearCart} className="text-gray-500 hover:underline">
          Clear cart
        </button>
        <div className="text-right">
          <p className="text-gray-500">Total</p>
          <p className="text-3xl font-bold text-green-700">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          onClick={() => alert('Checkout coming soon')}
          className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-600 transition"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}

export default Cart