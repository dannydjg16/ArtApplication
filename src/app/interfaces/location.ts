import Artwork from "./artwork";
import LocationType from "./locationtype";

export default interface Location{
    id: number;
    locationName: string;
    description: string;
    locationURL: string;
    typeID: number;
}

// Change typeID to a number