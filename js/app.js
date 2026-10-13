
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles form input collection,
 * validation, and customer feedback.
 *
 * Step 9: Form Validation
 */

document.addEventListener("DOMContentLoaded", function () {

    // Get the customization form
    const bowlForm = document.getElementById("bowlForm");

    // Verify the form exists
    if (!bowlForm) {
        console.error("Energy bowl form was not found.");
        return;
    }

    // Create a container for validation messages
    const errorContainer = document.createElement("div");

    errorContainer.id = "validationErrors";
    errorContainer.setAttribute("role", "alert");

    errorContainer.style.display = "none";
    errorContainer.style.backgroundColor = "#fff1f0";
    errorContainer.style.color = "#a61b1b";
    errorContainer.style.border = "1px solid #f2b8b5";
    errorContainer.style.borderRadius = "8px";
    errorContainer.style.padding = "15px";
    errorContainer.style.marginBottom = "20px";

    // Place the error container before the form
    bowlForm.parentNode.insertBefore(
        errorContainer,
        bowlForm
    );

    /*
     * Collect selected checkbox values.
     */
    function getSelectedCheckboxes(groupName) {

        const checkedBoxes = bowlForm.querySelectorAll(
            `input[name="${groupName}"]:checked`
        );

        return Array.from(checkedBoxes).map(
            function (checkbox) {
                return checkbox.value;
            }
        );
    }

    /*
     * Collect all form values.
     */
    function getFormData() {

        const base = document.getElementById("base").value;

        const size = document.getElementById("size").value;

        const fruits = getSelectedCheckboxes("fruits");

        const toppings = getSelectedCheckboxes("toppings");

        const protein = document.getElementById("protein").value;

        const sweetener =
            document.getElementById("sweetener").value;

        const instructions = document
            .getElementById("instructions")
            .value
            .trim();

        return {
            base: base,
            size: size,
            fruits: fruits,
            toppings: toppings,
            protein: protein,
            sweetener: sweetener,
            instructions: instructions
        };
    }

    /*
     * Display validation error messages.
     *
     * Uses textContent rather than inserting
     * untrusted values as HTML.
     */
    function displayErrors(errors) {

        // Clear previous messages
        errorContainer.replaceChildren();

        // Add an error heading
        const heading = document.createElement("strong");
        heading.textContent = "Please correct the following:";

        errorContainer.appendChild(heading);

        // Create a list of errors
        const errorList = document.createElement("ul");

        errorList.style.marginTop = "10px";
        errorList.style.paddingLeft = "20px";

        errors.forEach(function (error) {

            const listItem = document.createElement("li");

            listItem.textContent = error;

            errorList.appendChild(listItem);

        });

        errorContainer.appendChild(errorList);

        // Make errors visible
        errorContainer.style.display = "block";

        // Scroll to the error messages
        errorContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    /*
     * Remove validation messages.
     */
    function clearErrors() {

        errorContainer.replaceChildren();
        errorContainer.style.display = "none";

    }

    /*
     * Handle form submission.
     */
    bowlForm.addEventListener("submit", function (event) {

        // Prevent page reload
        event.preventDefault();

        // Clear previous errors
        clearErrors();

        // Collect customer selections
        const customerOrder = getFormData();

        // Validate customer selections
        const validationResult =
            validateBowlOrder(customerOrder);

        // Stop if the order is invalid
        if (!validationResult.isValid) {

            displayErrors(validationResult.errors);

            console.warn(
                "Order validation failed:",
                validationResult.errors
            );

            return;
        }

        // Form passed all validation checks
        console.log("Validation successful!");

        console.log("Customer Order:", customerOrder);

        // Step 10 will create an EnergyBowl object.
        // Step 11 will display the order summary.

    });

});
