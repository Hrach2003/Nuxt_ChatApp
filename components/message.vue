<template>
	<div style="align-content: flex-end;">
		<div v-if="name === 'admin'" class="system">
			<p class="text-center">{{ text }}</p>
			<hr />
		</div>
		<div v-else class="wrap">
			<v-card class="mes" :class="{owner}">
				<small>
					<strong>{{ name }}</strong>
				</small>
				<p>{{ text }}</p>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		text: String,
		owner: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
.system {
	margin-bottom: 1rem;
}
.system p {
	margin-bottom: 1rem;
}

.wrap {
	display: flex;
	flex-direction: column;
}

.mes {
	padding: 5px 15px;
	width: 60%;
	margin: 0 1rem;
	box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
	border-radius: 4px;
	background: gray darken-2;
	border: 1px solid gray lighten-2;
	position: relative;
	margin-bottom: 1rem;
}
.mes p {
	margin-bottom: 0;
}

.owner {
	border: 1px solid gray darken-2;
	background: #fff;
	color: #000;
	align-self: flex-end;
}
</style>
