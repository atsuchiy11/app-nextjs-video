/**
 * ボツ候補
 */
import * as React from 'react'
export const Garbage = () => <div>ボツ</div>

// import * as React from 'react'
// import { Theme, makeStyles } from '@material-ui/core/styles'
// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
// import Box from '@material-ui/core/Box'

// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import CategoryIcon from '@material-ui/icons/Category'

// import Fab from '@material-ui/core/Fab'
// import AddIcon from '@material-ui/icons/Add'
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'

// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		flexGrow: 1,
// 		backgroundColor: theme.palette.background.paper,
// 		display: 'flex',
// 		height: 'auto',
// 		position: 'relative',
// 	},
// 	tabs: {
// 		borderRight: `1px solid ${theme.palette.divider}`,
// 	},
// 	fab: {
// 		'& > *': {
// 			margin: theme.spacing(1),
// 		},
// 		position: 'absolute',
// 		top: 0,
// 		right: 0,
// 	},
// }))

// interface TabPanelProps {
// 	children?: React.ReactNode
// 	index: any
// 	value: any
// }

// const TabPanel: React.FC<TabPanelProps> = (props) => {
// 	const { children, value, index, ...other } = props

// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={value !== index}
// 			id={`vertical-tabpanel-${index}`}
// 			aria-labelledby={`vertical-tab-${index}`}
// 			{...other}>
// 			{value === index && (
// 				<Box>
// 					{/* <Typography>{children}</Typography> */}
// 					{children}
// 				</Box>
// 			)}
// 		</div>
// 	)
// }

// function allyProps(index: any) {
// 	return {
// 		id: `vertical-tab-${index}`,
// 		'aria-controls': `vertical-tabpanel-${index}`,
// 	}
// }

// const data = [
// 	{
// 		name: '研修',
// 		children: [
// 			{ name: 'METHOD共有会' },
// 			{ name: 'プライムアカデミー' },
// 			{ name: 'その他' },
// 		],
// 	},
// 	{
// 		name: '社内広報',
// 		children: [
// 			{ name: 'PRIME LINE' },
// 			{ name: '朝会' },
// 			{ name: 'キックオフ' },
// 			{ name: '人事・総務' },
// 			{ name: '経理' },
// 			{ name: 'その他' },
// 		],
// 	},
// 	{
// 		name: 'マニュアル',
// 		children: [{ name: '入社時導入研修' }, { name: 'その他' }],
// 	},
// 	{
// 		name: 'ポートフォリオ',
// 		children: [
// 			{ name: '動画コンテンツ制作事例' },
// 			{ name: '広告動画制作事例' },
// 			{ name: 'メイキング映像' },
// 			{ name: 'その他' },
// 		],
// 	},
// ]

// const CategoryTabs: React.FC = () => {
// 	const classes = useStyles()
// 	const [value, setValue] = React.useState(0)
// 	const handleChange = (_, newValue: number) => {
// 		setValue(newValue)
// 	}

// 	const [selectedIndex, setSelectedIndex] = React.useState(1)
// 	const handleListItemClick = (_, index: number) => {
// 		setSelectedIndex(index)
// 	}

// 	return (
// 		<div className={classes.root}>
// 			<div className={classes.fab}>
// 				<Fab color="primary" size="small">
// 					<AddIcon />
// 				</Fab>
// 				<Fab color="secondary" arid-label="edit" size="small">
// 					<EditIcon />
// 				</Fab>
// 				<Fab color="default" arid-label="edit" size="small">
// 					<DeleteIcon />
// 				</Fab>
// 			</div>
// 			<Tabs
// 				orientation="vertical"
// 				variant="scrollable"
// 				value={value}
// 				onChange={handleChange}
// 				aria-label="Category Tabs"
// 				className={classes.tabs}>
// 				{data.map((parent, index) => (
// 					<Tab
// 						label={parent.name}
// 						{...allyProps(index)}
// 						key={index}
// 					/>
// 				))}
// 			</Tabs>
// 			{data.map((parent, index) => (
// 				<TabPanel value={value} index={index} key={index}>
// 					<List>
// 						{parent.children.map((child, index) => (
// 							<ListItem
// 								button
// 								key={index}
// 								selected={selectedIndex === index}
// 								onClick={(event) =>
// 									handleListItemClick(event, index)
// 								}>
// 								<ListItemIcon>
// 									<CategoryIcon />
// 								</ListItemIcon>
// 								<ListItemText primary={child.name} />
// 							</ListItem>
// 						))}
// 					</List>
// 				</TabPanel>
// 			))}
// 		</div>
// 	)
// }
// export default CategoryTabs
