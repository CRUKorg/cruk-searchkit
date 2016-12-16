import CRUKSearchkitAutocompleteGetter from '../CRUKSearchkitAutocompleteGetter.jsx';

describe('CRUKSearchkitAutocompleteGetter tests', () => {

  beforeEach(function() {
    setTimeout(function() {
      this.response = '12';
      done();
    }, 2000);
    const getter = new CRUKSearchkitAutocompleteGetter('https://spp.dev.cruk.org/content__test');
    getter.makeAxoisRequest('cancer')
      .then(function (response) {
        done();
        this.response = response;
        console.log('test',response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  it('Get data from test index', function() {
    
    expect(this.response).toBe('12');
  });
});
