import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import overview from './overview'
import consult from './consult'
import navfilter from './components/navfilter'
import developing from './developing'
import feedback from './feedback'
import 'expose?$!expose?jQuery!jquery'

Vue.use(VueRouter)

const router = new VueRouter();
router.map({
    '/': {
        component: overview
    },
    '/app': {
        component: overview
    },
    '/consult': {
        component: consult
    },
    '/developing': {
        component: developing
    },
    '/feedback':{
        component:feedback
    }
});
router.start(App, '#app');

window.develop = false;