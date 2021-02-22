export default [
	{
		path: "/setting",
		name: "Setting",
		component: () =>
			import(/* webpackChunkName: "setting" */ "@/views/mine/Setting"),
	},
	{
		path: "/setting/modifynickname",
		name: "ModifyNickName",
		component: () =>
			import(
				/* webpackChunkName: "modifynickname" */ "@/views/mine/ModifyNickName"
			),
	},
	{
		path: "/login",
		name: "Login",
		component: () =>
			import(/* webpackChunkName: "login" */ "@/views/mine/Login"),
	},
	{
		path: "/register",
		name: "Register",
		component: () =>
			import(/* webpackChunkName: "register" */ "@/views/mine/Register"),
	},
	{
		path: "/myask",
		name: "MyAsk",
		component: () =>
			import(/* webpackChunkName: "myask" */ "@/views/mine/MyAsk"),
	},
	{
		path: "/myfollows",
		name: "MyFollows",
		component: () =>
			import(/* webpackChunkName: "myfollows" */ "@/views/mine/MyFollows"),
	},
	{
		path: "/mystars",
		name: "Mystars",
		component: () =>
			import(/* webpackChunkName: "mystars" */ "@/views/mine/Mystars"),
	},
];
