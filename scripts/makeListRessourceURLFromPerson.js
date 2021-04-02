import baseUrl from './baseUrl.js';

export default function makeListRessourceURLFromPerson(person){
    const { firstAccessCapability } = person;

    return `${baseUrl}/person?secret=${firstAccessCapability}`
}