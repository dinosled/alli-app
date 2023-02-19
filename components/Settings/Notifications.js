import { Switch, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { useAtom } from "jotai"
import { ThemeContext } from "../../helpers/ThemeContext"
import { notificationsAtom } from "../../state"

export function Notifications() {
	const { t } = useTranslation()
	const theme = useContext(ThemeContext)

	const [getNotificationsAtom, setNotificationsAtom] = useAtom(notificationsAtom)

	const toggleSwitch = () => {
		setNotificationsAtom(!getNotificationsAtom)
	}

	return (
		<View style={[theme.notificationsContainer]}>
			<View>
				<Text style={theme.titleFett16}>{t("Notifications")}</Text>
			</View>
			<View>
				<Switch onValueChange={toggleSwitch} value={getNotificationsAtom} />
			</View>
		</View>
	)
}
