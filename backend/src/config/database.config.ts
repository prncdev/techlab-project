import { connect } from "mongoose";

/**
 * 
 * @param MongoDB Database URL
 * @indicate Shows the instance into if success
 * 
 */
const connectDB = async function(URI: string): Promise<void> {
  try {
    const conn = await connect(URI);
    console.log('Database connected on => ' + conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;