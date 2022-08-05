/**
 * @jest-environment jsdom
 */

import { expect, test, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import foot from './foot.vue'
// import { nextTick } from 'vue'
test('测试', async () => {
  const wrapper = mount(foot)
  const attributes = wrapper.attributes()
  const classes = wrapper.classes()
  console.log(classes, attributes)

  wrapper.vm.$emit('foo')
  wrapper.vm.$emit('foo', 123)
  // expect(wrapper.contains('p')).toBe(true)
  await wrapper.vm.$nextTick() // 等待事件处理完成
  // console.log(foot, 'foot')
  // console.log(foot.render(), 'render')
  // console.log(foot.setup(), 'setup')
  // expect(foot.setup()).toBeTruthy()

  // 断言事件已经被触发
  expect(wrapper.emitted().foo).toBeTruthy()

  // 断言事件的数量
  expect(wrapper.emitted().foo.length).toBe(2)

  // 断言事件的数量
  expect(wrapper.emitted().foo[1]).toEqual([123])
})
