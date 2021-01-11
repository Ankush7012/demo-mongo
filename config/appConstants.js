var BOOKING_STATUS = {
    PENDING: "PENDING",
    CANCEL : "CANCEL",
    COMPLETE : "COMPLETE",
    ACTIVE : "ACTIVE",
  
}

var FILLING_TYPE = {
    DIESEL: "DIESEL",
    PETROL : "PETROL",
    GAS : "GAS",
    
  
}

var USER = {
    PROFILE_PIC:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
}

var STATION = {
    PIC:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfX3Na9KswtD-fKsB_LQ6g1nH2Nb2vl3VsBw&usqp=CAU"
}

var SCOPE = {
    USER: "USER",
    STATION: "STATION",
   
  };

  var SERVER = {
    APP_NAME: "demo-test",
    SECRET: "#TestingDemoCfGKHJN<uHHSh",
    SALT: 11,
    JWT_SECRET_KEY_USER: "gff%$TGMJ^rztt",
    JWT_SECRET_KEY_STATION: "gff%$TGMJ^rzss",
  }



module.exports = {
    BOOKING_STATUS,
    FILLING_TYPE,
    USER,
    STATION,
    SCOPE,
    SERVER
}