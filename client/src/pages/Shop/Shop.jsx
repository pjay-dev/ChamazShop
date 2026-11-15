import { useState } from 'react'
import { Link } from 'react-router-dom'

const allProducts = [
  { id: 1, name: 'Fresh Tomatoes', price: 2.50, image: '🍅', category: 'Vegetables' },
  { id: 2, name: 'Cooking Oil 2L', price: 8.99, image: '🫙', category: 'Groceries' },
  { id: 3, name: 'Bread Loaf', price: 1.50, image: '🍞', category: 'Bakery' },
  { id: 4, name: 'Chicken Braai Pack', price: 12.99, image: '🍗', category: 'Meat' },
  { id: 5, name: 'Onions 1kg', price: 1.20, image: '🧅', category: 'Vegetables' },
  { id: 6, name: 'Rice 2kg', price: 4.50, image: '🍚', category: 'Groceries' },
  { id: 7, name: 'Eggs x6', price: 2.00, image: '🥚', category: 'Dairy' },
  { id: 8, name: 'Milk 1L', price: 1.80, image: '🥛', category: 'Dairy' },
  { id: 9, name: 'Beef Steak', price: 15.99, image: '🥩', category: 'Meat' },
  { id: 10, name: 'Spinach Bunch', price: 0.80, image: '🥬', category: 'Vegetables' },
  { id: 11, name: 'Maize Meal 5kg', price: 6.50, image: '🌽', category: 'Groceries' },
  { id: 12, name: 'Butter 250g', price: 3.20, image: '🧈', category: 'Dairy' },
]

const categories = ['All', 'Vegetables', 'Groceries', 'Bakery', 'Meat', 'Dairy']

function Shop() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-full px-5 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">No products found 😕</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <div className="text-6xl text-center mb-4">{product.image}</div>
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-green-700 font-bold text-xl mb-4">${product.price}</p>
              <Link
                to={`/product/${product.id}`}
                className="block text-center bg-green-700 text-white py-2 rounded-full hover:bg-green-600 transition"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop