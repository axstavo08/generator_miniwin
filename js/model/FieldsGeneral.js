/**
 * Project Name : generator-miniwin
 * Created: 20/02/2018
 * @author Gustavo Ramos M
 */
define([], function() {

    "use strict";

    function FieldsGeneral(row, column, width, height) {

        if (!(this instanceof FieldsGeneral)) {
            throw new TypeError("FieldsGeneral constructor cannot be called as a function.");
        }

        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
    }

    FieldsGeneral.prototype = {
        //Constructor
    	   constructor: FieldsGeneral,
        //Getters
        getRow: function() {
             return this.row;
        },
        getColumn: function() {
             return this.column;
        },
        getWidth: function() {
             return this.width;
        },
        getHeight: function() {
             return this.height;
        },
        //Setters
        setRow: function(row){
            this.row = row;
        },
        setColumn: function(column){
            this.column = column;
        },
        setWidth: function(width){
            this.width = width;
        },
        setHeight: function(height){
            this.height = height;
        },
        //Serialize to object
        toObject: function(){
            return {'row': this.row, 'column': this.column, 'width': this.width, 'height': this.height};
        }
    };

    return FieldsGeneral;
});
