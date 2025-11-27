# @olton/freemarker

> [npm package](https://npmjs.org/package/@olton/freemarker)

Apache FreeMarker® is a template engine: a Java library to generate text output (HTML web pages, e-mails, configuration files, source code, etc.) based on templates and changing data. Templates are written in the FreeMarker Template Language (FTL), which is a simple, specialized language (not a full-blown programming language like PHP). Usually, a general-purpose programming language (like Java) is used to prepare the data (issue database queries, do business calculations). Then, Apache FreeMarker displays that prepared data using templates. In the template you are focusing on how to present the data, and outside the template you are focusing on what data to present.

## Freemarker integration for NodeJS

This package a wrapper for Apache FreeMarker.

## How to use

  - `JAVA_HOME` should be set properly
  - `npm i freemarker -S`

#### Render string

```javascript
import Freemarker from 'freemarker';

const freemarker = new Freemarker();

freemarker.render('<h1>${title}</h1>', { title: 'test render' }, (err, result) => {
  if (err) {
    throw new Error(err);
  }
  console.log(result);
});
```

*NOTICE: Don't use `#include` in string for rendering.*

#### Render file

```javascript
import Freemarker from 'freemarker';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const freemarker = new Freemarker({ root: __dirname });

freemarker.renderFile(path.join(__dirname, 'index.ftl'), data, (err, result) => {
  if (err) {
    throw new Error(err);
  }
  console.log(result);
});
```
In this example, `path.join(__dirname, 'index.ftl')` can be replaced with `index` or `index.ftl`

## Test
> node with ESM support is required

`npm test`

## LICENSE
MIT

### Thanks 

Thank to [kaola-fed](https://github.com/kaola-fed) for original release.