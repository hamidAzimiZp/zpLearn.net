(($) => {
  $.fn.zp_validate = function (userOptions) {
    var options = $.extend({
      errDivClass : 'errorMsgs',
      fieldNameAttr : 'name',
      errorPosition : 'prepend'  //append, prepend
    })
    var emailRegex = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,})/i;
    var urlRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/i;
    var requiredRegex = /([^\s]+)/;

    // startWith function
    var startWith = (str,prefix) => {
      return (str.slice(0,prefix.length) == prefix)
    }
    this.each(function () {
      var form = $(this);
      var errorDiv = $("<div>",{
        class : options.errDivClass
      })
      form.submit(function (event) {
        var errors = [];
        var fields = $(this).find("input[data-vld],textarea[data-vld]");
        if ($("input[type='password'].pass1").val() !== $("input[type='password'].pass2").val()) {
          errors.push("- پسورد ها تناسب ندارد")
        };
        fields.each(function () {
          var field = $(this);
          var fName = (field.is("["+options.fieldNameAttr+"]")) ? field.attr(options.fieldNameAttr) : field.attr("name");
          var vldStrings = field.attr("data-vld").split("|");
          for (i in vldStrings){
            var vldStr = vldStrings[i].trim();

            if (vldStr == "required") {
              if (!requiredRegex.test(field.val())){
                errors.push(`- فیلد ${fName} باید پر شود`);
                if (!field.next().is("span.required")) {
                  field.after("<span class='required' style='color:red;font-size: 23px;padding-right: 3px;margin-top: 2%;'>*</span>")
                }
              }else {
                field.next("span.required").remove()
              }
            }else if (vldStr == "email") {
              if (!emailRegex.test(field.val())){
                 errors.push(`- ${fName} نامعتبر است`)
              }
            }else if (vldStr == "url") {
              if(!urlRegex.test(field.val())){
                errors.push("- Field " + fName + " is not a valid URL !")
              }
            }else if (startWith(vldStr,"minlen_")) {
              var len = Number(vldStr.split("_")[1]) ;
              if(field.val().length < len){
                if (fName == "سن"){
                  errors.push(`- ${fName} شما باید حداقل ${len} باشد`)
                }else {
                  errors.push(`- ${fName} باید شامل حداقل ${len} کارکتر باشد`)
                }
              }
            }else if (startWith(vldStr,"maxlen_")) {
              var len = Number(vldStr.split("_")[1]) ;
              if (fName == "سن"){
                errors.push(`${fName} شما باید حداکثر ${len} باشد`)
              }else {
                errors.push(`${fName} باید شامل حداکثر ${len} کارکتر باشد`)
              }
            }else if (startWith(vldStr,"min_")) {
              var num = Number(vldStr.split("_")[1]) //0:min 1:num;
              if(Number(field.val()) < num){
                errors.push("- Field " + fName + " must be greater than" + num)
              }
            }else if (startWith(vldStr,"max_")) {
              var num = Number(vldStr.split("_")[1]) //0:max 1:num;
              if(Number(field.val()) > num){
                errors.push("- Field " + fName + " must be less than" + num)
              }
            }else {
              // invalid validation string !!!
              console.log(vldStr + "is not a valid string token for this validation plugin.")
            }
          }
        })
        if (errors.length == 0){
          return true
        }else {
          event.preventDefault();
          errorDiv.html(errors.join("<br>"));
          if (options.errorPosition == "append") {
            form.append(errorDiv)
          }else {
            form.find(".form-title").next().prepend(errorDiv)
          }
        }
      })
    })
  }
})(jQuery)
