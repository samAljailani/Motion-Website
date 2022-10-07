const app = Vue.createApp({
    data(){
        return{
            links: [
                {page:"Home", link:"#"},
                {page:"Shop", link:"#"},
                {page:"Tutorials", link:"#"},
                {page:"Game", link:"#"}
            ],
            instructions:[
                {instruction: 'To navigate to the right. extend the index finger to the right' , image:'Images/moveRight.jpg'},
                {instruction: 'To navigate to the left. extend the index finger to the left' , image:'Images/moveRight.jpg'},
                {instruction: 'To navigate to the up. extend the index finger to the up' , image:'Images/moveRight.jpg'},
                {instruction: 'To navigate to the down. extend the index finger to the down' , image:'Images/moveRight.jpg'}
            ]
        }
    }
})
