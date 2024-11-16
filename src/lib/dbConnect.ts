import mongoose, { ConnectOptions } from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection?.isConnected) {
    console.log("Already connected to database");
    return;
  }

  const options: ConnectOptions = {
    dbName: "TrveFeedbackDB",
  };

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", options);

    console.log("firstDB", db);

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}

export default dbConnect;
