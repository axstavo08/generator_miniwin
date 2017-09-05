requirejs.config({
    baseUrl: 'js/',
    paths: {
      'jquery': 'libraries/jquery/jquery-1.9.1.min',
      'bootstrap': 'libraries/bootstrap/js/bootstrap.min',
      'generator_miniwin': 'generator_miniwin'
    },
    shim: {
        "bootstrap": {
            "deps": ['jquery']
        }
    }
});