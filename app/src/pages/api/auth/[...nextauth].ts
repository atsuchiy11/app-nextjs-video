import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'src/foundations/axios'
import { User, ReqUser } from 'src/interfaces/api'

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		/** validate domain (***@prime-x.co.jp) */
		async signIn(_, account, profile) {
			if (profile.email == 'atsuchiy11@gmail.com') return true
			if (profile.email == 'px.testuser0711@gmail.com') return true
			if (
				account.provider === 'google' &&
				profile.verified_email === true &&
				profile.email?.endsWith(process.env.PX_DOMAIN)
				// profile.email?.endsWith('gmail.com')
			) {
				return true
			} else {
				return false
			}
		},
		/** if first login, register user to db */
		async session(session, _) {
			if (session.user.email.endsWith(process.env.PX_DOMAIN)) {
				// if (session.user.email.endsWith('gmail.com')) {
				const user = await axios.get<User>(
					`/user/${session.user.email}`
				)
				if (!user.data.PK) {
					/** post user profile */
					const params: ReqUser = {
						PK: session.user.email,
						name: session.user.name,
						image: session.user.image,
						acl: 'user',
					}
					try {
						const res = await axios.post('/user', params)
						if (res.status != 200)
							throw new Error('failed to register user.')
						return session
					} catch (err) {
						throw new Error(err)
					}
				}
			}
			return session
		},
	},
})
