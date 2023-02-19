import { Image, ScrollView, Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { ThemeContext } from "../helpers/ThemeContext"
import { languageAtom } from "../state"
import { FetchLexionData } from "../helpers/queries/FetchLexiconData"

export function Lexcion() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()
	const [fetchError, setFetchError] = useState()

	FetchLexionData(setData, getLanguageAtom, setFetchError)

	return (
		<ScrollView>
			<View style={theme.lexiconOuterContainer}>
				{fetchError ? (
					<Text>Error</Text>
				) : (
					<View>
						{data?.items?.map((entry, i, data) => (
							<View key={entry.sys.id} style={theme.lexiconContainer}>
								<Image
									source={{ uri: `https:${entry.fields.image.fields.file.url}` }}
									style={theme.lexiconImg}
									accessibilityLabel={entry.fields.image.fields.description}
								/>
								<Text style={[theme.titleFett16, theme.lexiconTitle]}>{entry.fields.title}</Text>
								{entry.fields.subtitle && (
									<Text style={[theme.titleThin16, theme.lexiconSubtitle]}>{entry.fields.subtitle}</Text>
								)}
								<Text style={[theme.titleRegular16, theme.lexiconText]}>{entry.fields.text}</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</ScrollView>
	)
}
