import { Text, View, useWindowDimensions } from "react-native"
import { useContext, useState } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useTranslation } from "react-i18next"
import { ThemeContext } from "../helpers/ThemeContext"
import { Day3 } from "./Daily/Day3"
import { Day1 } from "./Daily/Day1"
import { Day2 } from "./Daily/Day2"

const renderTabBar = props => (
	<TabBar
		{...props}
		scrollEnabled
		activeColor="#F7B3AC"
		indicatorStyle={{ borderWidth: 1, borderColor: "white" }}
		style={{ borderColor: "black", borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: "white" }}
		labelStyle={{ color: "black", fontFamily: "Rubik-Medium", fontSize: 16 }}
		tabStyle={{ width: "auto" }}
	/>
)

function OverviewRoute() {
	return <Text>Overview</Text>
}

function Day1Route() {
	return <Day1 />
}

function Day2Route() {
	return <Day2 />
}

function Day3Route() {
	return <Day3 />
}

function Day4Route() {
	return <Text>Day4</Text>
}

function Day5Route() {
	return <Text>Day 5 - 8</Text>
}

function Day9Route() {
	return <Text>Day 5 - 8</Text>
}

function MenstruationRoute() {
	return <Text>Menstruation</Text>
}

const renderScene = SceneMap({
	overview: OverviewRoute,
	day1: Day1Route,
	day2: Day2Route,
	day3: Day3Route,
	day4: Day4Route,
	day5: Day5Route,
	day9: Day9Route,
	menstruation: MenstruationRoute,
})

export function Daily() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: "overview", title: t("Overview") },
		{ key: "day1", title: `${t("Day")} 1` },
		{ key: "day2", title: `${t("Day")} 2` },
		{ key: "day3", title: `${t("Day")} 3` },
		{ key: "day4", title: `${t("Day")} 4` },
		{ key: "day5", title: `${t("Day")} 5 - 8` },
		{ key: "day9", title: `${t("From day")} 9` },
		{ key: "menstruation", title: t("Menstruation") },
	])

	return (
		<TabView
			style={theme.section}
			swipeEnabled={false}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	)
}
