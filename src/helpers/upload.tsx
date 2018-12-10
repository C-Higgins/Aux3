import firebase from '@/index'
import * as mm from 'music-metadata-browser'
import {Metadata} from 'types'
import {IPicture} from 'music-metadata/lib/type'

const storage = firebase.storage()
const db = firebase.firestore()

export default class Song {

	file: File
	roomId: string
	isPending: boolean
	key: string | null
	picture: IPicture | null

	private metadata: Metadata

	constructor(file: File, roomId: string) {

		this.file = file
		this.roomId = roomId
		this.isPending = true
		this.key = null

	}

	get base64Image(): string | null {
		if (this.picture) {
			return `data:image/${this.picture.format};base64,${btoa(uint8ToString(this.picture.data))}`
		}
		return null
	}

	getMetadata(): Promise<Metadata> {
		if (this.metadata) {
			return Promise.resolve(this.metadata)
		}

		return mm.parseBlob(this.file, {duration: true}).then(metadata => {
			this.metadata = {
				...metadata,
				key: this.key,
				name: this.file.name,
				pending: this.isPending,
			}
			return this.metadata
		})
	}

	async upload() {
		// Start file upload
		const uploadTask = storage.ref('songs/' + this.file.name).put(this.file)

		const data = await this.getMetadata()
		this.picture = data.common.picture ? data.common.picture[0] : null

		// const newRoomRef = firebase.firestore().collection('room_data').doc()
		// const newRoomId = newRoomRef.id


		const dataRef = db.collection('song_data').doc(this.roomId).collection('songs').doc()
		this.key = dataRef.id
		dataRef.set(await this.getMetadata())
		// dataRef.onDisconnect().remove()

		// Tell the database you're uploading something
		// const sUploadedRef = db.ref('room_data/' + this.roomId + '/songs/uploaded/' + this.key)
		// const sPendingRef = db.ref('room_data/' + this.roomId + '/songs/pending/' + this.key)
		// sPendingRef.onDisconnect().remove()
		// sPendingRef.set(true)

		// Upload art if there is any
		if (this.picture) {

			storage.ref(`art/${this.file.name}.${this.picture.format}`).put(this.picture.data)
			.then(ss =>,
				// Put the art URL into the song data
				// storage.ref(`song_data/${this.roomId}/${this.key}/albumURL`).set(ss.downloadURL),
			)
		}

		// uploadTask.then(ss => {
		// 	// Give the database the URL
		// 	db.ref('song_urls/' + this.key).set(ss.downloadURL)
		//
		// 	// Tell the db it is no longer pending
		// 	sPendingRef.remove()
		// 	sUploadedRef.set(true)
		// 	dataRef.update({pending: false})
		//
		// 	//Turn off disconnection listener
		// 	sPendingRef.onDisconnect().cancel()
		// 	dataRef.onDisconnect().cancel()
		//
		// 	this.isPending = false
		// 	this.file = 'done'
		// 	pictureFile = 'done'
		// })
	}
}

function uint8ToString(u8a: Uint8Array) {
	const CHUNK_SZ = 0x8000
	const c = []
	for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
		c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)))
	}
	return c.join('')
}
