
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles form input collection, validation,
 * object creation, and order summary rendering.
 *
 * Step 11: Dynamic Order Summary
 */

document.addEventListener("DOMContentLoaded", function () {

    // Get the required HTML elements
    const bowlForm = document.getElementById("bowlForm");
    const orderSummary = document.getElementById("orderSummary");
    const orderDetails = document.getElementById("orderDetails");

    // Verify that required elements exist
    if (!bowlForm || !orderSummary || !orderDetails) {
        console.error("Required page elements were not found.");
        return;
    }

    // Create a container for validation messages
    const errorContainer = document.createElement("div");

    errorContainer.id = "validationErrors";
    errorContainer.setAttribute("role", "alert");
    errorContainer.className = "validation-errors";
    errorContainer.hidden = true;

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
     * Collect customer selections from the form.
     */
    function getFormData() {

        return {
            base: document.getElementById("base").value,

            size: document.getElementById("size").value,

            fruits: getSelectedCheckboxes("fruits"),

            toppings: getSelectedCheckboxes("toppings"),

            protein: document.getElementById("protein").value,

            sweetener: document.getElementById("sweetener").value,

            instructions: document
                .getElementById("instructions")
                .value
                .trim()
        };
    }

    /*
     * Display validation errors safely.
     */
    function displayErrors(errors) {

        errorContainer.replaceChildren();

        const heading = document.createElement("strong");

        heading.textContent = "Please correct the following:";

        errorContainer.appendChild(heading);

        const errorList = document.createElement("ul");

        errors.forEach(function (error) {

            const listItem = document.createElement("li");

            listItem.textContent = error;

            errorList.appendChild(listItem);
        });

        errorContainer.appendChild(errorList);

        errorContainer.hidden = false;

        errorContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    /*
     * Clear existing validation errors.
     */
    function clearErrors() {

        errorContainer.replaceChildren();
        errorContainer.hidden = true;
    }

    /*
     * Create the EnergyBowl object.
     */
    function createEnergyBowl(orderData) {

        return new EnergyBowl(
            orderData.base,
            orderData.size,
            orderData.fruits,
            orderData.toppings,
            orderData.protein,
            orderData.sweetener,
            orderData.instructions
        );
    }

    /*
     * Create one detail row for the order summary.
     *
     * textContent prevents customer-provided
     * instructions from being interpreted as HTML.
     */
    function createDetailRow(label, value) {

        const row = document.createElement("div");
        row.className = "summary-row";

        const labelElement = document.createElement("span");
        labelElement.className = "summary-label";
        labelElement.textContent = label;

        const valueElement = document.createElement("span");
        valueElement.className = "summary-value";
        valueElement.textContent = value;

        row.appendChild(labelElement);
        row.appendChild(valueElement);

        return row;
    }

    /*
     * Display the customized order on the webpage.
     */
    function displayOrderSummary(customerBowl) {

        // Remove any previously displayed order
        orderDetails.replaceChildren();

        // Create the success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";

        const successHeading = document.createElement("h3");
        successHeading.textContent = "Order Created Successfully!";

        const successText = document.createElement("p");
        successText.textContent =
            "Here is your customized energy bowl.";

        successMessage.appendChild(successHeading);
        successMessage.appendChild(successText);

        orderDetails.appendChild(successMessage);

        // Create a container for the selected ingredients
        const summaryContent = document.createElement("div");
        summaryContent.className = "summary-content";

        // Format optional ingredient selections
        const fruits = customerBowl.fruits.length > 0
            ? customerBowl.fruits.join(", ")
            : "None";

        const toppings = customerBowl.toppings.length > 0
            ? customerBowl.toppings.join(", ")
            : "None";

        const instructions = customerBowl.instructions.trim()
            ? customerBowl.instructions
            : "None";

        // Add the bowl information
        summaryContent.appendChild(
            createDetailRow("Bowl Size", customerBowl.size)
        );

        summaryContent.appendChild(
            createDetailRow("Bowl Base", customerBowl.base)
        );

        summaryContent.appendChild(
            createDetailRow("Fruits", fruits)
        );

        summaryContent.appendChild(
            createDetailRow("Toppings", toppings)
        );

        summaryContent.appendChild(
            createDetailRow("Protein", customerBowl.protein)
        );

        summaryContent.appendChild(
            createDetailRow("Sweetener", customerBowl.sweetener)
        );

        summaryContent.appendChild(
            createDetailRow("Special Instructions", instructions)
        );

        orderDetails.appendChild(summaryContent);

        // Create a section showing the total price
        const priceSection = document.createElement("div");
        priceSection.className = "price-section";

        const priceLabel = document.createElement("span");
        priceLabel.textContent = "Total Price";

        const priceValue = document.createElement("strong");
        priceValue.id = "totalPrice";

        priceValue.textContent =
            "$" + customerBowl.calculatePrice().toFixed(2);

        priceSection.appendChild(priceLabel);
        priceSection.appendChild(priceValue);

        orderDetails.appendChild(priceSection);

        // Reveal the hidden order summary
        orderSummary.hidden = false;

        // Automatically scroll to the result
        orderSummary.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    /*
     * Process the customer's order.
     */
    function processOrder(orderData) {

        // Create a new EnergyBowl instance
        const customerBowl = createEnergyBowl(orderData);

        // Generate the description using the class method
        const description = customerBowl.getDescription();

        // Calculate the total price
        const totalPrice = customerBowl.calculatePrice();

        // Display information for debugging
        console.log("ENERGY BOWL ORDER CONFIRMATION");
        console.log("Created Object:", customerBowl);
        console.log("Description:\n" + description);
        console.log("Total Price: $" + totalPrice.toFixed(2));

        // Render the confirmation on the webpage
        displayOrderSummary(customerBowl);

        return customerBowl;
    }

    /*
     * Handle the Place Order button.
     */
    bowlForm.addEventListener("submit", function (event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Clear previous errors
        clearErrors();

        // Hide a previous confirmation
        orderSummary.hidden = true;

        // Collect all form selections
        const customerOrder = getFormData();

        // Validate the customer's selections
        const validationResult =
            validateBowlOrder(customerOrder);

        // Do not process invalid orders
        if (!validationResult.isValid) {

            displayErrors(validationResult.errors);
            return;
        }

        // Create and display the customized bowl
        processOrder(customerOrder);
    });

});
