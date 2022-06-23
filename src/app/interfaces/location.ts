import Artwork from "./artwork";
import LocationType from "./locationtype";

export default interface Location{
    id: number;
    locationName: string;
    description: string;
    locationUrl: string;
    typeId: number;
    
    artworks: Artwork[];
}