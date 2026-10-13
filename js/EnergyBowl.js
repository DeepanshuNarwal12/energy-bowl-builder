
/*
 * Energy Bowl Builder
 * EnergyBowl.js
 *
 * This class represents a customized energy bowl.
 * It stores the customer's ingredient selections,
 * generates an order description, and calculates
 * the total price.
 */

class EnergyBowl {

    /*
     * Constructor
     * Initializes an energy bowl with the
     * customer's selected options.
     */
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
     * Method: getDescription()
     *
     * Generates a readable description of the
     * customized bowl.
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

        // Handle optional special instructions
        const specialInstructions =
            this.instructions.trim() !== ""
                ? this.instructions
                : "None";

        // Generate the complete bowl description
        return `
Bowl Size: ${this.size}
Bowl Base: ${this.base}
Fruits: ${fruitList}
Toppings: ${toppingList}
Protein: ${this.protein}
Sweetener: ${this.sweetener}
Special Instructions: ${specialInstructions}
        `.trim();

    }

    /*
     * Method: calculatePrice()
     *
     * Calculates the total cost of the energy bowl
     * based on selected ingredients and size.
     *
     * All prices are in US dollars (USD).
     */
    calculatePrice() {

        // Prices for available bowl bases
        const basePrices = {
            "Acai Berry": 6.00,
            "Greek Yogurt": 5.00,
            "Oatmeal": 4.00,
            "Chia Pudding": 5.50
        };

        // Additional prices for bowl sizes
        const sizePrices = {
            "Small": 0.00,
            "Medium": 2.00,
            "Large": 4.00
        };

        // Prices for protein add-ons
        const proteinPrices = {
            "None": 0.00,
            "Whey Protein": 2.00,
            "Plant Protein": 2.50,
            "Peanut Butter": 1.50
        };

        // Prices for sweeteners
        const sweetenerPrices = {
            "None": 0.00,
            "Honey": 0.50,
            "Maple Syrup": 0.75,
            "Agave Syrup": 0.75
        };

        // Individual fruit and topping prices
        const fruitPrice = 0.75;
        const toppingPrice = 0.50;

        // Get the selected base price
        let total = basePrices[this.base];

        // Add the bowl size price
        total += sizePrices[this.size];

        // Calculate the price of selected fruits
        const fruitsTotal =
            this.fruits.length * fruitPrice;

        total += fruitsTotal;

        // Calculate the price of selected toppings
        const toppingsTotal =
            this.toppings.length * toppingPrice;

        total += toppingsTotal;

        // Add selected protein price
        total += proteinPrices[this.protein];

        // Add selected sweetener price
        total += sweetenerPrices[this.sweetener];

        // Round total to two decimal places
        return Math.round(total * 100) / 100;

    }

}
