import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/products'
import { API_URL } from '../../config'

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`)
        if (!res.ok) throw new Error('Request failed')
        const data = await res.json()
        setProducts(data)
      } catch {
        setError('Could not load products. Is the server running?')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filtered = products.filter(p => {
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

      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-20">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg mt-20">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">No products found 😕</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <div className="text-6xl text-center mb-4">{product.image}</div>
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-green-700 font-bold text-xl mb-4">${product.price}</p>
              <Link
                to={`/product/${product._id}`}
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