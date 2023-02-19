import { Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { FetchFaqData } from "../helpers/queries/FetchFaqData"
import { Accordion } from "./Accordion"
import { ThemeContext } from "../helpers/ThemeContext"
import { languageAtom } from "../state"

export function FaqContent(props) {
	const { t, i18n } = useTranslation()

	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()

	const { category, setFetchError } = props
	const theme = useContext(ThemeContext)

	const last = (i, data) => {
		if (i === data.length - 1) {
			return true
		}
		return false
	}

	FetchFaqData(setData, category, getLanguageAtom, setFetchError)

	const buildAccordionBody = answer => <Text style={[theme.accordionBodyText, theme.text]}>{answer}</Text>

	const buildAccordionHeader = question => <Text style={[theme.text, theme.accordionQuestionText]}>{question}</Text>

	return (
		data && (
			<View>
				<View>
					{data?.items?.length !== 0 && (
						<Text style={theme.faq.header} key={category.key}>
							{category.title}
						</Text>
					)}
				</View>
				{data?.items?.map((entry, i, data) => (
					<View key={entry.sys.id} style={theme.faq.content}>
						<Accordion
							props={{
								header: buildAccordionHeader(entry.fields.question),
								body: buildAccordionBody(entry.fields.explanation),
								iconExpanded: "chevron-up",
								iconCollapsed: "chevron-down",
								last: last(i, data),
								fullWidth: false,
							}}
						/>
					</View>
				))}
			</View>
		)
	)
}
