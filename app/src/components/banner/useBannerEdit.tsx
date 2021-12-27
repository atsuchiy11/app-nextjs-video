import _ from 'lodash'
import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { Banner, ReqBannerPut, BannerImage } from 'src/interfaces/api'

const useBannerEdit = (
	selectedRow: Banner,
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()
	const [session] = useSession()
	const user = session.user.email

	const [prevBanner, setPrevBanner] = useState(selectedRow)
	const [banner, setBanner] = useState(selectedRow)
	const [image, setImage] = useState({} as File)

	/** listener input banner parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('banner-edit-')[1]
		setBanner({ ...banner, [key]: event.target.value })
	}

	/** listener video invalid */
	const handleChangeInvalid = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const released = event.currentTarget.innerText
		if (released == '公開中') setBanner({ ...banner, invalid: true })
		else setBanner({ ...banner, invalid: false })
	}

	/** listener input image file */
	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onload = (e) => {
				setImage(file)
				setBanner({
					...banner,
					image: e.target.result as string,
				})
			}
			reader.readAsDataURL(file)
		}
	}

	/** upload banner image to S3 */
	const uploadImage = async (changed: Partial<Banner>) => {
		if (!('image' in changed)) {
			return Promise.resolve()
		}
		const params = new FormData()
		params.append('image', image)
		const headers = { 'Content-Type': 'multipart/form-data' }
		try {
			const res = await axios.post<BannerImage>('/banner/image', params, {
				headers,
			})
			if (res.status != 200) {
				console.error(res.data)
				throw new Error('failed to upload image to S3.')
			}
			return Promise.resolve(res.data.url)
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** update banner meta data to db */
	const putData = async (changed: Partial<Banner>, url: string | void) => {
		if (url) changed['image'] = url

		/** put banner meta to db */
		const params: ReqBannerPut = { PK: banner.PK, user }
		Object.keys(changed).map((key) => (params[key] = changed[key]))

		try {
			const res = await axios.put('/banner', params)
			if (res.status != 200) {
				throw new Error('failed to update banner.')
			}
			return Promise.resolve(res.data)
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** submit state */
	const handleSubmit = () => {
		const changed = _.omitBy(banner, (v, k) => prevBanner[k] == v)
		if (Object.keys(changed).length <= 0) {
			showTips('あれ、何も変えてないですよね？', 'info')
			return
		}
		uploadImage(changed)
			.then((url) => putData(changed, url))
			.then(() => {
				mutate('/banners')
				showTips('バナーを更新しました', 'info')
				setBanner({} as Banner)
				handler((value) => !value)
			})
			.catch((err) => {
				console.error(err.message)
				throw new Error(err.messsage)
			})
	}

	/** initialize */
	useEffect(() => {
		setBanner(selectedRow)
		setPrevBanner(selectedRow)
	}, [selectedRow])

	return [
		{
			state: banner,
			handleInput: handleChange,
			handleInvalid: handleChangeInvalid,
			handleFile: handleChangeFile,
			handleSubmit,
		},
	]
}
export default useBannerEdit
