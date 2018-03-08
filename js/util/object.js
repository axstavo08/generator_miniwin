/**
 * Project Name : generator-miniwin
 * Created: 20/02/2018
 * @author Gustavo Ramos M
 */
define([], function() {
     
    var clone;

    /**
     * Clona el objeto
     * @param {type} obj
     * @returns {clone.obj}
     */
    clone = function(obj) {
        if (null === obj || "object" !== typeof obj)
            return obj;
        var copy = obj.constructor(), attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = obj[attr];
        }
        return copy;
    };

    return {
        clone: clone
    };
});
