import { useContext, useState } from "react"
import { LayoutAnimation, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { ThemeContext } from "../helpers/ThemeContext"

export function Accordion(props) {
	const { header, body, iconExpanded, iconCollapsed, last, fullWidth } = props.props
	const theme = useContext(ThemeContext)
	const [expanded, setExpanded] = useState(false)

	// if (Platform.OS === 'android') {
	//     if (UIManager.setLayoutAnimationEnabledExperimental) {
	//         UIManager.setLayoutAnimationEnabledExperimental(true);
	//     }
	// }

	const onPress = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		setExpanded(!expanded)
	}

	return (
		<View>
			<TouchableOpacity
				style={[
					theme.accordionHeadContainer,
					theme.accordionContainer,
					last && !expanded ? theme.accordionLastContainer : null,
					!fullWidth && theme.accordionBorderContainer,
				]}
				onPress={onPress}
			>
				{header}
				<Icon style={theme.iconSolid} name={expanded ? iconExpanded : iconCollapsed} />
			</TouchableOpacity>
			{expanded ? (
				<View
					style={[
						theme.accordionContainer,
						last && theme.accordionLastContainer,
						!fullWidth && theme.accordionBorderContainer,
					]}
				>
					{body}
				</View>
			) : null}
		</View>
	)
}
