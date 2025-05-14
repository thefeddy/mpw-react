export interface UserContextType {
    user: any;
    token: string | null;
    isValid: boolean | null;
    login: (token: string) => void;
    logout: () => void;
    validateToken: () => Promise<void>;
}