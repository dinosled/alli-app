import { Pressable, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext, useState } from "react"
import { DateTimePickerModal } from "react-native-modal-datetime-picker"
import { useAtom } from "jotai"
import {
	languageAtom,
	readBleedingDateAtom,
	readPillDateAtom,
	writeBleedingDateAtom,
	writePillDateAtom,
} from "../../state"
import { ThemeContext } from "../../helpers/ThemeContext"

export const EditPillIntake = ({
	setEdit,
	isIntakePickerVisible,
	setIntakePickerVisibility,
	isBleedingPickerVisible,
	setBleedingPickerVisibility,
}) => {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [, setPillDateAtom] = useAtom(writePillDateAtom)
	const [getPillDateAtom] = useAtom(readPillDateAtom)
	const [, setBleedingDateAtom] = useAtom(writeBleedingDateAtom)
	const [getBleedingDateAtom] = useAtom(readBleedingDateAtom)
	const [getLanguageAtom] = useAtom(languageAtom)

	const [intakePickerDate, setIntakePickerDate] = useState(new Date())
	const [bleedingPickerDate, setBleedingPickerDate] = useState(new Date())

	const currentDate = new Date().toLocaleDateString(getLanguageAtom.id, {
		weekday: "long",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	})

	const onIntakePickerConfirm = selectedDate => {
		setIntakePickerDate(selectedDate)
		setIntakePickerVisibility(false)
	}

	const onBleedingPickerConfirm = selectedDate => {
		setBleedingPickerDate(selectedDate)
		setBleedingPickerVisibility(false)
	}

	const intakeSubmit = () => {
		calculateBleeding()
		setPillDateAtom(
			intakePickerDate.toLocaleDateString(getLanguageAtom.id, {
				weekday: "long",
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			}),
		)
		setEdit(false)
	}

	const bleedingSubmit = () => {
		setBleedingDateAtom(
			bleedingPickerDate.toLocaleDateString(getLanguageAtom.id, {
				weekday: "long",
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			}),
		)
		setEdit(false)
	}

	const calculateBleeding = () => {
		const ms = intakePickerDate.getTime() + 172800000
		const dateOfBleeding = new Date(ms)
		setBleedingDateAtom(
			dateOfBleeding.toLocaleDateString(getLanguageAtom.id, {
				weekday: "long",
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			}),
		)
	}

	return (
		<View>
			<View style={theme.dateEditContainer}>
				<View>
					<Text style={theme.titleRegular16}>{t("Date and time of pill intake:")}</Text>
					<Pressable
						style={theme.dateEditButton}
						onPress={() => {
							setIntakePickerVisibility(true)
						}}
					>
						<Text style={[theme.titleThin16, theme.centeredText]}>
							{getPillDateAtom.data ? getPillDateAtom.data : currentDate}
						</Text>
					</Pressable>
					<View>
						<DateTimePickerModal
							style={theme.dateTimePicker}
							isVisible={isIntakePickerVisible}
							mode="datetime"
							onConfirm={onIntakePickerConfirm}
							onHide={() => {
								intakeSubmit()
							}}
							onCancel={() => {
								setIntakePickerVisibility(false)
							}}
						/>
					</View>
				</View>
				{getBleedingDateAtom.data && (
					<View style={theme.bleedingEdit}>
						<Text style={theme.titleRegular16}>{t("Start of bleeding:")}</Text>
						<Pressable
							style={theme.dateEditButton}
							onPress={() => {
								setBleedingPickerVisibility(true)
							}}
						>
							<Text style={[theme.titleThin16, theme.centeredText]}>{getBleedingDateAtom.data}</Text>
						</Pressable>
						<View>
							<DateTimePickerModal
								style={theme.dateTimePicker}
								isVisible={isBleedingPickerVisible}
								mode="datetime"
								onConfirm={onBleedingPickerConfirm}
								onHide={() => {
									bleedingSubmit()
								}}
								onCancel={() => {
									setBleedingPickerVisibility(false)
								}}
							/>
						</View>
					</View>
				)}
				<Pressable
					style={theme.cancelEditButton}
					onPress={() => {
						setEdit(false)
					}}
				>
					<Text style={[theme.titleFett16, theme.centeredText, theme.underlinedText]}>{t("Cancel")}</Text>
				</Pressable>
			</View>
		</View>
	)
}
