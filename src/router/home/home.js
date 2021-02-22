import Home from "@/views/home/Home.vue";
export default [
    {
		path: "/",
		name: "Home",
		component: Home,
		// meta: { index: 0, keepAlive: true },
	},
	
	{
		path: "/mine",
		name: "Mine",
		component: () => import(/* webpackChunkName: "mine" */ "@/views/home/Mine"),
		meta: { index: 3 },
	},
	{
		path: "/search",
		name: "Search",
		component: () =>
			import(/* webpackChunkName: "search" */ "@/views/home/Search"),
		meta: { index: 1, keepAlive: true },
	},
	



]