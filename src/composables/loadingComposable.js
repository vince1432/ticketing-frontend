import { Loading, QSpinnerGears } from 'quasar';

// add incrementBy param with default value
export default function loadingComposable() {
	/**
	 * show or hide loading screen
	 *
	 * @param {boolean} value
	 * @param {string} value
	 * @return {Function}
	 */
	function showLoading(value, message = "Loading data...") {
    if(value)
			Loading.show({
				message: message,
				pinner: QSpinnerGears
			});
		else
			Loading.hide();
  }
  return { showLoading }
}
