
# 🥣 Energy Bowl Builder

### Fresh Ingredients. Your Perfect Bowl.

An interactive, responsive web application that allows customers to create customized energy bowls by selecting their preferred bases, fruits, toppings, protein add-ons, sweeteners, and bowl sizes.

The application uses object-oriented JavaScript to create EnergyBowl objects, generate order descriptions, calculate prices, and display order confirmations.

**Live Website:**  
https://energy-bowl-builder-pearl.vercel.app/

**GitHub Repository:**  
https://github.com/DeepanshuNarwal12/energy-bowl-builder

---

## 📖 1. Project Overview

Energy Bowl Builder is a front-end web application developed using HTML5, CSS3, and JavaScript.

The project demonstrates object-oriented programming, interactive form handling, input validation, responsive design, version control, and deployment.

Customers can customize an energy bowl, calculate its cost, view an order confirmation, download a receipt, and manage previously saved orders.

The application runs entirely in the browser without requiring a backend server or database.

### Project Objectives

- Develop a structured and user-friendly HTML form.
- Apply object-oriented programming using JavaScript.
- Create and use an EnergyBowl class.
- Implement reliable form validation.
- Calculate customized bowl prices dynamically.
- Display detailed order confirmations.
- Support downloadable receipts and order history.
- Create a responsive and professional interface.
- Practice collaborative development using Git and GitHub.
- Deploy the application using Vercel.

---

## 🚀 2. Live Application

The completed application is deployed using Vercel.

### 🌐 [Launch Energy Bowl Builder](https://energy-bowl-builder-pearl.vercel.app/)

**Deployment Platform:** Vercel  
**Version Control:** Git and GitHub  
**Production Branch:** main

The application can be accessed through modern desktop and mobile web browsers.

---

## ✨ 3. Key Features

### 3.1 Customizable Energy Bowls

Customers can select ingredients from several categories.

**Bowl Bases**
- Acai Berry
- Greek Yogurt
- Oatmeal
- Chia Pudding

**Bowl Sizes**
- Small
- Medium
- Large

**Fresh Fruits**
- Banana
- Strawberry
- Blueberry
- Mango
- Pineapple

**Toppings**
- Granola
- Coconut Flakes
- Almonds
- Chia Seeds
- Chocolate Chips

**Protein Add-Ons**
- No Protein
- Whey Protein
- Plant Protein
- Peanut Butter

**Sweeteners**
- No Sweetener
- Honey
- Maple Syrup
- Agave Syrup

Customers can also provide special instructions of up to 300 characters.

### 3.2 Form Validation

The application validates customer selections before creating an order.

Validation includes:
- Required bowl base selection.
- Required bowl size selection.
- At least one fruit.
- At least one topping.
- Valid protein and sweetener options.
- Special instruction character limits.

Invalid submissions display helpful error messages.

### 3.3 Object-Oriented JavaScript

The application implements an EnergyBowl class.

The class uses a constructor to store customer selections and provides methods for generating descriptions and calculating prices.

### 3.4 Dynamic Price Calculation

The total cost changes according to the selected ingredients and size.

The application calculates:
- Bowl base price.
- Size adjustment.
- Fruit charges.
- Topping charges.
- Protein add-on charges.
- Sweetener charges.

Customers receive an itemized price breakdown and final total in US dollars.

### 3.5 Order Confirmation

After submitting a valid order, customers receive a confirmation containing:
- Order reference number.
- Order date and time.
- Selected bowl size and base.
- Selected ingredients.
- Special instructions.
- Itemized pricing.
- Total order cost.

### 3.6 Downloadable Receipt

Customers can download a printable HTML receipt containing their order information.

The receipt can be opened in a browser and saved as a PDF through the browser's printing functionality.

### 3.7 Order History

The application uses the browser's localStorage API to save previous orders.

Customers can:
- View previously created orders.
- Reopen order details.
- Download previous receipts.
- Delete individual orders.
- Clear their order history.

Saved orders remain available after refreshing the website when browser storage is available.

### 3.8 Responsive Design

The interface adapts to different screen sizes.

Design features include:
- Responsive layouts.
- Interactive ingredient selection cards.
- Green-themed interface.
- Hover animations.
- Smooth transitions.
- Accessible form labels.
- Mobile-friendly buttons.

---

## 🛠️ 4. Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Website structure and forms |
| CSS3 | Styling, animations, and responsiveness |
| JavaScript ES6+ | Application logic and user interactions |
| JavaScript Classes | Object-oriented programming |
| DOM API | Dynamic order confirmation |
| localStorage API | Persistent browser order history |
| Git | Source code version control |
| GitHub | Remote repository and collaboration |
| GitHub Desktop | Managing commits and repository changes |
| Visual Studio Code | Development environment |
| Vercel | Website hosting and deployment |

No external JavaScript framework is required.

---

## 📁 5. Project Structure

```text
energy-bowl-builder/
│
├── css/
│   └── style.css
│
├── js/
│   ├── EnergyBowl.js
│   ├── app.js
│   └── validation.js
│
├── index.html
├── README.md
└── .gitattributes
```

### File Descriptions

**index.html**

Contains the website structure, customization form, order confirmation area, and saved order history section.

**css/style.css**

Controls colors, typography, ingredient cards, responsive layouts, animations, and order confirmation styling.

**js/EnergyBowl.js**

Defines the EnergyBowl class, constructor, ingredient properties, bowl descriptions, and pricing methods.

**js/app.js**

Handles user interactions, collects form data, creates bowl objects, renders confirmations, generates receipts, and manages order history.

**js/validation.js**

Validates customer selections before an order is processed.

**README.md**

Provides project documentation, installation instructions, technical information, and deployment details.

---

## 💻 6. Installation and Local Setup

Follow these instructions to run the project locally.

### Prerequisites

- Visual Studio Code or another code editor.
- A modern web browser.
- Git or GitHub Desktop.
- Live Server extension (recommended).

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/DeepanshuNarwal12/energy-bowl-builder.git
```

### Step 2: Open the Project Folder

```bash
cd energy-bowl-builder
```

### Step 3: Open in VS Code

```bash
code .
```

Alternatively, use GitHub Desktop to clone the repository and select **Open in Visual Studio Code**.

### Step 4: Run the Website

Open `index.html` using the Live Server extension.

Alternatively, open `index.html` directly in your browser.

Live Server is recommended for consistent local development and testing.

No package installation, build process, or API key is required.

---

## ⚙️ 7. How the Application Works

### Step 1: Customize a Bowl

The customer selects a base, size, fruits, toppings, protein, sweetener, and optional instructions.

### Step 2: Submit the Form

The customer clicks the **Place My Order** button.

JavaScript prevents the default form submission and collects the selected values.

### Step 3: Validate the Selections

The `validateBowlOrder()` function checks the data.

If validation fails, the application displays error messages.

### Step 4: Create an EnergyBowl Object

For valid submissions, JavaScript creates a new instance of the EnergyBowl class.

Example:

```javascript
const bowl = new EnergyBowl(
    "Acai Berry",
    "Medium",
    ["Banana", "Strawberry"],
    ["Granola", "Almonds"],
    "Whey Protein",
    "Honey",
    "Extra strawberries"
);
```

### Step 5: Generate Order Information

The application uses object methods to generate the description and total price.

```javascript
bowl.getDescription();

bowl.getPriceBreakdown();

bowl.calculatePrice();
```

### Step 6: Display the Confirmation

JavaScript dynamically updates the webpage with the customized bowl details and calculated price.

### Step 7: Save the Order

The order is stored in browser localStorage.

### Step 8: Download a Receipt

Customers can download a printable HTML receipt for the current or a previously saved order.

---

## 🧩 8. Object-Oriented Programming Implementation

The EnergyBowl class is the main object-oriented component of the application.

### Constructor

The constructor receives the following parameters:

```javascript
constructor(
    base,
    size,
    fruits,
    toppings,
    protein,
    sweetener,
    instructions
)
```

Each EnergyBowl object stores its own customer-selected configuration.

### Main Methods

| Method | Description |
|--------|-------------|
| constructor() | Initializes the bowl properties |
| getDescription() | Generates a readable bowl description |
| getPriceBreakdown() | Returns itemized pricing information |
| calculatePrice() | Calculates the total bowl price |

### OOP Concepts Demonstrated

**Classes and Objects**

The EnergyBowl class defines a reusable structure for customized bowls.

**Constructors**

The constructor initializes each object using customer selections.

**Properties**

Each bowl stores information such as base, size, fruits, toppings, protein, and sweetener.

**Methods**

Methods perform operations using the object's stored properties.

**Reusability**

The application can create many EnergyBowl instances without duplicating the class implementation.

---

## 💵 9. Pricing Structure

All prices are example values in USD.

### Bowl Bases

| Base | Price |
|------|-------|
| Acai Berry | $6.00 |
| Greek Yogurt | $5.00 |
| Oatmeal | $4.00 |
| Chia Pudding | $5.50 |

### Bowl Sizes

| Size | Additional Cost |
|------|-----------------|
| Small | $0.00 |
| Medium | $2.00 |
| Large | $4.00 |

### Additional Ingredients

| Ingredient | Price |
|------------|-------|
| Each fruit | $0.75 |
| Each topping | $0.50 |
| Whey Protein | $2.00 |
| Plant Protein | $2.50 |
| Peanut Butter | $1.50 |
| Honey | $0.50 |
| Maple Syrup | $0.75 |
| Agave Syrup | $0.75 |

### Example Calculation

An Acai Berry bowl with the following selections:

- Medium size.
- Two fruits.
- Two toppings.
- Whey protein.
- Honey.

The total is:

```text
Acai Berry Base       $6.00
Medium Size           $2.00
2 Fruits              $1.50
2 Toppings            $1.00
Whey Protein          $2.00
Honey                 $0.50
---------------------------
TOTAL                $13.00
```

The application performs this calculation automatically.

---

## 💾 10. Local Storage Implementation

The application saves order information using the browser's localStorage API.

The storage key is:

```javascript
const STORAGE_KEY = "energyBowlOrders";
```

Order records are converted into JSON before storage.

When saved orders are retrieved, the application reconstructs EnergyBowl objects so that their methods remain available.

### Storage Limitations

- Orders are stored locally in the browser.
- Orders do not synchronize across devices.
- Clearing browser storage can remove saved orders.
- Browser privacy settings may prevent storage.
- The application does not use a backend database.
- A maximum of 50 orders is maintained in the application history.

This is a demonstration application, not a payment processing or restaurant fulfillment service.

---

## 🧪 11. Testing and Quality Assurance

The application was designed to support the following functional tests.

| Test Case | Expected Result |
|-----------|-----------------|
| Submit without a base | Required field warning |
| Submit without a size | Required field warning |
| Submit without fruits | Validation error |
| Submit without toppings | Validation error |
| Submit a valid order | Order confirmation appears |
| Select different ingredients | Price updates according to selections |
| View order summary | Correct ingredients and price appear |
| Download receipt | HTML receipt downloads |
| Save an order | Order appears in history |
| Refresh the webpage | Saved history remains available |
| View previous order | Saved details appear |
| Delete a saved order | Selected record is removed |
| Clear order history | Saved records are removed after confirmation |
| Test mobile layout | Interface adjusts to narrow screens |

### Sample Pricing Test

Input:

```text
Base: Acai Berry
Size: Medium
Fruits: Banana, Strawberry
Toppings: Granola, Almonds
Protein: Whey Protein
Sweetener: Honey
```

Expected output:

```text
Total Price: $13.00
```

### Additional Testing Considerations

Testing should also cover:
- Empty required fields.
- Multiple selected fruits and toppings.
- Different bowl sizes.
- Optional protein and sweetener selections.
- Special instruction limits.
- Order receipt accuracy.
- Browser refresh behavior.
- Desktop and mobile responsiveness.

---


### Git Collaboration Workflow

The team uses Git to record development changes.

The recommended workflow is:

1. Pull the latest changes from GitHub.
2. Develop assigned features.
3. Test the changes locally.
4. Stage modified files.
5. Create a descriptive commit.
6. Push changes to the remote repository.
7. Review and integrate teammate contributions.



### Development Phases

**Phase 1: Structure and Setup**

- Repository setup.
- Initial HTML form.
- Basic CSS styling.
- Project file organization.

**Phase 2: Core Functionality**

- Form input collection.
- Input validation.
- EnergyBowl class implementation.
- Bowl description generation.
- Price calculation.
- Dynamic order confirmation.

**Phase 3: Enhancement and Polish**

- Itemized pricing.
- Downloadable receipts.
- Improved responsive design.
- Interactive ingredient cards.
- Order history.
- Testing and debugging.
- Production deployment.

### Git Commit History

The actual project commit history is available at:

[View GitHub Commit History](https://github.com/DeepanshuNarwal12/energy-bowl-builder/commits/main/)


---

## 🌍 13. Deployment

The Energy Bowl Builder application is deployed using Vercel.

### Deployment Process

1. Complete and test the website locally.
2. Commit the source code using GitHub Desktop.
3. Push the changes to GitHub.
4. Sign in to Vercel using GitHub.
5. Import the GitHub repository.
6. Select the static website configuration.
7. Deploy the project.
8. Test the publicly accessible website.

### Deployment Configuration

| Setting | Configuration |
|---------|---------------|
| Platform | Vercel |
| Repository | DeepanshuNarwal12/energy-bowl-builder |
| Framework | Other (Static HTML/CSS/JavaScript) |
| Root Directory | Repository root |
| Build Command | None |
| Environment Variables | None |
| Production Branch | main |

### Production URL

https://energy-bowl-builder-pearl.vercel.app/

Future changes pushed to the production branch can trigger automatic redeployment through Vercel's Git integration.

---

## 🔒 14. Security and Accessibility

The application incorporates several front-end safety and usability practices.

### Input Validation

Customer selections are checked against supported options.

### Safe DOM Rendering

Customer-provided content is displayed using JavaScript's `textContent` to reduce the risk of unwanted HTML interpretation.

### Browser-Based Storage

Saved orders are stored locally without a backend database.

### Accessibility

The interface uses:
- Semantic HTML elements.
- Associated form labels.
- Fieldsets and legends.
- Keyboard-accessible controls.
- Visible focus indicators.
- Clear validation messages.
- Responsive layouts.
- Reduced-motion styling.

---

## 🔮 15. Future Improvements

Potential future enhancements include:

- Live bowl image previews.
- Nutritional information and calorie estimates.
- Ingredient quantity customization.
- Customer accounts.
- Cloud-based order storage.
- Payment processing.
- Restaurant order management.
- Inventory tracking.
- Promotional discounts.
- Order status notifications.

These features would require additional development and, for some features, backend integration.

---

## 🎥 16. Project Demonstration

The project demonstration video should be approximately 2–3 minutes long.

The demonstration should cover:

1. Introduction to Energy Bowl Builder.
2. Overview of the user interface.
3. Selecting bowl ingredients and size.
4. Form validation.
5. Creating an EnergyBowl object.
6. Viewing the order summary and pricing.
7. Downloading a receipt.
8. Viewing saved order history.
9. GitHub collaboration and commit history.
10. Live deployment on Vercel.


## 📚 17. Learning Outcomes

This project provides practical experience in:

- Front-end web development.
- Object-oriented JavaScript programming.
- HTML form design.
- DOM manipulation.
- Form validation.
- Dynamic price calculation.
- Browser local storage.
- Responsive web design.
- Git version control.
- Team-based software development.
- Website deployment and maintenance.

---

## 📌 18. Project Links

**Live Application**  
https://energy-bowl-builder-pearl.vercel.app/

**GitHub Repository**  
https://github.com/DeepanshuNarwal12/energy-bowl-builder

**Commit History**  
https://github.com/DeepanshuNarwal12/energy-bowl-builder/commits/main/

---

## 📄 19. Project Information

**Project Name:** Energy Bowl Builder  
**Project Type:** Group Web Development Assignment  
**Development Stack:** HTML5, CSS3, JavaScript  
**Development Tools:** VS Code, GitHub Desktop  
**Version Control:** GitHub  
**Hosting Platform:** Vercel  
**Year:** 2026  

---

### 🥣 Energy Bowl Builder

*Fresh choices. Delicious combinations. Built with HTML, CSS, and object-oriented JavaScript.*
