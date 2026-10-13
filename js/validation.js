
/*
 * Energy Bowl Builder
 * validation.js
 *
 * Validates customer selections before
 * an energy bowl order is processed.
 */

// Allowed options must match the HTML form.
const VALID_BOWL_OPTIONS = {
    bases: [
        "Acai Berry",
        "Greek Yogurt",
        "Oatmeal",
        "Chia Pudding"
    ],

    sizes: [
        "Small",
        "Medium",
        "Large"
    ],

    fruits: [
        "Banana",
        "Strawberry",
        "Blueberry",
        "Mango",
        "Pineapple"
    ],

    toppings: [
        "Granola",
        "Coconut Flakes",
        "Almonds",
        "Chia Seeds",
        "Chocolate Chips"
    ],

    proteins: [
        "None",
        "Whey Protein",
        "Plant Protein",
        "Peanut Butter"
    ],

    sweeteners: [
        "None",
        "Honey",
        "Maple Syrup",
        "Agave Syrup"
    ]
};

/*
 * Function: validateBowlOrder()
 *
 * Checks all values collected from the form.
 *
 * Returns an object containing:
 * - isValid: true or false
 * - errors: an array of validation messages
 */
function validateBowlOrder(orderData) {

    const errors = [];

    // Validate the bowl base
    if (!VALID_BOWL_OPTIONS.bases.includes(orderData.base)) {
        errors.push("Please select a valid bowl base.");
    }

    // Validate the bowl size
    if (!VALID_BOWL_OPTIONS.sizes.includes(orderData.size)) {
        errors.push("Please select a valid bowl size.");
    }

    // Validate fruits
    if (!Array.isArray(orderData.fruits) ||
        orderData.fruits.length === 0) {

        errors.push("Please select at least one fruit.");

    } else if (
        orderData.fruits.some(
            fruit => !VALID_BOWL_OPTIONS.fruits.includes(fruit)
        )
    ) {

        errors.push("An invalid fruit was selected.");

    }

    // Validate toppings
    if (!Array.isArray(orderData.toppings) ||
        orderData.toppings.length === 0) {

        errors.push("Please select at least one topping.");

    } else if (
        orderData.toppings.some(
            topping => !VALID_BOWL_OPTIONS.toppings.includes(topping)
        )
    ) {

        errors.push("An invalid topping was selected.");

    }

    // Validate protein selection
    if (!VALID_BOWL_OPTIONS.proteins.includes(
        orderData.protein
    )) {

        errors.push("Please select a valid protein option.");

    }

    // Validate sweetener selection
    if (!VALID_BOWL_OPTIONS.sweeteners.includes(
        orderData.sweetener
    )) {

        errors.push("Please select a valid sweetener option.");

    }

    // Validate special instructions
    if (typeof orderData.instructions !== "string") {

        errors.push("Special instructions must be text.");

    } else if (orderData.instructions.length > 300) {

        errors.push(
            "Special instructions cannot exceed 300 characters."
        );

    }

    // Return validation result
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
