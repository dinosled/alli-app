import { ScrollView, Text, View, useWindowDimensions } from "react-native"
import { useContext, useState } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useTranslation } from "react-i18next"
import { ThemeContext } from "../../helpers/ThemeContext"
import { Hello } from "./Hello"
import { theme } from "../../themes/theme"
import { Preparation } from "./Preparation"
import { SideEffects } from "./SideEffects"
import { Meds } from "./Meds"

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
	return <Hello day="day1" />
}

function PreparationRoute() {
	return <Preparation day="day1" />
}

function StepsRoute() {
	return (
		<ScrollView>
			<Text>Tag 1</Text>
			<Text>Step by Step</Text>
		</ScrollView>
	)
}

function MedsRoute() {
	return <Meds day="day1" />
}

function SideEffectsRoute() {
	return <SideEffects day="day1" />
}

const renderScene = SceneMap({
	helloRoute: HelloRoute,
	prepRoute: PreparationRoute,
	stepsRoute: StepsRoute,
	medsRoute: MedsRoute,
	sideEffectsRoute: SideEffectsRoute,
})

export function Day1() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: "helloRoute", accessibilityLabel: t("Hello") },
		{ key: "prepRoute", accessibilityLabel: t("Preparation") },
		{ key: "stepsRoute", accessibilityLabel: t("Step by step") },
		{ key: "medsRoute", accessibilityLabel: t("Medication") },
		{ key: "sideEffectsRoute", accessibilityLabel: t("Side effects") },
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
