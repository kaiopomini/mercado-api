declare namespace Express {
    export interface Request {
        user_id: string;
        user_permissions:  Array<any>;
        user_roles: Array<any>;
    }
}