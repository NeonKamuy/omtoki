import { mongoose } from "@typegoose/typegoose";

const MongoDBConnection = mongoose.createConnection(
    "mongodb://localhost/omtoki",
    {
        ignoreUndefined: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);
export default MongoDBConnection;