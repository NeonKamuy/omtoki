export interface IARequest<T> {
    data: T;
    alertOnError?: boolean;
}