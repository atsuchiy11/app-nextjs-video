/**
 * ボツ候補
 */
import * as React from 'react'
export const Garbage = () => <div>ボツ</div>

// /**
//  * 二階層しかないのにツリー構造にする必要があるのかギモン。。
//  */
// import * as React from 'react'
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

// import Typography from '@material-ui/core/Typography'
// import TreeView from '@material-ui/lab/TreeView'
// import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ChevronRightIcon from '@material-ui/icons/ChevronRight'
// import FolderIcon from '@material-ui/icons/Folder'
// import CategoryIcon from '@material-ui/icons/Category'
// import MovieIcon from '@material-ui/icons/Movie'
// import { SvgIconProps } from '@material-ui/core/SvgIcon'

// import { categoryData } from 'src/data/categoryData'

// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		height: 240,
// 		flexGrow: 1,
// 		maxWidth: 400,
// 	},
// 	fab: {
// 		'& > *': {
// 			margin: theme.spacing(1),
// 		},
// 		// position: 'absolute',
// 		// bottom: '-70px',
// 		// right: 0,
// 	},
// 	video: {
// 		paddingLeft: theme.spacing(4),
// 	},
// }))

// declare module 'csstype' {
// 	interface Properties {
// 		'--tree-view-color'?: string
// 		'--tree-view-bg-color'?: string
// 	}
// }

// type StyledTreeItemProps = TreeItemProps & {
// 	bgColor?: string
// 	color?: string
// 	labelIcon: React.ElementType<SvgIconProps>
// 	labelInfo?: string
// 	labelText: string
// }

// const useTreeItemStyles = makeStyles((theme: Theme) =>
// 	createStyles({
// 		root: {
// 			color: theme.palette.text.secondary,
// 			'&:hover > $content': {
// 				backgroundColor: theme.palette.action.hover,
// 			},
// 			'&:focus > $content, &$selected > $content': {
// 				// backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
// 				backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
// 				color: 'var(--tree-view-color)',
// 			},
// 			'&:focus > $content $label, &:hover > $content $label, &$selected > $content $label':
// 				{
// 					backgroundColor: 'transparent',
// 				},
// 		},
// 		content: {
// 			color: theme.palette.text.secondary,
// 			borderTopRightRadius: theme.spacing(2),
// 			borderBottomRightRadius: theme.spacing(2),
// 			paddingRight: theme.spacing(1),
// 			fontWeight: theme.typography.fontWeightMedium,
// 			'$expanded > &': {
// 				fontWeight: theme.typography.fontWeightRegular,
// 			},
// 		},
// 		group: {
// 			marginLeft: 0,
// 			'& $content': {
// 				paddingLeft: theme.spacing(4),
// 			},
// 		},
// 		expanded: {},
// 		selected: {},
// 		label: {
// 			fontWeight: 'inherit',
// 			color: 'inherit',
// 		},
// 		labelRoot: {
// 			display: 'flex',
// 			alignItems: 'center',
// 			padding: theme.spacing(1, 0),
// 		},
// 		labelIcon: {
// 			marginRight: theme.spacing(1),
// 		},
// 		labelText: {
// 			fontWeight: 'inherit',
// 			flexGrow: 1,
// 		},
// 	})
// )

// const StyledTreeItem = (props: StyledTreeItemProps) => {
// 	const classes = useTreeItemStyles()
// 	const {
// 		labelText,
// 		labelIcon: LabelIcon,
// 		labelInfo,
// 		color,
// 		bgColor,
// 		...other
// 	} = props

// 	return (
// 		<TreeItem
// 			label={
// 				<div className={classes.labelRoot}>
// 					<LabelIcon color="inherit" className={classes.labelIcon} />
// 					<Typography variant="body1" className={classes.labelText}>
// 						{labelText}
// 					</Typography>
// 					<Typography variant="caption" color="inherit">
// 						{labelInfo}
// 					</Typography>
// 				</div>
// 			}
// 			style={{
// 				'--tree-view-color': color,
// 				'--tree-view-bg-color': bgColor,
// 			}}
// 			classes={{
// 				root: classes.root,
// 				content: classes.content,
// 				expanded: classes.expanded,
// 				selected: classes.selected,
// 				group: classes.group,
// 				label: classes.label,
// 			}}
// 			{...other}
// 		/>
// 	)
// }

// const CategoryTree: React.FC = () => {
// 	const classes = useStyles()

// 	return (
// 		<>
// 			{/* <div className={classes.fab}>
// 				<Fab color="primary" size="small">
// 					<AddIcon />
// 				</Fab>
// 				<Fab color="secondary" arid-label="edit" size="small">
// 					<EditIcon />
// 				</Fab>
// 				<Fab color="default" arid-label="edit" size="small">
// 					<DeleteIcon />
// 				</Fab>
// 			</div> */}
// 			<TreeView
// 				className={classes.root}
// 				defaultCollapseIcon={<ExpandMoreIcon />}
// 				defaultExpandIcon={<ChevronRightIcon />}
// 				defaultEndIcon={<div style={{ width: 24 }} />}>
// 				{categoryData.map((primary, x) => (
// 					<StyledTreeItem
// 						nodeId={String(x)}
// 						labelText={primary.name}
// 						labelIcon={FolderIcon}
// 						key={x}>
// 						{primary.children.map((secondary, y) => (
// 							<StyledTreeItem
// 								nodeId={`${x}-${y}`}
// 								labelText={secondary.name}
// 								labelIcon={CategoryIcon}
// 								key={y}>
// 								{secondary.children &&
// 									secondary.children.map((video, z) => (
// 										<StyledTreeItem
// 											nodeId={`${x}-${y}-${z}`}
// 											labelText={video.name}
// 											labelIcon={MovieIcon}
// 											key={z}
// 											className={classes.video}
// 										/>
// 									))}
// 							</StyledTreeItem>
// 						))}
// 					</StyledTreeItem>
// 				))}
// 			</TreeView>
// 		</>
// 	)
// }
// export default CategoryTree
