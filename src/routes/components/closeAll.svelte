<script lang="ts">
	import {
		toggleGamePopup,
		toggleHighscoresPopup,
		toggleSettingsPopup,
		toggleUpdateNotes
	} from '../../lib/toggleWindows';

	function closeAll(): void {
		toggleGamePopup(null, true);
		toggleSettingsPopup(null, true);
		toggleUpdateNotes(null, true);
		toggleHighscoresPopup(null, true);
	}
</script>

<button on:click={closeAll} title="Close all windows" class="text-xl order-1"> x </button>
