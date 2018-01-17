import { Angular5firebasecrudPage } from './app.po';

describe('angular5firebasecrud App', () => {
  let page: Angular5firebasecrudPage;

  beforeEach(() => {
    page = new Angular5firebasecrudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
