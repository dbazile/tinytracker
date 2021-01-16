import { createApp } from '/lib/vue.esm-browser.js'

import Application from '/components/Application.js'


createApp({
    components: {
        Application,
    },
    template: '<Application/>',
}).mount("main")
