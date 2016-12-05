# CRUK-SEARCHKIT
Cruk-searchkit is a collection of searchkit components designed specifically for Cancer Research UK.
It is written in ES6, compiled with babel using webpack. Uses Karma/Jasmine/Webpack for testing

## Usage
Inside the root of you're project
```
npm install cruk-searchkit
```
then using ES6 import syntax include the desired components
```
import {
  CRUKSearchkitSearchBox,
  CRUKSearchkitSearchUI
} from 'cruk-searchkit';
```
Now you can use these React components somewhere within you're code
```
<SearchkitProvider searchkit={sk}>
  <CRUKSearchkitSearchBox
    id="xss-q"
    queryBuilder={MultiMatchQuery}
    queryOptions={{
      analyzer: 'cruk_standard'
    }}
    queryFields={['title', 'description']}
    placeholder="Search..."
  />
  <div className="container">
    <CRUKSearchkitSearchUI />
  </div>
</SearchkitProvider>
```