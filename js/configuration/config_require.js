/*===========================================================================
Project: Generator Miniwin
Author: Gustavo Andrés Ramos Montalvo
============================================================================*/

requirejs.config({
    baseUrl: 'js/',
    paths: {
      //libraries
      'jquery': 'library/jquery/jquery-3.2.1.min',
      'bootstrap': 'library/bootstrap/js/bootstrap.min',
	 'colorpicker': 'library/bootstrap_colorpicker/dist/js/bootstrap-colorpicker.min',
      //resources
      'res_colors': 'resource/res_colors',
      'res_labels': 'resource/res_labels',
      //util
      'dataview': 'util/dataview',
      'structure_miniwin': 'util/structureMiniwin',
      'object': 'util/object',
      //events
      'ev_dashboard': 'event/ev_dashboard',
      //actions
      'dashboard': 'action/dashboard',
      'instructions': 'action/instructions',
      //model
      'FieldsGeneral': 'model/FieldsGeneral',
      //views
      'generator_miniwin': 'view/generator_miniwin'
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
	   'colorpicker': {
            'deps': ['jquery']
       },
       'dataview': {
            'deps': ['jquery']
       },
       'generator_miniwin': {
            'deps': ['bootstrap', 'dataview']
       },
    }
});
