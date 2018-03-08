/**
 * Project Name : generator-miniwin
 * Created: 20/02/2018
 * @author Gustavo Ramos M
 */
 define([
      'FieldsGeneral', 'structure_miniwin', 'object', 'res_labels', 'colorpicker'
], function(FieldsGeneral, structureMiniwin, object, resLabels){

     var fieldsGeneral;

     function buildModel() {
          fieldsGeneral = new FieldsGeneral($.dataJS('rowN').val(), $.dataJS('colN').val(),
                                   $.dataJS('widthN').val(), $.dataJS('heightN').val());
     }

     function generate() {
		var isOk, structBody;
          buildModel();
          isOk = validateFields(fieldsGeneral.toObject());
          if(isOk) {
               $.dataJS('msgError').addClass('hidden');
               buildContent(structBody);
          } else {
               $.dataJS('msgError').removeClass('hidden');
          }
     }

     function buildContent(structBody) {
          var mainContent;

          //Cabecera
          structBody = structureMiniwin['INCLUDE_PACKAGE'].concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE)
                         .concat(structureMiniwin['NAMESPACE']).concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE)
                         .concat(object.clone(structureMiniwin['MAIN_CONTENT']));

          //Contenido principal
          mainContent = resLabels.NEW_LINE.concat(resLabels.NEW_LINE).concat(resLabels.TAB_LINE);

          //Dimensiones
          mainContent = mainContent.concat(object.clone(structureMiniwin['DIMENSIONS'])
                              .replace('{{width}}', fieldsGeneral.getColumn() * fieldsGeneral.getWidth())
                              .replace('{{height}}', fieldsGeneral.getRow() * fieldsGeneral.getHeight()));

          //Estructura
          mainContent = mainContent.concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE)
                    .concat(getRowsContentBody()).concat(resLabels.TAB_LINE)
                    .concat('/*------------------------------------------------------------------*/')
                    .concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE)
                    .concat(getLineColumnsContentBody()).concat(resLabels.NEW_LINE)
                    .concat(getLineRowsContentBody()).concat(resLabels.TAB_LINE)
                    .concat(structureMiniwin['REFRESH']).concat(resLabels.NEW_LINE).concat(resLabels.TAB_LINE)
                    .concat(structureMiniwin['FINISH']).concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE);

          //Reemplaza contenido principal
          structBody = structBody.replace('{{content}}', mainContent);

          //Construye contenido en texto y exporta
          saveTextAsFile(structBody);
     }

     function getRowsContentBody() {
          var  structRows = "", counter = 0, vWidth = parseInt(fieldsGeneral.getWidth()), vHeight = parseInt(fieldsGeneral.getHeight()),
               vRow = parseInt(fieldsGeneral.getRow()), vColumn = parseInt(fieldsGeneral.getColumn()),
               vTop = 0, vBottom = vHeight, iRow, iColumn;
          for(iRow=1; iRow<=vRow; iRow++){
               structRows += resLabels.TAB_LINE.concat('/*').concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat('** FILA ').concat(iRow).concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat('*/').concat(resLabels.NEW_LINE);
               for(iColumn=1; iColumn<=vColumn; iColumn++){
                    structRows = structRows.concat(resLabels.TAB_LINE).concat(resLabels.COLORS.WHITE_SMOKE).concat(resLabels.NEW_LINE)
                         .concat(resLabels.TAB_LINE)
                         .concat(object.clone(structureMiniwin['FILL_RECTANGLE'])
                              .replace('{{left}}', counter).replace('{{top}}', vTop)
                              .replace('{{right}}', counter + vWidth).replace('{{bottom}}', vBottom))
                         .concat(resLabels.NEW_LINE)
                    counter += vWidth;
               }
               structRows = structRows.concat(resLabels.NEW_LINE);
               vTop += vHeight;
               vBottom += vHeight;
               counter = 0;
          }
          return structRows;
     }

     function getLineColumnsContentBody() {
          var structLines = "", iColumn, lineWidth = 0, vWidth = parseInt(fieldsGeneral.getWidth()), vHeight = parseInt(fieldsGeneral.getHeight()),
               vRow = parseInt(fieldsGeneral.getRow()), vColumn = parseInt(fieldsGeneral.getColumn());
          for(iColumn=0; iColumn<=vColumn; iColumn++){
               structLines += resLabels.TAB_LINE.concat('/*').concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat('* LINEA DE COLUMNA ').concat(iColumn).concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat('*/').concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat(resLabels.COLORS.BLACK).concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE)
                              .concat(object.clone(structureMiniwin['LINE'])
                                   .replace('{{x_start}}', lineWidth-1).replace('{{y_start}}', 0)
                                   .replace('{{x_end}}', lineWidth-1).replace('{{y_end}}', vRow * vHeight))
                              .concat(resLabels.NEW_LINE).concat(resLabels.TAB_LINE)
                              .concat(object.clone(structureMiniwin['LINE'])
                                   .replace('{{x_start}}', lineWidth).replace('{{y_start}}', 0)
                                   .replace('{{x_end}}', lineWidth).replace('{{y_end}}', vRow * vHeight))
                              .concat(resLabels.NEW_LINE).concat(resLabels.TAB_LINE)
                              .concat(object.clone(structureMiniwin['LINE'])
                                   .replace('{{x_start}}', lineWidth+1).replace('{{y_start}}', 0)
                                   .replace('{{x_end}}', lineWidth+1).replace('{{y_end}}', vRow * vHeight))
                              .concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE);
               lineWidth += vWidth;
          }
          return structLines;
     }

     function getLineRowsContentBody() {
          var structLines = "", iRow, lineHeight = 0, vWidth = parseInt(fieldsGeneral.getWidth()), vHeight = parseInt(fieldsGeneral.getHeight()),
               vRow = parseInt(fieldsGeneral.getRow()), vColumn = parseInt(fieldsGeneral.getColumn());
          for(iRow=0; iRow<=vRow; iRow++){
               structLines += resLabels.TAB_LINE.concat('/*').concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat('* LINEA DE FILA ').concat(iRow).concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat('*/').concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE).concat(resLabels.COLORS.BLACK).concat(resLabels.NEW_LINE)
                              .concat(resLabels.TAB_LINE)
                              .concat(object.clone(structureMiniwin['LINE'])
                                   .replace('{{x_start}}', 0).replace('{{y_start}}', lineHeight-1)
                                   .replace('{{x_end}}', vColumn * vWidth).replace('{{y_end}}', lineHeight-1))
                              .concat(resLabels.NEW_LINE).concat(resLabels.TAB_LINE)
                              .concat(object.clone(structureMiniwin['LINE'])
                                   .replace('{{x_start}}', 0).replace('{{y_start}}', lineHeight)
                                   .replace('{{x_end}}', vColumn * vWidth).replace('{{y_end}}', lineHeight))
                              .concat(resLabels.NEW_LINE).concat(resLabels.TAB_LINE)
                              .concat(object.clone(structureMiniwin['LINE'])
                                   .replace('{{x_start}}', 0).replace('{{y_start}}', lineHeight+1)
                                   .replace('{{x_end}}', vColumn * vWidth).replace('{{y_end}}', lineHeight+1))
                              .concat(resLabels.NEW_LINE).concat(resLabels.NEW_LINE);
               lineHeight += vHeight;
          }
          return structLines;
     }

     function validateFields(values) {
		var regex = /^[0-9\b.,]+$/, isOk, iValue, value, valFields = {'error': 0};
		for(iValue in values) {
			value = values[iValue];
			if(!regex.test(value)) {
				valFields['error'] = valFields['error'] + 1;
			}
		}
		isOk = (valFields['error'] == 0) ? true : false;
		return isOk;
	}

     function saveTextAsFile(content) {
		var textToSave = content, textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"}),
		    textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob), fileNameToSaveAs = 'graphics_code_miniwin',
			downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = textToSaveAsURL;
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	function destroyClickedElement(event) {
		document.body.removeChild(event.target);
	}

     function initialize() {
          //buildModel();
     }

     return {
          initialize: initialize,
          generate: generate
     };
});
