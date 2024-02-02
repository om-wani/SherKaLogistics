
class SparseMatrix {
    constructor(merchants, pincodes) {
        this.merchants = merchants;
        this.pincodes = pincodes;
        this.matrixMerchantPincode = this.initializeMatrix(merchants.length, pincodes.length);
        this.matrixPincodeMerchant = this.initializeMatrix(pincodes.length, merchants.length);
    }

    initializeMatrix(rows, cols) {
        return Array.from({ length: rows }, () => Array(cols).fill(false));
    }

    registerMerchantServiceability(merchantId, serviceablePincodes) {
        const merchantIndex = this.merchants.indexOf(merchantId);
        for (const pincode of serviceablePincodes) {
            const pincodeIndex = this.pincodes.indexOf(pincode);
            this.matrixMerchantPincode[merchantIndex][pincodeIndex] = true;
            this.matrixPincodeMerchant[pincodeIndex][merchantIndex] = true;
        }
    }

    checkServiceability(pincode) {
        const pincodeIndex = this.pincodes.findIndex(p => p.toUpperCase() === pincode.toUpperCase());
        if (pincodeIndex === -1) {
            return [];
        }

        const serviceableMerchants = this.matrixPincodeMerchant[pincodeIndex]
            .map((isServiceable, index) => (isServiceable ? this.merchants[index] : null))
            .filter(merchant => merchant !== null);

        return serviceableMerchants;
    }
}

const merchantsList = ["M1", "M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11", "M12","M13","M14","M15","M16", "M17","M18","M19","M20",];
const pincodesList = ["411001", "411002", "411003","410501","410502","410503","410236","510234"];
const sparseMatrix = new SparseMatrix(merchantsList, pincodesList);

sparseMatrix.registerMerchantServiceability("M1", ["411001", "411002"]);
sparseMatrix.registerMerchantServiceability("M2", ["411002", "411003"]);

sparseMatrix.registerMerchantServiceability("M3", ["411001", "411002"]);
sparseMatrix.registerMerchantServiceability("M4", ["411002", "411003"]);

sparseMatrix.registerMerchantServiceability("M5", ["410501", "410502"]);
sparseMatrix.registerMerchantServiceability("M6", ["411002", "410503"]);

sparseMatrix.registerMerchantServiceability("M7", ["410236", "510234"]);
sparseMatrix.registerMerchantServiceability("M2", ["410501", "410503"]);

sparseMatrix.registerMerchantServiceability("M1", ["411001", "411002"]);
sparseMatrix.registerMerchantServiceability("M2", ["411003", "410236"]);

function checkServiceability() {
    const userQueryPincode = document.getElementById("pincodeInput").value.toUpperCase();
    const serviceableMerchants = sparseMatrix.checkServiceability(userQueryPincode);

    const resultMessage = document.getElementById("resultMessage");

    if (serviceableMerchants.length > 0) {
        resultMessage.textContent = `At pincode ${userQueryPincode}: ${serviceableMerchants.join(", ")} serve`;
    } else {
        resultMessage.textContent = `No merchant serves at ${userQueryPincode}`;
    }
}