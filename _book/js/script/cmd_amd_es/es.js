/**
 * 会报错
 */
// const es = 'AMD 导出信息'
// export es 

/**
 * 方式1
 */
// export const es = 'AMD 导出信息' // import { es } from './es.js'

/**
 * 方式2
 */
// const es = 'AMD 导出信息'
// const es2 = 'AMD 导出信息2'
// export { es, es2 }

/**
 * 方式3 
 * import esOnly from './es.js'
 */
// const es = 'AMD 导出信息'
// export default es


/** 方式4 */
/*
什么导出都不写的话
import { es } from './es.js' 结果是 {}
import es  from './es.js' 结果 undefined
*/







