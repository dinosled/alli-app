import AsyncStorage from "@react-native-async-storage/async-storage"
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils"
import { atom, useAtom } from "jotai"
import * as SecureStore from "expo-secure-store"
import CryptoJS from "crypto-js"

const storage = createJSONStorage(() => AsyncStorage)

export const pillDateAtom = atomWithStorage("pillDateAtom", null, { ...storage, delayInit: true })
export const bleedingDateAtom = atomWithStorage("bleedingDateAtom", null, { ...storage, delayInit: true })

export const notificationsAtom = atomWithStorage("notificationsAtom", false, { ...storage, delayInit: true })
export const languageAtom = atomWithStorage(
	"languageAtom",
	{ id: "de", title: "German" },
	{ ...storage, delayInit: true },
)
export const signedInAtom = atom(false)

export const readIsPwSetAtom = loadable(atom(async () => !!(await SecureStore.getItemAsync("pw"))))

export const writePillDateAtom = atom(null, async (get, set, payload) => {
	const key = await getEncryptrionKey()
	const encrypted = CryptoJS.AES.encrypt(payload.toString(), key).toString()
	set(pillDateAtom, encrypted)
})

export const readPillDateAtom = loadable(
	atom(async get => {
		const key = await getEncryptrionKey()
		const decrypted = CryptoJS.AES.decrypt(get(pillDateAtom), key).toString(CryptoJS.enc.Utf8)
		return decrypted
	}),
)

export const writeBleedingDateAtom = atom(null, async (get, set, payload) => {
	const key = await getEncryptrionKey()
	const encrypted = CryptoJS.AES.encrypt(payload.toString(), key).toString()
	set(bleedingDateAtom, encrypted)
})

export const readBleedingDateAtom = loadable(
	atom(async get => {
		const key = await getEncryptrionKey()
		const decrypted = CryptoJS.AES.decrypt(get(bleedingDateAtom), key).toString(CryptoJS.enc.Utf8)
		return decrypted
	}),
)

const getEncryptrionKey = async () => {
	const key = await SecureStore.getItemAsync("encryption_key")
	if (key) {
		return key
	}
	const generatedKey = Math.random().toString(36)
	await SecureStore.setItemAsync("encryption_key", generatedKey)
}
