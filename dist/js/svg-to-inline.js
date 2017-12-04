'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var svgToInline = function svgToInline(options) {
  var trigger = {
    class: options.elementsClass.replace('.', ''),
    useClass: options && options.useTriggerClass || false
  };

  var elements = document.getElementsByClassName('.' + trigger.class);
  console.log("elements", trigger.class);

  if (elements.length) {
    elements.each(function () {
      var svg = {
        currency: $(undefined),
        oldClass: '',
        newClass: '',
        path: $(undefined).attr('data') || $(undefined).attr('src')
      };
      var request = {
        element: '',
        svgTag: '',
        svgTagWithoutClass: ''
      };
      var inputClass = $(undefined).attr('class').split(' ');
      var inputClassLenght = inputClass.length;

      if (inputClassLenght > 0) {
        for (var i = 0; i < inputClassLenght; ++i) {
          var space = '';

          if (inputClass[i] === trigger.class && !trigger.useClass) {
            continue;
          }

          i !== inputClass.length - 1 && (space = ' ');
          inputClass[i] && (svg.newClass += inputClass[i] + space);
        }
      }

      $.ajax({
        url: svg.path,
        dataType: 'text',
        success: function success(response) {
          request.element = response.replace(/<[?!][\s\w"-/:=?]+>/g, '');
          request.svgTag = request.element.match(/<svg[\w\s\t\n:="\\'/.#-]+>/g);
          request.svgTagWithoutClass = request.svgTag[0].replace(/class="[\w\s-_]+"/, '');
          svg.oldClass = request.svgTag[0].match(/class="(.*?)"/);

          // If exist class in svg add to svg.newClass
          svg.oldClass && svg.oldClass[1] && svg.newClass && (svg.newClass = svg.oldClass[1] + ' ' + svg.newClass);

          svg.newClass !== '' && (svg.newClass = 'class="' + svg.newClass + '"');

          request.svgTagWithoutClass = request.svgTagWithoutClass.replace('>', ' ' + svg.newClass + '>');

          svg.currency.replaceWith(request.element.replace(/<svg[\w\s\t\n:="\\'/.#-]+>/g, request.svgTagWithoutClass));
        }
      });
    });
    return 'foi';
  }

  return console.log('Nenhum eleme');
};

exports.default = svgToInline;