import Artwork from "./artwork";

export default interface Location{
    id: number;
    locationName: string;
    description: string;
    locationUrl: string;
    typeId: number;
    country: string;
    stateProvince: string;
    city: string;
    streetAddress: string;
    
    artworks: Artwork[];
}