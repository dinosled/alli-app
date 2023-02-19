import { ScrollView, Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { ThemeContext } from "../../helpers/ThemeContext"
import { languageAtom } from "../../state"
import { FetchDailySideEffects } from "../../helpers/queries/FetchDailySideEffects"

export function SideEffects(props) {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)
	const { day } = props

	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()
	const [fetchError, setFetchError] = useState()

	FetchDailySideEffects(setData, getLanguageAtom, setFetchError, day)
	// console.log(data.items[0].fields.titel);
	return (
		<ScrollView style={theme.dailyOuterContainer}>
			{fetchError ? (
				<Text>Error</Text>
			) : (
				<View style={theme.dailyContainer}>
					<Text style={theme.dailyHeader}>{t("Side effects")}</Text>
					{data?.items.map((entry, i, data) => (
						<View key={i}>
							<Text style={[theme.dailyParagraph, theme.titleFett16]}>{entry.fields.titel}</Text>
							<Text style={[theme.dailyText, theme.titleRegular16]}>{entry.fields.text}</Text>
						</View>
					))}
				</View>
			)}
		</ScrollView>
	)
}
