import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/Header.vue';

describe('Header.vue', () => {
  it('renders text Music when passed', () => {
    const text = 'Music';
    const wrapper = shallowMount(HelloWorld, {
      props: { },
    });
    expect(wrapper.text()).toMatch(text);
  });
});
