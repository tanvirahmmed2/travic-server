const app= require('./src/app')
const { PORT } = require('./src/config/secret')



app.listen(PORT, ()=>{
    console.log(`Server is runnging at http://localhost:${PORT}`)
})