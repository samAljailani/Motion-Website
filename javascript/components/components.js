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
        <nav class="navbar navbar-expand-sm" style="background-color:#ececec;">
            <div class="container-fluid">
                <!-- Links -->
                <ul id="menu" class="nav">
                
                <li v-for="(page, index) in pages" class="nav-item MotionElement">
                    <a class="nav-link " :href="page.link" >{{page.page}}</a>
                </li>
                </ul>
            </div>
        
        </nav>
    `
})
////////////////////////////////////////
//Tutorial.html components
app.component('tutorials',{
    data(){
        return{
            videos:[]
        }
    },
    template:
    /*html*/
    `
        <div class="container-fluid row">
            <div class="col-sm" v-for="item in videosList">
                <div class="videoElement p-1 d-flex justify-content-center MotionElement" style="width:320px; height:100%; background-color:#ececec;">
                    <a :href= "item.videoLink" class="text-reset text-decoration-none">
                        <img :src="item.imageLink" style="width:300px;height:auto; border-radius: 10px;"/>
                        <p class="text-muted" >{{item.title}}</p>
                    </a>
                </div>
            </div>
        </div>
    `,    
    computed:{
        videosList(){
            let videosInfo = []
            this.videos.forEach(
                function(item, index){
                    videosInfo.push({
                        videoLink: 'https://www.youtube.com/watch?v='+item.id.videoId,
                        imageLink: 'http://i3.ytimg.com/vi/'+item.id.videoId+ '/hqdefault.jpg',
                        title: item.snippet.title

                    })
                })
                console.log('vides', videosInfo)
            return videosInfo 
        }
    },
    mounted() {
        gapi.load("client", this.loadClient)
    },
    methods:{
        loadClient(){
            gapi.client.setApiKey("AIzaSyDZgZcNgj3nw7LXjeOCG80JepeaAlKLg4Q")
      return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(this.ApiCallSucess,
                  function(err) { console.error("Error loading GAPI client for API", err); });
        },
        ApiCallSucess(){
            console.log("GAPI client loaded for API"); this.execute()
        },
        execute(){
            var arr_search = {
                "part": 'snippet',
                "type": 'video',
                "order": 'relevance',
                "maxResults": 25,
                "q": 'lego Tutorials'
            }
            return gapi.client.youtube.search.list(arr_search)
            .then(this.setList)

        },
        setList(response){
            this.videos = response.result.items;
        }
    }
        
})
