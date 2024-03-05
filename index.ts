// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove} from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY6cUO3FJglJwfLsOesL-8mTKu1v69ULg",
    authDomain: "dsp-firebase-demo.firebaseapp.com",
    databaseURL: "https://dsp-firebase-demo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dsp-firebase-demo",
    storageBucket: "dsp-firebase-demo.appspot.com",
    messagingSenderId: "246553648204",
    appId: "1:246553648204:web:ff17d0a87e88e5f2f5e8e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeOrders(orderId: number, productId: number, quantity: number) {
    const db = getDatabase();

    const reference = ref(db, 'orders/' + orderId);

    set(reference, {
        orderId: orderId,
        productId: productId,
        quantity: quantity,
    })
}

async function addOrder() {
    console.log("Trying to add 10 orders");
    let failed: string = "failed ids: ";
    
    for (let i = 0; i < 20; i++) {
        const productId = Math.floor(Math.random() * 20);
        const Product = (await get(ref(getDatabase(), 'products/' + productId.toString()))).val();
        const amount = Math.floor(Math.random() * 200);

        if (Product.quantity >= amount) {
            writeOrders(i, productId, amount);
        } else {
            failed += ", " + i;
        }
    }
    console.log(failed);
}

function writeProductSupplier(productId: number, supplierId: number) {
    const db = getDatabase();

    const reference = ref(db, 'productSupplier/' + productId);

    set(reference, {
        supplierId: supplierId,
        productCode: productId,
    })
}

async function addProductSupplier() {
    const allProducts = (await get(ref(getDatabase(), 'products/'))).val()
    const allSuppliers = (await get(ref(getDatabase(), 'supplier/'))).val()

    for(let i = 0; i < 20; i++) {
        const productId = allProducts[i.toString()].id;
        const supplierId = allSuppliers[Math.floor(i / 4).toString()].id;

        writeProductSupplier(productId, supplierId);
    }
}



function writeSupplierData(supplierId: number, name: string, phone: number) {
    const db = getDatabase();

    const reference = ref(db, 'supplier/' + supplierId);

    set(reference, {
        id: supplierId,
        name: name,
        phone: phone,
    });

}

const supplierNames: string[] = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
];

function randomPhoneNumber() {
    const number = Math.floor(Math.random() * 99999999) + 700000000;
    return number
}

function addSuppliers() {
    for (let i = 0; i < 5; i++) {
        writeSupplierData(i, supplierNames[i], randomPhoneNumber())
    }

}

async function convertSupplierPhone07To47() {
    const allSuppliers = (await get(ref(getDatabase(), 'supplier/'))).val()

    for (let i = 0; i < 5; i++) {
        const oldNumber = allSuppliers[i].phone;
        const newNumber = oldNumber + 46000000000
        writeSupplierData(allSuppliers[i].id, allSuppliers[i].name, newNumber);
    }
}

function writeProductData(productId: number, productCode: any, quantity: number, price: number) {
    const db = getDatabase();

    const reference = ref(db, 'products/' + productId);

    set(reference, {
    id: productId,
    productCode: productCode,
    quantity: quantity,
    price: price,
    });
}

function getRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}

function addProducts() {
    for (let i = 0; i < 20; i++) {
        const random_code = getRandomCode();
        const random_quantity = Math.floor(Math.random() * 100);
        const random_price = Math.floor(Math.random() * 200 + 50);

        writeProductData(i,random_code, random_quantity, random_price);
    }

}

export function populateDbPartOne() {
    console.log("Starting to populateDb");
    console.log("Adding products")
    addProducts();
    console.log("Adding suppliers")
    addSuppliers();
    console.log("Adding product suppliers")
    addProductSupplier();
}

export function AddordersConvertPhoneTwo() {
    console.log("Adding orders")
    addOrder();
    console.log("Converting suppliers phone numbers")
    convertSupplierPhone07To47();
}

export function deleteDbThree() {
    console.log("Clearing Db");
    remove(ref(getDatabase(), 'products'));
    remove(ref(getDatabase(), 'orders'));
    remove(ref(getDatabase(), 'productSupplier'));
    remove(ref(getDatabase(), 'supplier'));

}
