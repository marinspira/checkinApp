export default function isValidPhone(phoneNumber) {
    return phoneNumber.length > 6 && phoneNumber.length < 12;
}
