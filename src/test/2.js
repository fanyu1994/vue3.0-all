import { expect, test, describe } from 'vitest'
import {mount} from '@vue/test-utils'
import foot from '../components/layout/foot.vue'

test('测试', () => {
  const wrapper = mount(foot)
  
  expect(wrapper.find('.test').text()).toBe('test:')
})
