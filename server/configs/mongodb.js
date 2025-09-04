import mongoose from "mongoose";

// Connect to the mongodb database for atlas

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Databse Connected(Atlas)");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/LMS-Practise`);
};

// const connectDB = async ()=>{
//     mongoose.connect(process.env.DB_CONNECT).then(() => {
//         console.log('Connected to DB(compass)');
//     }).catch(err => console.log(err));
// }

export default connectDB;