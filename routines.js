var neckRightConditions = [[[RIGHTSHOULDER, LEFTSHOULDER, RIGHTEAR], "<", 30]];
var neckLeftConditions = [[[LEFTSHOULDER, RIGHTSHOULDER, LEFTEAR], "<", 30]];
var neckRight = new Pose("NeckRight", neckRightConditions, "Tilt your head to the right");
var neckLeft = new Pose("NeckLeft", neckLeftConditions, "Tilt your head to the left");
var neckPoses = [neckRight, neckLeft];
var NeckRoutine = new Routine("Neck Routine", neckPoses);




var armDefaultConditions = [
      [[11, 5, 7], "<", 20],
      [[12, 6, 8], "<", 20],
    ];
var armAsideConditions = [
      [[11, 5, 7], ">", 80],
      [[11, 5, 7], "<", 100],
      [[12, 6, 8], ">", 80],
      [[12, 6, 8], "<", 100],
    ];
var armUpConditions = [
      [[11, 5, 7], ">", 170],
      [[11, 5, 7], "<", 200],
      [[12, 6, 8], ">", 170],
      [[12, 6, 8], "<", 200],

    ];
var armDefault = new Pose("ArmDefault", armDefaultConditions, "Move your arms down");
var armAside = new Pose("ArmAside", armAsideConditions, "Lift your arms to a horizontal position");
var armUp = new Pose("ArmUp", armUpConditions, "Lift your arms above your head");
var armPoses = [armDefault, armAside, armUp, armAside, armDefault];
var ArmsRoutine = new Routine("Arms Routine", armPoses);




routine = NeckRoutine;
