import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { allProducts } from '../../data/products'

function Product() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  const product = allProducts.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found 😕</h1>
        <Link to="/shop" className="text-green-700 hover:underline">Back to shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Placeholder: we connect this to the real cart in the next stage
    alert(`${quantity} x ${product.name} (cart coming soon)`)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link to="/shop" className="text-green-700 hover:underline">← Back to shop</Link>

      <div className="bg-white rounded-2xl shadow-md p-8 mt-6 flex flex-col md:flex-row gap-10 items-center">
        <div className="text-9xl">{product.image}</div>

        <div className="flex-1">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-green-700 font-bold text-3xl mb-6">${product.price}</p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
            >
              −
            </button>
            <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-600 transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product