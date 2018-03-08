/**
 * Project Name : generator-miniwin
 * Created: 20/02/2018
 * @author Gustavo Ramos M
 */
$.dataJS = function(el, sub) {
    if (!sub) {
        return $('[data-js=' + el + ']');
    } else {
        return $('[data-js=' + el + '] ' + sub);
    }
};
