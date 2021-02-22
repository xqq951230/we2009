export default [
	
	{
		path: "/consultDetails/:id/:officeId",
		name: "ConsultDetails",
		component: () =>
            import(/* webpackChunkName: "ConsultDetails" */ "@/views/consult/ConsultDetails"),
    },
	{
		path: "/consult",
		name: "Consult",
		component: () =>
            import(/* webpackChunkName: "Consult" */ "@/views/consult/Consult"),
    },
]