import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useNetInfo } from "@react-native-community/netinfo"

const contentful = require("contentful/dist/contentful.browser.min.js")

export const FetchFaqData = (setData, category, language, setFetchError) => {
	const netInfo = useNetInfo()

	useEffect(() => {
		const contentTypes = [
			{ language: "de", contentType: "faqDe" },
			// TODO: change to faqEn
			{ language: "en", contentType: "faqDe" },
		]

		const space = process.env.REACT_APP_SPACE
		const accessTokenr = process.env.REACT_APP_ACCESS_TOKEN

		const storeData = async value => {
			try {
				const jsonValue = JSON.stringify(value)
				await AsyncStorage.setItem("faqData", jsonValue)
			} catch (e) {
				console.error(e)
			}
		}

		const getDataFromStore = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("faqData")
				return jsonValue !== null ? JSON.parse(jsonValue) : null
			} catch (e) {
				console.error(e)
				setFetchError(true)
			}
		}

		const fetchData = async () => {
			const client = contentful.createClient({
				space,
				accessToken,
			})

			await client
				.getEntries({
					content_type: contentTypes.find(entry => entry.language === language.id).contentType,
					"fields.category": category.key,
				})
				.then(response => {
					if (response.sys.type === "ERROR") {
						throw Error(response)
					}
					return response
				})
				.then(response => {
					setData(response)
					storeData(response)
				})
				.catch(error => {
					console.error(error)
					setFetchError(true)
				})
		}

		if (netInfo.isConnected) {
			fetchData()
		} else {
			;(async function () {
				const dataFromStore = await getDataFromStore()
				setData(dataFromStore)
			})()
		}
	}, [setData, category, language, setFetchError, netInfo.isConnected])
}
