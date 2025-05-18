<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'price' => fake()->numberBetween(100,1000),
            'quantity' => fake()->numberBetween(100,1000),
            'is_available' => fake()->boolean(),
            'category' => fake()->randomElement(['T-shirts', 'Polo', 'Jeans', 'Shirts']),
        ];

    }
}
