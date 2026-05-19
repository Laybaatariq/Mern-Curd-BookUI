
#  MERN Book Store App

A full-stack web application for managing a book collection with complete CRUD (Create, Read, Update, Delete) operations.

## Features

-  **Add Books** - Add new books to your collection
-  **View Books** - Display all books in a formatted table
-  **Edit Books** - Update existing book information
-  **Delete Books** - Remove books from collection
-  **Form Validation** - Required field checking
-  **Responsive Design** - Works on desktop and mobile

##  Tech Stack

### Frontend
- **React.js** - UI Framework
- **Tailwind CSS** - Styling
- **Axios** - API calls
- **React Icons** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing

##  Project Structure

```
Mern-Curd-BookUI/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── component/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Node.js backend
    ├── models/
    │   └── book.model.js
    ├── controllers/
    │   └── book.controller.js
    ├── routes/
    │   └── book.route.js
    ├── database.js
    ├── index.js
    └── package.json
```

##  Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/Laybaatariq/Mern-Curd-BookUI.git
cd Mern-Curd-BookUI
```

### Step 2: Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
```

Start the backend server:
```bash
npm start
```
Backend runs on: `http://localhost:5000`

### Step 3: Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api/books
```

Start the frontend:
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Step 4: Open the Application

Open your browser and navigate to `http://localhost:5173`

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books/add` | Add a new book |
| GET | `/api/books/all` | Get all books |
| PUT | `/api/books/update/:id` | Update a book |
| DELETE | `/api/books/delete/:id` | Delete a book |

##  API Request Example

### Add a Book (POST)

**Request:**
```json
{
    "BookName": "The Great Gatsby",
    "BookTitle": "American Classic",
    "BookAuthor": "F. Scott Fitzgerald",
    "SellingPrice": 299,
    "PublishDate": "1925-04-10"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Book added successfully",
    "book": {
        "_id": "660a1b2c3d4e5f6789abcdef",
        "BookName": "The Great Gatsby",
        "BookTitle": "American Classic",
        "BookAuthor": "F. Scott Fitzgerald",
        "SellingPrice": 299,
        "PublishDate": "1925-04-10T00:00:00.000Z"
    }
}
```

##  Database Schema

```javascript
{
    BookName: { type: String, required: true },
    BookTitle: { type: String, required: true },
    BookAuthor: { type: String, required: true },
    SellingPrice: { type: Number, required: true },
    PublishDate: { type: Date, required: true }
}
```

##  Deployment

### Deploy Backend on Render
1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Connect your repository
4. Add environment variables
5. Deploy

### Deploy Frontend on Netlify/Vercel
```bash
cd client
npm run build
```
Then drag the `dist` folder to Netlify

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  Author

**Layba Tariq**

- GitHub: [@Laybaatariq](https://github.com/Laybaatariq)

##  Acknowledgments

- MongoDB for the database
- React team for the amazing framework
- Tailwind CSS for styling
- All open-source contributors

##  License

This project is open source and available under the MIT License.

