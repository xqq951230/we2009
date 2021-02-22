export default [
	
	{
		path: "/diolog",
		name: "Diolog",
		component: () =>
            import(/* webpackChunkName: "Diolog" */ "@/views/sale/Diolog"),
    },
	{
		path: "/detail",
		name: "Detail",
		component: () =>
            import(/* webpackChunkName: "Detail" */ "@/views/sale/Detail"),
    },

]