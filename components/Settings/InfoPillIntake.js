import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { useAtom } from "jotai"
import { readBleedingDateAtom, readPillDateAtom } from "../../state"
import { ThemeContext } from "../../helpers/ThemeContext"

export const InfoPillIntake = () => {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [getPillDateAtom] = useAtom(readPillDateAtom)
	const [getBleedingDateAtom] = useAtom(readBleedingDateAtom)

	return (
		<View style={theme.pillIntakeContainer}>
			<View style={theme.pillIntakeDate}>
				<Text style={theme.titleRegular16}>{t("Date and time of pill intake:")}</Text>
				<Text style={theme.titleFett16}>
					<Text>{getPillDateAtom.data}</Text>
				</Text>
			</View>
			<View>
				<Text style={theme.titleRegular16}>{t("Expected start of bleeding:")}</Text>
				<Text style={theme.titleFett16}>{getBleedingDateAtom.data}</Text>
			</View>
		</View>
	)
}
