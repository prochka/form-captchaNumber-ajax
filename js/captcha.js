(
  //алгоритм капчи
 function($){ 
  $.fn.shuffle = function() {
   return this.each(function(){
     var items = $(this).children();
     return (items.length)
     ? $(this).html($.shuffle(items,$(this)))
     : this;
   });
 }
 $.fn.validate = function() {
   var res = false;
   this.each(function(){
     var arr = $(this).children();
     res =    ((arr[0].innerHTML=="1")&&
       (arr[1].innerHTML=="2")&&
       (arr[2].innerHTML=="3")&&
       (arr[3].innerHTML=="4")&&
       (arr[4].innerHTML=="5")&&
       (arr[5].innerHTML=="6"));
   });
   return res;
 }
 $.shuffle = function(arr,obj) {
   for(
     var j, x, i = arr.length; i;
     j = parseInt(Math.random() * i),
     x = arr[--i], arr[i] = arr[j], arr[j] = x
     );
     if(arr[0].innerHTML=="1") obj.html($.shuffle(arr,obj))
       else return arr;
   }
 })(jQuery);


 $(function() {
   $("#sortable").sortable();//
   $("#sortable").disableSelection();
   $('ul').shuffle();
   $("#button-blue").click(function(){ //отправка формы

    if($('ul').validate()){ //проверка капчи
      $.ajax({
        url: "js/form_processing.php",//url обработчика формы на сервере
        type:     "POST", //Тип запроса
        dataType: "html", //формат возвращаемых данных
        data: $('#form1').serialize(), //приведение данных к виду a=1&b=2
        success: function(data){  //Функция, которая будет вызвана в случае удачного завершения запроса к серверу. МОДАЛЬНОЕ ОКНО
          var id = $('#dialog');  //Параметр - запрашиваемые данные 
          var maskHeight = $(document).height();  //высота объекта document
          var maskWidth = $(window).width();  
          $('#mask').css({'width':maskWidth,'height':maskHeight}); //параметры затемняющего слоя
          $('#mask').fadeIn(1000); 
          $('#mask').fadeTo("slow",0.8); 
          var winH = $(window).height();
          var winW = $(window).width();
          $(id).css('top',  winH/2-$(id).height()/2);//позиционирование модального окна с id = #dialog
          $(id).css('left', winW/2-$(id).width()/2);// css-свойства заданы для #dialog в css-файле 
          $(id).fadeIn(2000); 
          $('.content').html(data);  //загружаем контент из файла-обработчика в модальное окно
          $('.window .close').click(function (e) { 
            e.preventDefault();
            $('#mask, .window').hide();
          }); 
          $('#mask').click(function () {
            $(this).hide();
            $('.window').hide();
          });
        },
        error: function(response) { //Если ошибка
          document.getElementById('new2').innerHTML = "Ошибка при отправке формы";
        }
      });

    } 
    else
      alert('Капчу заполни!');
  })   
 });