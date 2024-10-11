/**
 * Máscara para formatação de números de telefone no formato brasileiro.
 *
 * @param {string} value - O número de telefone em formato numérico.
 * @returns {string} - O número de telefone formatado.
 */
export const maskPhone = (value: string): string => {
  if (value.length <= 2) return value // Ex: "12"
  if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}` // Ex: "(12) 3456"
  if (value.length <= 10)
    return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}` // Ex: "(12) 3456-78"
  return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}` // Ex: "(12) 34567-8901"
}
