export interface IARequest<T> {
    data: T;
    onLoaded?: (data: any) => void;
}