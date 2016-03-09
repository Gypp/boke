module.exports = (function () {
    'use strict';

    var fs      = require('fs');
    var marked  = require('marked');

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });

    var res = {save : function save(str) {
      fs.writeFile('./data/biography.html', marked(str));
      fs.writeFile('./data/biography.md', str);
    }};

    return res;
}());
