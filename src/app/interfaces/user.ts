import Like from "./like";

export default interface User{
    id: number;
    email: string;
    name: string;
    fromLocation: string;
    profilePicURL: string;
    likes: Like[];
}