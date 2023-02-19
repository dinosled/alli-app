import { Modal, Pressable, Text, TextInput, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useContext, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import * as SecureStore from "expo-secure-store"
import { changeLanguage } from "i18next"
import {
	bleedingDateAtom,
	languageAtom,
	notificationsAtom,
	pillDateAtom,
	readIsPwSetAtom,
	signedInAtom,
} from "../../state"
import { ThemeContext } from "../../helpers/ThemeContext"

export function Password() {
	const { t, i18n } = useTranslation()
	const theme = useContext(ThemeContext)

	const [getSignedInAtom, setSignedInAtom] = useAtom(signedInAtom)
	const [getIsPwSetAtom] = useAtom(readIsPwSetAtom)

	const [, setPillDateAtom] = useAtom(pillDateAtom)
	const [, setBleedingDateAtom] = useAtom(bleedingDateAtom)
	const [, setNotificationsAtom] = useAtom(notificationsAtom)
	const [, setLanguageAtom] = useAtom(languageAtom)

	const [isSetPwInfoModalVisible, setIsSetPwInfoModalVisible] = useState(false)
	const [isSetPwModalVisible, setIsSetPwModalVisible] = useState(false)
	const [isChangePwInfoModalVisible, setIsChangePwInfoModalVisible] = useState(false)
	const [isOldPwModalVisible, setIsOldPwModalVisible] = useState(false)
	const [isForgottenPwModalVisible, setIsForgottenPwModalVisible] = useState(false)
	const [isUnlockModalVisible, setIsUnlockModalVisible] = useState(!getSignedInAtom && getIsPwSetAtom.data)

	const [inputError, setInputError] = useState(false)

	const [isEdit, setIsEdit] = useState(false)
	const [isDelete, setIsDelete] = useState(false)

	const [pwInput, setPwInput] = useState()
	const [confirmPwInput, setConfirmPwInput] = useState()

	const onEditPress = async () => {
		if (await SecureStore.getItemAsync("pw")) {
			setIsChangePwInfoModalVisible(true)
		} else {
			setIsSetPwInfoModalVisible(true)
		}
	}

	const setPw = async () => {
		if (pwInput !== confirmPwInput) {
			setInputError(true)
			return
		}
		await SecureStore.setItemAsync("pw", pwInput)
		setPwCleanUp()
		setSignedInAtom(false)
		setIsUnlockModalVisible(true)
	}

	const deletePw = async () => {
		setIsDelete(false)
		await SecureStore.deleteItemAsync("pw")
	}

	const retry = () => {
		if (isEdit || isDelete) {
			setIsForgottenPwModalVisible(false)
			setIsOldPwModalVisible(true)
		} else {
			setIsForgottenPwModalVisible(false)
			setIsUnlockModalVisible(true)
		}
	}

	const confirmOldPw = async () => {
		if (pwInput !== (await SecureStore.getItemAsync("pw"))) {
			setInputError(true)
			return
		}
		setPwInput(null)
		setIsOldPwModalVisible(false)
		setInputError(false)
		if (isEdit) {
			setIsSetPwModalVisible(true)
		}
		if (isDelete) {
			deletePw()
		}
	}

	const confirmUnlockPw = async () => {
		if (pwInput !== (await SecureStore.getItemAsync("pw"))) {
			setInputError(true)
			return
		}
		setPwInput(null)
		setIsUnlockModalVisible(false)
		setInputError(false)
		setSignedInAtom(true)
	}

	const setPwCleanUp = () => {
		setPwInput(null)
		setConfirmPwInput(null)
		setInputError(false)
		setIsSetPwModalVisible(false)
		setIsEdit(false)
	}

	const oldPwCleanUp = () => {
		setPwInput(null)
		setInputError(false)
		setIsOldPwModalVisible(false)
		setIsDelete(false)
		setIsEdit(false)
	}

	const reset = () => {
		setIsEdit(false)
		setIsDelete(false)
		setIsForgottenPwModalVisible(false)

		deletePw()
		setPillDateAtom(RESET)
		setBleedingDateAtom(RESET)
		setNotificationsAtom(RESET)
		setLanguageAtom(RESET)
		setSignedInAtom(false)
		changeLanguage("de")
	}

	return (
		<View>
			{/* set New Password Info Modal */}
			<Modal animationType="slide" transparent visible={isSetPwInfoModalVisible}>
				<View style={theme.modalContainer}>
					<View style={theme.modalInnerContainer}>
						<Pressable style={theme.modalCloseButton} onPress={() => setIsSetPwInfoModalVisible(false)}>
							<Icon style={theme.iconSolid} name="window-close" />
						</Pressable>
						<Text style={[theme.titleRegular16, theme.modalText]}>{t("setPwModalText")}</Text>
						<View style={theme.modalButtonContainer}>
							<Pressable style={theme.modalCancelButton} onPress={() => setIsSetPwInfoModalVisible(false)}>
								<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Cancel")}</Text>
							</Pressable>
							<Pressable
								style={theme.modalSubmitButton}
								onPress={() => {
									setIsSetPwInfoModalVisible(false)
									setIsSetPwModalVisible(true)
								}}
							>
								<Text style={theme.titleFett16}>{t("Set password")}</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
			{/* set password Modal */}
			<Modal animationType="slide" transparent visible={isSetPwModalVisible}>
				<View style={[theme.modalFullScreenContainer, theme.modalInnerContainer]}>
					<Text style={[theme.titleRegular16, theme.modalText]}> {t("securePwText")}</Text>
					<TextInput
						secureTextEntry
						value={pwInput}
						placeholder={t("Your password")}
						placeholderTextColor="#000"
						style={[theme.textInput, theme.titleThin16]}
						onChangeText={setPwInput}
					/>
					<TextInput
						secureTextEntry
						value={confirmPwInput}
						placeholder={t("Confirm your password")}
						placeholderTextColor="#000"
						style={[theme.textInput, theme.titleThin16]}
						onChangeText={setConfirmPwInput}
					/>
					{inputError && (
						<View style={theme.inputError}>
							<Text style={theme.titleFett16}>{t("Oops. Try again.")}</Text>
						</View>
					)}
					<View style={theme.modalButtonContainer}>
						<Pressable
							style={theme.modalCancelButton}
							onPress={() => {
								setPwCleanUp()
							}}
						>
							<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Cancel")}</Text>
						</Pressable>
						<Pressable style={theme.modalSubmitButton} onPress={() => setPw()}>
							<Text style={theme.titleFett16}>{t("Set password")}</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			{/* change Password Info Modal */}
			<Modal animationType="slide" transparent visible={isChangePwInfoModalVisible}>
				<View style={theme.modalContainer}>
					<View style={theme.modalInnerContainer}>
						<Pressable style={theme.modalCloseButton} onPress={() => setIsChangePwInfoModalVisible(false)}>
							<Icon style={theme.iconSolid} name="window-close" />
						</Pressable>
						<Text style={[theme.titleRegular16, theme.modalText]}>{t("changePwModalText")}</Text>

						<View style={theme.modalButtonContainer}>
							<Pressable
								style={theme.modalSubmitButton}
								onPress={() => {
									setIsChangePwInfoModalVisible(false)
									setIsOldPwModalVisible(true)
									setIsEdit(true)
								}}
							>
								<Text style={theme.titleFett16}>{t("Change")}</Text>
							</Pressable>
							<Pressable
								style={theme.modalSubmitButton}
								onPress={() => {
									setIsChangePwInfoModalVisible(false)
									setIsOldPwModalVisible(true)
									setIsDelete(true)
								}}
							>
								<Text style={theme.titleFett16}>{t("Delete")}</Text>
							</Pressable>
						</View>
						<View style={theme.modalButtonContainer}>
							<Pressable style={theme.modalCancelButton} onPress={() => setIsChangePwInfoModalVisible(false)}>
								<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Cancel")}</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
			{/* old Password Modal */}
			<Modal animationType="slide" transparent visible={isOldPwModalVisible}>
				<View style={[theme.modalFullScreenContainer, theme.modalInnerContainer]}>
					<Text style={[theme.titleRegular16, theme.modalText]}> {t("Type in your old password.")}</Text>
					<TextInput
						secureTextEntry
						value={pwInput}
						placeholder={t("Your password")}
						placeholderTextColor="#000"
						style={[theme.textInput, theme.titleThin16]}
						onChangeText={setPwInput}
					/>

					{inputError && (
						<View style={theme.inputError}>
							<Text style={theme.titleFett16}>{t("Oops. Try again.")}</Text>
						</View>
					)}
					<View style={theme.modalButtonContainer}>
						<Pressable
							style={theme.modalSubmitButton}
							onPress={() => {
								confirmOldPw()
							}}
						>
							<Text style={theme.titleFett16}>{t("Confirm")}</Text>
						</Pressable>
					</View>
					<View style={theme.modalButtonContainer}>
						<Pressable
							style={theme.modalCancelButton}
							onPress={() => {
								oldPwCleanUp()
							}}
						>
							<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Cancel")}</Text>
						</Pressable>
						<Pressable
							style={theme.modalCancelButton}
							onPress={() => {
								setPwInput(null)
								setInputError(false)
								setIsOldPwModalVisible(false)
								setIsForgottenPwModalVisible(true)
							}}
						>
							<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Password forgotten")}</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			{/* forgotten pw Modal */}
			<Modal animationType="slide" transparent visible={isForgottenPwModalVisible}>
				<View style={theme.modalContainer}>
					<View style={theme.modalInnerContainer}>
						{(isEdit || isDelete) && (
							<Pressable style={theme.modalCloseButton} onPress={() => setIsForgottenPwModalVisible(false)}>
								<Icon style={theme.iconSolid} name="window-close" />
							</Pressable>
						)}
						<Text style={[theme.titleRegular16, theme.modalText]}>{t("ForgottenPwModalText")}</Text>

						<View style={theme.modalButtonContainer}>
							<Pressable
								style={theme.modalSubmitButton}
								onPress={() => {
									retry()
								}}
							>
								<Text style={theme.titleFett16}>{t("Enter password")}</Text>
							</Pressable>
							<Pressable
								style={theme.modalSubmitButton}
								onPress={() => {
									reset()
								}}
							>
								<Text style={theme.titleFett16}>{t("Reset app")}</Text>
							</Pressable>
						</View>
						{(isEdit || isDelete) && (
							<View style={theme.modalButtonContainer}>
								<Pressable
									style={theme.modalCancelButton}
									onPress={() => {
										setIsForgottenPwModalVisible(false)
										setIsDelete(false)
										setIsEdit(false)
									}}
								>
									<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Cancel")}</Text>
								</Pressable>
							</View>
						)}
					</View>
				</View>
			</Modal>
			{/* Unlock Modal */}
			<Modal animationType="slide" transparent visible={isUnlockModalVisible}>
				<View style={[theme.modalFullScreenContainer, theme.modalInnerContainer]}>
					<Text style={[theme.headerFett24, theme.modalText]}> {t("This app has password protection")}</Text>
					<TextInput
						secureTextEntry
						value={pwInput}
						placeholder={t("Your password")}
						placeholderTextColor="#000"
						style={[theme.textInput, theme.titleThin16]}
						onChangeText={setPwInput}
					/>

					{inputError && (
						<View style={theme.inputError}>
							<Text style={theme.titleFett16}>{t("Oops. Try again.")}</Text>
						</View>
					)}
					<View style={theme.modalButtonContainer}>
						<Pressable
							style={theme.modalCancelButton}
							onPress={() => {
								setPwInput(null)
								setIsUnlockModalVisible(false)
								setInputError(false)
								setIsForgottenPwModalVisible(true)
							}}
						>
							<Text style={[theme.titleFett16, theme.underlinedText]}>{t("Password forgotten")}</Text>
						</Pressable>
						<Pressable
							style={theme.modalSubmitButton}
							onPress={() => {
								confirmUnlockPw()
							}}
						>
							<Text style={theme.titleFett16}>{t("Confirm")}</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{!(!getSignedInAtom && getIsPwSetAtom.data) && (
				<View style={[theme.accordionHeadContainer, theme.accordionContainer]}>
					<View>
						<Text style={theme.titleFett16}>{t("Password")}</Text>
					</View>
					<Pressable
						onPress={() => {
							onEditPress()
						}}
					>
						<Icon style={theme.iconSolid} name="pencil-alt" />
					</Pressable>
				</View>
			)}
		</View>
	)
}
