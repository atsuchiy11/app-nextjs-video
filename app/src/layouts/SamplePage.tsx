import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import useStyles from 'src/styles/SamplePage'
import { signIn, signOut, useSession } from 'next-auth/client'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

export const SamplePage: React.FC = () => {
	const [session, loading] = useSession()
	const classes = useStyles()

	if (loading) return <div>Loading...</div>

	return (
		<div className={classes.root}>
			<Head>
				<title>Prime Stream</title>
				<link rel="icon" href="/youtube.png" />
			</Head>

			<main className={classes.main}>
				<Typography variant="h3" component="h1" gutterBottom>
					Prime Stream
				</Typography>
				<h1>Google Fonts</h1>

				<Grid container spacing={3} className={classes.container}>
					{[0, 1, 2, 3].map((item) => {
						return (
							<Grid item xs={12} sm={6} md={3} key={item}>
								<Paper className={classes.paper}>
									Contents
								</Paper>
							</Grid>
						)
					})}
				</Grid>
				{!session && (
					<Button
						variant="outlined"
						color="primary"
						onClick={() => signIn()}>
						ログイン
					</Button>
				)}
				{session && (
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => signOut()}>
						ログアウト
					</Button>
				)}
			</main>

			<footer className={classes.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
					className={classes.footer_a}>
					Powered by{' '}
					<Image
						src="/primex_rogo.jpg"
						alt="PrimeX Logo"
						height={'23'}
						width={'110'}
					/>
					{/* 1181x247 */}
				</a>
			</footer>
		</div>
	)
}
