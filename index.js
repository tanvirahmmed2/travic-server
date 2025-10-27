const app= require('./src/app')
const connectDB = require('./src/config/database')
const { PORT } = require('./src/config/secret')

connectDB()

app.listen(PORT, ()=>{
    
    console.log(`Server is runnging at http://localhost:${PORT}`)
})