import {json} from 'd3-fetch';

function fixResource(resource){
    let {etape, thematique} = resource;
   
    resource.etape = fixEtape(etape);
    resource.thematique = fixThematique(thematique);
    
    return resource;
}

function fixEtape(etape){
    if(typeof etape === 'string'){
        etape = [etape];
    }
    if(Array.isArray(etape)){
        return etape.map(e => {
            e = e.trim()
            const etapeOffset = '1 - '.length
            e = e.slice(0, etapeOffset) + e.charAt(etapeOffset).toUpperCase() + e.slice(etapeOffset+1)
            return e
        })
    } else {
        return []
    }
};

function fixThematique(thematique){
    if(typeof thematique === 'string'){
        thematique = [thematique];
    }
    if(Array.isArray(thematique)){
        return thematique.map(t => {
            t = t.trim()
            return t.charAt(0).toUpperCase() + t.slice(1)
        })
    } else {
        return []
    }
};

export default function getAllResources(){
    return json('./allRessources.json')
    .then(rs => rs.map(fixResource))
}
