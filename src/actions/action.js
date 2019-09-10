/**
 * Create Action
 *
 * @param {string} type
 * @param {*} [payload]
 * @returns {*}
 */
export const action = ( type, payload ) => {
  if( payload ){
    return { type, payload };
  }
  return { type };
};