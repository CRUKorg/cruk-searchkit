import CRUKSearchkitAutocompleteGetter from '../CRUKSearchkitAutocompleteGetter.jsx';

describe('CRUKSearchkitAutocompleteGetter tests', () => {
  let result = [];
  beforeEach(function(done) {
    // setTimeout(function() {
    //   this.response = '12';
    //   done();
    // }, 2000);
    const getter = new CRUKSearchkitAutocompleteGetter('https://spp.dev.cruk.org/content__test/_suggest');
    const config = {
      auth: {
        username: 'ground_control',
        password: 'KhDurxyGFIfeL5ePcmpvBgdiMCNWqR'
      }
    }
    getter.makeAxoisRequest('cancer', config)
      .then(function (response) {
        result = response;
        console.log('test',response.data.title_suggest[0].options);
        done();
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  it('Get data from test index', function(done) {
    expect(result).toBe([]);
    done();
  });
});
