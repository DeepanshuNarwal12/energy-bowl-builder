
/*
 * Energy Bowl Builder
 * app.js
 *
 * Handles customer interactions with the
 * energy bowl customization form.
 *
 * Step 10:
 * Connect form submission to the EnergyBowl class.
 */

document.addEventListener("DOMContentLoaded", function () {

    // Get the customization form
    const bowlForm = document.getElementById("bowlForm");

    // Verify that the form exists
    if (!bowlForm) {
        console.error("Energy bowl form was not found.");
        return;
    }

    // Create a container for validation errors
    const errorContainer = document.createElement("div");

    errorContainer.id = "validationErrors";
    errorContainer.setAttribute("role", "alert");

    // Style the validation error container
    errorContainer.style.display = "none";
    errorContainer.style.backgroundColor = "#fff1f0";
    errorContainer.style.color = "#a61b1b";
    errorContainer.style.border = "1px solid #f2b8b5";
    errorContainer.style.borderRadius = "8px";
    errorContainer.style.padding = "15px";
    errorContainer.style.marginBottom = "20px";

    // Insert error messages before the form
    bowlForm.parentNode.insertBefore(
        errorContainer,
        bowlForm
    );

    /*
     * Function: getSelectedCheckboxes()
     *
     * Collects all selected checkbox values
     * from a particular ingredient group.
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
     * Function: getFormData()
     *
     * Collects all customer selections
     * from the customization form.
     */
    function getFormData() {

        // Get selected base
        const base = document.getElementById("base").value;

        // Get selected size
        const size = document.getElementById("size").value;

        // Get selected fruits
        const fruits = getSelectedCheckboxes("fruits");

        // Get selected toppings
        const toppings = getSelectedCheckboxes("toppings");

        // Get selected protein
        const protein =
            document.getElementById("protein").value;

        // Get selected sweetener
        const sweetener =
            document.getElementById("sweetener").value;

        // Get special instructions
        const instructions = document
            .getElementById("instructions")
            .value
            .trim();

        // Return all selections as an object
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
     * Function: displayErrors()
     *
     * Displays validation error messages.
     */
    function displayErrors(errors) {

        // Remove previous error messages
        errorContainer.replaceChildren();

        // Add heading
        const heading = document.createElement("strong");

        heading.textContent =
            "Please correct the following:";

        errorContainer.appendChild(heading);

        // Create error list
        const errorList = document.createElement("ul");

        errorList.style.marginTop = "10px";
        errorList.style.paddingLeft = "20px";

        // Add each error to the list
        errors.forEach(function (error) {

            const listItem = document.createElement("li");

            listItem.textContent = error;

            errorList.appendChild(listItem);

        });

        errorContainer.appendChild(errorList);

        // Show error messages
        errorContainer.style.display = "block";

        // Scroll to validation errors
        errorContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    /*
     * Function: clearErrors()
     *
     * Removes previous validation messages.
     */
    function clearErrors() {

        errorContainer.replaceChildren();

        errorContainer.style.display = "none";

    }

    /*
     * Function: createEnergyBowl()
     *
     * Creates a new EnergyBowl object using
     * the customer's form selections.
     */
    function createEnergyBowl(orderData) {

        const energyBowl = new EnergyBowl(
            orderData.base,
            orderData.size,
            orderData.fruits,
            orderData.toppings,
            orderData.protein,
            orderData.sweetener,
            orderData.instructions
        );

        return energyBowl;

    }

    /*
     * Function: processOrder()
     *
     * Creates an EnergyBowl object and
     * executes its methods.
     */
    function processOrder(orderData) {

        // Instantiate a new EnergyBowl object
        const customerBowl = createEnergyBowl(orderData);

        // Generate the bowl description
        const bowlDescription =
            customerBowl.getDescription();

        // Calculate the total bowl price
        const totalPrice =
            customerBowl.calculatePrice();

        // Display results in browser console
        console.log("================================");

        console.log("ENERGY BOWL ORDER CONFIRMATION");

        console.log("================================");

        console.log("EnergyBowl Object:", customerBowl);

        console.log("Bowl Description:");

        console.log(bowlDescription);

        console.log(
            "Total Price: $" + totalPrice.toFixed(2)
        );

        console.log("Order processed successfully!");

        // Return the processed order information
        return {
            bowl: customerBowl,
            description: bowlDescription,
            totalPrice: totalPrice
        };

    }

    /*
     * Form Submission Event
     *
     * Executes when the customer clicks
     * the Place Order button.
     */
    bowlForm.addEventListener("submit", function (event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Clear previous validation errors
        clearErrors();

        // Collect customer selections
        const customerOrder = getFormData();

        // Validate the order
        const validationResult =
            validateBowlOrder(customerOrder);

        // Stop processing if validation fails
        if (!validationResult.isValid) {

            displayErrors(validationResult.errors);

            console.warn(
                "Order validation failed:",
                validationResult.errors
            );

            return;
        }

        // Confirm successful validation
        console.log("Form validation successful!");

        // Create and process the EnergyBowl object
        const processedOrder =
            processOrder(customerOrder);

        // Confirm that the object was created
        console.log(
            "Created EnergyBowl:",
            processedOrder.bowl instanceof EnergyBowl
        );

        /*
         * Step 11:
         * Display the processed order summary
         * dynamically on the webpage.
         */

    });

});
