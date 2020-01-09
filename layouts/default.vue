<template>
	<v-app app dark>
		<v-navigation-drawer app clipped v-model="drawer" mobile-break-point="650">
			<v-list subheader>
				<v-subheader>List of people in this room</v-subheader>

				<v-list-item v-for="u in users" :key="u.id" @click.prevent>
					<!-- <v-list-item-avatar>
						<v-img :src="item.avatar"></v-img>
					</v-list-item-avatar>-->
					<v-list-item-content>
						<v-list-item-title v-text="u.name"></v-list-item-title>
					</v-list-item-content>

					<v-list-item-icon>
						<v-icon :color="u.id === user.id ? 'white' : 'grey darken-1'">mdi-message</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app clipped-left>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>CHAT ROOM {{ user.room }}</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-toolbar-items>
				<v-btn text @click="exit">
					<v-icon>mdi-arrow-left-bold</v-icon>
					<span>Left room</span>
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-content>
			<div fluid style="height: 100%">
				<nuxt />
			</div>
		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
	data() {
		return {
			drawer: true
		};
	},
	methods: {
		...mapMutations(["clearData"]),
		exit() {
			this.$socket.emit("userLeft", this.user.id, () => {
				this.clearData();
				this.$router.push("/?message=leftChat");
			});
		}
	},
	computed: {
		...mapState(["user", "users"])
	}
};
</script>
