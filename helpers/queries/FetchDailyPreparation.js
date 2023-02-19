import { useEffect } from "react"

const contentful = require("contentful/dist/contentful.browser.min.js")

export const FetchDailyPreparation = (setData, language, setFetchError, day) => {
	useEffect(() => {
		const contentTypes = [
			{ language: "de", contentType: "dailyPreparationDe" },
			// TODO: change to dailyPreparationEn
			{ language: "en", contentType: "dailyPreparationDe" },
		]

		const space = process.env.REACT_APP_SPACE
		const accessToken = process.env.REACT_APP_ACCESS_TOKEN

		const fetchData = async () => {
			const client = contentful.createClient({
				space,
				accessToken,
			})
			await client
				.getEntries({
					content_type: contentTypes.find(entry => entry.language === language.id).contentType,
					"fields.day": day,
				})
				.then(response => {
					if (response.sys.type === "ERROR") {
						throw Error(response)
					}
					return response
				})
				.then(response => {
					setData(response?.items[0]?.fields)
				})
				.catch(error => {
					console.error(error)
					setFetchError(true)
				})
		}

		fetchData()
	}, [setData, language, setFetchError, day])
}
