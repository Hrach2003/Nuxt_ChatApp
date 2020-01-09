export default function({ store, redirect }) {
  console.log();
  if (typeof store.state.user !== "object") {
    redirect("/?message=noUser");
  }
}
