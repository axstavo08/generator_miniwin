/**
 * Project Name : generator-miniwin
 * Created: 20/02/2018
 * @author Gustavo Ramos M
 */
 define([

], function(){

     var oDashboard;

     function tooltip() {
          $('#info_rows').tooltip();
		$('#info_cols').tooltip();
		$('#info_height').tooltip();
		$('#info_width').tooltip();
     }

     function button() {
          $("#generate").on('click', function(){
			oDashboard.methods.generate();
		});
     }

     function initialize(dashboard) {
          oDashboard = dashboard;
          tooltip();
          button();
     }

     return {
          initialize: initialize
     };
});
