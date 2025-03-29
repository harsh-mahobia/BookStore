

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/harsh-mahobia/BookStore
cd BookStore
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the project root and add the following:
```
PORT=5000
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Build & Start the Server
```bash
npm run build  # Compiles TypeScript
npm start  # Starts the server
```

Server should be running at **http://localhost:5000** 🎉

---

## 🛠 Core Functionalities

### 1️⃣ User Authentication (JWT-based)
✅ **Signup:** `POST /auth/signup` (email, password)  
✅ **Login:** `POST /auth/login` (returns JWT token)  
✅ **Protected Routes:** Only logged-in users can access the following endpoints:  
   - `POST /books`  
   - `PUT /books/:id`  
   - `DELETE /books/:id`  

---

### 2️⃣ Books API
✅ **Create a Book:** `POST /books`  
✅ **Get All Books:** `GET /books`  
✅ **Get Book by ID:** `GET /books/:id`  
✅ **Update Book by ID:** `PUT /books/:id`  
✅ **Delete Book by ID:** `DELETE /books/:id`  

---

### 3️⃣ Filtering & Search
✅ **Filter Books:** `GET /books/filter?author=...&category=...&rating=...`  
✅ **Search by Title:** `GET /books/search?title=...` (partial match)  

---

### 4️⃣ Error Handling
✅ Handles invalid requests with proper HTTP status codes  
✅ Input validation for book creation & updates  

---

## 🎁 Bonus Features
✅ **Pagination:** `GET /books?page=1&limit=10`  
✅ **Sorting:** Sort by price or rating using `?sort=price` or `?sort=rating`  
✅ **Dockerized Application** (see below)  

---

## 📦 Docker Setup

### 1️⃣ Set Up Environment Variables for Docker
Before running the application in Docker, ensure you create an `.env` file inside your project folder with the same content as above.

### 2️⃣ Build the Docker Image
```bash
docker build -t book-api .
```

### 3️⃣ Run the Docker Container
```bash
docker run --env-file .env -p 5000:5000 book-api
```

### 4️⃣ Stop the Running Container
Find the container ID using:
```bash
docker ps
```
Then stop it using:
```bash
docker stop <container_id>
```


## 🚀 Future Enhancements
✅ More filtering options  
✅ Admin role for book management  
✅ CI/CD pipeline  
---

