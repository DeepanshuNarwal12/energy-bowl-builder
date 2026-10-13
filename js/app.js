
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles form submission, validation,
 * order creation, and confirmation rendering.
 *
 * Step 12: Enhanced Order Confirmation
 */

document.addEventListener("DOMContentLoaded", function () {

    // Get the required page elements
    const bowlForm = document.getElementById("bowlForm");
    const orderSummary = document.getElementById("orderSummary");
    const orderDetails = document.getElementById("orderDetails");

    if (!bowlForm || !orderSummary || !orderDetails) {
        console.error("Required HTML elements were not found.");
        return;
    }

    // Create a container for validation errors
    const errorContainer = document.createElement("div");

    errorContainer.id = "validationErrors";
    errorContainer.className = "validation-errors";
    errorContainer.setAttribute("role", "alert");
    errorContainer.hidden = true;

    bowlForm.parentNode.insertBefore(
        errorContainer,
        bowlForm
    );

    /*
     * Collect checked ingredients from a group.
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
     * Collect customer selections.
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
     * Display validation error messages.
     */
    function displayErrors(errors) {

        errorContainer.replaceChildren();

        const heading = document.createElement("strong");
        heading.textContent = "Please correct the following:";

        const errorList = document.createElement("ul");

        errors.forEach(function (error) {

            const listItem = document.createElement("li");
            listItem.textContent = error;

            errorList.appendChild(listItem);
        });

        errorContainer.appendChild(heading);
        errorContainer.appendChild(errorList);

        errorContainer.hidden = false;

        errorContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    /*
     * Clear previous validation errors.
     */
    function clearErrors() {

        errorContainer.replaceChildren();
        errorContainer.hidden = true;
    }

    /*
     * Create an EnergyBowl instance.
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
     * Generate a reference for the demo order.
     * Uses a date and random hexadecimal characters.
     */
    function generateOrderReference() {

        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        let randomPart;

        if (window.crypto && window.crypto.randomUUID) {

            randomPart = window.crypto
                .randomUUID()
                .replace(/-/g, "")
                .slice(0, 8)
                .toUpperCase();

        } else {

            randomPart = Math.random()
                .toString(16)
                .slice(2, 10)
                .padEnd(8, "0")
                .toUpperCase();
        }

        return `EB-${year}${month}${day}-${randomPart}`;
    }

    /*
     * Format prices consistently.
     */
    function formatPrice(amount) {

        return "$" + amount.toFixed(2);
    }

    /*
     * Create a text element safely.
     */
    function createTextElement(tag, text, className = "") {

        const element = document.createElement(tag);

        element.textContent = text;

        if (className) {
            element.className = className;
        }

        return element;
    }

    /*
     * Create a row showing label and value.
     */
    function createDetailRow(label, value, className = "") {

        const row = document.createElement("div");

        row.className = className
            ? `summary-row ${className}`
            : "summary-row";

        const labelElement = createTextElement(
            "span",
            label,
            "summary-label"
        );

        const valueElement = createTextElement(
            "span",
            value,
            "summary-value"
        );

        row.appendChild(labelElement);
        row.appendChild(valueElement);

        return row;
    }

    /*
     * Display the success message.
     */
    function createSuccessMessage() {

        const message = document.createElement("div");

        message.className = "success-message";

        message.appendChild(
            createTextElement(
                "h3",
                "Order Created Successfully!"
            )
        );

        message.appendChild(
            createTextElement(
                "p",
                "Your customized energy bowl is ready to review."
            )
        );

        return message;
    }

    /*
     * Display the order reference and date.
     */
    function createOrderInformation(reference, date) {

        const container = document.createElement("div");
        container.className = "order-info";

        container.appendChild(
            createDetailRow("Order Reference", reference)
        );

        container.appendChild(
            createDetailRow(
                "Order Date",
                date.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short"
                })
            )
        );

        return container;
    }

    /*
     * Create the selected ingredients section.
     */
    function createIngredientsSummary(bowl) {

        const container = document.createElement("div");
        container.className = "summary-content";

        const fruits = bowl.fruits.length
            ? bowl.fruits.join(", ")
            : "None";

        const toppings = bowl.toppings.length
            ? bowl.toppings.join(", ")
            : "None";

        const instructions = bowl.instructions.trim()
            ? bowl.instructions
            : "None";

        const rows = [
            ["Bowl Size", bowl.size],
            ["Bowl Base", bowl.base],
            ["Fruits", fruits],
            ["Toppings", toppings],
            ["Protein", bowl.protein],
            ["Sweetener", bowl.sweetener],
            ["Special Instructions", instructions]
        ];

        rows.forEach(function (item) {

            container.appendChild(
                createDetailRow(item[0], item[1])
            );
        });

        return container;
    }

    /*
     * Display each price component.
     */
    function createPricingBreakdown(bowl) {

        const section = document.createElement("section");

        section.className = "pricing-breakdown";

        section.appendChild(
            createTextElement("h3", "Price Breakdown")
        );

        const priceList = document.createElement("div");
        priceList.className = "price-list";

        const items = bowl.getPriceBreakdown();

        items.forEach(function (item) {

            priceList.appendChild(
                createDetailRow(
                    item.label,
                    formatPrice(item.amount),
                    "price-row"
                )
            );
        });

        section.appendChild(priceList);

        return section;
    }

    /*
     * Display the final total.
     */
    function createTotalSection(total) {

        const container = document.createElement("div");

        container.className = "price-section";

        container.appendChild(
            createTextElement("span", "Total Price")
        );

        const totalElement = createTextElement(
            "strong",
            formatPrice(total)
        );

        totalElement.id = "totalPrice";

        container.appendChild(totalElement);

        return container;
    }

    /*
     * Render the complete order confirmation.
     */
    function displayOrderSummary(order) {

        const bowl = order.bowl;

        // Remove the previous order summary
        orderDetails.replaceChildren();

        // Display success message
        orderDetails.appendChild(
            createSuccessMessage()
        );

        // Display reference and creation date
        orderDetails.appendChild(
            createOrderInformation(
                order.reference,
                order.date
            )
        );

        // Add selected ingredients heading
        orderDetails.appendChild(
            createTextElement(
                "h3",
                "Your Customized Bowl",
                "section-heading"
            )
        );

        // Add selected ingredients
        orderDetails.appendChild(
            createIngredientsSummary(bowl)
        );

        // Add detailed pricing
        orderDetails.appendChild(
            createPricingBreakdown(bowl)
        );

        // Add total price
        orderDetails.appendChild(
            createTotalSection(order.totalPrice)
        );

        // Reveal the confirmation
        orderSummary.hidden = false;

        // Move the viewport to the confirmation
        orderSummary.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    /*
     * Create and process an order.
     */
    function processOrder(orderData) {

        const customerBowl = createEnergyBowl(orderData);

        const order = {
            reference: generateOrderReference(),
            date: new Date(),
            bowl: customerBowl,
            description: customerBowl.getDescription(),
            totalPrice: customerBowl.calculatePrice()
        };

        console.log("ENERGY BOWL ORDER");
        console.log("Reference:", order.reference);
        console.log("Created Object:", order.bowl);
        console.log("Description:\n" + order.description);
        console.log("Total:", formatPrice(order.totalPrice));

        displayOrderSummary(order);

        return order;
    }

    /*
     * Handle the Place Order button.
     */
    bowlForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        // Hide a previous order confirmation
        orderSummary.hidden = true;

        const customerOrder = getFormData();

        // Validate using validation.js
        const validationResult =
            validateBowlOrder(customerOrder);

        if (!validationResult.isValid) {

            displayErrors(validationResult.errors);

            return;
        }

        // Create and display the valid order
        processOrder(customerOrder);
    });

});
