import prepareLoginHearder from './prepareLoginHeader.js'
import makeListRessourceURLFromPerson from './makeListRessourceURLFromPerson.js'
import baseUrl from './baseUrl.js';

console.log("BONJOIR 🦄 ")

const onLogin = ({person}) => {
    console.log('login succesful', person)
    
    location.assign(makeListRessourceURLFromPerson(person))
}

prepareLoginHearder(onLogin);