import { Octokit } from '@octokit/rest';
import frontmatter from 'front-matter';

const Buffer = buffer.Buffer;

export default function getAllResources(){
    
    const octokit = new Octokit()

    const owner = 'betagouv';
    const repo = 'urbanvitaliz'
    const path = 'TMP_resources'

    return octokit.repos.getContent({
        owner,
        repo,
        path,
    }).then(({data}) => {
        const relevantFiles = data.filter(
            ({name, type}) => type === "file" && name.endsWith('.md')
        );

        return Promise.allSettled(
            relevantFiles.map( f => fetch(f.url).then(r => r.json()) )
        )
        .then(rs => rs
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value)
            .map(({path, content}) => {
                const {body, attributes} = frontmatter( Buffer.from(content, 'base64').toString('utf-8') )
                
                return {
                    url: `/${repo}/${path.replace(/\.[^/.]+$/, "")}`, 
                    content: body, 
                    attributes, 
                    id: path
                }
            })
        )
    })

}

/*export default function fakeGetAllResources(){
    console.warn(`ATTONTION !! C'est pas la bonne fonction getAllResources !!1!!!!`)

    return Promise.resolve([
        {
            url: `/ress/yo`, 
            content: 'bonjoir 1', 
            attributes: {
                phrase_catch: 'a + b = C',
                sous_titre: 'sousousou',
                etape: 'début',
                thematique: 'yep'
            }, 
            id: 'id_1'
        },
        {
            url: `/ress/grrr`, 
            content: 'bonjoir 2', 
            attributes: {
                phrase_catch: 'sup',
                sous_titre: 'miam miam',
                etape: 'début',
                thematique: 'nope'
            }, 
            id: 'id_2'
        },
        {
            url: `/ress/bzzzz`, 
            content: 'bonjoir 3', 
            attributes: {
                phrase_catch: 'high chances',
                etape: 'fin',
                thematique: 'yep'
            }, 
            id: 'id_3'
        },
        {
            url: `/ress/spid`, 
            content: 'bonjoir 4', 
            attributes: {
                phrase_catch: 'that i might lose',
                etape: 'fin',
                thematique: 'nope'
            }, 
            id: 'id_4'
        }
    ])
}*/