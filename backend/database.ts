import {MongoClient, Db} from "mongodb";

let client:MongoClient;
let db:Db;

export const connect = async function():Promise<Db> {
    console.log("connect");
    if(db) {
        return db;
    }

    client = new MongoClient(process.env.DATABASE_URL!);
    await client.connect();

    db = client.db("mystore");

    console.log("connected");

    return db;
}