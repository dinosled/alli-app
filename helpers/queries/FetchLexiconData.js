import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useNetInfo } from "@react-native-community/netinfo"

const contentful = require("contentful/dist/contentful.browser.min.js")

export const FetchLexionData = (setData, language, setFetchError) => {
	const netInfo = useNetInfo()

	useEffect(() => {
		const contentTypes = [
			{ language: "de", contentType: "lexiconDe" },
			// TODO: change to lexiconEn
			{ language: "en", contentType: "lexiconDe" },
		]

		const space = process.env.REACT_APP_SPACE
		const accessToken = process.env.REACT_APP_ACCESS_TOKEN

		// TODO: refactor reuse
		const storeData = async value => {
			try {
				const jsonValue = JSON.stringify(value)
				await AsyncStorage.setItem("lexiconData", jsonValue)
			} catch (e) {
				console.error(e)
			}
		}

		// TODO: refactor reuse
		const getDataFromStore = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("lexiconData")
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
	}, [setData, language, setFetchError, netInfo.isConnected])
}
