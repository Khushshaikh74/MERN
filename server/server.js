import express from 'express'
import authRouter from './router/auth-router.js'
import contactRouter from './router/contact-router.js'
import serviceRouter from './router/service-router.js'
import adminRouter from './router/admin-router.js'
import connectDb from './utils/db.js'
import errorMiddleware from './middleware/error-middleware.js'
import cors from 'cors'

const app = express()

// handling cors policy
const corsOptions = {
    origin : "http://localhost:5173",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credential : true
}
app.use(cors(corsOptions))

app.use(express.json()); // needed to parse JSON request body

app.use("/api/auth", authRouter)
app.use("/api/form", contactRouter)
app.use("/api/data/", serviceRouter)

//admin
app.use('/api/admin/', adminRouter)

app.use(errorMiddleware)

connectDb().then(() => {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT} http://localhost:5000/`)
    })
})