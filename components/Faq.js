import { ScrollView, Text, View } from "react-native"
import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaqContent } from "./FaqContent"
import { ThemeContext } from "../helpers/ThemeContext"

export function Faq() {
	const { t, i18n } = useTranslation()

	const theme = useContext(ThemeContext)

	const [fetchError, setFetchError] = useState(false)

	const categories = [
		{ key: "procedure", title: t("Procedure") },
		{ key: "side effects", title: t("Side effects") },
		{ key: "risks", title: t("Risks") },
		{ key: "bleeding", title: t("Bleeding") },
		{ key: "fertility", title: t("Fertility") },
		{ key: "sexuality and contraception", title: t("Sexuality and contraception") },
		{ key: "other", title: t("Other") },
	]

	return (
		<ScrollView>
			{fetchError ? (
				<Text>Error</Text>
			) : (
				<View style={theme.bodyContainer}>
					{categories.map(category => (
						<FaqContent key={category.key} category={category} setFetchError={setFetchError} />
					))}
				</View>
			)}
		</ScrollView>
	)
}
