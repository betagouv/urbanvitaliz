// @ts-check

import {csv} from 'd3-fetch'

//import App from './App.svelte';
import DescriptionFriche from './DescriptionFriche.svelte';

/**
 * @typedef {object} Person
 * @property {string} id
 * @property {string} name
 * @property {string} emailAddress
 */

/**
 * @typedef {object} Friche
 * Identification
 * @property {string} [id]
 * @property {string} name
 * @property {string} address
 * @property {string} addressComplement
 * @property {string} communeINSEECode
 * @property {string} [parcellesCadastrales]
 * @property {string} [perimeterDescription]
 * @property {string} [area]
 * Occupation actuelle et propriété du site
 * @property {string} occupancy - Le site est-il occupé ? Site totalement vacant / Occupé en partie de manière temporaire / ... / Pas d'information
 * @property {string} occupancyDescription
 * @property {string} currentOccupents
 * @property {string} currentPublicOwners
 * @property {string} currentPrivateOwners
 * @property {string} ownersRelatedRights 
 * Cessation d'activité
 * @property {string} IPCEStatus
 * @property {string} vacantSinceDate
 * @property {string} formerOccupantName
 * @property {string} formerActivity
 * @property {string} detailedFormerActivity
 * @property {string} safetyStatus
 * @property {string} formerOperatorRequirementsFulfillmentStatus
 * Nature de l'artificialisation et archéologie
 * @property {string} built
 * @property {string} waterproofingRate
 * @property {string} soilTypes
 * @property {string} archelogyObligation
 * @property {string} archelogyObligationStatus
 * Caractéristiques du bâti
 * @property {string} patrimonialStatus
 * @property {string} floorArea
 * @property {string} floors
 * @property {string} builtQuality
 * @property {string} builtAge
 * Connaissance de la pollution
 * @property {string} pollutionInfoFromDREAL
 * @property {object} pollution
 * @property {object} pollution.soil
 * @property {object} pollution.water
 * @property {object} pollution.buildings
 * @property {string} pollutionResearch
 * @property {string} pollutionDocuments
 * Urbanisme
 * @property {string} PLUZone
 * @property {string} plannedPLUModification
 * @property {string} urbanisationConstraints
 * @property {string} urbanisationLegalDocumentConstraints
 * @property {string} propertyConstraints
 * @property {string} surroundingSoilUsage
 * @property {string} surroundingUrbanContext
 * Risques et caractéristiques naturelles
 * @property {string} risks
 * @property {string} anticipatedRisks
 * @property {string} biodiversity
 * @property {string} biodiversityDetails
 * @property {string} naturalConstraints
 * Transport et réseaux
 * @property {string} roadConnectivity
 * @property {string} closestRailroadStation
 * @property {string} santitationConnectivity
 * @property {string} energyConnectivity
 * @property {string} internetConnectivity
 * Economie et marché
 * @property {string} currentPropertyTax
 * @property {string} currentSiteIncomes
 * @property {string} averageSurroundingBuildableCost
 * @property {string} averageSurroundingBuiltCost
 * Le projet sur le site
 * @property {string} currentProject
 * @property {string} currentProjectDetails
 * @property {string} projectPlans
 * @property {string} plannedUsages
 */

/**
 * @param {unknown} csvObj
 * @return {Friche} 
 */
function makeFriche(csvObj){
	return {
		name: csvObj[`Nom du site`],
		address: csvObj[`Adresse du site`],
		communeINSEECode: csvObj[`Code INSEE de la commune où se situe le site`],
		addressComplement: csvObj[`Complément de localisation si besoin`],
		parcellesCadastrales: csvObj['Numéros des parcelles cadastrales concernées'],
		perimeterDescription: csvObj[`Description du périmètre de la friche (en attendant qu'on vous invite à le dessiner directement !)`],
		area: csvObj[`Une idée de la surface globale (m²) ?`],
		
		occupancy: csvObj[`Le site est-il occupé ?`],
		occupancyDescription: csvObj[`Description libre de l'occupation éventuelle (normalement question conditionnelle)`],
		currentOccupents: csvObj[`Nom des éventuels occupants actuels et activité`],
		currentPublicOwners: csvObj[`Listez les propriétaires publics actuels et leurs droits`],
		currentPrivateOwners: csvObj[`Listez les propriétaires privés actuels et leurs droits`],
		ownersRelatedRights: csvObj[`Existe-t-il des droits liés à des propriétaires inconnus ?`],
		
		IPCEStatus: csvObj[`Le site est-il classé ICPE ?`],
		vacantSinceDate: csvObj[`Le site est vacant (ou partiellement vacant) depuis l'année`],
		formerOccupantName: csvObj[`Nom de l'ancien occupant du site`],
		formerActivity: csvObj[`Quelle est l'ancienne activité du site ?`],
		detailedFormerActivity: csvObj[`Décrire plus finement l'ancienne activité si possible`],
		safetyStatus: csvObj[`Le site est-il mis en sécurité ?`],
		formerOperatorRequirementsFulfillmentStatus: csvObj[`Le dernier exploitant a-t-il été purgé de ses obligations ?`],
		
		built: csvObj[`Le site est-il bâti ?`],
		waterproofingRate: csvObj[`Quel taux d'imperméabilisation des sols estimez-vous ?`],
		soilTypes: csvObj[`Sur le site, les sols présents sont de type`],
		archelogyObligation: csvObj[`Est-ce que le site est soumis à obligation de fouille ?`],
		archelogyObligationStatus: csvObj[`Est-ce qu'il y a déjà eu des fouilles sur ce site ?`],

		patrimonialStatus: csvObj[`Le bâti a-t-il un aspect patrimonial ?`],
		floorArea: csvObj[`Surface de plancher (ordre de grandeur)`],
		floors: csvObj[`Nombre de niveaux`],
		builtQuality: csvObj[`Etat global du bâti`],
		builtAge: csvObj[`Age du bâti (approximatif)`],

		pollutionInfoFromDREAL: csvObj[`Si ce site est ICPE, avez-vous pu récupérer les éléments de connaissance de la pollution auprès de la DREAL ?`],
		pollution: {
			soil: {
				confidence: csvObj['Les sols'],
				level: csvObj['Les sols2'],
			},
			water: {
				confidence: csvObj['Les eaux'],
				level: csvObj['Les eaux2'],
			},
			buildings: {
				confidence: csvObj['Les bâtiments'],
				level: csvObj['Les bâtiments2'],
			},
		},
		pollutionResearch: csvObj[`En cas de suspicion de pollution, indiquez ici l'état de vos recherches`],
		pollutionDocuments: csvObj[`En cas de suspicion ou certitude de pollution, disposez-vous de documents ?`],

		PLUZone: csvObj['Quel zonage PLU(i) concerne actuellement le site ?'],
		plannedPLUModification: csvObj['Une modification du PLU(i) est-elle prévue ?'],
		urbanisationConstraints: csvObj[`Le site est-il concerné par un périmètre de projet, ZAC, autre contrainte d'urbanisation ?`],
		urbanisationLegalDocumentConstraints: csvObj[`Les documents d'urbanisme en amont (SCoT, SRADDET) traitent-ils de la réduction de l'artificialisation des terres naturelles et agricoles ? Si oui, précisez l'obligation/recommandation`],
		propertyConstraints: csvObj[`Le site est-il soumis à des contraintes foncières particulières ?`],
		surroundingSoilUsage: csvObj[`Types d'usage du sol aux alentours`],
		surroundingUrbanContext: csvObj[`Type de tissu urbain aux alentours`],

		risks: csvObj[`Le site est-il concerné par un zonage de plan de prévention des risques`],
		anticipatedRisks: csvObj[`Si oui, indiquez ici les précisions sur le niveau d'aléa et la part du site touché`],
		biodiversity: csvObj[`Que connaissez-vous de la richesse écologique du site ?`],
		biodiversityDetails: csvObj[`Indiquez ici les précisions concernant la richesse écologique du site`],
		naturalConstraints:  csvObj[`Le site est-il soumis à des contraintes ou servitudes naturelles ?`],

		roadConnectivity:  csvObj[`Quel est le niveau de desserte routière ?`],
		closestRailroadStation:  csvObj[`Quelle est la distance à la gare la plus proche ? (en km)`],
		santitationConnectivity:  csvObj[`Quelle desserte par les réseaux d'assainissement ?`],
		energyConnectivity:  csvObj[`Quel niveau d'alimentation énergétique est possible ?`],
		internetConnectivity:  csvObj[`Quel état de  la connectivité ?`],

		currentPropertyTax: csvObj[`Montant approximatif de la taxe foncière générée actuellement par le site`],
		currentSiteIncomes: csvObj[`Quels autres apports financiers le site génère-t-il éventuellement ?`],
		averageSurroundingBuildableCost: csvObj[`Coût moyen du terrain constructible dans un rayon de 200 m autour du site (euros/m²)`],
		averageSurroundingBuiltCost: csvObj[`Coût moyen du foncier bâti dans un rayon de 200 m autour du site (euros/m²)`],

		currentProject: csvObj[`Y a-t-il déjà un projet en cours de réalisation sur ce site ?`],
		currentProjectDetails: csvObj[`Précisions sur cet éventuel projet en cours de réalisation`],
		projectPlans: csvObj[`Avez-vous un projet envisagé/en réflexion ?`],
		plannedUsages: csvObj[`Le projet que j'envisage concerne des usages`],
	}
}


csv('./data/descriptions-friches.csv')
.then(descriptionsFrichesCSV => {
	const descriptionsFriches = descriptionsFrichesCSV.map(makeFriche)

	console.log('descriptionsFriches', descriptionsFriches)
	
	const app = new DescriptionFriche({
		target: document.querySelector('.svelte-main'),
		props: {
			descriptionFriche: descriptionsFriches[0]
		}
	});
})
