import { Text, View } from "react-native"
import Checkbox from "expo-checkbox"
import { changeLanguage } from "i18next"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { useAtom } from "jotai"
import { ThemeContext } from "../../helpers/ThemeContext"
import { languageAtom } from "../../state"
import { Accordion } from "../Accordion"

export function Language() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [getLanguageAtom, setLanguageAtom] = useAtom(languageAtom)

	const languages = [
		{
			id: "de",
			title: "German",
		},
		{
			id: "en",
			title: "English",
		},
	]

	languages.sort((a, b) => a.title.localeCompare(b.title))

	const last = (length, i) => length - 1 === i

	const languageChanged = language => {
		changeLanguage(language.id).then(setLanguageAtom(language))
	}

	const buildAccordionHeader = () => (
		<View style={theme.accordionHeaderContainer}>
			<Text style={theme.titleFett16}>{t("Language")}</Text>
			<Text style={theme.titleRegular16}>{getLanguageAtom.title}</Text>
		</View>
	)

	const buildAccordionBody = () => (
		<View style={theme.checkboxContainer}>
			{languages.map((language, index) => (
				<View
					key={language.id}
					style={[theme.checkboxOptionContainer, last(languages.length, index) && theme.lastCheckboxOptionContainer]}
				>
					<Text style={[theme.titleRegular16, theme.checkboxLabel]}>{language.title}</Text>
					<View style={theme.checkbox}>
						<Checkbox
							style={theme.checkbox}
							value={language.id === getLanguageAtom.id}
							onValueChange={() => languageChanged(language)}
							color="black"
						/>
					</View>
				</View>
			))}
		</View>
	)

	return (
		<Accordion
			props={{
				header: buildAccordionHeader(),
				body: buildAccordionBody(),
				iconExpanded: "chevron-up",
				iconCollapsed: "chevron-down",
				last: false,
				fullWidth: true,
			}}
		/>
	)
}
