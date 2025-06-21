export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export type Restaurant = {
  id: string
  name: string
  imageUrl: string
  rating: number
  deliveryTime: string
  priceRange: string
  isNew?: boolean
  description: string
  menu: MenuItem[]
  reviews: { id: string; user: string; rating: number; comment: string; date: string }[]
}

export type CartItem = {
  menuItemId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export type Order = {
  id: string
  userId: string
  restaurantId: string
  restaurantName: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: "Pending" | "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled"
  deliveryAddress: string
  paymentMethod: string
  createdAt: string
}

export type User = {
  id: string
  name: string
  email: string
  address: string
  cart: CartItem[]
  orders: Order[]
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Bliss",
    imageUrl: "/images/burger-restaurant.png", // Updated path
    rating: 4.5,
    deliveryTime: "30-45 min",
    priceRange: "TLTL",
    isNew: true,
    description: "Your go-to spot for juicy burgers and crispy fries. Made with 100% fresh ingredients.",
    menu: [
      {
        id: "m1",
        name: "Classic Cheeseburger",
        description: "Beef patty, cheddar, lettuce, tomato, onion, pickles",
        price: 120,
        imageUrl: "/images/menu-burger.png", // Updated path
      },
      {
        id: "m2",
        name: "Spicy Chicken Burger",
        description: "Crispy chicken, spicy mayo, coleslaw",
        price: 110,
        imageUrl: "/images/menu-chicken-burger.png", // Updated path
      },
      {
        id: "m3",
        name: "Fries (Large)",
        description: "Golden crispy fries",
        price: 40,
        imageUrl: "/images/menu-fries.png",
      }, // Updated path
    ],
    reviews: [
      { id: "r1", user: "Alice", rating: 5, comment: "Best burger in town!", date: "2024-05-10" },
      { id: "r2", user: "Bob", rating: 4, comment: "Good food, fast delivery.", date: "2024-05-08" },
    ],
  },
  {
    id: "2",
    name: "Pizza Palace",
    imageUrl: "/images/bustling-pizza-restaurant.png", // Updated path
    rating: 4.8,
    deliveryTime: "20-30 min",
    priceRange: "TLTL",
    description: "Authentic Italian pizzas baked in a wood-fired oven. Fresh ingredients, classic recipes.",
    menu: [
      {
        id: "m4",
        name: "Margherita Pizza",
        description: "Tomato, mozzarella, basil",
        price: 150,
        imageUrl: "/images/menu-margherita.png", // Updated path
      },
      {
        id: "m5",
        name: "Pepperoni Pizza",
        description: "Tomato, mozzarella, pepperoni",
        price: 160,
        imageUrl: "/images/menu-pepperoni.png", // Updated path
      },
    ],
    reviews: [
      { id: "r3", user: "Charlie", rating: 5, comment: "Amazing pizza, highly recommend!", date: "2024-05-12" },
      { id: "r4", user: "Diana", rating: 4, comment: "Crust was perfect.", date: "2024-05-09" },
    ],
  },
  {
    id: "3",
    name: "Sushi Spot",
    imageUrl: "/images/bustling-sushi-restaurant.png", // Updated path
    rating: 4.2,
    deliveryTime: "40-55 min",
    priceRange: "TLTLTL",
    description: "Freshly prepared sushi and sashimi. Experience the taste of Japan.",
    menu: [
      {
        id: "m6",
        name: "Salmon Nigiri (2pcs)",
        description: "Fresh salmon on sushi rice",
        price: 90,
        imageUrl: "/images/menu-nigiri.png", // Updated path
      },
      {
        id: "m7",
        name: "California Roll (8pcs)",
        description: "Crab, avocado, cucumber",
        price: 100,
        imageUrl: "/images/menu-california-roll.png", // Updated path
      },
    ],
    reviews: [{ id: "r5", user: "Eve", rating: 4, comment: "Good quality sushi, a bit pricey.", date: "2024-05-11" }],
  },
  {
    id: "4",
    name: "Indian Spice",
    imageUrl: "/images/indian-restaurant-exterior.png", // Updated path
    rating: 4.6,
    deliveryTime: "35-50 min",
    priceRange: "TLTL",
    description: "Authentic Indian cuisine with rich flavors and aromatic spices.",
    menu: [
      {
        id: "m8",
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry",
        price: 130,
        imageUrl: "/images/menu-butter-chicken.png", // Updated path
      },
      {
        id: "m9",
        name: "Garlic Naan",
        description: "Soft flatbread with garlic",
        price: 30,
        imageUrl: "/images/menu-naan.png", // Updated path
      },
    ],
    reviews: [],
  },
  {
    id: "5",
    name: "Taco Fiesta",
    imageUrl: "/images/vibrant-mexican-restaurant.png", // Updated path
    rating: 4.3,
    deliveryTime: "25-40 min",
    priceRange: "TL",
    description: "Vibrant Mexican flavors, from sizzling fajitas to fresh guacamole.",
    menu: [
      {
        id: "m10",
        name: "Chicken Tacos (3pcs)",
        description: "Soft tortillas with seasoned chicken",
        price: 95,
        imageUrl: "/images/menu-tacos.png", // Updated path
      },
    ],
    reviews: [],
  },
  {
    id: "6",
    name: "Sweet Treats",
    imageUrl: "/images/charming-dessert-shop.png", // Updated path
    rating: 4.9,
    deliveryTime: "15-25 min",
    priceRange: "TL",
    isNew: true,
    description: "Indulge in our delightful selection of cakes, pastries, and ice creams.",
    menu: [
      {
        id: "m11",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center",
        price: 70,
        imageUrl: "/images/menu-lava-cake.png", // Updated path
      },
    ],
    reviews: [],
  },
  {
    id: "7",
    name: "Green Garden",
    imageUrl: "/images/healthy-food-restaurant.png", // Updated path
    rating: 4.1,
    deliveryTime: "30-40 min",
    priceRange: "TLTL",
    description: "Fresh and healthy options for a balanced lifestyle. Salads, bowls, and smoothies.",
    menu: [
      {
        id: "m12",
        name: "Quinoa Salad",
        description: "Quinoa, mixed greens, avocado, cherry tomatoes",
        price: 85,
        imageUrl: "/images/menu-salad.png", // Updated path
      },
    ],
    reviews: [],
  },
  {
    id: "8",
    name: "Vegan Vibes",
    imageUrl: "/images/vibrant-vegan-restaurant.png", // Updated path
    rating: 4.7,
    deliveryTime: "45-60 min",
    priceRange: "TLTL",
    description: "100% plant-based dishes that are delicious and sustainable.",
    menu: [
      {
        id: "m13",
        name: "Vegan Burger",
        description: "Plant-based patty, vegan cheese, fresh veggies",
        price: 115,
        imageUrl: "/images/menu-vegan-burger.png", // Updated path
      },
    ],
    reviews: [],
  },
]

// Mock user data (for a single "logged-in" user)
export const mockUser: User = {
  id: "user123",
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, Anytown, 12345",
  cart: [], // Initially empty
  orders: [
    {
      id: "order-001",
      userId: "user123",
      restaurantId: "1",
      restaurantName: "Burger Bliss",
      items: [
        {
          menuItemId: "m1",
          name: "Classic Cheeseburger",
          price: 120,
          quantity: 1,
          imageUrl: "/images/menu-burger.png",
        },
        { menuItemId: "m3", name: "Fries (Large)", price: 40, quantity: 1, imageUrl: "/images/menu-fries.png" },
      ],
      subtotal: 160,
      deliveryFee: 15,
      total: 175,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
      paymentMethod: "Credit Card",
      createdAt: "2024-05-01T10:30:00Z",
    },
    {
      id: "order-002",
      userId: "user123",
      restaurantId: "2",
      restaurantName: "Pizza Palace",
      items: [
        {
          menuItemId: "m4",
          name: "Margherita Pizza",
          price: 150,
          quantity: 1,
          imageUrl: "/images/menu-margherita.png",
        },
      ],
      subtotal: 150,
      deliveryFee: 15,
      total: 165,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
      paymentMethod: "Credit Card",
      createdAt: "2024-05-15T18:00:00Z",
    },
  ],
}
