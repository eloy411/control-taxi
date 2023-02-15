const mongoose =  require('mongoose');
require("dotenv").config()


mongoose.connect(process.env.MONGODB_URI)
 
.then(db => console.log('DB is connected'))
 