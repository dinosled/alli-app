import { Image, ScrollView, Text, View } from "react-native"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAtom } from "jotai"
import Icon from "react-native-vector-icons/FontAwesome5"
import { ThemeContext } from "../../helpers/ThemeContext"
import { languageAtom } from "../../state"
import { FetchDailyStepByStep } from "../../helpers/queries/FetchDailyStepByStep"
import dividerImg from "../../assets/divide.png"
import { Divider } from "./Divider"

export function StepByStepDay3() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)
	const [getLanguageAtom] = useAtom(languageAtom)

	const [data, setData] = useState()
	const [fetchError, setFetchError] = useState()

	FetchDailyStepByStep(setData, getLanguageAtom, setFetchError, "day3")
	const step1 = data?.items?.find(element => element?.fields?.step === "step1")
	const step2 = data?.items?.find(element => element?.fields?.step === "step2")
	const step3 = data?.items?.find(element => element?.fields?.step === "step3")
	const step4 = data?.items?.find(element => element?.fields?.step === "step4")

	return (
		<ScrollView style={theme.dailyOuterContainer}>
			{fetchError ? (
				<Text>Error</Text>
			) : (
				<View style={theme.dailyContainer}>
					<Text style={theme.dailyHeader}>{t("Step by step")}</Text>
					{/* step 1 */}
					<View style={theme.dailySection}>
						<Text style={[theme.centeredText, theme.titleRegular16]}>{t("Step")} 1</Text>
						<Text style={[theme.centeredText, theme.titleExtraBold16]}>{step1?.fields.title}</Text>
						<Text style={[theme.centeredText, theme.titleRegular16]}>
							{step1?.fields.text.content[0].content[0].value}
						</Text>
					</View>
					<Divider divider={dividerImg} label={step3?.fields.text.content[1].data.target.fields.description} />
					{/* step 2 */}
					<View style={theme.dailySection}>
						<Text style={[theme.centeredText, theme.titleRegular16]}>{t("Step")} 2</Text>
						<Text style={[theme.centeredText, theme.titleExtraBold16]}>{step2?.fields.title}</Text>
						<Text style={[theme.centeredText, theme.titleRegular16]}>
							{step2?.fields.text.content[0].content[0].value}
						</Text>
					</View>
					<Divider divider={dividerImg} label={step3?.fields.text.content[1].data.target.fields.description} />
					{/* step 3 */}
					<View style={theme.dailySection}>
						<Text style={[theme.centeredText, theme.titleRegular16]}>{t("Step")} 3</Text>
						<Text style={[theme.centeredText, theme.titleExtraBold16]}>{step3?.fields.title}</Text>
						<Text style={[theme.centeredText, theme.titleRegular16]}>
							{step3?.fields.text.content[0].content[0].value}
						</Text>
						<View style={theme.dailyIllustrationContainer}>
							<Image
								source={{ uri: `https:${step3?.fields.text.content[1].data.target.fields.file.url}` }}
								style={theme.dailyIllustration}
								accessibilityLabel={step3?.fields.text.content[1].data.target.fields.description}
							/>
						</View>
						<View style={theme.dailyDetailedContainer}>
							<View style={theme.dailyDetailed} />
							<View style={theme.dailyDetailedContent}>
								<Text style={[theme.titleFett16, theme.dailyDetailedContentHeader]}>
									{step3?.fields.text.content[2].content[0].value}
								</Text>
								<Text style={[theme.titleRegular16]}>{step3?.fields.text.content[3].content[0].value}</Text>
								<Text style={[theme.titleFett16, theme.dailyDetailedContentHeader]}>
									{step3?.fields.text.content[4].content[0].value}
								</Text>
								<Text style={[theme.titleRegular16]}>{step3?.fields.text.content[5].content[0].value}</Text>
							</View>
						</View>
					</View>
					<Divider divider={dividerImg} label={step3?.fields.text.content[1].data.target.fields.description} />
					{/* step 4 */}
					<View style={theme.dailySection}>
						<Text style={[theme.centeredText, theme.titleRegular16]}>{t("Step")} 4</Text>
						<Text style={[theme.centeredText, theme.titleExtraBold16]}>{step4?.fields.title}</Text>
						<Text style={[theme.centeredText, theme.titleRegular16]}>
							{step4?.fields.text.content[0].content[0].value}
						</Text>

						<View style={theme.dailyDetailedContainer}>
							<View style={theme.dailyDetailed} />
							<View style={theme.dailyDetailedContent}>
								<View style={theme.dailyDetailedContentHeader}>
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint-slash" />
									<Text style={[theme.titleFett16]}>{step4?.fields.text.content[1].content[0].value}</Text>
								</View>
								<Text style={[theme.titleRegular16]}>{step4?.fields.text.content[2].content[0].value}</Text>
								<View style={theme.dailyDetailedContentHeader}>
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Text style={[theme.titleFett16]}>{step4?.fields.text.content[3].content[0].value}</Text>
								</View>
								<Text style={[theme.titleRegular16]}>{step4?.fields.text.content[4].content[0].value}</Text>
								<View style={theme.dailyDetailedContentHeader}>
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Text style={[theme.titleFett16]}>{step4?.fields.text.content[5].content[0].value}</Text>
								</View>
								<Text style={[theme.titleRegular16]}>{step4?.fields.text.content[6].content[0].value}</Text>
								<View style={theme.dailyDetailedContentHeader}>
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Icon style={[theme.titleRegular16, theme.dailyDetailedIcon]} name="tint" />
									<Text style={[theme.titleFett16]}>{step4?.fields.text.content[7].content[0].value}</Text>
								</View>
								<Text style={[theme.titleRegular16]}>{step4?.fields.text.content[8].content[0].value}</Text>
							</View>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	)
}
