import { AnySchema, ValidationOptions } from "joi";
import { ObjectId } from "mongodb";

export default function validateSchema<T>(
    obj: T,
    schema: AnySchema,
    options: ValidationOptions = {
        stripUnknown: true,
    }
): any {
    const validatorResult = schema.validate(obj, options);

    if (validatorResult.error || validatorResult.value === undefined) {
        throw new Error(
            JSON.stringify(validatorResult.error || {}),
        );
    }
    const { value } = validatorResult;
    if (value === undefined) {
        throw new Error(
            JSON.stringify(validatorResult.error || {}),
        );
    }
    return validatorResult.value! as any;
}

export function validateObjectId(id: any) {
    if (!ObjectId.isValid(id)) {
        throw new Error(
            `"${id}" is not a valid object id`,
        );
    }
    return new ObjectId(id);
}