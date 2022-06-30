import Artist from "./artist";
import ArtType from "./arttype";
import Location from "./location";

export default interface Artwork{
    id: number;
    fileName: string;
    yearCreated: number;
    title: string;
    description: string;
    likes: number;
    locationNow: number;
    artistId: number;
    mediumId: number;
    artworkAdderId: number;

    artist: Artist;
    location: Location;
    medium: ArtType
}