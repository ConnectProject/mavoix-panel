/** Pastel palette for tab backgrounds: every colour keeps black text at a contrast ratio above 6:1. */
export const TAB_COLORS = [
  { name: 'Rose (clair)', hex: '#F8C3D1' },
  { name: 'Saumon (clair)', hex: '#F8CAC3' },
  { name: 'Pêche (clair)', hex: '#F8D9C3' },
  { name: 'Abricot (clair)', hex: '#F8E5C3' },
  { name: 'Citron (clair)', hex: '#F8F1C3' },
  { name: 'Pistache (clair)', hex: '#E7F8C3' },
  { name: 'Menthe (clair)', hex: '#C3F8CC' },
  { name: 'Vert d\'eau (clair)', hex: '#C3F8E7' },
  { name: 'Turquoise (clair)', hex: '#C3F8F8' },
  { name: 'Ciel (clair)', hex: '#C3E7F8' },
  { name: 'Bleuet (clair)', hex: '#C3D5F8' },
  { name: 'Lavande (clair)', hex: '#CCC3F8' },
  { name: 'Lilas (clair)', hex: '#E7C3F8' },
  { name: 'Mauve (clair)', hex: '#F8C3F0' },
  { name: 'Rose (moyen)', hex: '#F49FB4' },
  { name: 'Saumon (moyen)', hex: '#F4AA9F' },
  { name: 'Pêche (moyen)', hex: '#F4C29F' },
  { name: 'Abricot (moyen)', hex: '#F4D59F' },
  { name: 'Citron (moyen)', hex: '#F4E99F' },
  { name: 'Pistache (moyen)', hex: '#D8F49F' },
  { name: 'Menthe (moyen)', hex: '#9FF4AD' },
  { name: 'Vert d\'eau (moyen)', hex: '#9FF4D8' },
  { name: 'Turquoise (moyen)', hex: '#9FF4F4' },
  { name: 'Ciel (moyen)', hex: '#9FD8F4' },
  { name: 'Bleuet (moyen)', hex: '#9FBBF4' },
  { name: 'Lavande (moyen)', hex: '#AD9FF4' },
  { name: 'Lilas (moyen)', hex: '#D89FF4' },
  { name: 'Mauve (moyen)', hex: '#F49FE6' },
  { name: 'Rose (soutenu)', hex: '#F17E9B' },
  { name: 'Saumon (soutenu)', hex: '#F18E7E' },
  { name: 'Pêche (soutenu)', hex: '#F1AE7E' },
  { name: 'Abricot (soutenu)', hex: '#F1C77E' },
  { name: 'Citron (soutenu)', hex: '#F1E17E' },
  { name: 'Pistache (soutenu)', hex: '#CBF17E' },
  { name: 'Menthe (soutenu)', hex: '#7EF192' },
  { name: 'Vert d\'eau (soutenu)', hex: '#7EF1CB' },
  { name: 'Turquoise (soutenu)', hex: '#7EF1F1' },
  { name: 'Ciel (soutenu)', hex: '#7ECBF1' },
  { name: 'Bleuet (soutenu)', hex: '#7EA5F1' },
  { name: 'Lavande (soutenu)', hex: '#927EF1' },
  { name: 'Lilas (soutenu)', hex: '#CB7EF1' },
  { name: 'Mauve (soutenu)', hex: '#F17EDE' },
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Gris perle', hex: '#E3E5E8' },
  { name: 'Beige', hex: '#EADFCB' },
  { name: 'Gris', hex: '#C5C9CF' },
  { name: 'Taupe', hex: '#C9B8A6' },
  { name: 'Gris moyen', hex: '#A9AEB6' }
]

/**
 * Whether a hex colour belongs to the palette.
 * @param {string} hex colour such as '#F9D2DC'
 * @returns {boolean} true when the colour is one of TAB_COLORS
 */
export const isPaletteColor = (hex) => TAB_COLORS.some((c) => c.hex.toLowerCase() === (hex || '').toLowerCase())
