import { GbgCafePage } from './app.po';

describe('gbg-cafe App', () => {
  let page: GbgCafePage;

  beforeEach(() => {
    page = new GbgCafePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
