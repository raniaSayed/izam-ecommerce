<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use hasFactory;
    protected $fillable = ['name', 'price', 'category'];
    protected static function factory(): Factory
    {
        return ProductFactory::new();
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }
}
