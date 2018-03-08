/*===========================================================================
Project: Generator Miniwin
Author: Gustavo Andrés Ramos Montalvo
============================================================================*/

define([
    'dashboard', 'instructions', 'ev_dashboard'
], function(dashboard, instructions, evDashboard) {

    var oPublic;

	/*function buildPanel(nRows, nCols) {
		var vtable, i;
		$('#tablePreview').append('<table>');
		vtable = $('#tablePreview').children();
		for(i=1; i<=nRows; i++) {
			var str = "<tr>";
			for (var j = 1; j <= nCols; j++) {
				str += "<td id='hola'  style='background:#f2f2f2;'>"+i+"-"+j
				+"<span id='prueba' data-toggle='popover' title='Popover Header' data-content='Some content inside the popover'>a</span></td>";
			}
			str += "</tr>";
			vtable.append(str);
		}
		$('#tablePreview').append('</table>');

		$('#hola').on('click', function(){
		  //$('#cp1').colorpicker({format: 'rgb'});
		   $('#prueba').popover();
		});
	}*/

     function callActions() {
          dashboard.initialize();
          instructions.initialize();
     }

     function callEvents() {
         evDashboard.initialize({
              'methods': {
                   'generate': dashboard.generate
              }
         });
     }

     function initViewEvents() {
          $.dataJS('navminiwin_init').on('click', function() {
			$.dataJS('navminiwin_manual').removeClass("active");
			$.dataJS('navminiwin_init').addClass("active");
			$.dataJS('contminiwin_manual').addClass("hidden");
			$.dataJS('contminiwin_init').removeClass("hidden");
		});

		$.dataJS('navminiwin_manual').on('click', function() {
			$.dataJS('navminiwin_init').removeClass("active");
			$.dataJS('navminiwin_manual').addClass("active");
			$.dataJS('contminiwin_init').addClass("hidden");
			$.dataJS('contminiwin_manual').removeClass("hidden");
		});

          $(window).on('unload', function(){
               $.dataJS('rowN').val('');
               $.dataJS('colN').val('');
               $.dataJS('widthN').val('');
               $.dataJS('heightN').val('');
          });
     }

    function init() {
         initViewEvents();
          callActions();
		callEvents();

    }

    return {
        init: init,
        settings: {}
    };
});
