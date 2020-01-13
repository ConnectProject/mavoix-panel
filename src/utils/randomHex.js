/**
 * Generate a random 16 bytes hex string
 */
export default () => (
  `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
)
