let NOSE = 0;
let LEFTEAR = 3;
let RIGHTEAR = 4;
let LEFTHAND = 9;
let RIGHTHAND = 10;
let LEFTELBOW = 7;
let RIGHTELBOW = 8;
let LEFTSHOULDER = 5;
let RIGHTSHOULDER = 6;
let LEFTFOOT = 15;
let RIGHTFOOT = 16;
let LEFTKNEE = 13;
let RIGHTKNEE = 14;
let LEFTHIP = 11;
let RIGHTHIP = 12;


function Pose(name, conditions, instructions) {
  this.name = name;
  this.conditions = conditions;
  this.instructions = instructions;
}

function Routine(name, poses) {
  this.name = name;
  this.poses = poses;
}

class PoseDetector {
  constructor(detector) {
    this.detector = detector;
    this.prediction = [];
    this.predictionsHistory = [];
    this.drafId = null;
    this.tts = true;
  }

  recordPrediction(prediction) {
    if (this.predictionsHistory.length >= 100) this.predictionsHistory.pop();
    this.predictionsHistory.unshift(prediction);
  }

  async estimatePoses(image) {
    this.prediction = await this.detector.estimatePoses(image);
    this.recordPrediction(this.prediction);
    return this.prediction;
  }
  /*
    stepCompare(step) {
      if (this.prediction.length > 0) {
        var flag = 0;
        for (let condition of step) {
          if (
            this.prediction[0].keypoints[condition[0]][condition[1]] -
            this.prediction[0].keypoints[condition[3]][condition[4]] >
            condition[2]
          ) {
            console.log("condition became true");
            // console.log(
            //   this.prediction[0].keypoints[condition[0]][condition[1]] -
            //     this.prediction[0].keypoints[condition[3]][condition[4]] >
            //     condition[2]
            // );
            flag = 1;
          }
        }
        if (flag === 1) {
          return true;
        } else return false;
      }
    }
  */
  /*
    async detectStep(step) {
      console.log("detecting step...");
      // console.log(step[0]);
      // console.log(step);
      if (!this.stepCompare(step)) {
        // setTimeout(this.detectStep, 100, step);
        // this.drafId = requestAnimationFrame(
        //   function () {
        //     this.detectStep(step);
        //   }.bind(this)
        // );
        requestAnimationFrame(function() {
          this.detectStep(step);
        });
      } else {
        console.log("Step detected");
        return true;
      }
    }
  */
  // async detectRoutine(routine) {
  //   console.warn("Routine Started");
  //   console.log(routine);
  //   let i = 0;
  //   // while (i < routine.length) {
  //   //   if (this.detectStep(routine[i]) === true) i++;
  //   // }
  //   routine.forEach((step)=>{this.detectStep(step)});
  //   console.warn("Routine completed");
  // }

  detectRoutine(routine, stepIndex, ctx, changed) {
    console.log("detecting step", stepIndex + 1, "of", routine.poses.length);
    ctx.style.display = "none";
    var nav = document.getElementById("navigation");
    nav.style.display = "none";
    //console.log(routine[stepIndex]);
    //console.log(routine.poses[0]);
    if(changed == 1 && this.tts) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = routine.poses[stepIndex].instructions;
      window.speechSynthesis.speak(msg);
      changed = 0;
    }

    document.getElementById("instruction").style.display = "block";
    document.getElementById("instruction").innerHTML = routine.poses[stepIndex].instructions;

    if (this.stepCompare(routine.poses[stepIndex])) {
      console.log("detected step", stepIndex + 1);
      stepIndex++;
      changed = 1;
    }

    if (stepIndex == routine.poses.length) {
      console.warn("Routine completed");
      ctx.style.display = "block";
      document.getElementById("instruction").style.display = "none";
      nav.style.display = "block";
    }
    //setTimeout(this.detectRoutine, 100, routine, stepIndex);
    else
      requestAnimationFrame(
        function() {
          this.detectRoutine(routine, stepIndex, ctx, changed);
        }.bind(this)
      );
  }

  //new
  /*
    stepCompare(step) {
      if (this.prediction.length > 0) {
        var flag = 1;

        for (let condition of step) {
          if (!(

              this.prediction[0].keypoints[condition[0]][condition[1]] -
              this.prediction[0].keypoints[condition[3]][condition[4]] >
              condition[2]

              // this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]] > 100

            )) {
            flag = 0;
          }
        }
        if (flag === 1) {
          return true;
        } else return false;
      }
    }
  */

  //new new
  /*
  stepCompare(step) {
    if (this.prediction.length > 0) {
      var flag = 1;
      // console.log(step);
      //document.getElementById("instructions").innerHTML = step.instructions;

      for (let condition of step.conditions) {

        if (condition[2][0] == ">") {
          if (!(
              this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]] > condition[2][1]
            )) flag = 0;
        }
        else if (condition[2][0] == "<") {
          if (!(
              this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]] < condition[2][1]
            )) flag = 0;
        }
        else if (condition[2][0] == "<>") {
          if (!(
              Math.abs(this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]]) < condition[2][1]
            )) flag = 0;
        }
        else if (condition[2][0] == "><") {
          if (!(
              Math.abs(this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]]) > condition[2][1]
            )) flag = 0;
        }

      }
      if (flag === 1) {
        return true;
      } else return false;
    }
  }
  */

  stepCompare(step) {
    if (this.prediction.length > 0) {
      var flag = 1;

      for (let condition of step.conditions) {
        //distance
        if (condition.length == 5) {
          if (condition[2][0] == ">") {
            if (!(
              this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]] > condition[2][1]
            )) flag = 0;
          }
          else if (condition[2][0] == "<") {
            if (!(
              this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]] < condition[2][1]
            )) flag = 0;
          }
          else if (condition[2][0] == "<>") {
            if (!(
              Math.abs(this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]]) < condition[2][1]
            )) flag = 0;
          }
          else if (condition[2][0] == "><") {
            if (!(
              Math.abs(this.prediction[0].keypoints[condition[0]][condition[1]] - this.prediction[0].keypoints[condition[3]][condition[4]]) > condition[2][1]
            )) flag = 0;
          }
        }
        //angle
        else if (condition.length == 3) {
          // console.log(condition);
          // console.log(this.prediction[0].keypoints[condition[0]]);
          var A = {
            x: this.prediction[0].keypoints[condition[0][0]].x,
            y: this.prediction[0].keypoints[condition[0][0]].y
          };
          var B = {
            x: this.prediction[0].keypoints[condition[0][1]].x,
            y: this.prediction[0].keypoints[condition[0][1]].y
          };
          var C = {
            x: this.prediction[0].keypoints[condition[0][2]].x,
            y: this.prediction[0].keypoints[condition[0][2]].y
          };
          var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
          var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
          var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
          var angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
          angle = angle * 180 / Math.PI;
          
          if (condition[1] == ">") {
            if (!(
              angle > condition[2]
              )) flag = 0;
          }
          else if (condition[1] == "<") {
            if (!(
                angle < condition[2]
              )) flag = 0;
          }
        }
        
      }
      if (flag === 1) {
        return true;
      } else return false;
    }
  }
}
