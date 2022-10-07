import * as tracker from "./handTracking.js"//importing the command and commands list
 
let commandInterval = 500
setInterval(checkCommand, commandInterval)
let prevCommand = undefined
let selectedItem = undefined
let main = document.querySelector("#main");
let list = document.getElementsByClassName("MotionElement");

document.getElementById('menu').children[0].classList.add("activeLink")
function checkCommand(){
    console.log(tracker.command);
    if (prevCommand === tracker.command && prevCommand !== tracker.commands.none){
        let className;
        console.log("className")
        switch(tracker.command){
            case tracker.commands.right:
                updateActiveLink(list, 1 )
            break;
            case tracker.commands.left:
                updateActiveLink(list, -1 )
            break;
            case tracker.commands.up:
                document.getElementsByClassName("activeLink")[0].classList.remove("activeLink")
                document.getElementById('menu').children[0].classList.add("activeLink")
            break;
            case tracker.commands.down:
                document.getElementsByClassName("activeLink")[0].classList.remove("activeLink")
                let firstElementOfMain = main.querySelectorAll(".MotionElement")[0]
                if(firstElementOfMain != undefined) firstElementOfMain.classList.add("activeLink")
            break;
            case tracker.commands.select:
                let temp = document.getElementsByClassName("activeLink")[0].children[0]
                temp.click()

        }

    }
    prevCommand = tracker.command
}
function updateActiveLink(list, nextElement){
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