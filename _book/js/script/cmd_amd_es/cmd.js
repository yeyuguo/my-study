
const msg = 'cmd 信息'



/** 
 * exports
 * 同时存在时，会输出有信息的那个 
*/
// exports.msg  // {}
// exports.msg = msg // {msg:'cmd 信息'}

exports.a = 'aaaa'
exports.b = 'bbbb'


/** module.exports
 * 同时存在时，会输出后面的那个
 */
// module.exports = { msg } // {msg:'cmd 信息'}
// module.exports = msg // 'cmd 信息'




/** 4个都同时存在时，以 exports 为输出标准 */
// module.exports = { msg } // {msg:'cmd 信息'}
// module.exports = msg // 'cmd 信息'
// exports.msg  // {}
// exports.msg = msg // {msg:'cmd 信息'}
