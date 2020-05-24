$(document).ready(function(){
  // for navigation one
  $('.dropdown-clickToShow').on('click',function(){
    $('#custom-main-dropdown-menu').fadeToggle(400)
  })
  // for background li in navigation menu
  var links = document.querySelectorAll('.btnNav');
  var span = document.createElement('span');
  span.classList.add('highlight');
  document.getElementById('navbar-expand-lg').appendChild(span);
  links.forEach((link) => {
    link.addEventListener('mouseenter',highlight);
    link.addEventListener('mouseout',function(){this.style.color = 'white'})
  });
  function highlight(){
    var elmCoordinate = this.getBoundingClientRect();
    this.style.color = "#fff"
    span.style.height = `${elmCoordinate.height}px`;
    span.style.width = `${elmCoordinate.width}px`;
    span.style.transform = `translate(${elmCoordinate.left}px,${elmCoordinate.top}px )`
  }
  // for myNavigation two
  $('.navbar-toggler').on('click',function(){
    if($('.navbar-toggler span').attr('class') == 'icon-dehaze'){
      $('.navbar-toggler span').attr('class',"icon-close2")
      $('.nav2Wrapper').css('margin','0')
    }else{
      $('.navbar-toggler span').attr('class',"icon-dehaze")
      $('.nav2Wrapper').css('marginRight','-100%')
    }
  })
  // for sticky div of social users
  var navBar = document.getElementById('socialScroll')
  window.addEventListener('scroll',function(){
    var navClasses = navBar.getAttribute('class');
    if(!navClasses){
      navBar.setAttribute('class','')
    }
    if(window.scrollY <= 800 ){
      navBar.setAttribute('class',navClasses.replace('sticky',''))
    }else{
      if(navClasses.indexOf('sticky') == -1){
        navBar.setAttribute('class',navClasses + " sticky");
      }
    }
  })

  // smoothScroll
$(document).ready(function(){
  function smoothScrollTo(y){
    var step = 80;
    if (y < window.scrollY){
      step *= -1;
    }
    if (Math.abs(y - scrollY) <= step){
      return;
    }
    window.scrollBy(0,step)
    setTimeout(function () {
      smoothScrollTo(y)
    },0);
  }

  // btn click to top
  (function scrollTop() {
      var btnUp = $("<span></span>",{
        class: "icon-arrow_upward btnGoUp",
      });
      $('body').append(btnUp)
      function setGoUpVisibility(){
        if(window.scrollY <= 450 || $(".nav2Wrapper").css("marginRight") == "0px"){
          btnUp.removeClass("btnGoUpLocation")
        }else {
          btnUp.addClass("btnGoUpLocation")
        }
      }
      window.addEventListener('scroll',setGoUpVisibility);
      btnUp.on('click',function () {smoothScrollTo(0)})
    }())
  })
  // for progress scrolla myBar
  window.onscroll = function() {myFunction()};
  function myFunction() {
    var winScroll = window.scrollY;
    var height = document.body.scrollHeight - window.innerHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }
})
// for loader
var loader = $("#loader");
var wrapper = $("#wrapper");
$(document).ready(function(){
  setTimeout(function(){
    showContent();
    document.body.style.background = "url('images/bg8.jpg')"
  },3000)
})
function showContent() {
  loader.css("display","none");
  wrapper.css("display","block")
}
// for myNavigation two (resume)
(function(){
  $('dt').click(function(){
    $(this).parent().find('dd').slideUp();
    $(this).parent().find('span').removeClass('icon-arrow-down').addClass('icon-arrow-left').css("color","yellow")
    if($(this).next().css('display') == 'none'){
      $(this).next('dd').slideDown(350);
      $(this).find('span').addClass('icon-arrow-down').css("color","red");
    }
  })
  var elm =document.createElement('span');
  elm.className = 'icon-arrow-left';
  elm.style.cssText = 'font-size:11px;position:absolute;top:20px;padding-right:5px;color:yellow';
  $('dt.zpHas-sub').append(elm)
}())
