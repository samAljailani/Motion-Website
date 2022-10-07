import * as tracker from "./handTracking.js"//importing the command and commands list
 
let commandInterval = 500
setInterval(checkCommand, commandInterval)
let prevCommand = undefined
let selectedItem = undefined
function checkCommand(){
    console.log(tracker.command);
    if (prevCommand === tracker.command && prevCommand !== tracker.commands.none){
        let nextElement = 0
        switch(tracker.command){
            case tracker.commands.right:
                nextElement = 1
                console.log("right element")
            break;
            case tracker.commands.left:
                nextElement  = -1
            break;
            case tracker.commands.up:
            break;
            case tracker.commands.down:
            break;
            case tracker.commands.select:
                let temp = document.getElementsByClassName("activeLink")[0].children[0]
                temp.click()

        }
        let list = document.getElementsByClassName("nav-item");
        for(let i = 0; i < list.length; ++i){
            if(list[i].classList.contains("activeLink")){
                list[i].classList.remove("activeLink");
                if(i + nextElement >= 0 && i + nextElement < list.length){
                    list[i+ nextElement].classList.add("activeLink");
                }else if(i + nextElement >= list.length){
                    list[0].classList.add("activeLink");

                }else if(i + nextElement < 0){
                    list[list.length - 1].classList.add("activeLink");
                }
                break;
            }
        }

    }
    prevCommand = tracker.command
}