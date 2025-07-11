# MongoDB Setup Guide for Todo List

## Prerequisites
1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Make sure Node.js and npm are installed

## Installation Steps

### 1. Install MongoDB
- Download MongoDB Community Server for Windows
- Run the installer and follow the setup wizard
- Make sure to install MongoDB as a service

### 2. Start MongoDB Service
```bash
# MongoDB should start automatically as a Windows service
# To check if it's running, open Command Prompt as Administrator and run:
net start MongoDB
```

### 3. Install Project Dependencies
```bash
npm install
```

### 4. Start the Application
```bash
node app.js
```

## Database Structure

The application will automatically create a database called `todo` with a collection called `todos`.

### Todo Document Structure:
```javascript
{
  _id: ObjectId,
  text: String,        // The todo text
  priority: String,    // "high", "medium", or "low"
  completed: Boolean,  // true/false
  createdAt: Date      // When the todo was created
}
```

## Troubleshooting

### If MongoDB won't start:
1. Check if MongoDB service is running:
   ```bash
   services.msc
   ```
   Look for "MongoDB" service and start it if it's stopped.

2. Check MongoDB logs:
   ```bash
   # MongoDB logs are usually in:
   C:\Program Files\MongoDB\Server\[version]\log\mongod.log
   ```

### If connection fails:
1. Make sure MongoDB is running on port 27017
2. Check if the connection string in app.js is correct
3. Try connecting with MongoDB Compass (GUI tool) to test the connection

## Alternative: MongoDB Atlas (Cloud Database)

If you prefer a cloud database:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Replace the connection string in app.js:
   ```javascript
   mongoose.connect("your_atlas_connection_string_here");
   ```

## Features Now Available

✅ **Persistent Storage**: Todos are saved to MongoDB database  
✅ **Data Persistence**: Todos survive server restarts  
✅ **Scalable**: Can handle thousands of todos  
✅ **Backup**: Database can be backed up easily  
✅ **Production Ready**: Suitable for deployment  

## Next Steps

Your todo list now has a proper backend! You can:
- Deploy to a cloud platform (Heroku, Vercel, etc.)
- Add user authentication
- Add categories/tags
- Add due dates
- Add search functionality 