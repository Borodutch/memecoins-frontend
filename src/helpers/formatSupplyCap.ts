export default function (supplyCap: bigint) {
  const divisor = BigInt(10) ** BigInt(18)
  const wholePart = supplyCap / divisor
  const fractionalPart = supplyCap % divisor

  // Pad the fractional part with leading zeros to ensure it has 18 digits
  const paddedFractionalPart = fractionalPart.toString().padStart(18, '0')

  // Remove trailing zeros from the fractional part
  const trimmedFractionalPart = paddedFractionalPart.replace(/0+$/, '')

  // If the fractional part becomes empty after trimming, just return the whole part
  if (trimmedFractionalPart === '') {
    return `${wholePart}`
  }

  // Concatenate the whole and fractional parts
  return Number(`${wholePart}.${trimmedFractionalPart}`).toLocaleString()
}
