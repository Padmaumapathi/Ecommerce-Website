function filterProducts() {
    const categorySelect = document.getElementById("categorySelect");
    const selectedCategory = categorySelect.value; // Get the selected category
    const products = document.querySelectorAll(".product"); // Get all product elements

    products.forEach(product => {
        const productCategory = product.getAttribute("data-category");

        if (selectedCategory === "all" || productCategory === selectedCategory) {
            product.style.display = "block"; // Show product
        } else {
            product.style.display = "none"; // Hide product
        }
    });
}


// Handle Registration Form
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // Registration functionality
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            // Save user details to local storage
            const user = {
                username: username,
                password: password,
            };

            localStorage.setItem("user", JSON.stringify(user));
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Login functionality
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Retrieve user details from local storage
            const savedUser = JSON.parse(localStorage.getItem("user"));

            if (!savedUser) {
                alert("No user found. Please register first.");
                return;
            }

            if (savedUser.username === username && savedUser.password === password) {
                alert("Login successful! Welcome, " + username);
                // Redirect to home or dashboard page
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password. Please try again.");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get form field values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Simple validation
        if (!name || !email || !message) {
            alert("All fields are required. Please fill out the form completely.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Simulate form submission
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        contactForm.reset(); // Clear the form after submission
    });

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});



let cart = []; // To store cart items

// Function to add an item to the cart
function addToCart(productName) {
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
    } else {
        cart.push({ name: productName, quantity: 1, price: 10 }); // Default price, update with actual
    }

    alert(`${productName} added to cart.`);
    saveCart(); // Save to localStorage
}

// Save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load the cart from localStorage
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) cart = savedCart;
}

// Run loadCart on script initialization
loadCart();
  
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    // Clear current cart display
    cartItemsContainer.innerHTML = '';

    // Populate cart items
    cart.forEach((item, index) => {
        const subtotal = item.quantity * item.price;
        total += subtotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                        onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    // Update cart total
    cartTotalElement.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    saveCart();
    displayCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Run displayCart on cart page load
if (document.getElementById('cart')) {
    displayCart();
}

document.getElementById('applyDiscount').addEventListener('click', function () {
    const discountCode = document.getElementById('discountCode').value;
    const discountMessage = document.getElementById('discount-message');
    const cartTotalElement = document.getElementById('cart-total');

    if (discountCode === 'DISCOUNT10') {
        const discount = parseFloat(cartTotalElement.textContent) * 0.1;
        const discountedTotal = parseFloat(cartTotalElement.textContent) - discount;

        discountMessage.textContent = `Discount Applied: -$${discount.toFixed(2)}`;
        cartTotalElement.textContent = discountedTotal.toFixed(2);
    } else {
        discountMessage.textContent = 'Invalid discount code.';
    }
});


function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
    } else {
        cart = [];  // If no cart is found, initialize an empty cart
    }
}
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    // Clear the current cart display
    cartItemsContainer.innerHTML = '';

    // Loop through the cart and display each item
    cart.forEach((item, index) => {
        const subtotal = item.quantity * item.price;
        total += subtotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                        onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    // Update the cart total
    cartTotalElement.textContent = total.toFixed(2);
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
}
function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    saveCart();
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);  // Remove item at the specified index
    saveCart();
    displayCart();
}
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Load cart data from localStorage
    displayCart(); // Display cart items
});
function saveCart() {
    console.log('Saving cart:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    console.log('Loaded cart:', savedCart);
    if (savedCart) {
        cart = savedCart;
    }
}
document.getElementById('applyDiscount').addEventListener('click', function () {
    const discountCode = document.getElementById('discountCode').value;
    const discountMessage = document.getElementById('discount-message');
    const cartTotalElement = document.getElementById('cart-total');

    if (discountCode === 'DISCOUNT10') {
        const discount = parseFloat(cartTotalElement.textContent) * 0.1;
        const discountedTotal = parseFloat(cartTotalElement.textContent) - discount;

        discountMessage.textContent = `Discount Applied: -$${discount.toFixed(2)}`;
        cartTotalElement.textContent = discountedTotal.toFixed(2);
    } else {
        discountMessage.textContent = 'Invalid discount code.';
    }
});
console.log('Saving cart:', cart);
