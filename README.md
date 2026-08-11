# RkCoDiFy

A full-stack coding education website built with **Node.js, Express.js, MongoDB Atlas, HTML, CSS, and JavaScript**.

RkCoDiFy is designed as a learning platform where users can explore programming courses, create accounts, sign in, and access protected course content.

## 🌐 Live Website

**Website:** https://tazatafri.com

## 📌 Project Overview

RkCoDiFy is a web application created to provide beginner-friendly programming tutorials and learning resources.

The application includes:

- User registration
- User authentication
- Secure password hashing
- JWT-based authentication
- Protected course content
- MongoDB Atlas database
- Course pages
- About page
- Contact page
- Blog section
- Interactive JavaScript components
- Snake game
- HTML learning course
- Social media links

The project uses a traditional **Express + server-rendered HTML architecture**, rather than a frontend framework such as React.

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Google Fonts
- Responsive UI

### Backend

- Node.js
- Express.js
- Body Parser
- Cookie Parser
- CORS

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication

- JSON Web Tokens (JWT)
- bcrypt
- HTTP cookies

### Development

- Nodemon
- dotenv
- Git
- GitHub

### Deployment

- Render
- MongoDB Atlas
- GoDaddy DNS
- Custom domain

---

## 📂 Project Structure

```text
project/
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
│
├── controllers/
│   └── authcontrollers.js
│
├── middleware/
│   └── authmiddleware.js
│
├── models/
│   └── databaseschema.js
│
├── routes/
│   └── authroutes.js
│
├── views/
│   │
│   ├── homepage/
│   │   ├── index.html
│   │   ├── index.css
│   │   └── index.js
│   │
│   ├── aboutpage/
│   │   └── about.html
│   │
│   ├── contactpage/
│   │   └── contact.html
│   │
│   ├── contentpage/
│   │   ├── content.html
│   │   ├── content.css
│   │   ├── content.js
│   │   │
│   │   └── htmlcourse/
│   │       └── html1.html
│   │
│   ├── signinpage/
│   │   └── signin.html
│   │
│   ├── signuppage/
│   │   └── signup.html
│   │
│   └── snakegame.html
│
└── public/
```

> The exact project structure may grow as additional courses, pages, and features are added.

---

## ⚙️ Application Architecture

The application follows a simple Express-based architecture:

```text
                    ┌─────────────────┐
                    │     Browser     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Express Server  │
                    │     app.js      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
          Routes         Middleware       Views
              │              │              │
              ▼              ▼              ▼
       Authentication     JWT Auth       HTML/CSS/JS
              │
              ▼
       Authentication
        Controllers
              │
              ▼
          Mongoose
              │
              ▼
       MongoDB Atlas
```

---

## 🔐 Authentication

RkCoDiFy uses JWT-based authentication.

The authentication flow is approximately:

```text
User
 │
 ├── Sign Up
 │      │
 │      ▼
 │   Password hashed with bcrypt
 │      │
 │      ▼
 │   MongoDB
 │
 └── Sign In
        │
        ▼
   Credentials verified
        │
        ▼
   JWT generated
        │
        ▼
   JWT stored in cookie
        │
        ▼
 Protected routes
```

Protected pages use authentication middleware to determine whether the user is logged in.

For example:

```text
/content
```

requires authentication.

---

## 🗄️ MongoDB

The application uses **MongoDB Atlas** as its cloud database.

Mongoose is used to communicate with MongoDB.

The MongoDB connection is configured using an environment variable:

```env
MONGO_URI=your_mongodb_connection_string
```

Database credentials should **never be committed to GitHub**.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_secret_key
PORT=5500
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
SECRET_KEY=replace_with_a_long_random_secret
PORT=5500
```

### Important

Never commit `.env` to GitHub.

Your `.gitignore` should contain:

```gitignore
.env
```

If credentials have ever been exposed publicly, rotate those credentials immediately.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/rkcodify/webtask.github.io.git
```

Move into the project directory:

```bash
cd webtask.github.io
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
PORT=5500
```

### 4. Start the development server

The project uses Nodemon for development:

```bash
npm start
```

This runs:

```bash
npx nodemon ./app.js
```

Alternatively:

```bash
npx nodemon app.js
```

---

## 🌍 Running Locally

After starting the server, open:

```text
http://localhost:5500
```

Main application routes include:

```text
/
 /about
 /contact
 /content
 /signin
 /signup
 /logout
 /user
```

Some routes require authentication.

---

## 📚 Courses

The project contains programming-learning content covering topics such as:

- HTML
- CSS
- JavaScript
- Node.js
- React
- MongoDB
- MERN
- Python
- Django

The course section is designed to be expanded as additional learning material is created.

---

## 🎮 Additional Features

The project also contains a Snake Game:

```text
/views/snakegame.html
```

This demonstrates the use of JavaScript to create interactive browser-based functionality.

---

## 🔒 Security

The project uses several security-related mechanisms:

- Password hashing with bcrypt
- JWT authentication
- HTTP cookies
- Environment variables for secrets
- MongoDB Atlas authentication
- Authentication middleware
- Protected routes

### Never commit secrets

Do not commit:

```text
.env
MongoDB passwords
JWT secret keys
API keys
private credentials
```

Use environment variables instead.

---

## ☁️ Deployment

The application is deployed using **Render**.

The general deployment architecture is:

```text
                 GitHub
                    │
                    ▼
                 Render
                    │
                    ▼
              Node.js / Express
                    │
                    ▼
              MongoDB Atlas
```

The production website uses a custom domain:

```text
https://tazatafri.com
```

The domain DNS is managed through GoDaddy.

---

## 🌐 Custom Domain

The production domain is:

```text
tazatafri.com
```

The `www` version can also be configured:

```text
www.tazatafri.com
```

DNS is managed through GoDaddy and points the custom domain to the Render service.

---

## 📦 Dependencies

The main dependencies include:

```text
express
mongoose
mongodb
bcrypt
jsonwebtoken
cookie-parser
body-parser
cors
dotenv
validator
```

Nodemon is included as a development dependency.

Install all dependencies with:

```bash
npm install
```

---

## 🧪 Development

For development:

```bash
npm start
```

Nodemon automatically restarts the application when source files change.

---

## 🔄 Git Workflow

Before committing changes:

```bash
git status
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Describe your changes"
```

Push to GitHub:

```bash
git push origin master
```

---

## ⚠️ Troubleshooting

### MongoDB authentication error

If you see:

```text
MongoServerError: bad auth : authentication failed
```

check:

1. `MONGO_URI` is correctly configured.
2. MongoDB username is correct.
3. MongoDB password is correct.
4. The MongoDB user has the required database permissions.
5. The connection string is correct.
6. The environment variable is configured on the deployment platform.
7. Special characters in passwords are properly URL encoded.

### MongoDB network connection error

If MongoDB cannot be reached, check the MongoDB Atlas network access configuration.

The deployment server must be allowed to connect to the Atlas cluster.

### Application returns 502

A 502 error from the hosting platform can occur when the application crashes or fails to start.

Check the deployment logs for:

```text
MongoDB connection errors
Environment variable errors
Port configuration errors
Node.js errors
Missing dependencies
```

The Express server should listen on the platform-provided `PORT`:

```javascript
const port = process.env.PORT || 5500;

app.listen(port, "0.0.0.0", () => {
    console.log(`app executed successfully || Port ${port}`);
});
```

---

## 🛣️ Future Improvements

Possible future improvements include:

- Modern responsive UI
- Tailwind CSS / DaisyUI integration
- Improved mobile navigation
- More programming courses
- Course progress tracking
- User dashboard
- Admin dashboard
- Blog functionality
- Search functionality
- Improved course navigation
- More interactive coding exercises
- Improved accessibility
- Better form validation
- Automated testing

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the application locally.
5. Commit your changes.
6. Push the branch.
7. Open a pull request.

Example:

```bash
git checkout -b feature/new-course

git add .

git commit -m "Add new course"

git push origin feature/new-course
```

---

## 📄 License

This project currently uses the **ISC License** as specified in `package.json`.

---

## 👨‍💻 Author

**RkCoDiFy**

A personal coding-learning project focused on building web development skills through practical development.

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.
