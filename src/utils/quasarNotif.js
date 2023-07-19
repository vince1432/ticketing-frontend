import { Notify } from 'quasar'

export const successToast = (message = 'Success!', caption = '') => {
	Notify.create({
		message: message,
		position: 'top-right',
		caption: caption,
		color: 'green',
		icon: 'fa-solid fa-check'
	})
	// Notify.registerType('my-notif', {
	// 	icon: 'announcement',
	// 	progress: true,
	// 	color: 'brown',
	// 	textColor: 'white',
	// 	classes: 'glossy'
	// })
}