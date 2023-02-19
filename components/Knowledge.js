import { Pressable, ScrollView, View, useWindowDimensions } from "react-native"
import { useContext, useState } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useTranslation } from "react-i18next"
import { Faq } from "./Faq"
import { Lexcion } from "./Lexicon"
import { ThemeContext } from "../helpers/ThemeContext"

const renderTabBar = props => (
	<TabBar
		{...props}
		indicatorStyle={{ borderWidth: 1, borderColor: "#F7B3AC" }}
		style={{ borderColor: "black", borderTopWidth: 1, backgroundColor: "white" }}
		labelStyle={{ color: "black" }}
	/>
)

function FaqRoute() {
	return <Faq />
}

function LexiconRoute() {
	return <Lexcion />
}

const renderScene = SceneMap({
	faq: FaqRoute,
	lexicon: LexiconRoute,
})

export function Knowledge() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: "faq", title: "FAQ" },
		{ key: "lexicon", title: t("Lexicon") },
	])

	return (
		<TabView
			style={theme.section}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	)
}
