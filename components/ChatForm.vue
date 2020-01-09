<template>
	<v-flex>
		<v-text-field
			color="white"
			label="Your message"
			outlined
			v-model="text"
			@keydown.enter="send"
			append-icon="mdi-send"
			@click:append="send"
		/>
	</v-flex>
</template>

<script>
export default {
	data() {
		return {
			text: ""
		};
	},
	methods: {
		send() {
			this.$socket.emit(
				"createMessage",
				{
					text: this.text,
					id: this.$store.state.user.id
				},
				data => {
					if (typeof data === "string") {
						console.error(data);
					} else {
						this.text = "";
					}
				}
			);
		}
	}
};
</script>

<style>
</style>
