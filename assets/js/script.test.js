import { myFunction } from './script';

test('hello world!', () => {
	expect(myFunction()).toBe('Hello, World!');
});