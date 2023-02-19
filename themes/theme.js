const colors = {
	black: "#000000",
	rose: "#F7B3AC",
	grey: "#F5F5F5",
	darkGrey: "#D9D9D9",
	white: "#FFFFFF",
}

const spacing = {
	s: 8,
	m: 16,
	l: 24,
	xl: 32,
}

const fontSize = {
	s: 16,
	m: 24,
}

const fontWeight = {
	normal: "400",
	bold: "600",
	extraBold: "900",
}

const border = {
	width: 1,
	color: colors.black,
}

// styles for accordion component
const accordion = {
	accordionContainer: {
		// padding: spacing.m,
		borderTopWidth: border.width,
		borderColor: border.color,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		display: "flex",
	},
	accordionLastContainer: {
		borderBottomWidth: border.width,
	},
	accordionBorderContainer: {
		borderRightWidth: border.width,
		borderLeftWidth: border.width,
		borderColor: border.color,
	},
	// used for additional information in header (right)
	accordionHeadContainer: {
		padding: spacing.m,
	},
	accordionHeaderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		display: "flex",
		paddingRight: spacing.m,
		flexGrow: 1,
	},
	accordionQuestionText: {
		flexGrow: 1,
		flex: 1,
		flexWrap: "wrap",
		paddingRight: spacing.m,
	},
	accordionBodyText: {
		padding: spacing.m,
	},
}

const modal = {
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.m,
	},

	modalFullScreenContainer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		paddingTop: "20%",
	},

	modalInnerContainer: {
		padding: spacing.m,
		backgroundColor: colors.grey,
		borderWidth: border.width,
		borderColor: border.color,
	},

	modalText: {
		paddingTop: spacing.m,
		paddingRight: spacing.m,
		paddingBottom: spacing.m,
		paddingLeft: spacing.m,
	},

	modalButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		display: "flex",
		flexWrap: "wrap",
		marginLeft: -spacing.m,
		marginRight: -spacing.m,
	},

	modalSubmitButton: {
		marginTop: spacing.m,
		padding: spacing.m,
		borderWidth: border.width,
		borderColor: border.color,
		backgroundColor: colors.white,
		marginLeft: spacing.m / 2,
		marginRight: spacing.m / 2,
	},

	modalCancelButton: {
		marginTop: spacing.m,
		padding: spacing.m,
	},

	modalCloseButton: {
		marginLeft: "auto",
	},
}

const textStyles = {
	headerFett24: {
		fontFamily: "Rubik-SemiBold",
		fontSize: 24,
		// fontWeight: '600'
	},
	titleFett16: {
		fontFamily: "Rubik-Medium",
		fontSize: 16,
		// fontWeight: '500'
	},
	titleExtraBold16: {
		fontFamily: "Rubik-Bold",
		fontSize: 16,
		// fontWeight: '700'
	},
	titleRegular16: {
		fontFamily: "Rubik-Regular",
		fontSize: 16,
		// fontWeight: '400'
	},
	titleThin16: {
		fontFamily: "Rubik-Light",
		fontSize: 16,
		// fontWeight: '300'
	},
	tabBarRegular8: {
		fontFamily: "Rubik-Regular",
		fontSize: 8,
		// fontWeight: '400'
	},
	iconSolid: {
		fontSize: 24,
		fontWeight: "900",
	},
	iconRegular: {
		fontSize: 24,
		fontWeight: "400",
	},
	centeredText: {
		textAlign: "center",
	},
	underlinedText: {
		textDecorationLine: "underline",
		textDecorationStyle: "solid",
		textDecorationColor: colors.black,
	},
}

const pillIntake = {
	pillIntakeContainer: {
		backgroundColor: colors.grey,
		padding: spacing.m,
		display: "flex",
		flexDirection: "column",
		borderTopWidth: border.width,
		borderColor: border.color,
	},

	pillIntakeDate: {
		paddingBottom: spacing.m,
	},

	dateEditContainer: {
		backgroundColor: colors.grey,
		padding: spacing.m,
		borderTopWidth: border.width,
		borderColor: border.color,
	},
	dateEditButton: {
		borderWidth: 1,
		borderColor: border.color,
		padding: spacing.m,
		backgroundColor: colors.white,
		marginTop: spacing.s,
	},

	cancelEditButton: {
		paddingTop: 16,
	},

	bleedingEdit: {
		paddingTop: 16,
	},
}

const checkBoxSet = {
	checkboxOptionContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		display: "flex",
		width: "100%",
		borderBottomWidth: border.width,
		borderColor: border.color,
		paddingBottom: spacing.m,
		paddingTop: spacing.m,
	},

	lastCheckboxOptionContainer: {
		borderBottomWidth: 0,
	},

	checkboxLabel: {
		paddingRight: spacing.m,
	},
	checkbox: {
		paddingRight: spacing.m,
	},
	checkboxContainer: {
		backgroundColor: colors.grey,
	},
}

const lexicon = {
	lexiconContainer: {
		padding: spacing.m,
		alignItems: "center",
	},
	lexiconOuterContainer: {
		backgroundColor: colors.white,
	},
	lexiconImg: {
		height: 71,
		width: 71,
		borderRadius: 40,
		borderColor: "black",
		borderWidth: 1,
	},
	lexiconTitle: {
		marginTop: spacing.m,
	},
	lexiconSubtitle: {
		marginTop: spacing.m / 2,
	},
	lexiconText: {
		marginTop: spacing.m,
		textAlign: "center",
	},
}

const daily = {
	dailyContainer: {
		padding: spacing.l,
	},
	dailyOuterContainer: {
		backgroundColor: colors.white,
		flex: 1,
	},
	dailyParagraph: {
		textAlign: "center",
		paddingTop: spacing.m,
	},
	dailyHeader: {
		...textStyles.titleFett16,
		fontWeight: "700",
		textAlign: "center",
		paddingBottom: spacing.s,
	},
	dailySection: {
		paddingTop: spacing.m,
		paddingBottom: spacing.m,
	},
	dailyListItem: {
		paddingTop: spacing.m,
		flexDirection: "row",
	},
	dailyBulletPoint: {
		height: 8,
		width: 8,
		borderRadius: 40,
		backgroundColor: "black",
		marginTop: 6,
	},
	dailyListText: {
		paddingLeft: spacing.s,
	},
	dailyDividerContainer: {
		alignItems: "center",
	},
	dailyDividerImg: {
		width: 50,
		height: 50,
	},
	dailyIllustrationContainer: {
		alignItems: "center",
		padding: spacing.m,
	},
	dailyIllustration: {
		width: 200,
		height: 200,
	},
	dailyDetailedContainer: {
		flexDirection: "row",
		paddingTop: spacing.m,
	},
	dailyDetailed: {
		backgroundColor: "#F7B3AC",
		width: 6,
		borderRadius: 20,
		height: "100%",
	},
	dailyDetailedContent: {
		paddingLeft: spacing.m,
		paddingBottom: spacing.m,
	},
	dailyDetailedContentHeader: {
		flexDirection: "row",
		paddingTop: spacing.m,
	},
	dailyDetailedIcon: {
		paddingRight: spacing.s,
	},
	dailyAccordionBody: {
		paddingLeft: spacing.m,
		paddingRight: spacing.m,
		paddingTop: spacing.m,
	},
	dailyAccordionText: {
		paddingBottom: spacing.m,
	},
	dailyText: {
		textAlign: "center",
		paddingTop: spacing.s,
		paddingBottom: spacing.m,
	},
}

const dailyTabBarBottom = {
	dailyTabBarBottomContainer: { flexDirection: "row", justifyContent: "center", backgroundColor: "white" },
	dailyTabBarBottomIndicator: { width: "auto", borderWidth: 1, borderColor: "white" },
	dailyTabBarBottom: { backgroundColor: "white", width: "auto" },
	dailyTabBarBottomLabel: { color: "black" },
	dailyTabBarBottomTab: { width: "auto" },
	dailyTabBarBottomActive: {
		height: 12,
		width: 12,
		borderRadius: 40,
		borderColor: "black",
		borderWidth: 1,
		backgroundColor: "#F7B3AC",
	},
	dailyTabBarBottomInactive: {
		height: 12,
		width: 12,
		borderRadius: 40,
		borderColor: "black",
		borderWidth: 1,
		backgroundColor: "white",
	},
}

// application theme
export const theme = {
	...accordion,
	...textStyles,
	...modal,
	...pillIntake,
	...checkBoxSet,
	...lexicon,
	...daily,
	...dailyTabBarBottom,

	section: {
		backgroundColor: "white",
	},

	button: {
		padding: spacing.m,
		borderWidth: border.width,
		borderColor: border.color,
		backgroundColor: colors.white,
		marginTop: spacing.m / 2,
		marginBottom: spacing.m / 2,
	},

	buttonContainer: {
		flexDirection: "column",
		justifyContent: "center",
		display: "flex",
		padding: spacing.m,
		marginTop: -spacing.m / 2,
		marginBottom: -spacing.m / 2,
	},

	inputError: {
		padding: spacing.m,
		backgroundColor: colors.darkGrey,
		borderColor: border.color,
		borderLeftWidth: border.width,
		borderRightWidth: border.width,
		borderBottomWidth: border.width,
		width: "100%",
		marginTop: -spacing.m,
		marginBottom: spacing.m,
	},

	textInput: {
		padding: spacing.m,
		backgroundColor: colors.white,
		borderColor: border.color,
		borderWidth: border.width,
		width: "100%",
		marginBottom: spacing.m,
	},

	notificationsContainer: {
		padding: spacing.m,
		borderTopWidth: border.width,
		borderColor: border.color,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		display: "flex",
	},

	greyBackground: {
		backgroundColor: colors.grey,
	},

	text: {
		fontSize: fontSize.s,
		fontFamily: "Rubik-Regular",
	},
	bodyContainer: {
		paddingBottom: spacing.m,
		backgroundColor: colors.white,
	},
	head: {
		fontWeight: fontWeight.bold,
		fontSize: fontSize.m,
	},
	headContainer: {
		padding: spacing.m,
		paddingTop: spacing.xl,
		borderBottomWidth: border.width,
		borderBottomColor: border.color,
	},
	tabIconContainer: {
		borderColor: border.color,
		borderWidth: border.width,
		borderRadius: 50,
		height: 24,
		width: 24,
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
	},
	tabIconContainerFocused: {
		backgroundColor: colors.rose,
	},
	faq: {
		header: {
			padding: spacing.m,
			fontSize: fontSize.s,
			fontWeight: fontWeight.bold,
		},
		content: {
			paddingLeft: spacing.m,
			paddingRight: spacing.m,
		},
	},
	icon: {
		fontWeight: fontWeight.extraBold,
		fontSize: fontSize.m,
	},
}
