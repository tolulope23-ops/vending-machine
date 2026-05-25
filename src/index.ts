import { SlotStock, VendingMachine } from "./vendingTypes.js";
import { defaultStock } from "./defaultVending.js";

// DOM Elements
const displaytxt = document.getElementById("display-text") as HTMLDivElement;
const displayGrid = document.getElementById("vending-display-grid") as HTMLDivElement;
const buttons = document.querySelectorAll("#alpha-num-btn .btn") as NodeListOf<HTMLButtonElement>;
const alphaButtons = document.querySelectorAll("#alpha-num-btn .alpha") as NodeListOf<HTMLButtonElement>;
const checkout = document.getElementById("check")as HTMLButtonElement;
const tray = document.getElementById("dispensed-items") as HTMLDivElement;
const addProductform = document.getElementById("addProductform") as HTMLFormElement;

//Admin button stocking up products.
const saveBtn = document.getElementById("saveToStock") as HTMLButtonElement;


//Function to saves default products, new or updated product by the admin to local storage.
const saveToStock = () => {
    localStorage.setItem("vendingStock", JSON.stringify(vendingStock));
};


//Retrieves stock product from localstorage, if no item  in localstorage return an empty array
const retrieveStock = JSON.parse(localStorage.getItem("vendingStock") || "null");


const defaultStockValue = defaultStock.slots;


// Assign retrieveStock objects back to the vending stock in memory, if retrieveStock is null, its assign a defult stock product.
const vendingStock: VendingMachine = {
  machineId: "M001",
  slots: (Array.isArray(retrieveStock?.slots) && retrieveStock.slots.length > 0) ? retrieveStock.slots : defaultStockValue
};


//Calls the saveToStock function to save the vendingStock(default and retrieved from local)
saveToStock();

//Declared and Initiated variables 
let msg = ``;
let currentBtnInput= "";
let slotSelected: any = null;
let selectedProductQty = 1; 

let total = 0;
let isCheckoutStage = false;  
let userPaysInput = ""; 



//Event listener to Save product by Admin to newProductSlot object then push to vendingStock object or update if the slotcode exist
saveBtn.addEventListener("click", () =>{
    const slotCode = (document.getElementById("slotCode") as HTMLInputElement).value.trim();
    const p_id = (document.getElementById("p_id") as HTMLInputElement).value.trim();
    const name = (document.getElementById("p_name") as HTMLInputElement).value.trim();
    const price = Number((document.getElementById("price") as HTMLInputElement).value);
    const quantity = Number((document.getElementById("quantity") as HTMLInputElement).value);
    const imageURL = (document.getElementById("imageURL") as HTMLInputElement).value.trim();
    const category = (document.getElementById("category") as HTMLInputElement).value.trim();
    const size = (document.getElementById("size") as HTMLInputElement).value.trim();

    if ((!slotCode && !price && !quantity) && ( !name || !category)) {
        alert("Please fill in all fields before saving.");
        return;
    };

    const existingProduct = vendingStock.slots.find((slot: any) => slot.slotCode === slotCode);

    if (existingProduct) {
        existingProduct.product.p_id = p_id;
        existingProduct.product.name = name;
        existingProduct.product.price = price;
        existingProduct.product.imageURL = imageURL;
        existingProduct.quantity += quantity;
        existingProduct.product.size = size;
        existingProduct.lastRestockedAt = new Date().toISOString();
    } else {
        const newProductSlot: SlotStock = {
            slotCode,
            product: {
                p_id: p_id,
                name: name,
                price: price,
                imageURL: imageURL,
                size: size
            },
            quantity: quantity,
            capacity: 10,
            soldCount: 0,
            lastRestockedAt: new Date().toISOString(),
            status: "ACTIVE"
        };
        vendingStock.slots.push(newProductSlot);
    };

    saveToStock();
    alert("Product saved successfully!");

    // Refresh UI
    displayGrid.innerHTML = "";
    displayProducts();

    // Clears form
    addProductform.reset()
});

// Funtion to update display interface of the current state of the machine.
const updateDisplay = (message: string) => {
    displaytxt.innerHTML = message;
};

const formatCurrency = (num: number) => {
    return `${new Intl.NumberFormat("en-NG",{
        style: "currency",
        currency:"NGN",
    }).format(num)}`
};


msg = `Select a product...`
updateDisplay(msg);


// Funtion to display product, reading stocked product from local storage.
const displayProducts = () => {
    vendingStock.slots.forEach((slot) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        //Get the slotcode(A2) at index (1) -> 2 and convert it into a number
        const columnNumber = parseInt(slot.slotCode.slice(1));

        const rowLetter = slot.slotCode[0];

        // The -64 part is a manual offset to make the alphabet start from 1 instead of its ASCII value of 65
        const rowNumber = (rowLetter.charCodeAt(0) - 64);     

        productCard.style.gridColumn = `${columnNumber}`;
        productCard.style.gridRow = `${rowNumber}`;

        if (slot.quantity < 1) return;  //dont display if the product quantity is less than 1.

        productCard.innerHTML = `
            <img src="${slot.product.imageURL}" alt=${slot.product.name}>
            <p>${ formatCurrency(slot.product.price)}</p>
            <small> Slot ${slot.slotCode}<small>
        `;

        productCard.addEventListener("click", () => {
            slotSelected = slot;
            console.log(slotSelected);
            selectedProductQty = 1;
            msg = `
                Slot: ${slot.slotCode} <br> 
                Product: ${slot.product.name} <br>
                Price: ${formatCurrency(slot.product.price)}
            `;
            updateDisplay(msg);
        });

        displayGrid.appendChild(productCard);
    });
};


//Funtion to give each button in the list of button its value and function
const keyPadInput = () => {
    buttons.forEach((btn) =>{
        btn.addEventListener("click", () =>{
            const btnValue = btn.textContent?.trim();

// If user is entering amount during checkout-> payment
        if (isCheckoutStage && /[0-9]/.test(btnValue!)) {
            userPaysInput += btnValue!;
            updateDisplay(`
                Entered Amount: ${formatCurrency(Number(userPaysInput))}<br> 
            `);
            return;
        }

// If the backspace(>) button is clicked, its removes characters from the back
           if (btnValue === ">") {
// Checks which input we’re editing based on stage
                if (!isCheckoutStage) {
// if its product selection stage
                    currentBtnInput = currentBtnInput.slice(0, -1);

                    if (currentBtnInput.length === 0) {
                    updateDisplay(`Input cleared... <br> Select Product...`);
                    } else {
                    updateDisplay(`Current input: ${currentBtnInput}`);
                    }
// If its checkout(payment input) stage
                } else {
                    userPaysInput = userPaysInput.slice(0, -1);

                    if (userPaysInput.length === 0) {
                    updateDisplay(`Enter amount to pay.`);
                    } else {
                    updateDisplay(`Amount entered: ${formatCurrency(Number(userPaysInput))}`);
                    }
                }
                return;
            };

// If the backspace(>>) button is clicked, its clears all input and reset.
            if(btnValue === ">>"){
                currentBtnInput = "";
                userPaysInput = "";
                slotSelected = null;
                selectedProductQty = 1;
                isCheckoutStage = false;
                total = 0;
                checkout.innerHTML = "CheckOut";
                updateDisplay(`All input cleared... <br> Select Product...`);
                return;
            };

// The btn + button increases the number of a particular product you buying by 1.
            if(btnValue === "+"){
                if(!slotSelected){
                    updateDisplay(`Please select a product <br> before increasing product value...`);
                    return;
                };

                if(selectedProductQty < slotSelected.quantity) {
                    selectedProductQty++;
                    total = calculateTotalPrice(slotSelected.slotCode, selectedProductQty);
                    msg = `
                        Slot: ${slotSelected.slotCode}<br> 
                        Name: ${slotSelected.product.name}<br>
                        Qty: ${selectedProductQty} <br>
                        Total: ${formatCurrency(total)} 
                    `;
                    updateDisplay(msg);
                }else {
                    updateDisplay(`Can't exceeded stock limit. <br> ${slotSelected.quantity} items left in stock`);
                };
                return;
            };
        
// When the btn alphabets button is clicked, its selecting the product by the user
            if(["A", "B", "C"].includes(btnValue!)){
                currentBtnInput = btnValue!;
                updateDisplay(`Selected product: ${currentBtnInput}`);
                return;
            };

            if (/[0-9]/.test(btnValue!) && currentBtnInput.length === 1) {
                currentBtnInput += btnValue!; 
            }

            const slotFound = vendingStock.slots.find((slot) => slot.slotCode === currentBtnInput);
            if(slotFound){
                slotSelected = slotFound;
                selectedProductQty = 1;
                updateDisplay(`
                    Slot: ${slotFound.slotCode} <br>
                    Name: ${slotFound.product.name} <br>
                    Price: ${formatCurrency(slotFound.product.price)}
                `);
            }else{
                updateDisplay(`Selected slot not available...`);
            };
        })
    })
};

//Function to calculate the total amount of the selected product. 
const calculateTotalPrice = (slotcode: string, quantity: number): number => {
    const slot = vendingStock.slots.find((slot) => slot.slotCode === slotcode)
    return slot ? slot.product.price * quantity : 0;
};


//Function to process the selected product payment and finally dispensed the product.
const processPayment = () => {
    if(!slotSelected){
        updateDisplay(`Please select a product first.`);
        return;
    };

    if(!isCheckoutStage) {
        isCheckoutStage = true;
        checkout.innerHTML = "Pay";
        disableButton();

        total = calculateTotalPrice(slotSelected.slotCode, selectedProductQty);

        updateDisplay( `<b>Checkout</b> <br>
            Slot: ${slotSelected.slotCode}<br>
            Qty: ${selectedProductQty}<br>
            Total: ${formatCurrency(total)}<br>
            Enter payment: ####
        `);

        userPaysInput = "";
        return;
    };

    if(isCheckoutStage){
        const userPays = Number(userPaysInput);
        if(isNaN(userPays) || userPays <= 0){
            updateDisplay(`Please enter a valid payment amount`);
            return;
        };

        while (userPays < total) {
            updateDisplay(`Insufficient funds. <br> You entered #${userPays}, but amount is #${total}.`);
            return;
        };

        updateDisplay(`
            Payment Successful! <br>
            ${slotSelected.product.name} dispensed. <br>
            Change: ${formatCurrency(userPays - total)}
        `);

        slotSelected.quantity -= selectedProductQty;
        slotSelected.soldCount += selectedProductQty;

        saveToStock();

//Re-renders products on the ui after purchase, and product quantity = 0.
        refreshProductDisplay();

// Product dispensed, and shown succesfully in the dispensing area.
        if (tray) {
            const img = document.createElement("img");
            img.src = slotSelected.product.imageURL;
            img.alt = slotSelected.product.name;

            tray.appendChild(img);
            img.style.transform = "translateY(-20px)";
 
            setTimeout(() => {
                img.style.transform = "translateY(0)";
            }, 200);

//user takes product after dispensed.
            setTimeout(() => {
                tray.removeChild(img);
                updateDisplay("Select a product...");
            }, 5000);
        };
    }

// Reset initialised variables for next transaction
    checkout.innerHTML = "CheckOut";
    isCheckoutStage = false;
    userPaysInput = "";
    slotSelected = null;
    selectedProductQty = 1;
};

//This checks, when the checkout button is clicked, payment processing starts
checkout.addEventListener("click", () =>{
    processPayment();
});

// Function to refresh and sheck whats left in stock to know which to display.
const refreshProductDisplay = () => {
  displayGrid.innerHTML = "";
    // This filters and remove products whose quantity is < 0.
  vendingStock.slots = vendingStock.slots.filter(slot => slot.quantity > 0);
  saveToStock();
  displayProducts();
};

//Function to diable alphabets button, not to allow any product to be chosen after payment is being processed.
const disableButton = () =>{
    alphaButtons.forEach(btn =>{btn.disabled = true;})
}

//Function to enable alphabets button
const enableButton = () =>{
    alphaButtons.forEach(btn =>{btn.disabled = false;})
}

    
displayProducts();
keyPadInput();
enableButton();


//For menu icon on the nav bar to toggle between admin and vending machine
const menuIcon = document.getElementById("menu-icon") as HTMLElement;
const menuList = document.getElementById("menu-list") as HTMLElement;
const adminBtn = document.getElementById("admin-btn") as HTMLButtonElement;
const vendingBtn = document.getElementById("vending-btn") as HTMLButtonElement;

const adminDiv = document.getElementById("admin") as HTMLDivElement;
const vendingDiv = document.getElementById("vending") as HTMLDivElement;

//Ensures elements exist before attaching event listeners
if (menuIcon && menuList && adminBtn && vendingBtn && adminDiv && vendingDiv) {
  
  // Toggle menu visibility
  menuIcon.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
  });

  // Show Admin dashboard
  adminBtn.addEventListener("click", () => {
    adminDiv.style.display = "block";
    vendingDiv.style.display = "none";
    menuList.classList.add("hidden");
  });

  // Show Vending dashboard
  vendingBtn.addEventListener("click", () => {
    vendingDiv.style.display = "block";
    adminDiv.style.display = "none";
    menuList.classList.add("hidden");
  });

  // Hide menu if user clicks anywhere outside it
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as Node;
    if (!menuIcon.contains(target) && !menuList.contains(target)) {
      menuList.classList.add("hidden");
    }
  });
};
