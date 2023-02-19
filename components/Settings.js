import { useContext } from "react"
import { ScrollView } from "react-native"
import { ThemeContext } from "../helpers/ThemeContext"
import { Language } from "./Settings/Language"
import { PillIntake } from "./Settings/PillIntake"
import { Notifications } from "./Settings/Notifications"
import { About } from "./Settings/About"
import { Contact } from "./Settings/Contact"
import { Password } from "./Settings/Password"

export function Settings() {
	const theme = useContext(ThemeContext)

	return (
		<ScrollView style={[theme.bodyContainer, theme.section]}>
			<Language />
			<PillIntake />
			<Notifications />
			<Password />
			<About />
			<Contact />
		</ScrollView>
	)
}
