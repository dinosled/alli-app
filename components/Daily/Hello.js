import { ScrollView, Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { ThemeContext } from "../../helpers/ThemeContext"
import { languageAtom } from "../../state"
import { FetchDailyHello } from "../../helpers/queries/FetchDailyHello"

export function Hello(props) {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)
	const { day } = props

	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()
	const [fetchError, setFetchError] = useState()

	FetchDailyHello(setData, getLanguageAtom, setFetchError, day)
	return (
		<ScrollView style={[theme.dailyOuterContainer]}>
			{fetchError ? (
				<Text>Error</Text>
			) : (
				<View style={theme.dailyContainer}>
					<Text style={[theme.dailyHeader]}>{t("Hello")}</Text>
					{data?.map((entry, i, data) => (
						<Text key={i} style={[theme.dailyParagraph, theme.titleRegular16]}>
							{entry?.content[0]?.value}
						</Text>
					))}
				</View>
			)}
		</ScrollView>
	)
}
