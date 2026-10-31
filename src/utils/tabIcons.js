import arasaacThemes from '~/utils/arasaacThemes'

// Icons offered for a tab: the ARASAAC theme icons first, then the other icons already on offer.
// The other icons are labelled in `tabSettings.otherIcons` (i18n).
const OTHER_ICONS = [
  'soup_kitchen',
  'check_circle',
  'home',
  'settings',
  'local_cafe',
  'build',
  'sports_bar',
  'wine_bar',
  'calculate',
  'flag',
  'category',
  'star'
]

export default Array.from(new Set([
  ...arasaacThemes.map((theme) => theme.icon),
  ...OTHER_ICONS
]))
