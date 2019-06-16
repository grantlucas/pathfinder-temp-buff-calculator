import { PositiveDecoratorPipe } from './positive-decorator.pipe';

describe('PositiveDecoratorPipe', () => {
  it('create an instance', () => {
    const pipe = new PositiveDecoratorPipe();
    expect(pipe).toBeTruthy();
  });
});
