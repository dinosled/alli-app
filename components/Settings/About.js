import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { Accordion } from "../Accordion"
import { ThemeContext } from "../../helpers/ThemeContext"

export function About() {
	const { t } = useTranslation()
	const theme = useContext(ThemeContext)

	const buildAccordionHeader = () => (
		<View style={theme.accordionHeaderContainer}>
			<Text style={theme.titleFett16}>{t("About")}</Text>
		</View>
	)

	const buildAccordionBody = () => (
		<Text style={[theme.titleRegular16, theme.accordionBodyText, theme.greyBackground]}>
			Hier noch About Text einfügen. Hier noch About Text einfügen. Hier noch About Text einfügen. Hier noch About Text
			einfügen. Hier noch About Text einfügen.
		</Text>
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
