
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles form validation, order creation,
 * confirmation rendering, and receipt downloads.
 *
 * Step 13: Downloadable Order Receipt
 */

document.addEventListener("DOMContentLoaded", function () {

    const bowlForm = document.getElementById("bowlForm");
    const orderSummary = document.getElementById("orderSummary");
    const orderDetails = document.getElementById("orderDetails");

    if (!bowlForm || !orderSummary || !orderDetails) {
        console.error("Required HTML elements were not found.");
        return;
    }

    // Store the latest successful order in memory
    let currentOrder = null;

    // Create the validation error container
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
     * Collect values of selected checkboxes.
     */
    function getSelectedCheckboxes(groupName) {

        const checkedBoxes = bowlForm.querySelectorAll(
            `input[name="${groupName}"]:checked`
        );

        return Array.from(checkedBoxes).map(
            checkbox => checkbox.value
        );
    }

    /*
     * Collect all customer selections.
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
                .value.trim()
        };
    }

    /*
     * Display validation errors.
     */
    function displayErrors(errors) {

        errorContainer.replaceChildren();

        const heading = document.createElement("strong");
        heading.textContent = "Please correct the following:";

        const list = document.createElement("ul");

        errors.forEach(function (error) {

            const item = document.createElement("li");
            item.textContent = error;
            list.appendChild(item);
        });

        errorContainer.append(heading, list);
        errorContainer.hidden = false;

        errorContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    /*
     * Remove previous validation messages.
     */
    function clearErrors() {

        errorContainer.replaceChildren();
        errorContainer.hidden = true;
    }

    /*
     * Create an EnergyBowl object.
     */
    function createEnergyBowl(data) {

        return new EnergyBowl(
            data.base,
            data.size,
            data.fruits,
            data.toppings,
            data.protein,
            data.sweetener,
            data.instructions
        );
    }

    /*
     * Generate a demo order reference.
     */
    function generateOrderReference() {

        const now = new Date();

        const datePart = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("");

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

        return `EB-${datePart}-${randomPart}`;
    }

    /*
     * Format money in US dollars.
     */
    function formatPrice(amount) {

        return "$" + amount.toFixed(2);
    }

    /*
     * Format the order date and time.
     */
    function formatDate(date) {

        return date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    /*
     * Safely create an HTML text element.
     */
    function createTextElement(
        tag,
        value,
        className = ""
    ) {

        const element = document.createElement(tag);

        element.textContent = String(value);

        if (className) {
            element.className = className;
        }

        return element;
    }

    /*
     * Create a label-and-value row.
     */
    function createDetailRow(
        label,
        value,
        extraClass = ""
    ) {

        const row = document.createElement("div");

        row.className = extraClass
            ? `summary-row ${extraClass}`
            : "summary-row";

        row.appendChild(
            createTextElement(
                "span",
                label,
                "summary-label"
            )
        );

        row.appendChild(
            createTextElement(
                "span",
                value,
                "summary-value"
            )
        );

        return row;
    }

    /*
     * Create the success notification.
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
     * Create order information.
     */
    function createOrderInformation(order) {

        const container = document.createElement("div");
        container.className = "order-info";

        container.appendChild(
            createDetailRow(
                "Order Reference",
                order.reference
            )
        );

        container.appendChild(
            createDetailRow(
                "Order Date",
                formatDate(order.date)
            )
        );

        return container;
    }

    /*
     * Create the ingredient summary.
     */
    function createIngredientsSummary(bowl) {

        const container = document.createElement("div");
        container.className = "summary-content";

        const details = [
            ["Bowl Size", bowl.size],
            ["Bowl Base", bowl.base],
            ["Fruits", bowl.fruits.join(", ") || "None"],
            ["Toppings", bowl.toppings.join(", ") || "None"],
            ["Protein", bowl.protein],
            ["Sweetener", bowl.sweetener],
            [
                "Special Instructions",
                bowl.instructions.trim() || "None"
            ]
        ];

        details.forEach(function ([label, value]) {

            container.appendChild(
                createDetailRow(label, value)
            );
        });

        return container;
    }

    /*
     * Create the itemized price breakdown.
     */
    function createPricingBreakdown(bowl) {

        const section = document.createElement("section");
        section.className = "pricing-breakdown";

        section.appendChild(
            createTextElement(
                "h3",
                "Price Breakdown"
            )
        );

        const priceList = document.createElement("div");
        priceList.className = "price-list";

        bowl.getPriceBreakdown().forEach(function (item) {

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
     * Create the total price section.
     */
    function createTotalSection(total) {

        const section = document.createElement("div");
        section.className = "price-section";

        section.appendChild(
            createTextElement(
                "span",
                "Total Price"
            )
        );

        const totalElement = createTextElement(
            "strong",
            formatPrice(total)
        );

        totalElement.id = "totalPrice";
        section.appendChild(totalElement);

        return section;
    }

    /*
     * Create the receipt download button.
     */
    function createReceiptButton() {

        const button = document.createElement("button");

        button.type = "button";
        button.id = "downloadReceipt";
        button.className = "receipt-btn";

        button.textContent = "⬇ Download Receipt";

        button.addEventListener("click", function () {

            if (!currentOrder) {
                alert("Please place an order first.");
                return;
            }

            downloadReceipt(currentOrder);
        });

        return button;
    }

    /*
     * Generate a printable HTML receipt.
     *
     * Uses DOM textContent to safely render
     * the customer's special instructions.
     */
    function generateReceiptHTML(order) {

        const receipt = document.createElement("main");
        receipt.className = "receipt";

        receipt.appendChild(
            createTextElement(
                "h1",
                "Energy Bowl Builder"
            )
        );

        receipt.appendChild(
            createTextElement(
                "p",
                "CUSTOMIZED ENERGY BOWL RECEIPT",
                "receipt-subtitle"
            )
        );

        receipt.appendChild(
            createTextElement(
                "p",
                "Demo order confirmation — no payment processed.",
                "receipt-note"
            )
        );

        receipt.appendChild(
            createOrderInformation(order)
        );

        receipt.appendChild(
            createTextElement(
                "h2",
                "Your Customized Bowl"
            )
        );

        receipt.appendChild(
            createIngredientsSummary(order.bowl)
        );

        receipt.appendChild(
            createPricingBreakdown(order.bowl)
        );

        receipt.appendChild(
            createTotalSection(order.totalPrice)
        );

        receipt.appendChild(
            createTextElement(
                "p",
                "Thank you for building your energy bowl!",
                "receipt-footer"
            )
        );

        const receiptStyles = `
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background: #f5f8f5;
                padding: 25px;
                line-height: 1.6;
            }

            .receipt {
                max-width: 650px;
                margin: 0 auto;
                padding: 35px;
                background: white;
                border-radius: 12px;
            }

            h1, h2, h3 {
                color: #287a47;
            }

            h1 {
                text-align: center;
                margin-bottom: 5px;
            }

            .receipt-subtitle,
            .receipt-footer,
            .receipt-note {
                text-align: center;
            }

            .receipt-subtitle {
                font-weight: bold;
                margin-bottom: 15px;
            }

            .receipt-note {
                color: #666;
                font-size: 12px;
                margin-bottom: 25px;
            }

            .order-info,
            .summary-content,
            .price-list {
                margin: 15px 0 25px;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
            }

            .summary-row {
                display: flex;
                justify-content: space-between;
                gap: 20px;
                padding: 12px;
                border-bottom: 1px solid #eee;
            }

            .summary-row:last-child {
                border-bottom: none;
            }

            .summary-label {
                font-weight: bold;
            }

            .summary-value {
                text-align: right;
                overflow-wrap: anywhere;
            }

            .price-section {
                display: flex;
                justify-content: space-between;
                background: #eaf6ed;
                padding: 18px;
                border-radius: 8px;
                font-size: 20px;
                font-weight: bold;
            }

            .receipt-footer {
                margin-top: 30px;
                font-size: 13px;
                color: #666;
            }

            @media print {
                body {
                    background: white;
                    padding: 0;
                }

                .receipt {
                    padding: 10px;
                    max-width: none;
                }
            }
        `;

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>Energy Bowl Receipt</title>
    <style>${receiptStyles}</style>
</head>
<body>
    ${receipt.outerHTML}
</body>
</html>`;
    }

    /*
     * Download the receipt as an HTML file.
     */
    function downloadReceipt(order) {

        const receiptHTML = generateReceiptHTML(order);

        const blob = new Blob(
            [receiptHTML],
            { type: "text/html;charset=utf-8" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `EnergyBowl-${order.reference}.html`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        // Release the temporary download URL
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);

        console.log(
            "Receipt downloaded:",
            order.reference
        );
    }

    /*
     * Render the complete order confirmation.
     */
    function displayOrderSummary(order) {

        orderDetails.replaceChildren();

        orderDetails.appendChild(
            createSuccessMessage()
        );

        orderDetails.appendChild(
            createOrderInformation(order)
        );

        orderDetails.appendChild(
            createTextElement(
                "h3",
                "Your Customized Bowl",
                "section-heading"
            )
        );

        orderDetails.appendChild(
            createIngredientsSummary(order.bowl)
        );

        orderDetails.appendChild(
            createPricingBreakdown(order.bowl)
        );

        orderDetails.appendChild(
            createTotalSection(order.totalPrice)
        );

        // Add the new receipt button
        orderDetails.appendChild(
            createReceiptButton()
        );

        orderSummary.hidden = false;

        orderSummary.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    /*
     * Process a valid energy bowl order.
     */
    function processOrder(orderData) {

        const bowl = createEnergyBowl(orderData);

        const order = {
            reference: generateOrderReference(),
            date: new Date(),
            bowl: bowl,
            description: bowl.getDescription(),
            totalPrice: bowl.calculatePrice()
        };

        currentOrder = order;

        console.log("Energy Bowl Order:", order);

        displayOrderSummary(order);

        return order;
    }

    /*
     * Handle form submission.
     */
    bowlForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        orderSummary.hidden = true;

        // A new submission must pass validation
        currentOrder = null;

        const orderData = getFormData();

        const validation = validateBowlOrder(orderData);

        if (!validation.isValid) {

            displayErrors(validation.errors);
            return;
        }

        processOrder(orderData);
    });

});
