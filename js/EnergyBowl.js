
/*
 * Energy Bowl Builder
 * EnergyBowl.js
 *
 * Object-oriented model for customized energy bowls.
 * Handles ingredients, descriptions, and pricing.
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
        this.base = base;
        this.size = size;
        this.fruits = [...fruits];
        this.toppings = [...toppings];
        this.protein = protein;
        this.sweetener = sweetener;
        this.instructions = instructions;
    }

    /*
     * Generate a readable description of the bowl.
     */
    getDescription() {

        const fruitList = this.fruits.length > 0
            ? this.fruits.join(", ")
            : "No fruits selected";

        const toppingList = this.toppings.length > 0
            ? this.toppings.join(", ")
            : "No toppings selected";

        const specialInstructions =
            this.instructions.trim() !== ""
                ? this.instructions
                : "None";

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
     * Generate an itemized price breakdown.
     *
     * Each item contains a description and amount.
     * Prices are in US dollars.
     */
    getPriceBreakdown() {

        const basePrices = {
            "Acai Berry": 6.00,
            "Greek Yogurt": 5.00,
            "Oatmeal": 4.00,
            "Chia Pudding": 5.50
        };

        const sizePrices = {
            "Small": 0.00,
            "Medium": 2.00,
            "Large": 4.00
        };

        const proteinPrices = {
            "None": 0.00,
            "Whey Protein": 2.00,
            "Plant Protein": 2.50,
            "Peanut Butter": 1.50
        };

        const sweetenerPrices = {
            "None": 0.00,
            "Honey": 0.50,
            "Maple Syrup": 0.75,
            "Agave Syrup": 0.75
        };

        const fruitPrice = 0.75;
        const toppingPrice = 0.50;

        const breakdown = [];

        // Add base price
        breakdown.push({
            label: `${this.base} Base`,
            amount: basePrices[this.base]
        });

        // Add size adjustment
        breakdown.push({
            label: `${this.size} Size`,
            amount: sizePrices[this.size]
        });

        // Add fruit charges
        if (this.fruits.length > 0) {
            breakdown.push({
                label: `${this.fruits.length} Fruit(s)`,
                amount: this.fruits.length * fruitPrice
            });
        }

        // Add topping charges
        if (this.toppings.length > 0) {
            breakdown.push({
                label: `${this.toppings.length} Topping(s)`,
                amount: this.toppings.length * toppingPrice
            });
        }

        // Add protein charge
        if (this.protein !== "None") {
            breakdown.push({
                label: this.protein,
                amount: proteinPrices[this.protein]
            });
        }

        // Add sweetener charge
        if (this.sweetener !== "None") {
            breakdown.push({
                label: this.sweetener,
                amount: sweetenerPrices[this.sweetener]
            });
        }

        return breakdown;
    }

    /*
     * Calculate the total from the itemized prices.
     */
    calculatePrice() {

        const breakdown = this.getPriceBreakdown();

        const total = breakdown.reduce(
            function (sum, item) {
                return sum + item.amount;
            },
            0
        );

        return Math.round(total * 100) / 100;
    }
}
