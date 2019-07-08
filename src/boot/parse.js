import Parse from 'parse'

export default async ({ app, Vue }) => {
  Parse.initialize('mavoix-api', 'djDi7D6j2m')
  Parse.serverURL = 'http://localhost:8080'
}
