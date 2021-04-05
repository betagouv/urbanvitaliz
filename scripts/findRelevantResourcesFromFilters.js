export default function findRelevantResourcesFromFilters(allResources = [], filters){
    return allResources.filter(r => {
        return r.etape.some(e => filters.étapes.has(e)) && 
            r.thematique.some(t => filters.thématiques.has(t))
    })
}