import prepareLoginHearder from './prepareLoginHeader'

console.log("BONJOIR 🦄 ")

const onLogin = ({person}) => {
    console.log('login succesful', person)
    
    location.assign(`/person?secret=${person.firstAccessCapability}`)
}

prepareLoginHearder(onLogin);