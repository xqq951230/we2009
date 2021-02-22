export default [
	
	{
		path: "/question/more/:id",
		name: "qsMore",
		component: () =>
            import(/* webpackChunkName: "qsMore" */ "@/views/doctor/qsMore"),
    },
	{
		path: "/question/doctor/:id",
		name: "qsDoctor",
		component: () =>
            import(/* webpackChunkName: "qsDoctor" */ "@/views/doctor/qsDoctor"),
    },
	{
		path: "/question/details/:id",
		name: "qsDetails",
		component: () =>
            import(/* webpackChunkName: "qsDetails" */ "@/views/doctor/qsDetails"),
    },
	{
		path: "/question",
		name: "Question",
		component: () =>
            import(/* webpackChunkName: "Question" */ "@/views/doctor/questions"),
    },


]