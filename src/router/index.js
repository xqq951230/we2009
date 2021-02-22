import Vue from "vue";
import VueRouter from "vue-router";

import emgCall from "./emgCall/emgCall";
import mine from "./mine/mine";
import epidemic from "./epidemic/epidemic";
import ask from "./ask/ask";
import jkbk from "./jkbk/jkbk";
import home from "./home/home";
import consult from "./consult/consult";
import hospital from "./hospital/hospital";
import doctor from "./doctor/doctor";
import sale from "./sale/sale";



const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
	...emgCall,
	...mine,
	...epidemic,
    ...ask,
    ...jkbk,
    ...home,
    ...consult,
    ...hospital,
    ...doctor,
    ...sale,
];

const router = new VueRouter({
	// mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (from.name != "Register" && to.name == "Login" ) {
        localStorage.setItem('backPage', from.fullPath)
		next();
	}else{
        next()
    }
});

export default router;
