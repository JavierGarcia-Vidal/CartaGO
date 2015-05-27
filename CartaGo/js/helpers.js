$(document).ready(function(){
    $('.button-collapse').sideNav({
        menuWidth: 58,
        edge: 'left',
        closeOnClick: true
    });

    $('#menu').on('click', 'li a', function(e){
        e.preventDefault();
        var $menu = $(this),
            href = $menu.attr('href');

        $('a').parent('li').removeClass('active');
        $menu.parent('li').addClass('active');

        $('.show')
            .removeClass('show')
            .addClass('hide')
            .hide();

        $(href)
            .removeClass('hide')
            .addClass('show')
            .hide()
            .fadeIn(550);
    });

    $('#mobile-demo').on('click', 'div li a', function(e){
        e.preventDefault();
        var $menu = $(this),
            href = $menu.attr('href');

        $('a').parent('li').removeClass('active');
        $menu.parent('li').addClass('active');

        $('.show')
            .removeClass('show')
            .addClass('hide')
            .hide();

        $(href)
            .removeClass('hide')
            .addClass('show')
            .hide()
            .fadeIn(550);
    });

    $('.button-collapse').sideNav({
        menuWidth: 58,
        edge: 'left',
        closeOnClick: true
    });

    $('#menu-filter').on('click', 'li a', function(e){
        e.preventDefault();
        var $menu_filter = $(this),
            href = $menu_filter.attr('href');

        $('a').parent('li').removeClass('active');
        $menu_filter.parent('li').addClass('active');
    });

    $('#menu-filter-explore').on('click', 'li a', function(e){
        e.preventDefault();
        var $menu_filter = $(this),
            href = $menu_filter.attr('href');

        $('a').parent('li').removeClass('active');
        $menu_filter.parent('li').addClass('active');
    });

    //                ###########################################

    $('.button-filter').click(function() {
        $('.button-filter').removeClass('active');
        $(this).parent('li').addClass('active');
        CartaGo.Map.LayerActions[$(this).attr('id')]();
    });

    $('.button-menu').click(function() {
        CartaGo.Map.LayerActions['default']();
    });

    $('#search').on('keyup',function() {
        var search = $('#search').val();
        CartaGo.Map.LayerActions[$(this).attr('id')](search);
    });  

    //                ###########################################

    $('.button-explore-filter').click(function() {
        $('.button-explore-filter').removeClass('active');
        $(this).parent('li').addClass('active');
        console.log($(this).attr('id'));
        CartaGo.Explore.FilterExploreAction($(this).attr('id'),$(this).attr('data-value'));
    });

    //$('.button-menu').click(function() {
    //    FilterExploreAction['default_explore']();
    //});

    //$('#search-explore').on('keyup',function() {
    //    var search_explore = $('#search-explore').val();
    //    FilterExploreAction[$(this).attr('id')](search_explore);
    //});

});