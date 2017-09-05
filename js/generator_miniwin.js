define([
    'jquery', 'bootstrap'
], function($) {

    var body, colorGen = 'color_rgb(242, 242, 242);', colorLine = 'color_rgb(13, 13, 13);',
		newLine = '\r\n', tabLine = '\t';

    function buildUI() {
		$("#navminiwin_init").on('click', function(){
			console.log("prueba");
			$("#navminiwin_manual").removeClass("active");
			$("#navminiwin_init").addClass("active");
			//$("#conthandsontable").addClass("hidden");
			//$("#contkendoui").removeClass("hidden");
		});

		$("#navminiwin_manual").on('click', function(){
			console.log("prueba");
			$("#navminiwin_init").removeClass("active");
			$("#navminiwin_manual").addClass("active");
			//$("#contkendoui").addClass("hidden");
			//$("#conthandsontable").removeClass("hidden");
		});
		
		$("#generate").on('click', function(){
			body = '#include "miniwin.h"'+newLine;
			body += newLine;
			body += 'using namespace miniwin;'+newLine;
			body += newLine;
			body += 'int main() {'+newLine;
			body += newLine;
			body += tabLine+'vredimensiona('+($("#colN").val() * $("#widthN").val())+','+($("#rowN").val() * $("#heightN").val())+');'+newLine;
			body += newLine;
			body += tabLine+'/*Color blanco por defecto en cada linea, este se debe cambiar'+newLine;
			body += tabLine+'para dar color personalizado a las formas.*/'+newLine;
			body += newLine;
			var counter = 0;
			var w = parseInt($("#widthN").val());
			var h = parseInt($("#heightN").val());
			var top = 0;
			var bottom = h;
			for(var i=1; i<=parseInt($("#rowN").val()); i++){
				body += tabLine+'/*'+newLine;
				body += tabLine+'* FILA '+i+newLine;
				body += tabLine+'*/'+newLine;
				for(var j=1; j<=parseInt($("#colN").val()); j++){
					body += tabLine+colorGen+newLine;
					body += tabLine+'rectangulo_lleno('+counter+','+top+','+(counter+w)+','+bottom+');'+newLine;
					counter += w;
				}
				body += newLine;
				top += h;
				bottom += h;
				counter = 0;
			}
			body += tabLine+'/*------------------------------------------------------------------*/'+newLine;
			body += newLine;
			var lineW = 0;
			for(var k=0; k<=parseInt($("#colN").val()); k++){
				body += tabLine+'/*'+newLine;
				body += tabLine+'* LINEA DE COLUMNA '+k+newLine;
				body += tabLine+'*/'+newLine;
				body += tabLine+colorLine+newLine;
				body += tabLine+'linea('+(lineW-1)+','+0+','+(lineW-1)+','+parseInt($("#rowN").val() * $("#heightN").val())+');'+newLine;
				body += tabLine+'linea('+lineW+','+0+','+lineW+','+parseInt($("#rowN").val() * $("#heightN").val())+');'+newLine;
				body += tabLine+'linea('+(lineW+1)+','+0+','+(lineW+1)+','+parseInt($("#rowN").val() * $("#heightN").val())+');'+newLine;
				body += newLine;
				lineW += w;
			}
			body += newLine;
			var lineH = 0;
			for(var l=0; l<=parseInt($("#rowN").val()); l++){
				body += tabLine+'/*'+newLine;
				body += tabLine+'* LINEA DE FILA '+l+newLine;
				body += tabLine+'*/'+newLine;
				body += tabLine+colorLine+newLine;
				body += tabLine+'linea('+0+','+(lineH-1)+','+parseInt($("#colN").val() * $("#widthN").val())+','+(lineH-1)+');'+newLine;
				body += tabLine+'linea('+0+','+lineH+','+parseInt($("#colN").val() * $("#widthN").val())+','+lineH+');'+newLine;
				body += tabLine+'linea('+0+','+(lineH+1)+','+parseInt($("#colN").val() * $("#widthN").val())+','+(lineH+1)+');'+newLine;
				body += newLine;
				lineH += h;
			}
			body += tabLine+'refresca();'+newLine;
			body += tabLine+'return 0;'+newLine;
			body += newLine;
			body += '}';
			saveTextAsFile();
		});
		
		$('#info_rows').tooltip(); 
		$('#info_cols').tooltip(); 
		$('#info_height').tooltip(); 
		$('#info_width').tooltip(); 
    }
	
	function saveTextAsFile(){
		var textToSave = body;
		var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
		var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
		var fileNameToSaveAs = 'graphics_code_miniwin';
	 
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = textToSaveAsURL;
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	 
		downloadLink.click();
	}
	 
	function destroyClickedElement(event){
		document.body.removeChild(event.target);
	}
	
    function init() {
		buildUI();
    }

    return {
        init: init,
        settings: {}
    };
});
