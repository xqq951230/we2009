export default [
{
    path: "/article/:id",
    name: "Article",
    component: () =>
        import(/* webpackChunkName: "Article" */ "@/views/jkbk/Article"),
    props: true,
},
{
    path: "/jkbk",
    name: "Jkbk",
    component: () =>
        import(/* webpackChunkName: "Jkbk" */ "@/views/jkbk/Jkbk"),
    props: true,
},
{
    path: "/jk/:id",
    name: "Jk",
    component: () =>
        import(/* webpackChunkName: "Jk" */ "@/views/jkbk/Jk"),
    props: true,
},
{
    path: "/officeDepartment",
    name: "OfficeDepartment",
    component: () =>
        import(/* webpackChunkName: "OfficeDepartment" */ "@/views/jkbk/OfficeDepartment"),
    props: true,
},
{
    path: "/head/:id",
    name: "Head",
    component: () =>
        import(/* webpackChunkName: "Head" */ "@/views/jkbk/Head"),
    props: true,
},

{
    path: "/relatedDiseases/:id",
    name: "RelatedDiseases",
    component: () =>
        import(/* webpackChunkName: "RelatedDiseases" */ "@/views/jkbk/RelatedDiseases"),
    props: true,
},

]