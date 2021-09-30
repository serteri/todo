
let taskitems = [];
let count;
let getFormServer= function(){
  $.ajax({
    type:'GET',
    url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=151',

    dataType: 'json',

  success: function (response, textStatus) {
    $('.todo-list-items').empty();
   

    response.tasks.forEach(function (task) {

      $('.todo-list-items').append( 
      '<div class="list-item">' + '<p class="todo-lists">'+task.content+'</p><button class="delete" data-id="' + task.id +'">X</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '</div>' + '<hr>' );
       
      
        
   
    });

  



    count = $('.todo-list-items').children('div').length;

    let boxes = $('input[type="checkbox"]:checked');
    
    $(boxes).each(function(){
      
      $(this).siblings('.todo-lists').css('text-decoration','line-through')
      
      count--;
    })
    
    if($('.todo-list-items').is(':empty')){

    }else{
      $('.todo-list-items').append('<div class="filter">' +
      '<span class="span-filter">' + count+ ' items left</span>' +
      '<a class= "filter-items all" href="">All</a>'+
      '<a class= "filter-items active" href="">Active</a>'+
      '<a class= "filter-items completed" href="">Completed</a>'+
  '</div>'
      )



      $('.active').on('click',function(e){
        let boxes1 =$('input:checkbox:not(:checked)');
        e.preventDefault();
        $(boxes).each(function(){
        
          $(this).closest('.list-item').addClass('completed1');
          
        });

        $(boxes1).each(function(){
          if($(this).closest('.list-item').hasClass('completed1')){
            $(this).closest('.list-item').removeClass('completed1')
          };
         })
      });
      
      $('.completed').on('click',function(e){
        e.preventDefault();
        let boxes1 =$('input:checkbox:not(:checked)');
        $(boxes1).each(function(){
          $(this).closest('.list-item').addClass('completed1');
         })


         $(boxes).each(function(){
        
          if($(this).closest('.list-item').hasClass('completed1')){
            $(this).closest('.list-item').removeClass('completed1')
          };
          
        });
        })
          
          
       
       
    };
     
    

    
    },
  error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }


  })

}



let valueenter = function(){
  
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=151',
    contentType:'application/json',
    dataType: 'json',
    data:JSON.stringify({
      task:{
        content : $('#todolist-header').val()
      }

    }),
    success: function (response, textStatus) {
      $('#todolist-header').val("");
      getFormServer();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }

  })
  
  
};

let updateData = function(id){
  
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=151',
    contentType:'application/json',
    dataType: 'json',
    
    success: function (response, textStatus) {
      
      getFormServer();
      
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }

  })
  
  
}

let activeData = function(id){
  $.ajax({
type:'PUT',
url:'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=151',
  dataType:'json',
  contentType: 'application/json',
  success:function(response,textStatus){
    getFormServer();
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
}

  }

  )
};

var deleteTask = function (id) {
  $.ajax({
 type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=151',
    success: function (response, textStatus) {
      getFormServer();
     
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}





$('.todo-enter').on('click',valueenter);
$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'));
});

$(document).on('change', '.mark-complete', function () {
  if (this.checked) {
    
     updateData($(this).data('id'));
     
    
   }else{
     activeData($(this).data('id'));
   };
 });




getFormServer();
