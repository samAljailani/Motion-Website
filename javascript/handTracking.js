const videoElement = document.getElementsByClassName("input_video")[0]
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
export const commands = {
    right: "RIGHT",
    left: "LEFT", 
    up: "UP",
    down:"DOWN",
    select: "SELECT",
    none:"NONE"
}
export let command = commands.none
//hands
const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 1,
    selfieMode: true,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });
  hands.onResults(onResults);
  //camera
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
    facingMode:  'user',
    width: 1280,
    height: 720
  });
  camera.start();
  //
function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      if (landmarks.length == 21){
        command = getCommand(landmarks)
      }

      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color:'#000000', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#00FFFF', lineWidth: 2});
    }
  }
  if(results.multiHandLandmarks.length === 0 && results.multiHandLandmarks[0] !== 21 ){
    command = commands.none
  }
  canvasCtx.restore();
}
function getCommand(landmarks){
    let indexExtended = fingerIsExtended(landmarks[0], landmarks[5],  landmarks[7], landmarks[8])
    let MiddleExtended = fingerIsExtended(landmarks[0], landmarks[9], landmarks[11], landmarks[12])
    let RingExtended = fingerIsExtended(landmarks[0], landmarks[13], landmarks[15], landmarks[16])
    let pinkyExtended = fingerIsExtended(landmarks[0], landmarks[17], landmarks[19], landmarks[20])
    let command = commands.none;
    if(indexExtended && !MiddleExtended && ! RingExtended && !pinkyExtended){
        let v = calcDistanceFromOrigin(landmarks[0], landmarks[8])
        command = getDirection(landmarks[0], v, VectorMagnitude(v))
    }else if(indexExtended && MiddleExtended && RingExtended && pinkyExtended){
        command = commands.select
    }
    return command
}
function getDirection(origin, v, vMagnitude){
    let command = commands.none
    let thetaZ = (180/ Math.PI) * Math.acos(v.z/(vMagnitude))
    if(thetaZ >80 && thetaZ < 120){//thetaZ > 90 - 30 degrees && thetaZ < 90 + 30 degrees 
      let thetaX = (180/ Math.PI) * Math.acos(v.x/(vMagnitude))
      if(thetaX < 60){
        command = commands.right
      }else if(thetaX > 120){
        command = commands.left
      }else if(v.y < 0 ){
        command =  commands.up
      }else{
        command =  commands.down
      }
    }
    return command
}
    
//The Parameters are The wrist landmark, the finger_MCP landmark, finger_DIP, the finger_Tip landmark
function fingerIsExtended(origin, v1, v2, v3){
  v1 = calcDistanceFromOrigin(origin,v1)
  v2 = calcDistanceFromOrigin(origin,v2)
  v3 = calcDistanceFromOrigin(origin,v3)
  let v1Magnitude = VectorMagnitude(v1)
  let v2Magnitude = VectorMagnitude(v2)
  let v3Magnitude = VectorMagnitude(v3)
  return  v3Magnitude > v1Magnitude && v3Magnitude > v2Magnitude
}
///vector properties
function calcDistanceFromOrigin(origin, v){
    return {
      x:v.x - origin.x,
      y:v.y - origin.y,
      z:v.z - origin.z
    }
  }
  function VectorMagnitude(v){
    return Math.sqrt(v.x**2+v.y**2 +v.z**2);
  }
////////////////////////////////////////////////////////////////
function domManipulation(){

}