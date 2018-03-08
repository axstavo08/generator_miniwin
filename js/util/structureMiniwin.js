/**
 * Project Name : generator-miniwin
 * Created: 20/02/2018
 * @author Gustavo Ramos M
 */
define({
     'INCLUDE_PACKAGE': '#include "miniwin.h"',
     'NAMESPACE': 'using namespace miniwin;',
     'MAIN_CONTENT': 'int main() { {{content}} }',
     'DIMENSIONS': 'vredimensiona( {{width}}, {{height}} );',
     'FILL_RECTANGLE': 'rectangulo_lleno( {{left}}, {{top}}, {{right}}, {{bottom}} );',
     'LINE': 'linea( {{x_start}}, {{y_start}}, {{x_end}}, {{y_end}} );',
     'REFRESH': 'refresca();',
     'FINISH': 'return 0;'
});
