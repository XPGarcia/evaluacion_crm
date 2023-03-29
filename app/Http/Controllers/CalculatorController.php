<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @group Calculador
 *
 * APIs para realizar diferentes cálculos
 */
class CalculatorController extends Controller
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
     * Problema: Calcular los pares
     * Determina la cantidad de pares de números que tienen una diferencia igual al valor objetivo
     * dentro de una matriz de enteros positivos. 
     *
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
        'array' => 'required|array|min:2',
        'array.*' => 'integer|min:0',
        'objectiveValue' => 'required|integer|min:1',
      ]);

      $arr = $request->array;
      $value = $request->objectiveValue;
      $count = $this->countPairs($arr, $value);

      return response()->json([
        'status_code' => 200,
        'result' => $count
      ]);
    }
}