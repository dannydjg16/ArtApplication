import Artwork from './artwork';

export default interface Artist{
    ID: number;
    name: string;
    bornLocation: string;
    biography: string;
    pictureURL: string;
    born: number;
    died: number;
    ArtistAdderId: number;
}