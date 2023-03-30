<?php

use App\Models\CalculatedPairs;
use League\Fractal\TransformerAbstract;

class CalculatedPairsTransformer extends TransformerAbstract
{

    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(CalculatedPairs $calculated_pair)
    {
        return [
            'array' => json_decode($calculated_pair->array),
            'objective_value' => $calculated_pair->objective_value,
            'result' => $calculated_pair->result,
        ];
    }

}
?>