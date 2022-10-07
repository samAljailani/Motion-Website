app.component('nav-bar',{
    props:{
        pages:{
            type: Array,
            required: true
        },
    },
    template: 
    /*html*/
    `
        <nav class="navbar navbar-expand-sm bg-light">
            <div class="container-fluid">
                <!-- Links -->
                <ul class="nav">
                <li v-for="(page, index) in pages" :class="nav-item">
                    <a class="nav-link " :href="page.link" >{{page.page}}</a>
                </li>
                </ul>
            </div>
        
        </nav>
    `
})
