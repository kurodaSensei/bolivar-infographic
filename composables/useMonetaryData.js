// Tasas de conversión oficiales entre eras monetarias venezolanas.
// Fuentes: Gacetas Oficiales 38.638 (2008), 41.446 (2018), 42.185 (2021).
// 1 Bs (pre-2008) = 1e-14 Bs.D (acumulado de las tres reconversiones).

export const ERAS = [
  { id: 'bs',  label: 'Bolívares (antes 2008)',       suffix: 'Bs',    period: '< 2008' },
  { id: 'bsf', label: 'Bolívares Fuertes (2008–2018)', suffix: 'Bs.F',  period: '2008 – 2018' },
  { id: 'bss', label: 'Bolívares Soberanos (2018–2021)', suffix: 'Bs.S', period: '2018 – 2021' },
  { id: 'bsd', label: 'Bolívares Digitales (hoy)',     suffix: 'Bs.D',  period: '2021 – hoy' }
]

// Tabla simétrica de factores de conversión. factor[from][to] aplicado por multiplicación.
// Verificable: 1 Bs.D × 1e14 = 1 Bs original.
export const RATES = {
  bs:  { bs: 1,      bsf: 1e-3,   bss: 1e-8,   bsd: 1e-14, usd_ref: 2150 },     // Cadivi 2007
  bsf: { bs: 1e3,    bsf: 1,      bss: 1e-5,   bsd: 1e-11, usd_ref: 4.3 },      // Inicio 2008
  bss: { bs: 1e8,    bsf: 1e5,    bss: 1,      bsd: 1e-6,  usd_ref: 248000 },   // Inicio 2018
  bsd: { bs: 1e14,   bsf: 1e11,   bss: 1e6,    bsd: 1,     usd_ref: 36 }        // Tasa referencia 2021
}

export function convertTo (amount, fromEra, toEra) {
  const row = RATES[fromEra]
  if (!row || !(toEra in row)) return NaN
  return amount * row[toEra]
}

export function toUSD (amount, era) {
  const r = RATES[era]
  if (!r) return NaN
  return amount / r.usd_ref
}

// Formateador venezolano: separador de miles con punto, decimal coma.
// Para magnitudes extremas usa palabras (millones / billones) o exponencial.
export function formatVenezuela (n) {
  if (n === 0 || n === null || n === undefined || Number.isNaN(n)) return '0'
  const abs = Math.abs(n)
  if (abs < 1e-6) return n.toExponential(2)
  if (abs >= 1e12) return (n / 1e12).toLocaleString('es-VE', { maximumFractionDigits: 2 }) + ' billones'
  if (abs >= 1e9)  return (n / 1e9).toLocaleString('es-VE',  { maximumFractionDigits: 2 }) + ' mil millones'
  if (abs >= 1e6)  return (n / 1e6).toLocaleString('es-VE',  { maximumFractionDigits: 2 }) + ' millones'
  return n.toLocaleString('es-VE', { maximumFractionDigits: 6 })
}

export function formatUSD (n) {
  if (n === 0 || Number.isNaN(n)) return '$ 0'
  const abs = Math.abs(n)
  if (abs < 1e-6) return '$ ' + n.toExponential(2)
  return '$ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })
}

export function useMonetaryData () {
  return { ERAS, RATES, convertTo, toUSD, formatVenezuela, formatUSD }
}
