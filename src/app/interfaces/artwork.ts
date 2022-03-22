import Artist from "./artist";
import ArtType from "./arttype";

export default interface Artwork{
    id: number;
    fileName: string;
    yearCreated: number;
    title: string;
    description: string;
    likes: number;
    locationNow: number;
    artistID: number;
    mediumID: number;

    artist: Artist;
    medium: ArtType;
}