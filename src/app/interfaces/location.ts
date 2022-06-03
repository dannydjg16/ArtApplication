import Artwork from "./artwork";
import LocationType from "./locationtype";

export default interface Location{
    id: number;
    locationName: string;
    description: string;
    locationUrl: string;
    typeId: number;
}

// Add A type here and set it all the ay back from SQL. Actually do have a LocationType object on 
//    Location domain model so will use that 