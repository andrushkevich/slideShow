// Generated by CoffeeScript 1.7.1
(function() {
  window.SlideShow = (function() {
    var getRandomImages, getTemplate, initTemplate, remove, _imageBaseUrl, _imageNumber, _template, _timeSpan;

    _imageBaseUrl = "http://lorempixel.com/250/250";

    _template = "<div class='outerHtml'><div class='innerHtml'><div class='prev'><a href='#' onclick='javascript:void(0);' class='prev'>prev</a></div><div class='items'></div><div class='next'><a href='#' onclick='javascript:void(0);' class='next'>next</a></div><div class='close'><a href='#' onclick='javascript:void(0);' class='close'>close</a></div></div></div>";

    _timeSpan = 3000;

    _imageNumber = 10;

    function SlideShow(elem) {
      this.elem = elem;
      $(document).keypress(function(event) {
        this.event = event;
        if (this.event.keyCode === 27) {
          this.event.preventDefault();
          return remove();
        }
      });
    }

    getRandomImages = function(count) {
      var items, num, _i, _ref;
      this.count = count;
      items = "";
      for (num = _i = 1, _ref = this.count; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
        items = items + "<li><img src='" + _imageBaseUrl + "?param=1" + num + "' alt='some image'/></li>";
      }
      return "<ul class='carousel'>" + items + "</ul>";
    };

    initTemplate = function(index, templ) {
      var setState, slide, width;
      this.index = index;
      this.templ = templ;
      $(this.templ).find(".items").append(getRandomImages(_imageNumber));
      $(this.templ).find('.close').click(function() {
        return remove();
      });
      width = _imageNumber > 2 ? _imageNumber * 270 - 700 : 0;
      setState = function() {
        var l;
        $(".outerHtml a.prev, .outerHtml a.next").hide();
        l = parseInt($(".outerHtml .carousel").css('left'), 10) || 0;
        if (l !== 0) {
          $(".outerHtml a.prev").show();
        }
        if (l > -width) {
          return $(".outerHtml a.next").show();
        }
      };
      slide = function(e, elem, action) {
        var items, l, left;
        this.e = e;
        this.elem = elem;
        this.action = action;
        this.e.preventDefault();
        items = $(this.elem).closest(".innerHtml").find(".items ul");
        l = parseInt(items.css('left'), 10) || 0;
        left = this.action(l);
        return items.animate({
          left: left + 'px'
        }, {
          complete: setState
        });
      };
      setState();
      $(this.templ).find('.next').click(function(e) {
        this.e = e;
        return slide(this.e, this, function(l) {
          if (l - 270 < -width) {
            return -width;
          } else {
            return l - 270;
          }
        });
      });
      return $(this.templ).find('.prev').click(function(e) {
        this.e = e;
        return slide(this.e, this, function(l) {
          if (l + 270 > 0) {
            return 0;
          } else {
            return l + 270;
          }
        });
      });
    };

    getTemplate = function() {
      return $(_template).each(initTemplate);
    };

    remove = function() {
      if ($("body").find(".outerHtml")) {
        return $("body .outerHtml").remove();
      }
    };

    SlideShow.prototype.show = function() {
      remove();
      return $("body").append(getTemplate());
    };

    SlideShow.prototype.close = function() {
      return remove();
    };

    return SlideShow;

  })();

}).call(this);

//# sourceMappingURL=slideShow.map
