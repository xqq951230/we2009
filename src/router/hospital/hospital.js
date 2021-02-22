export default [
	
	{
		path: "/Subpage",
		name: "Subpage",
		component: () =>
            import(/* webpackChunkName: "Subpage" */ "@/views/hospital/Subpage"),
    },
	{
		path: "/Details",
		name: "Details",
		component: () =>
            import(/* webpackChunkName: "Details" */ "@/views/hospital/Details"),
    },
	{
		path: "/Addressbar",
		name: "Addressbar",
		component: () =>
            import(/* webpackChunkName: "Addressbar" */ "@/views/hospital/Addressbar"),
    },
	{
		path: "/hospital",
		name: "Hospital",
		component: () =>
            import(/* webpackChunkName: "Hospital" */ "@/views/hospital/Hospital"),
    },
    {
		path: "/hospital/hospitallocation",
		name: "HospitalLocation",
		component: () =>
			import(
				/* webpackChunkName: "hospitallocation" */ "@/views/hospital/HospitalLocation"
			),
	},
]