# WonderNot Quick Start Guide

This guide will help you set up and run WonderNot on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ghOst-vedant/WonderNot.git
cd WonderNot
```

### 2. Quick Setup (Recommended)

We've provided a verification script to help you check your setup:

```bash
npm run verify
```

This will check if all required files and configurations are in place.

### 3. Set Up the Server (Backend)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configurations:
- `MONGO_URL`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT authentication
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `PORT`: Server port (default: 6001)

Start the server:

```bash
npm start
```

The server should now be running on `http://localhost:6001`

### 4. Set Up the Client (Frontend)

Open a new terminal window from the WonderNot root directory:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Edit the `.env` file:
- `VITE_BACKENDURL`: Set to `http://localhost:6001` for local development
- `VITE_NODE_ENV`: Set to `development`

Start the client:

```bash
npm start
```

The client should now be running on `http://localhost:5173` (or another port shown in the terminal)

### 5. Access WonderNot

Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:5173`)

You should now see the WonderNot login/registration page!

## Troubleshooting

### Port Already in Use
If you get an error that a port is already in use, you can either:
- Stop the process using that port
- Change the port in your configuration

### MongoDB Connection Issues
- Make sure your MongoDB instance is running
- Verify your connection string is correct
- Check if your IP is whitelisted (for cloud MongoDB)

### Cloudinary Upload Issues
- Verify your Cloudinary credentials are correct
- Make sure your Cloudinary account is active

## Environment Configuration Summary

### Server (.env)
```
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_secret_key>
PORT=6001
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

### Client (.env)
```
VITE_BACKENDURL=http://localhost:6001
VITE_NODE_ENV=development
```

## What's Next?

Once the application is running, you can:
1. Create a new account on the registration page
2. Log in with your credentials
3. Explore the home feed
4. Create posts
5. View and edit your profile
6. Chat with other users

## Need Help?

If you encounter any issues, please:
1. Check this guide again for any missed steps
2. Review the main README.md for additional information
3. Open an issue on GitHub with details about your problem

Enjoy using WonderNot! 🌍
