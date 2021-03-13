import {json} from 'd3-fetch';

export default function getAllResources(){
    return json('./allRessources.json')
}
