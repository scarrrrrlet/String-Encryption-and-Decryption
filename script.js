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
    const resultOutput = document.getElementById('result-output');
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
