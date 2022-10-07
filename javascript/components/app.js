const app = Vue.createApp({
    data(){
        return{
            links: [
                {page:"Home", link:"./index.html"},
                {page:"Tutorials", link:"./tutorials.html"},
                {page:"Shop", link:"#"},
                {page:"Game", link:"#"}
            ],
            instructions:[
                {instruction: 'To navigate to the right. extend the index finger to the right' , image:'Images/right.jpg'},
                {instruction: 'To navigate to the left. extend the index finger to the left' , image:'Images/left.webp'},
                {instruction: 'To navigate to the up. extend the index finger to the up' , image:'Images/up.jpg'},
                {instruction: 'To navigate to the down. extend the index finger to the down' , image:'Images/down.jpg'},
                {instruction: 'To click an element entend all five fingers' , image:'Images/allfingers.jpg'}
            ]
        }
    }
})
