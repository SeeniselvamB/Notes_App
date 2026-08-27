

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {'active' | 'complete'} status
 * @property {string} category
 * @property {Date} createdAt
 * @property {Date=} completedAt
 * @property {'low' | 'medium' | 'high'} priority
 */

/**
 * @typedef {'all' | 'active' | 'complete'} FilterType
 */

/**
 * @typedef {Object} NoteCounts
 * @property {number} all
 * @property {number} active
 * @property {number} complete
 */
