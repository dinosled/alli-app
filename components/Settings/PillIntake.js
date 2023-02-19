import { Modal, Pressable, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
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

export function PillIntake() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [, setPillDateAtom] = useAtom(writePillDateAtom)
	const [getPillDateAtom] = useAtom(readPillDateAtom)

	const [, setBleedingDateAtom] = useAtom(writeBleedingDateAtom)
	const [getBleedingDateAtom] = useAtom(readBleedingDateAtom)

	const [getLanguageAtom, setLanguageAtom] = useAtom(languageAtom)

	const [edit, setEdit] = useState(false)
	const [isIntakePickerVisible, setIntakePickerVisibility] = useState(false)
	const [isBleedingPickerVisible, setBleedingPickerVisibility] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)
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
		// 48h -> 172800000 ms
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

	const buildInfo = () => (
		<View style={theme.pillIntakeContainer}>
			<View style={theme.pillIntakeDate}>
				<Text style={theme.titleRegular16}>{t("Date and time of pill intake:")}</Text>
				<Text style={theme.titleFett16}>
					<Text>{getPillDateAtom.data}</Text>
				</Text>
			</View>
			<View>
				<Text style={theme.titleRegular16}>{t("Expected start of bleeding:")}</Text>
				<Text style={theme.titleFett16}>{getBleedingDateAtom.data}</Text>
			</View>
		</View>
	)

	const buildEdit = () => (
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

	return (
		<>
			<View>
				<Modal
					animationType="slide"
					transparent
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(false)
					}}
				>
					<View style={theme.modalContainer}>
						<View style={theme.modalInnerContainer}>
							<Pressable style={theme.modalCloseButton} onPress={() => setModalVisible(false)}>
								<Icon style={theme.iconSolid} name="window-close" />
							</Pressable>
							<Text style={[theme.titleRegular16, theme.modalText]}>
								Hier noch aussagekräftigen Hinweistext einfügen
							</Text>
							<View style={theme.modalButtonContainer}>
								<Pressable style={theme.modalCancelButton} onPress={() => setModalVisible(false)}>
									<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Cancel")}</Text>
								</Pressable>
								<Pressable
									style={theme.modalSubmitButton}
									onPress={() => {
										setModalVisible(false)
										setEdit(true)
									}}
								>
									<Text style={theme.titleFett16}>{t("Proceed")}</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
			</View>
			<View>
				<View style={[theme.accordionHeadContainer, theme.accordionContainer]}>
					<View>
						<Text style={theme.titleFett16}>{t("Pill Intake")}</Text>
					</View>
					<Pressable disabled={edit} onPress={() => (getPillDateAtom.data ? setModalVisible(true) : setEdit(true))}>
						<Icon style={theme.iconSolid} name="pencil-alt" />
					</Pressable>
				</View>
				{/* if bearbeitungsmode: show bearbeitungsansicht */}
				{/* if no bearbeitungsmode and dateState is null, show info screen */}
				{/* if dateState and not bearbeitungsmode: show info screen */}
				{!edit && getPillDateAtom.data ? buildInfo() : !edit && !getPillDateAtom.data ? null : buildEdit()}
			</View>
		</>
	)
}
