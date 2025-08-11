const textInput = document.getElementById('text-input');
const secretInput = document.getElementById('secret-key');
const resultOutput = document.getElementById('result-output');

resultOutput.value = "";

const base64Regex = /^[A-Za-z0-9+\/]+={0,3}$/;

function showError(input) {
    input.classList.add('error');
    const err = document.getElementById(input.id + '-err');
    if (err){
        err.classList.add('error-visible');
    }
    input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
    input.classList.remove('error');
    const err = document.getElementById(input.id + '-err');
    if (err) {
        err.classList.remove('error-visible');
    }
    input.removeAttribute('aria-invalid');
}

[textInput, secretInput].forEach(input =>
    input.addEventListener('focus', () => clearError(input))
)

function encryptText() {
    const text = textInput.value;
    const secretKey = secretInput.value;

    resultOutput.classList.remove('error');
    resultOutput.value = "";

    if (!text || !secretKey) {
        if (!text)
            showError(textInput);
        if (!secretKey)
            showError(secretInput);
        return;
    }

    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    resultOutput.value = encrypted;
}

function decryptText() {
    const encryptedText = textInput.value.trim();
    const secretKey = secretInput.value;

    resultOutput.classList.remove('error');
    resultOutput.value = "";

    if (!encryptedText || !secretKey) {
        if (!encryptedText)
            showError(textInput);
        if (!secretKey)
            showError(secretInput);
        return;
    }

    if (!base64Regex.test(encryptedText)) {
        resultOutput.classList.add('error');
        resultOutput.value = "Invalid Base64."
        return
    }

    try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if(decryptedText) {
            resultOutput.value = decryptedText;
            return;
        }

    } catch (e) {}
    resultOutput.classList.add('error');
    resultOutput.value = "Decryption failed. Invalid key or ciphertext.";
}

function copyToClipboard() {
    const copyButton = document.getElementById('copy-button');
    const textToCopy = resultOutput.value;

    if (!textToCopy) {
        return;
    }

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
