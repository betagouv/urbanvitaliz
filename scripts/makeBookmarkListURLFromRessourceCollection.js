import {LISTE_RESSOURCES_ROUTE} from '../shared/routes.js';
import baseUrl from './baseUrl.js';

/**
 * Cette fonction prend en argument un objet de type RessourceCollection
 * genre {edit_capability: string (url), ressource_ids: string[]}
 */
export default function makeBookmarkListURLFromRessourceCollection(ressourceCollection) {
    const { edit_capability } = ressourceCollection;
    const editCapURL = new URL(edit_capability);
    return `${baseUrl}${LISTE_RESSOURCES_ROUTE}?secret=${editCapURL.searchParams.get('secret')}`
}