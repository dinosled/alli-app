import { Text, View } from "react-native"
import React from "react"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { getHeaderTitle } from "@react-navigation/elements"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome5"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import { useFonts } from "expo-font"
import { Settings } from "./components/Settings"
import { Daily } from "./components/Daily"
import { theme } from "./themes/theme"
import { ThemeContext } from "./helpers/ThemeContext"
import "./assets/i18n/i18n.js"
import { readIsPwSetAtom, signedInAtom } from "./state"
import { Password } from "./components/Settings/Password"
import { Knowledge } from "./components/Knowledge"

const Tab = createBottomTabNavigator()

const CustomTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "white",
		border: "black",
		card: "red",
	},
}

export default function App() {
	const { t, i18n } = useTranslation()

	const [getSignedInAtom] = useAtom(signedInAtom)
	const [getIsPwSetAtom] = useAtom(readIsPwSetAtom)

	const [fontsLoaded] = useFonts({
		"Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
		"Rubik-ExtraBold": require("./assets/fonts/Rubik-ExtraBold.ttf"),
		"Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
		"Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
		"Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
		"Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<NavigationContainer>
			<ThemeContext.Provider value={theme}>
				{!(!getSignedInAtom && getIsPwSetAtom.data) ? (
					<Tab.Navigator
						theme={CustomTheme}
						initialRouteName="Daily"
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color }) => {
								let iconName
								if (route.name === "Daily") {
									iconName = "calendar-alt"
								} else if (route.name === "Settings") {
									iconName = "cog"
								} else if (route.name === "Knowledge") {
									iconName = "question"
								}

								return (
									<View
										style={focused ? [theme.tabIconContainer, theme.tabIconContainerFocused] : theme.tabIconContainer}
									>
										<Icon name={iconName} />
									</View>
								)
							},
							tabBarActiveTintColor: "black",
							tabBarInactiveTintColor: "black",
							headerTitleStyle: { fontFamily: "Rubik-Medium" },
						})}
					>
						<Tab.Screen
							name="Daily"
							component={Daily}
							options={{ title: t("Daily"), tabBarLabelStyle: { fontFamily: "Rubik-Regular" } }}
						/>
						<Tab.Screen
							name="Knowledge"
							component={Knowledge}
							options={{ title: t("FAQ/Lexicon"), tabBarLabelStyle: { fontFamily: "Rubik-Regular" } }}
						/>
						<Tab.Screen
							name="Settings"
							component={Settings}
							options={{ title: t("Settings"), tabBarLabelStyle: { fontFamily: "Rubik-Regular" } }}
						/>
					</Tab.Navigator>
				) : (
					<Password />
				)}
			</ThemeContext.Provider>
		</NavigationContainer>
	)
}
