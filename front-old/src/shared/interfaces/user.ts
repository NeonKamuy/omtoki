// Minimal Common Information About Single User
export interface IUserBase {
    name: string;
    description: string;
}

// Single User With Id
export interface IIndexedUser {
    id: string;
    name: string;
    description: string;
}