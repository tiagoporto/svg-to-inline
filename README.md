# SVG to Inline ![Open Source Love](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)

<p align="right">
  <code>LIKED ? Leave a <a href="https://github.com/tiagoporto/svg-to-inline/stargazers">⭐</a> : <a href="https://github.com/tiagoporto/svg-to-inline/issues">😞</a></code>
</p>

[![Release](https://img.shields.io/npm/v/svg-to-inline.svg?style=flat-square&label=release)](https://github.com/tiagoporto/svg-to-inline/releases)
[![Downloads](https://img.shields.io/npm/dt/svg-to-inline.svg?style=flat-square)](https://www.npmjs.com/package/svg-to-inline)
[![install size](https://packagephobia.now.sh/badge?p=svg-to-inline)](https://packagephobia.now.sh/result?p=svg-to-inline)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-yellow.svg?style=flat-square)](http://standardjs.com)
[![License](https://img.shields.io/github/license/tiagoporto/svg-to-inline.svg?style=flat-square)](https://raw.githubusercontent.com/tiagoporto/svg-to-inline/master/LICENSE)

<!-- [![Build Status](https://img.shields.io/travis/com/tiagoporto/svg-to-inline/master.svg?label=tests&logo=travis&style=flat-square)](https://travis-ci.com/tiagoporto/svg-to-inline)
[![Coverage Status](https://img.shields.io/coveralls/tiagoporto/svg-to-inline.svg?style=flat-square)](https://coveralls.io/github/tiagoporto/svg-to-inline)
[![Mutation testing cover](https://badge.stryker-mutator.io/github.com/tiagoporto/svg-to-inline/master)](https://stryker-mutator.github.io) -->

[![Inline docs](http://inch-ci.org/github/tiagoporto/svg-to-inline.svg?branch=master&style=flat-square)](http://inch-ci.org/github/tiagoporto/svg-to-inline)
[![devDependencies Status](https://img.shields.io/david/dev/tiagoporto/svg-to-inline.svg?style=flat-square)](https://david-dm.org/tiagoporto/svg-to-inline?type=dev)

> Web Component to request an SVG file external and use inline.

_Work in Progress_

## Installation

```bash
npm i svg-to-inline
```

## Usage

```html
<script type="module">
  import 'svg-to-inline/svg-to-inline.js';
</script>

<svg-to-inline
  path="images/logos/logo.svg"
  lazy="true"
  fitSVG="true"
  path="/img/svg-file.svg"
  fitSVG="true"
  className="my-class other-class"
  cssPath="/styles.css"
></svg-to-inline>
```

## Contributing

[See how to contribute](CONTRIBUTING.md).

## License

SVG to Inline is released under the terms of the [MIT](LICENSE).
