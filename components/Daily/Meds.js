import { Image, ScrollView, Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { languageAtom } from "../../state"
import { ThemeContext } from "../../helpers/ThemeContext"
import { FetchMeds } from "../../helpers/queries/FetchMeds"
import { Accordion } from "../Accordion"

export function Meds(props) {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)
	const { day } = props
	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()
	const [fetchError, setFetchError] = useState()

	const categories = [
		{ key: "pain", title: t("Against pain"), meds: data?.filter(element => element.fields.category === "pain") },
		{ key: "nausea", title: t("Against nausea"), meds: data?.filter(element => element.fields.category === "nausea") },
		{ key: "test", title: "Test", meds: data?.filter(element => element.fields.category === "test") },
	]
	const validCategories = categories.filter(element => element?.meds?.length > 0)

	FetchMeds(setData, getLanguageAtom, setFetchError, day)

	const buildAccordionBody = meds => (
		<View style={theme.dailyAccordionBody}>
			{meds?.map((element, i) => (
				<View key={i}>
					<Text style={[theme.titleFett16]}>{element.fields.name}</Text>
					<Text style={[theme.titleRegular16, theme.dailyAccordionText]}>{element.fields.text}</Text>
				</View>
			))}
		</View>
	)

	const buildAccordionHeader = category => <Text style={[theme.text, theme.accordionQuestionText]}>{t(category)}</Text>

	return (
		<ScrollView style={theme.dailyOuterContainer}>
			{fetchError ? (
				<Text>Error</Text>
			) : (
				<View style={theme.dailyContainer}>
					<Text style={theme.dailyHeader}>{t("Medication")}</Text>
					<View style={theme.dailySection}>
						{validCategories?.map((category, i) => (
							<Accordion
								key={i}
								props={{
									header: buildAccordionHeader(category.title),
									body: buildAccordionBody(category.meds),
									iconExpanded: "chevron-up",
									iconCollapsed: "chevron-down",
									last: !(validCategories.length > i + 1),
									fullWidth: false,
								}}
							/>
						))}
					</View>
				</View>
			)}
		</ScrollView>
	)
}
