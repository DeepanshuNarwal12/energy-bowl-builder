
/*
 * Energy Bowl Builder
 * EnergyBowl Class
 *
 * This class represents a customized energy bowl.
 * It stores selected ingredients and generates
 * a readable description of the order.
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

        // Store customer selections
        this.base = base;
        this.size = size;
        this.fruits = fruits;
        this.toppings = toppings;
        this.protein = protein;
        this.sweetener = sweetener;
        this.instructions = instructions;

    }

    /*
     * Generate a complete bowl description.
     * Returns a formatted string.
     */
    getDescription() {

        // Format selected fruits
        const fruitList = this.fruits.length > 0
            ? this.fruits.join(", ")
            : "No fruits selected";

        // Format selected toppings
        const toppingList = this.toppings.length > 0
            ? this.toppings.join(", ")
            : "No toppings selected";

        // Handle special instructions
        const specialInstructions =
            this.instructions.trim() !== ""
                ? this.instructions
                : "None";

        // Generate the complete description
        return `
            Bowl Size: ${this.size}
            Bowl Base: ${this.base}
            Fruits: ${fruitList}
            Toppings: ${toppingList}
            Protein: ${this.protein}
            Sweetener: ${this.sweetener}
            Special Instructions: ${specialInstructions}
        `;

    }

}
