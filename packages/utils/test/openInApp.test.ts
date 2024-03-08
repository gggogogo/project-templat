// import { expect, test } from 'vitest'

// import { vi } from 'vitest'
// const IntersectionObserverMock = vi.fn(() => ({
//   disconnect: vi.fn(),
//   observe: vi.fn(),
//   takeRecords: vi.fn(),
//   unobserve: vi.fn(),
// }))
// vi.stubGlobal('T', IntersectionObserverMock)
// vi.stubGlobal('$', {})

// import './TZT.js'

// // 现在你可以通过 `IntersectionObserver` 或 `window.IntersectionObserver` 访问

// console.log(window.T)
// import { openInApp } from '../src/openInApp'

// test('openInApp', () => {
//   expect(
//     openInApp('http://www.baidu.com', {
//       title: '测试',
//       login: true,
//     }),
//   ).toBe(
//     'crsecapptzt://crsecpath=http%3A%2F%2Faction%3A10090%2F%3Flogintype%3D1%26%26loginkind%3D2%26%26url%3Dhttp%253A%252F%252Faction%253A10061%252F%253Fsecondtype%253D9%2526%2526fullscreen%253D0%2526%2526tzthiddentitle%253D0%2526%2526tztadjustnever%253D0%2526%2526tzthtopstatusBar%253D1%2526%2526login%253Dtrue%2526%2526aTitle%253D%2525E6%2525B5%25258B%2525E8%2525AF%252595%2526%2526url%253Dhttp%25253A%25252F%25252Fwww.baidu.com',
//   )
// })
