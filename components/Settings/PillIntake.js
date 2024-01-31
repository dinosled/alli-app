import { Modal, Pressable, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import { useAtom } from "jotai"
import { readPillDateAtom } from "../../state"
import { ThemeContext } from "../../helpers/ThemeContext"
import { InfoPillIntake } from "./InfoPillIntake"
import { EditPillIntake } from "./EditPillIntake"

export const PillIntake = () => {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [getPillDateAtom] = useAtom(readPillDateAtom)

	const [edit, setEdit] = useState(false)
	const [isIntakePickerVisible, setIntakePickerVisibility] = useState(false)
	const [isBleedingPickerVisible, setBleedingPickerVisibility] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)

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
							<Text style={[theme.titleRegular16, theme.modalText]}>Todo: Text</Text>
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
				{!edit && getPillDateAtom.data ? (
					<InfoPillIntake />
				) : !edit && !getPillDateAtom.data ? null : (
					<EditPillIntake
						setEdit={setEdit}
						isIntakePickerVisible={isIntakePickerVisible}
						setIntakePickerVisibility={setIntakePickerVisibility}
						isBleedingPickerVisible={isBleedingPickerVisible}
						setBleedingPickerVisibility={setBleedingPickerVisibility}
					/>
				)}
			</View>
		</>
	)
}
