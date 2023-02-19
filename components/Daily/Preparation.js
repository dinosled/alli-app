import { ScrollView, Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { ThemeContext } from "../../helpers/ThemeContext"
import { languageAtom } from "../../state"
import { FetchDailyPreparation } from "../../helpers/queries/FetchDailyPreparation"

export function Preparation(props) {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)
	const { day } = props

	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()
	const [fetchError, setFetchError] = useState()

	FetchDailyPreparation(setData, getLanguageAtom, setFetchError, day)
	return (
		<ScrollView style={theme.dailyOuterContainer}>
			{fetchError ? (
				<Text>Error</Text>
			) : (
				<View style={theme.dailyContainer}>
					<Text style={theme.dailyHeader}>{t("Preparation")}</Text>
					{data?.text1 && data.list1 && (
						<View style={theme.dailySection}>
							<Text style={theme.titleRegular16}>{data?.text1}</Text>
							{data?.list1.map((entry, i, data) => (
								<View style={theme.dailyListItem} key={i}>
									<View style={theme.dailyBulletPoint} />
									<Text style={[theme.dailyListText, theme.titleRegular16]}>{entry}</Text>
								</View>
							))}
						</View>
					)}
					{data?.text2 && data.list2 && (
						<View style={theme.dailySection}>
							<Text style={theme.titleRegular16}>{data?.text2}</Text>
							{data?.list2.map((entry, i, data) => (
								<View style={theme.dailyListItem} key={i}>
									<View style={theme.dailyBulletPoint} />
									<Text style={[theme.dailyListText, theme.titleRegular16]}>{entry}</Text>
								</View>
							))}
						</View>
					)}
					{data?.infoText && (
						<View style={theme.dailySection}>
							<Text style={theme.titleThin16}>{data?.infoText}</Text>
						</View>
					)}
				</View>
			)}
		</ScrollView>
	)
}
