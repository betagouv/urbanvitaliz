import makeBookmarkListURLFromRessourceCollection from './makeBookmarkListURLFromRessourceCollection';
import prepareLoginHearder from './prepareLoginHeader'

console.log("BONJOIR 🦄 ")

const onLogin = ({person}) => {
    console.log('login succesful', person)
    
    throw 'TODO fix redirect'
     location.assign(makeBookmarkListURLFromRessourceCollection(ressourceCollection));
}

prepareLoginHearder(onLogin);