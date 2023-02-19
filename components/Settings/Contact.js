import { Linking, Pressable, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { Accordion } from "../Accordion"
import { ThemeContext } from "../../helpers/ThemeContext"

export function Contact() {
	const { t } = useTranslation()
	const theme = useContext(ThemeContext)

	const sendMail = (to, subject, body) => {
		const url = `mailto:${to}?subject=${subject}&body=${body}`
		openUrl(url)
	}

	const openUrl = async url => {
		const supported = await Linking.canOpenURL(encodeURI(url))
		if (supported) {
			await Linking.openURL(encodeURI(url))
		}
	}

	const buildAccordionHeader = () => (
		<View style={theme.accordionHeaderContainer}>
			<Text style={theme.titleFett16}>{t("Contact and Feedback")}</Text>
		</View>
	)

	const buildAccordionBody = () => (
		<View style={theme.buttonContainer}>
			<Pressable
				style={theme.button}
				onPress={() => {
					// TODO: add website
					openUrl("")
				}}
			>
				<Text style={theme.titleFett16}>{t("Website")}</Text>
			</Pressable>
			<Pressable
				style={theme.button}
				onPress={() => {
					// TODO: add email and email text
					sendMail("", "")
				}}
			>
				<Text style={theme.titleFett16}>{t("Mail")}</Text>
			</Pressable>
			<Pressable
				style={theme.button}
				onPress={() => {
					// TODO: add social Media Links
					openUrl("")
				}}
			>
				<Text style={theme.titleFett16}>{t("Social Media")}</Text>
			</Pressable>
			<Pressable
				style={theme.button}
				onPress={() => {
					// TODO: add survey link
					openUrl("")
				}}
			>
				<Text style={theme.titleFett16}>{t("Feedback")}</Text>
			</Pressable>
		</View>
	)

	return (
		<Accordion
			props={{
				header: buildAccordionHeader(),
				body: buildAccordionBody(),
				iconExpanded: "chevron-up",
				iconCollapsed: "chevron-down",
				last: true,
				fullWidth: true,
			}}
		/>
	)
}
