const app = Vue.createApp({
    data(){
        return{
            links: [
                {page:"Home", link:"./index.html"},
                {page:"Tutorials", link:"./Tutorials.html"},
                {page:"Shop", link:"#"},
                {page:"Game", link:"#"}
            ],
            instructions:[
                {instruction: 'To navigate to the right. extend the index finger to the right' , image:'Images/right.jpg'},
                {instruction: 'To navigate to the left. extend the index finger to the left' , image:'Images/left.webp'},
                {instruction: 'To navigate from the page content back to the navigation bar. extend the index finger up' , image:'Images/up.jpg'},
                {instruction: 'To navigate from the navigation bar to the page content. extend the index finger down' , image:'Images/down.jpg'},
                {instruction: 'To click an element entend all five fingers' , image:'Images/allfingers.jpg'}
            ]
        }
    }
})
