<template>
	<v-app dark style="overflow-y: hidden">
		<v-container class="mx-auto text-center d-flex justify-center">
			<h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
			<h1 v-else>{{ otherError }}</h1>
			<v-btn to="/">Home Page</v-btn>
		</v-container>
	</v-app>
</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		return {
			title
		};
	},
	data() {
		return {
			pageNotFound: "404 Not Found",
			otherError: "An error occurred"
		};
	}
};
</script>

<style scoped>
h1 {
	font-size: 20px;
}
</style>
