<template>
	<div class="c-wrap">
		<div class="c-chat mb-12" ref="block">
			<Message
				style="width: 100%"
				v-for="m in messages"
				:key="m.text"
				:name="m.name"
				:text="m.text"
				:owner="m.id === user.id"
			/>
		</div>

		<div class="c-form">
			<ChatForm />
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/message";
import ChatForm from "@/components/ChatForm";

export default {
	middleware: ["chat"],
	head() {
		return {
			title: `Room ${this.user.room} `
		};
	},
	computed: {
		...mapState(["user", "messages"])
	},
	watch: {
		messages() {
			setTimeout(() => {
				this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
			}, 0);
		}
	},
	components: {
		Message,
		ChatForm
	}
};
</script>

<style scoped>
.c-wrap {
	height: 100%;
	position: relative;
	overflow: hidden;
}

.c-form {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 1rem;
	height: 70px;
	background: #212121;
}

.c-chat {
	display: flex;
	flex-direction: column;

	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 20px;
	padding: 1rem;
	overflow-y: auto;
}
</style>
