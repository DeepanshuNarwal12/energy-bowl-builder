
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles:
 * - Form input and validation
 * - EnergyBowl object creation
 * - Order confirmation and pricing
 * - Downloadable HTML receipts
 * - Persistent order history
 *
 * Step 15: Local Storage Order History
 */

document.addEventListener("DOMContentLoaded", function () {

    const bowlForm = document.getElementById("bowlForm");
    const orderSummary = document.getElementById("orderSummary");
    const orderDetails = document.getElementById("orderDetails");
    const historyList = document.getElementById("historyList");
    const historyStatus = document.getElementById("historyStatus");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    const STORAGE_KEY = "energyBowlOrders";
    const MAX_SAVED_ORDERS = 50;

    if (
        !bowlForm ||
        !orderSummary ||
        !orderDetails ||
        !historyList ||
        !historyStatus ||
        !clearHistoryBtn
    ) {
        console.error("Required website elements are missing.");
        return;
    }

    let currentOrder = null;
    let orderHistory = [];

    // Validation message container
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
     * General utility functions
     */

    function createTextElement(tag, text, className = "") {

        const element = document.createElement(tag);
        element.textContent = String(text);

        if (className) {
            element.className = className;
        }

        return element;
    }

    function formatPrice(amount) {

        return "$" + amount.toFixed(2);
    }

    function formatDate(date) {

        return date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    function createDetailRow(label, value, extraClass = "") {

        const row = document.createElement("div");

        row.className = extraClass
            ? `summary-row ${extraClass}`
            : "summary-row";

        row.appendChild(
            createTextElement("span", label, "summary-label")
        );

        row.appendChild(
            createTextElement("span", value, "summary-value")
        );

        return row;
    }

    function createButton(label, className, callback) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = className;
        button.textContent = label;
        button.addEventListener("click", callback);

        return button;
    }

    /*
     * Form input collection
     */

    function getSelectedCheckboxes(groupName) {

        return Array.from(
            bowlForm.querySelectorAll(
                `input[name="${groupName}"]:checked`
            )
        ).map(checkbox => checkbox.value);
    }

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
     * Form validation messages
     */

    function displayErrors(errors) {

        errorContainer.replaceChildren();

        errorContainer.appendChild(
            createTextElement(
                "strong",
                "Please correct the following:"
            )
        );

        const list = document.createElement("ul");

        errors.forEach(function (error) {

            list.appendChild(
                createTextElement("li", error)
            );
        });

        errorContainer.appendChild(list);
        errorContainer.hidden = false;

        errorContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    function clearErrors() {

        errorContainer.replaceChildren();
        errorContainer.hidden = true;
    }

    /*
     * EnergyBowl object creation
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
                .slice(0, 12)
                .toUpperCase();

        } else if (window.crypto && window.crypto.getRandomValues) {

            const values = new Uint8Array(6);
            window.crypto.getRandomValues(values);

            randomPart = Array.from(values)
                .map(value => value.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase();

        } else {

            randomPart = Date.now().toString(16).toUpperCase()
                + Math.random().toString(16).slice(2, 6).toUpperCase();
        }

        return `EB-${datePart}-${randomPart}`;
    }

    /*
     * Order confirmation components
     */

    function createSuccessMessage(isPreviousOrder) {

        const container = document.createElement("div");
        container.className = "success-message";

        container.appendChild(
            createTextElement(
                "h3",
                isPreviousOrder
                    ? "Previous Order Details"
                    : "Order Created Successfully!"
            )
        );

        container.appendChild(
            createTextElement(
                "p",
                isPreviousOrder
                    ? "Review your previously saved energy bowl."
                    : "Your customized energy bowl is ready to review."
            )
        );

        return container;
    }

    function createOrderInformation(order) {

        const container = document.createElement("div");
        container.className = "order-info";

        container.appendChild(
            createDetailRow("Order Reference", order.reference)
        );

        container.appendChild(
            createDetailRow("Order Date", formatDate(order.date))
        );

        return container;
    }

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
            ["Special Instructions", bowl.instructions.trim() || "None"]
        ];

        details.forEach(function ([label, value]) {

            container.appendChild(
                createDetailRow(label, value)
            );
        });

        return container;
    }

    function createPricingBreakdown(bowl) {

        const section = document.createElement("section");
        section.className = "pricing-breakdown";

        section.appendChild(
            createTextElement("h3", "Price Breakdown")
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

    function createTotalSection(total) {

        const container = document.createElement("div");
        container.className = "price-section";

        container.appendChild(
            createTextElement("span", "Total Price")
        );

        const priceElement = createTextElement(
            "strong",
            formatPrice(total)
        );

        priceElement.id = "totalPrice";
        container.appendChild(priceElement);

        return container;
    }

    /*
     * Receipt creation
     */

    function generateReceiptHTML(order) {

        const receipt = document.createElement("main");
        receipt.className = "receipt";

        receipt.appendChild(
            createTextElement("h1", "Energy Bowl Builder")
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
                "Demonstration order — no payment processed.",
                "receipt-note"
            )
        );

        receipt.appendChild(createOrderInformation(order));

        receipt.appendChild(
            createTextElement("h2", "Your Customized Bowl")
        );

        receipt.appendChild(createIngredientsSummary(order.bowl));
        receipt.appendChild(createPricingBreakdown(order.bowl));
        receipt.appendChild(createTotalSection(order.totalPrice));

        receipt.appendChild(
            createTextElement(
                "p",
                "Thank you for building your energy bowl!",
                "receipt-footer"
            )
        );

        const styles = `
            * { box-sizing: border-box; }
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background: #f5f8f5;
                line-height: 1.6;
                padding: 25px;
            }
            .receipt {
                max-width: 650px;
                margin: auto;
                padding: 35px;
                background: white;
                border-radius: 12px;
            }
            h1, h2, h3 { color: #287a47; }
            h1, .receipt-subtitle, .receipt-note,
            .receipt-footer { text-align: center; }
            .receipt-note { color: #666; font-size: 12px; }
            .order-info, .summary-content, .price-list {
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                margin: 15px 0 25px;
            }
            .summary-row {
                display: flex;
                justify-content: space-between;
                gap: 20px;
                padding: 12px;
                border-bottom: 1px solid #eee;
            }
            .summary-row:last-child { border-bottom: none; }
            .summary-label { font-weight: bold; }
            .summary-value {
                text-align: right;
                overflow-wrap: anywhere;
            }
            .price-section {
                display: flex;
                justify-content: space-between;
                padding: 18px;
                background: #eaf6ed;
                border-radius: 8px;
                font-size: 20px;
                font-weight: bold;
            }
            .receipt-footer { margin-top: 30px; }
            @media print {
                body { background: white; padding: 0; }
                .receipt { padding: 10px; max-width: none; }
            }
        `;

        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Energy Bowl Receipt</title>
<style>${styles}</style>
</head>
<body>
${receipt.outerHTML}
</body>
</html>`;
    }

    function downloadReceipt(order) {

        const html = generateReceiptHTML(order);

        const blob = new Blob(
            [html],
            { type: "text/html;charset=utf-8" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `EnergyBowl-${order.reference}.html`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    }

    /*
     * Display an order on the webpage
     */

    function displayOrderSummary(order, isPreviousOrder = false) {

        currentOrder = order;
        orderDetails.replaceChildren();

        orderDetails.appendChild(
            createSuccessMessage(isPreviousOrder)
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

        const receiptButton = createButton(
            "⬇ Download Receipt",
            "receipt-btn",
            function () {
                downloadReceipt(order);
            }
        );

        orderDetails.appendChild(receiptButton);

        orderSummary.hidden = false;

        orderSummary.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    /*
     * Local storage helpers
     *
     * Only serializable data is saved.
     * When restored, a new EnergyBowl object is
     * constructed to recover its class methods.
     */

    function serializeOrder(order) {

        return {
            reference: order.reference,
            date: order.date.toISOString(),
            bowl: {
                base: order.bowl.base,
                size: order.bowl.size,
                fruits: [...order.bowl.fruits],
                toppings: [...order.bowl.toppings],
                protein: order.bowl.protein,
                sweetener: order.bowl.sweetener,
                instructions: order.bowl.instructions
            }
        };
    }

    function restoreOrder(saved) {

        if (
            !saved ||
            typeof saved.reference !== "string" ||
            !/^EB-[A-Z0-9-]+$/.test(saved.reference) ||
            !saved.bowl ||
            typeof saved.bowl !== "object"
        ) {
            return null;
        }

        const date = new Date(saved.date);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        // Check saved selections before restoring them
        const validation = validateBowlOrder(saved.bowl);

        if (!validation.isValid) {
            return null;
        }

        const bowl = createEnergyBowl(saved.bowl);

        return {
            reference: saved.reference,
            date: date,
            bowl: bowl,
            description: bowl.getDescription(),
            totalPrice: bowl.calculatePrice()
        };
    }

    function loadOrderHistory() {

        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (!stored) {
                return [];
            }

            const parsed = JSON.parse(stored);

            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed
                .slice(0, MAX_SAVED_ORDERS)
                .map(restoreOrder)
                .filter(order => order !== null);

        } catch (error) {

            console.warn(
                "Unable to load order history:",
                error
            );

            showHistoryStatus(
                "Saved orders could not be loaded in this browser."
            );

            return [];
        }
    }

    function saveOrderHistory() {

        try {
            const savedOrders = orderHistory.map(serializeOrder);

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(savedOrders)
            );

            return true;

        } catch (error) {

            console.warn(
                "Unable to save order history:",
                error
            );

            showHistoryStatus(
                "Browser storage is unavailable. Orders cannot be saved permanently."
            );

            return false;
        }
    }

    function showHistoryStatus(message) {

        historyStatus.textContent = message;
    }

    /*
     * Render saved order cards
     */

    function renderOrderHistory() {

        historyList.replaceChildren();

        clearHistoryBtn.hidden = orderHistory.length === 0;

        if (orderHistory.length === 0) {

            historyList.appendChild(
                createTextElement(
                    "p",
                    "No orders saved yet. Build your first bowl!",
                    "history-empty"
                )
            );

            return;
        }

        orderHistory.forEach(function (order) {

            const card = document.createElement("article");
            card.className = "history-card";

            const top = document.createElement("div");
            top.className = "history-card-top";

            const information = document.createElement("div");

            information.appendChild(
                createTextElement(
                    "h3",
                    `${order.bowl.size} ${order.bowl.base} Bowl`
                )
            );

            information.appendChild(
                createTextElement(
                    "p",
                    order.reference,
                    "history-reference"
                )
            );

            information.appendChild(
                createTextElement(
                    "p",
                    formatDate(order.date),
                    "history-date"
                )
            );

            top.appendChild(information);

            top.appendChild(
                createTextElement(
                    "strong",
                    formatPrice(order.totalPrice),
                    "history-price"
                )
            );

            card.appendChild(top);

            const actions = document.createElement("div");
            actions.className = "history-actions";

            // View a previously placed order
            actions.appendChild(
                createButton(
                    "View Details",
                    "history-btn view-btn",
                    function () {
                        displayOrderSummary(order, true);
                    }
                )
            );

            // Download an old receipt
            actions.appendChild(
                createButton(
                    "Receipt",
                    "history-btn history-receipt-btn",
                    function () {
                        downloadReceipt(order);
                    }
                )
            );

            // Delete a specific order
            actions.appendChild(
                createButton(
                    "Delete",
                    "history-btn delete-btn",
                    function () {
                        deleteOrder(order.reference);
                    }
                )
            );

            card.appendChild(actions);
            historyList.appendChild(card);
        });
    }

    /*
     * Save a newly created order
     */

    function addOrderToHistory(order) {

        orderHistory.unshift(order);

        // Avoid keeping an unlimited number of orders
        orderHistory = orderHistory.slice(
            0,
            MAX_SAVED_ORDERS
        );

        const saved = saveOrderHistory();

        if (saved) {
            showHistoryStatus("Your latest order has been saved.");
        }

        renderOrderHistory();
    }

    /*
     * Delete one previous order
     */

    function deleteOrder(reference) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmed) {
            return;
        }

        orderHistory = orderHistory.filter(
            order => order.reference !== reference
        );

        // Hide details if the deleted order is displayed
        if (
            currentOrder &&
            currentOrder.reference === reference
        ) {
            currentOrder = null;
            orderSummary.hidden = true;
        }

        const saved = saveOrderHistory();

        if (saved) {
            showHistoryStatus("Order deleted successfully.");
        }

        renderOrderHistory();
    }

    /*
     * Delete all saved orders
     */

    function clearOrderHistory() {

        if (orderHistory.length === 0) {
            return;
        }

        const confirmed = window.confirm(
            "Delete all saved energy bowl orders? This cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        orderHistory = [];
        currentOrder = null;
        orderSummary.hidden = true;

        const saved = saveOrderHistory();

        if (saved) {
            showHistoryStatus("All saved orders were deleted.");
        }

        renderOrderHistory();
    }

    clearHistoryBtn.addEventListener(
        "click",
        clearOrderHistory
    );

    /*
     * Process a new order
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

        console.log("Energy Bowl Order:", order);

        displayOrderSummary(order);

        addOrderToHistory(order);

        return order;
    }

    /*
     * Handle Place Order
     */

    bowlForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        const orderData = getFormData();
        const validation = validateBowlOrder(orderData);

        if (!validation.isValid) {

            orderSummary.hidden = true;
            currentOrder = null;

            displayErrors(validation.errors);
            return;
        }

        processOrder(orderData);
    });

    /*
     * Load existing orders when the page starts
     */

    orderHistory = loadOrderHistory();

    renderOrderHistory();

    console.log(
        `Energy Bowl Builder loaded ${orderHistory.length} saved orders.`
    );

});
