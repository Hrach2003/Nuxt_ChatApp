<template>
	<v-layout column justify-center align-center>
		<v-flex xs12 sm8>
			<v-card min-width="400px">
				<v-snackbar v-model="snackbar" :timeout="6000" top>
					{{ message }}
					<v-btn @click="snackbar = false">Close</v-btn>
				</v-snackbar>
				<v-card-title>
					<h2>Awesome Chat</h2>
				</v-card-title>
				<v-card-text>
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-text-field
							v-model="name"
							@keypress.enter="submit"
							:counter="16"
							:rules="nameRules"
							label="Your Name"
							required
						></v-text-field>

						<v-text-field
							v-model="room"
							@keypress.enter="submit"
							:rules="roomRules"
							label="Choose room"
							required
						></v-text-field>

						<v-btn :disabled="!valid" color="promary" class="mr-4" @click="submit">SIGN IN</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
	layout: "empty",
	head: {
		title: "Welcome to NUXT-CHAT"
	},
	data() {
		return {
			snackbar: false,
			message: "",
			valid: true,
			name: "",
			nameRules: [
				v => !!v || "Name is required",
				v => (v && v.length <= 16) || "Name must be less than 10 characters"
			],
			room: "",
			roomRules: [v => !!v || "Room is required"]
		};
	},
	mounted() {
		if (this.$route.query.message === "noUser") {
			this.message = "Register at first";
		} else if ((this.$route.query.message = "leftChat")) {
			this.message = "You left the room";
		}

		this.snackbar = !!this.message;
	},
	methods: {
		...mapMutations(["setUser"]),
		submit() {
			if (this.$refs.form.validate()) {
				const user = {
					name: this.name,
					room: this.room
				};
				this.$socket.emit("userJoined", user, data => {
					if (typeof data === "string") {
						console.error(data);
					} else {
						user.id = data.userId;
						this.setUser(user);
						this.$router.push("/chat");
					}
				});
			}
		}
	},
	sockets: {
		connect() {
			console.log("client io connected");
		}
	}
};
</script>
