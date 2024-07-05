export default function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]{8,}$/;
    return nameRegex.test(name);
}