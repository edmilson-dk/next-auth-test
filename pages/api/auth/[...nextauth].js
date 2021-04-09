import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

async function getGitHubUserPrimaryEmail(accessToken) {
  const responseGetUserEmails = await fetch('https://api.github.com/user/emails', {
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      }
  })

  const userEmails = await responseGetUserEmails.json();
  
  const { email } = userEmails.find((email) => email.primary);

  return email;
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // ...add more providers here
  ],
  session: {
    jwt: true,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {

      try {
        const userToken = `${account.accessToken}`;
  
        const email = await getGitHubUserPrimaryEmail(userToken);
        user.email = email;
  
        return true;
      } catch {
        console.log('erro')
        return false;
      } 
    }
  },
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true
  },
})