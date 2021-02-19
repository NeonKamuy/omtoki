import { Severity } from "@typegoose/typegoose";
import { IModelOptions } from "@typegoose/typegoose/lib/types";
import MongoDBConnection from "./mongoose";

export const getTypegooseOptions = (collectionName: string): IModelOptions => {
    return {
        existingConnection: MongoDBConnection,
        schemaOptions: {
            collection: collectionName,
            timestamps: true,
            minimize: false,
        },
        options: {
            allowMixed: Severity.ALLOW,
        },
    };
};
