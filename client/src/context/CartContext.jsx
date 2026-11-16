import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('chamazshop-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('chamazshop-cart', JSON.stringify(items))
    } catch {
      // Saving failed (for example private mode). The cart still works until refresh.
    }
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems(current => {
      const existing = current.find(i => i._id === product._id)
      if (existing) {
        return current.map(i =>
          i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...current,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        },
      ]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setItems(current => current.map(i => (i._id === id ? { ...i, quantity } : i)))
  }

  const removeFromCart = id => {
    setItems(current => current.filter(i => i._id !== id))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}