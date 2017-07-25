$(document).ready(function () {
  $(".glyphicon-cog").unbind("click").click(function() {
  		$('#probalistic_input_field').html($(this).attr('data-modal-label'));
  	});
  	$(".probalistic_model_value").unbind('click').click(
  		function(){
  			$('#probalistic_model_input').val($(this).html());
  			$("#probablistic_modal_save").attr('data-type',$(this).attr('data-type'));
  			$("#probalistic_input_mean").attr('disabled',!$(this).attr('mean-active'));
  			$("#probalistic_input_std").attr('disabled',!$(this).attr('std-active'));
  			$("#probalistic_input_minimum").attr('disabled',!$(this).attr('minimum-active'));
  			$("#probalistic_input_maximum").attr('disabled',!$(this).attr('maximum-active'));
  			$("#probalistic_input_likely").attr('disabled',!$(this).attr('likely-active'));


  		}
  	);

    $("#visualize").submit(function(event){
      event.preventDefault();
      var option = $('#probalistic_model_input').val();
      var mean = parseInt($('#probalistic_input_mean').val());
      var std = parseInt($('#probalistic_input_std').val());
      var min = parseInt($('#probalistic_input_minimum').val());
      var max = parseInt($('#probalistic_input_maximum').val());
      var likely = parseInt($('#probalistic_input_likely').val());
      console.log(option);
    });

})
