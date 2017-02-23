var PostcodeChecker = {
  api: "https://maps.googleapis.com/maps/api/geocode/json?&address=",

  nonMainlandPostcodes: [
    ["BT"],
    ["IM1", "IM2", "IM3", "IM4", "IM5", "IM6", "IM7", "IM8", "IM9"],
    ["TR21", "TR22", "TR23", "TR24", "TR25"],
    ["PO30", "PO31", "PO32", "PO33", "PO34", "PO35", "PO36", "PO37", "PO38", "PO39", "PO40", "PO41"],
    ["AB30", "AB31", "AB33", "AB34", "AB35", "AB36", "AB37", "AB38", "AB43", "AB44", "AB45", "AB46", "AB47", "AB48", "AB49", "AB50", "AB51", "AB52", "AB53", "AB54", "AB55", "AB56"],
    ["FK17", "FK18", "FK19", "FK20", "FK21", "FK22", "FK23", "FK24", "FK25", "FK26", "FK27", "FK28", "FK29", "FK30", "FK31", "FK32", "FK33", "FK34", "FK35", "FK36", "FK37", "FK38", "FK39", "FK40", "FK41", "FK42", "FK43", "FK44", "FK45", "FK46", "FK47", "FK48", "FK49", "FK50", "FK51", "FK52", "FK53", "FK54", "FK55", "FK56", "FK57", "FK58", "FK59", "FK60", "FK61", "FK62", "FK63", "FK64", "FK65", "FK66", "FK67", "FK68", "FK69", "FK70", "FK71", "FK72", "FK73", "FK74", "FK75", "FK76", "FK77", "FK78", "FK79", "FK80", "FK81", "FK82", "FK83", "FK84", "FK85", "FK86", "FK87", "FK88", "FK89", "FK90", "FK91", "FK92", "FK93", "FK94", "FK95", "FK96", "FK97", "FK98", "FK99"],
    ["G83"],
    ["IV1", "IV2", "IV3", "IV4", "IV5", "IV6", "IV7", "IV8", "IV9", "IV10", "IV11", "IV12", "IV13", "IV14", "IV15", "IV16", "IV17", "IV18", "IV19", "IV20", "IV21", "IV22", "IV23", "IV24", "IV25", "IV26", "IV27", "IV28", "IV30", "IV31", "IV32", "IV33", "IV34", "IV35", "IV36", "IV37", "IV38", "IV39", "IV52", "IV53", "IV54", "IV63"],
    ["KW1", "KW2", "KW3", "KW5", "KW6", "KW7", "KW8", "KW9", "KW10", "KW11", "KW12", "KW13", "KW14"],
    ["PA21", "PA22", "PA23", "PA24", "PA25", "PA26", "PA27", "PA28", "PA29", "PA30", "PA31", "PA32", "PA33", "PA34", "PA35", "PA36", "PA37", "PA38", "PA39", "PA40"],
    ["PH18", "PH19", "PH20", "PH21", "PH22", "PH23", "PH24", "PH25", "PH26", "PH30", "PH31", "PH32", "PH33", "PH34", "PH35", "PH36", "PH37", "PH38", "PH39", "PH40", "PH41", "PH49", "PH50"],
    ["HS1", "HS2", "HS3", "HS4", "HS5", "HS6", "HS7", "HS8", "HS9"],
    ["IV40", "IV41", "IV42", "IV43", "IV44", "IV45", "IV46", "IV47", "IV48", "IV49", "IV50", "IV51", "IV55", "IV56"],
    ["KA27", "KA28"],
    ["KW15", "KW16", "KW17"],
    ["PA20", "PA41", "PA42", "PA43", "PA44", "PA45", "PA46", "PA47", "PA48", "PA49", "PA60", "PA61", "PA62", "PA63", "PA64", "PA65", "PA66", "PA67", "PA68", "PA69", "PA70", "PA71", "PA72", "PA73", "PA74", "PA75", "PA76", "PA77", "PA78"],
    ["PH42", "PH43", "PH44"],
    ["ZE1", "ZE2", "ZE3"],
    ["GY", "JE"]
  ],

  performCheckAgainstNonMainlandArray: function(postcode){
    var failedCheck = false;

    for (var x = 0; x < PostcodeChecker.nonMainlandPostcodes.length; x++) {
      var postcodeArray = PostcodeChecker.nonMainlandPostcodes[x];

      if (!failedCheck) {

        for (var y = 0; y < postcodeArray.length; y++) {
          var postcodeStartString = postcodeArray[y];

          // does the postcode provides start with the postcodeStartString ?
          var invalidMainlandPostcode = postcode.indexOf(postcodeStartString) == 0;

          if (invalidMainlandPostcode) {
            failedCheck = true;
            break;
          }

        }
        
      } else {
        break;
      }

    }

    if (failedCheck) {
      PostcodeChecker.postcodeIsInvalid();
    } else {
      PostcodeChecker.performCheckAgainstApi(postcode);
    }

  },

  performCheckAgainstApi: function(postcode){
    var isValidPostcode = false;

    $.get(PostcodeChecker.api + "" + postcode, function(response){
      if (response.status === "OK") {
        
        var address_components = response.results[0].address_components;

        for (var i = 0; i < address_components.length; i++) {
          var place = address_components[i].long_name;

          if (place === "England" || place === "Scotland" || place === "Wales"){
            isValidPostcode = true;
            break;
          }
          
        }

        if (isValidPostcode) {
          PostcodeChecker.postcodeIsValid();
        } else {
          PostcodeChecker.postcodeIsInvalid();
        }

      }
    });

  },

  postcodeIsValid: function(){
    // postcode IS in mainland UK
    // so do something...
    $(".message").html("This postcode is <strong>inside</strong> mainland UK");
  },

  postcodeIsInvalid: function(){
    // postcode IS NOT in mainland UK
    // so do something...
    $(".message").html("This postcode is <strong>outside</strong> mainland UK");
  },

  events: function(){

    $("button.check").click(function(){

      // capture postcode, remove whitespace, and convert to uppercase
      var postcode = $("input.postcode").val().replace(/\s/g, "").toUpperCase();

      if (postcode != ""){
        // pass postcode into function checking it against offshore UK isles
        PostcodeChecker.performCheckAgainstNonMainlandArray(postcode);
      }

    });

  },

  init: function(){
    this.events();
  }

};

$(function(){
  PostcodeChecker.init();
});