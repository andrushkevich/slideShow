class window.SlideShow
  _imageBaseUrl = "http://lorempixel.com/250/250"
  _template = "<div class='outerHtml'><div class='innerHtml'><div class='prev'><a href='#' onclick='javascript:void(0);' class='prev'>prev</a></div><div class='items'></div><div class='next'><a href='#' onclick='javascript:void(0);' class='next'>next</a></div><div class='close'><a href='#' onclick='javascript:void(0);' class='close'>close</a></div></div></div>"
  _timeSpan = 3000
  _imageNumber = 10

  constructor: (@elem) ->
    $(document).keypress (@event) ->
      if @event.keyCode is 27
        @event.preventDefault()
        remove()


  getRandomImages= (@count)->
    items = ""
    for num in [1..@count]
      items = items + "<li><img src='"+ _imageBaseUrl + "?param=1" + num  + "' alt='some image'/></li>"
    "<ul class='carousel'>" + items + "</ul>"

  initTemplate= (@index, @templ) ->
    $(@templ).find(".items").append getRandomImages _imageNumber
    $(@templ).find('.close').click ->
      remove()

    width  = if _imageNumber > 2 then _imageNumber * 270 - 700 else 0
    setState = ()->
      $(".outerHtml a.prev, .outerHtml a.next").hide()
      l = parseInt($(".outerHtml .carousel").css('left'), 10) || 0

      if (l isnt 0) then $(".outerHtml a.prev").show()
      if l > -width then $(".outerHtml a.next").show()

    slide = (@e, @elem, @action)->
      @e.preventDefault()
      items = $(@elem).closest(".innerHtml").find(".items ul")
      l = parseInt(items.css('left'), 10) || 0
      left = @action(l)
      items.animate({left: left+'px'}, {complete: setState})



    setState()

    $(@templ).find('.next').click (@e) ->
      slide(@e, @, (l)-> if l - 270 < -width then -width else l-270)

    $(@templ).find('.prev').click (@e) ->
      slide(@e, @, (l)-> if l + 270 > 0 then 0 else l+270)

  getTemplate =->
    $(_template).each initTemplate

  remove =->
    if $("body").find ".outerHtml"
      $("body .outerHtml").remove()

  show: ->
    remove()
    $("body").append getTemplate()

  close: ->
    remove()



