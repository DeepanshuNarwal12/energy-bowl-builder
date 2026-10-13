
/*
 * Energy Bowl Builder
 * EnergyBowl Class
 *
 * This class represents a customized energy bowl.
 * It stores the customer's selected ingredients,
 * bowl size, and special instructions.
 */

class EnergyBowl {

    constructor(
        base,
        size,
        fruits,
        toppings,
        protein,
        sweetener,
        instructions
    ) {

        // Store the selected bowl base
        this.base = base;

        // Store the selected bowl size
        this.size = size;

        // Store the selected fruits
        this.fruits = fruits;

        // Store the selected toppings
        this.toppings = toppings;

        // Store the selected protein add-on
        this.protein = protein;

        // Store the selected sweetener
        this.sweetener = sweetener;

        // Store any special instructions
        this.instructions = instructions;

    }

}
