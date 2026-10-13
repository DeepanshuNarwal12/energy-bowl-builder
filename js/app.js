
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles customer interactions with the
 * energy bowl customization form.
 *
 * Step 8:
 * Capture customer selections from the form.
 */

// Wait until the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Get the energy bowl customization form
    const bowlForm = document.getElementById("bowlForm");

    // Confirm that the form exists
    if (!bowlForm) {
        console.error("Energy bowl form was not found.");
        return;
    }

    /*
     * Function: getSelectedCheckboxes()
     *
     * Collects the values of all checked boxes
     * belonging to a particular ingredient group.
     *
     * Parameters:
     * groupName - checkbox name attribute
     *
     * Returns:
     * An array containing selected values.
     */
    function getSelectedCheckboxes(groupName) {

        // Find checked checkboxes in the form
        const checkedBoxes = bowlForm.querySelectorAll(
            `input[name="${groupName}"]:checked`
        );

        // Convert selected checkbox values into an array
        const selectedValues = Array.from(checkedBoxes).map(
            function (checkbox) {
                return checkbox.value;
            }
        );

        return selectedValues;
    }

    /*
     * Function: getFormData()
     *
     * Retrieves all selections made by the customer
     * from the energy bowl customization form.
     *
     * Returns:
     * An object containing all selected options.
     */
    function getFormData() {

        // Get the selected bowl base
        const base = document.getElementById("base").value;

        // Get the selected bowl size
        const size = document.getElementById("size").value;

        // Get selected fruits
        const fruits = getSelectedCheckboxes("fruits");

        // Get selected toppings
        const toppings = getSelectedCheckboxes("toppings");

        // Get selected protein add-on
        const protein = document.getElementById("protein").value;

        // Get selected sweetener
        const sweetener = document.getElementById("sweetener").value;

        // Get and clean special instructions
        const instructions = document
            .getElementById("instructions")
            .value
            .trim();

        // Store selections in one object
        const formData = {
            base: base,
            size: size,
            fruits: fruits,
            toppings: toppings,
            protein: protein,
            sweetener: sweetener,
            instructions: instructions
        };

        // Return the customer's selections
        return formData;
    }

    /*
     * Form Submission Event
     *
     * Runs when a customer clicks Place Order.
     */
    bowlForm.addEventListener("submit", function (event) {

        // Prevent the browser from reloading the page
        event.preventDefault();

        // Capture customer selections
        const customerOrder = getFormData();

        // Display captured information in the console
        console.log("Customer Order Data:");
        console.log(customerOrder);

        // Confirm successful input collection
        console.log("Form inputs captured successfully.");

    });

});
