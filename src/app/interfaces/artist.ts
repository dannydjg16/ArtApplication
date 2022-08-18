export default interface Artist{
    id: number;
    name: string;
    bornLocation: string;
    biography: string;
    pictureURL: string;
    born: number;
    died: number;
    artistAdderId: number;
    artworkCount?: number;
}