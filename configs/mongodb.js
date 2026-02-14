import mongoose from "mongoose";

//connect to the mongodb database

const connectDb = async () => {
    mongoose.connection.on('connected', () =>
        console.log('Database Connected')
    )
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}
export default connectDb