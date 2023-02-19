import { ScrollView, Text, View, useWindowDimensions } from "react-native"
import { useContext, useState } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useTranslation } from "react-i18next"
import { ThemeContext } from "../../helpers/ThemeContext"
import { Hello } from "./Hello"
import { theme } from "../../themes/theme"
import { Preparation } from "./Preparation"

const renderTabBar = props => (
	<View style={theme.dailyTabBarBottomContainer}>
		<TabBar
			{...props}
			scrollEnabled
			activeColor="#F7B3AC"
			indicatorStyle={theme.dailyTabBarBottomIndicator}
			style={theme.dailyTabBarBottom}
			labelStyle={theme.dailyTabBarBottomLabel}
			tabStyle={theme.dailyTabBarBottomTab}
			renderLabel={({ route, focused }) =>
				focused ? <View style={theme.dailyTabBarBottomActive} /> : <View style={theme.dailyTabBarBottomInactive} />
			}
		/>
	</View>
)

function HelloRoute() {
	return <Hello day="day2" />
}

function PreparationRoute() {
	return <Preparation day="day2" />
}

function StepsRoute() {
	return (
		<ScrollView>
			<Text>Tag 1</Text>
			<Text>Step by Step</Text>
		</ScrollView>
	)
}

const renderScene = SceneMap({
	helloRoute: HelloRoute,
	prepRoute: PreparationRoute,
	stepsRoute: StepsRoute,
})

export function Day2() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: "helloRoute", accessibilityLabel: t("Hello") },
		{ key: "prepRoute", accessibilityLabel: t("Preparation") },
		{ key: "stepsRoute", accessibilityLabel: t("Step by step") },
	])

	return (
		<TabView
			tabBarPosition="bottom"
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	)
}
