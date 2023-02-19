import * as i18n from "i18next"
import { initReactI18next } from "react-i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"
import en from "./en.json"
import de from "./de.json"

const languageDetector = {
	type: "languageDetector",
	async: true,
	detect: async cb => {
		const async_presist = await AsyncStorage.getItem("languageAtom")
		const lang = JSON.parse(async_presist)
		if (lang) {
			return cb(lang.id)
		}
		return cb("de")
	},
	init: () => {},
	cacheUserLanguage: () => {},
}

i18n
	.use(initReactI18next)
	.use(languageDetector)
	.init({
		fallbackLng: "de",
		resources: {
			en,
			de,
		},
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	})

export default i18n
