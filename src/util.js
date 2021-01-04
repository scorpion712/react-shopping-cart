export default function formatCurrency(num) {
    return "$" + Number(parseFloat(num).toFixed(1)).toLocaleString() + " "
}