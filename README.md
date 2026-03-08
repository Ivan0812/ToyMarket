# ToyMarket 🧸

ToyMarket is a full-stack e-commerce web application for selling new and used toys.  
The project was built as a portfolio and learning project, with a focus on real-world full-stack functionality such as product browsing, cart management, checkout flow, stock updates, and admin order handling.

## Live Demo

- **Frontend:** [Add your Netlify link here](YOUR_NETLIFY_LINK_HERE)
- **Backend API:** [https://toymarket.onrender.com](https://toymarket.onrender.com)

## Features

- Browse all products
- Featured products slider
- Product detail page
- Add to cart
- Update cart quantity
- Remove items from cart
- Checkout form
- Order success page
- Admin orders panel
- Update order status
- Delete orders
- Stock control after purchase
- Responsive UI
- Sticky header
- Animated navigation and cart interactions

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Swiper.js
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Deployment
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## Project Structure

```bash
ToyMarket/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

-- Backend --
cd backend
npm install
npm run dev
