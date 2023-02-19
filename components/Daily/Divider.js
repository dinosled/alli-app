import { Image, View } from "react-native"
import { useContext } from "react"
import { ThemeContext } from "../../helpers/ThemeContext"

export function Divider(props) {
	const theme = useContext(ThemeContext)
	const { divider, label } = props
	return (
		<View style={theme.dailyDividerContainer}>
			<Image source={divider} style={theme.dailyDividerImg} accessibilityLabel={label} />
		</View>
	)
}
