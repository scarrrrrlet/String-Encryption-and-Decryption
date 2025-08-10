function encryptText() {
    const text = document.getElementById('text-input').value;
    const secretKey = document.getElementById('secret-key').value;
    const resultOutput = document.getElementById('result-output');

    if (text && secretKey) {
        const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
        resultOutput.value = encrypted;
    } else {
        alert("Please enter text and a secret key.");
    }
}

function decryptText() {
    const encryptedText = document.getElementById('text-input').value;
    const secretKey = document.getElementById('secret-key').value;
    const resultOutput = document.getElementById('result-output');

    if (encryptedText && secretKey) {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
            const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (decryptedText) {
                resultOutput.value = decryptedText;
            } else {
                resultOutput.value = "Decryption failed. Invalid key or ciphertext.";
            }

        } catch (e) {
            resultOutput.value = "Decryption failed. Invalid key or ciphertext.";
        }
    } else {
        alert("Please enter the encrypted text and the secret key.");
    }
}