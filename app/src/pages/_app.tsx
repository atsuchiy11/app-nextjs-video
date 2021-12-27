import React from 'react'
import axios from 'src/foundations/axios'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import 'src/styles/globals.css'
import theme from 'src/styles/theme'
import CssBaseLine from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import { getSession } from 'next-auth/client'
import { User, ReqUser } from 'src/interfaces/api'
import { useAppContext } from 'src/foundations/AppProvider'

import AppContextProvider from 'src/foundations/AppProvider'
import ViewerLayout from 'src/layouts/ViewerLayout'
import AdminLayout from 'src/layouts/AdminLayout'

/** after login... */
export function AppInit() {
	const { dispatch } = useAppContext()
	React.useEffect(() => {
		const fetchUser = async () => {
			const session = await getSession()
			if (!session) return

			const res = await axios.get<User>(`/user/${session.user.email}`)
			if (!res) return
			const user = res.data

			/** check user authority */
			dispatch({ acl: { payload: user.acl } })

			/** update user meta diff and login date */
			const params: ReqUser = {
				PK: session.user.email,
			}
			if (user.name != session.user.name)
				params['name'] = session.user.name
			if (user.image != session.user.image)
				params['image'] = session.user.image

			try {
				const res = await axios.put('/user', params)
				if (res.status != 200) throw new Error('failed to update user.')
			} catch (err) {
				throw new Error(err)
			}
		}
		fetchUser()
	}, [])
	return null
}

/**
 * Rendered on the Server-side and Client-side
 * @see https://qiita.com/tetsutaroendo/items/c7171286137d963cdecf
 */
export default function MyApp({
	Component,
	pageProps,
	router,
}: AppProps): JSX.Element {
	/** Remove the server-side injected CSS. */
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles)
		}
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>Prime Studio</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				{/* <link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap"
					rel="stylesheet"
				/> */}
			</Head>
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseLine />
					<AppContextProvider>
						<Provider session={pageProps.session}>
							<SWRConfig value={{ revalidateOnFocus: false }}>
								{router.pathname.startsWith('/admin') ? (
									<AdminLayout>
										<Component {...pageProps} />
									</AdminLayout>
								) : (
									<ViewerLayout>
										<Component {...pageProps} />
									</ViewerLayout>
								)}
								<AppInit />
							</SWRConfig>
						</Provider>
					</AppContextProvider>
				</ThemeProvider>
			</StylesProvider>
		</React.Fragment>
	)
}
