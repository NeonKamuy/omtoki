import { DocumentType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export interface DocumentCommonProps {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export function docToObj<T extends DocumentType<any>>(
    doc: T
): T extends DocumentType<infer R> ? R & DocumentCommonProps : any {
    if ((doc as any).constructor.name === "model") {
        return (doc as any).toObject();
    }
    return doc as any;
}
