import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./lib/queries"
import { writeClient } from "./sanity/lib/write-client";
import { client } from "./sanity/lib/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user: { name, email, image }, account, profile }) {
            if (!profile) return false;
            const { id, login, bio } = profile as { id: string, login: string, bio?: string };

            const existingUser = await client.
                withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY,
                    {
                        id: id
                    });

            if (!existingUser) {
                await writeClient.create({
                    _type: 'author',
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || ''
                })
            }
            return true;
        }
    },

    async jwt({ token, user, account, profile }: { token: any; user?: any; account?: any; profile?: any }) {
        if (account && profile) {
            const user = await client.
                withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id })

            token.id = user._id;

        }
        return token;
    },
    async session({ session, token, user }) {
        Object.assign(session, { id: token.id });
        console.log('toekn', token);

        return {
            ...session,
            id: token.id
        }
    }
})