import makeBookmarkListURLFromRessourceCollection from './makeBookmarkListURLFromRessourceCollection';
import prepareLoginHearder from './prepareLoginHearder'

console.log("BONJOIR 🦄 ")

const onLogin = ({person, ressourceCollection}) => {
    console.log('login succesful', person, ressourceCollection)
    
    location.assign(makeBookmarkListURLFromRessourceCollection(ressourceCollection));
}

prepareLoginHearder(onLogin);