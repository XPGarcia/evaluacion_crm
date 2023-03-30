<?php

namespace App\Http\Controllers;

use App\Models\CalculatedPairs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use CalculatedPairsTransformer;

/**
 * @group Calculador
 *
 * APIs para realizar diferentes cálculos
 */
class CalculatorController extends BaseController 
{

    private function countPairs($arr, $value) {
      sort($arr);

      $count = 0;
      $left = 0;
      $right = 1;
      $len = count($arr);

      while ($right < $len) {
        $diff = $arr[$right] - $arr[$left];
        if ($diff === $value) {
          $count++;
          $left++;
          $right++;
        } else if ($diff < $value) {
          $right++;
        } else {
          $left++;
          if ($left === $right) {
            $right++;
          }
        }
      }

      return $count;
    }

    /**
     * Calcular los pares
     * Determina la cantidad de pares de números que tienen una diferencia igual al valor objetivo
     * dentro de una matriz de enteros positivos.
     * Debe enviar en las cabeceras el token de autorización
     * Ejemplo: Authorization Bearer 1|slghn1EDIJjMvYNkAFQvnHGfPDl5srH8XM11Kyly
     *
     * @bodyParam  userEmail email required  Email del usuario que realizó el cálculo. Example: xavier.garcia@prometeo.dev
     * @bodyParam  array array required  Matriz de enteros positivos. Example: [1, 2, 5, 4, 3]
     * @bodyParam  objectiveValue integer required Valor objetivo que debe ser igual a la diferencia entre los pares. Example: 2
     *
     * @response  200 {
     *  "status_code": "200",
     *  "result": 3
     * }
     */
    public function calculatePairs(Request $request)
    {

      $request->validate([
        'userEmail' => 'required|email',
        'array' => 'required|array|min:2',
        'array.*' => 'integer|min:1',
        'objectiveValue' => 'required|integer|min:1',
      ]);

      $arr = $request->array;
      $value = $request->objectiveValue;
      $count = $this->countPairs($arr, $value);

      $arr_as_string = '['.implode(',', $request->array).']';

      $calculated_pair = new CalculatedPairs();
      $calculated_pair->setConnection('mysql');
      $calculated_pair->user_email = $request->userEmail;
      $calculated_pair->array = $arr_as_string;
      $calculated_pair->objective_value = $request->objectiveValue;
      $calculated_pair->result = $count;
      $calculated_pair->save();

      return response()->json([
        'status_code' => 200,
        'result' => $count
      ]);
    }

    /**
     * Listar resultado de calculo de pares
     * Obtiene los resultados del cálculo de pares de un usuario
     * Debe enviar en las cabeceras el token de autorización
     * Ejemplo: Authorization Bearer 1|slghn1EDIJjMvYNkAFQvnHGfPDl5srH8XM11Kyly
     *
     * @bodyParam  userEmail email required Correo del usuario  Example: xavier.garcia@prometeo.dev
     *
     * @response  {
     * "data": [
     *      {
     *          "id": "asdasdasd",
     *          "array": [1,5,2,4,3],
     *          "objective_value": 2,
     *          "result": 3
     *    },
     *    {
     *          "id": "asdasdasdddd",
     *          "array": [1,2,3],
     *          "objective_value": 1,
     *          "result": 2
     *    }
     * ]
     * }
     *
     * @response 500 {
     *  "message": "Unauthenticated.",
     *  "status_code": 500
     * }
     */
    public function getCalculatedPairs(Request $request)
    {
        $request->validate([
          'userEmail' => 'required|email'
        ]);

        $calculated_pairs = CalculatedPairs::get_calculated_pairs_by_user_email($request->userEmail);

        return $this->response->collection($calculated_pairs, new CalculatedPairsTransformer)->setStatusCode(200);
    }
}