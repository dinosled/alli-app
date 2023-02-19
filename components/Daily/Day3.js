import { ScrollView, Text, View, useWindowDimensions } from "react-native"
import { useContext, useState } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useTranslation } from "react-i18next"
import { ThemeContext } from "../../helpers/ThemeContext"
import { Hello } from "./Hello"
import { theme } from "../../themes/theme"
import { Preparation } from "./Preparation"
import { StepByStepDay3 } from "./StepByStepDay3"
import { Meds } from "./Meds"
import { SideEffects } from "./SideEffects"

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
	return <Hello day="day3" />
}

function PreparationRoute() {
	return <Preparation day="day3" />
}

function StepsRoute() {
	return <StepByStepDay3 />
}

function MedsRoute() {
	return <Meds day="day3" />
}

function SideEffectsRoute() {
	return <SideEffects day="day3" />
}

const renderScene = SceneMap({
	helloRoute: HelloRoute,
	prepRoute: PreparationRoute,
	stepsRoute: StepsRoute,
	medsRoute: MedsRoute,
	sideEffectsRoute: SideEffectsRoute,
})

export function Day3() {
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
