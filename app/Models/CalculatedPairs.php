<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CalculatedPairs extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $incrementing = false;
    protected $connection = 'mysql';
    protected $table = 'calculated_pairs';

    public function __construct(array $attributes = array())
    {
        parent::__construct($attributes);

        $this->setConnection(get_connection());
    }

    public static function get_calculated_pairs_by_user_email($user_email)
    {
        $calculations = CalculatedPairs::on('mysql')->where('user_email', $user_email)
            ->select('array', 'objective_value', 'result')
            ->get();

        return $calculations;
    }
 
}