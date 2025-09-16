// export interface Note {
//     id: string;
//     title: string;
//     content: string;
//     status: 'active' | 'complete';
//     category: string;
//     createdAt: Date;
//     completedAt?: Date;
//     priority: 'low' | 'medium' | 'high';
// }

// export type FilterType = 'all' | 'active' | 'complete';

// export interface NoteCounts {
//     all: number;
//     active: number;
//     complete: number;
// }


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
