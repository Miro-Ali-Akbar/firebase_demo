// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"

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

    for(let i = 0; i < 100; i++) {
        const productId = allProducts[i.toString()].id;
        const supplierId = allSuppliers[Math.floor(i / 10).toString()].id;

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
    const number = Math.floor(Math.random() * 999999999) + 700000000;
    return number
}

function addSuppliers() {
    for (let i = 0; i < 10; i++) {
        writeSupplierData(i, supplierNames[i], randomPhoneNumber())
    }

}

function convert07To47(supplier) {

    const oldNumber = 0;
    const newNumber = oldNumber - 700000000 + 4600000000
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
    for (let i = 0; i < 100; i++) {
        const random_code = getRandomCode();
        const random_quantity = Math.floor(Math.random() * 100);
        const random_price = Math.floor(Math.random() * 200 + 20);

        writeProductData(i,random_code, random_quantity, random_price);
    }

}

function populateDb() {
    addProducts();
    addSuppliers();
    addProductSupplier();

}

writeProductData(12315, "asr", 4, 20);
console.log(getRandomCode());
populateDb();

// const message = (await get(ref(getDatabase(), 'products/'))).val();
// console.log(message);
//
process.exit();
