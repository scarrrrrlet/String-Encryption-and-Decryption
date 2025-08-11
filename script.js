const textInput = document.getElementById('text-input');
const secretInput = document.getElementById('secret-key');
const resultOutput = document.getElementById('result-output');

function encryptText() {
    const text = textInput.value;
    const secretKey = secretInput.value;

    if (text && secretKey) {
        const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
        resultOutput.value = encrypted;
    } else {
        alert("Please enter text and a secret key.");
    }
}

function decryptText() {
    const encryptedText = textInput.value.trim();
    const secretKey = secretInput.value;

    if (encryptedText && secretKey) {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
            const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if(decryptedText) {
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

function copyToClipboard() {
    const copyButton = document.getElementById('copy-button');
    const textToCopy = resultOutput.value;

    if (textToCopy) {
        resultOutput.select();
        resultOutput.setSelectionRange(0, 99999);

        try {
            document.execCommand('copy');

            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Sorry, your browser does not support this feature.');
        }

        window.getSelection().removeAllRanges();
    }
}
