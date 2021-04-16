import { mongoose } from "@typegoose/typegoose";

const MongoDBConnection = mongoose.createConnection(
    "mongodb://omtoki:omtoki@omtoki.tk/omtoki",
    {
        ignoreUndefined: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);
export default MongoDBConnection;