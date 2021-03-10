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

