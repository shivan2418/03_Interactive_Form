//focus the name input box
$('#name').focus();

// hide the other title
const othertitle = $('#other-title');
othertitle.hide();

prompt_to_select_color();

// handle clicks on the title select menu
$('#title').on('click', function (event) {
    if (event.target.value === 'other') {
        // show the other input field 
        othertitle.show();
    }
    else {
        othertitle.hide();
    }
});

// handle clicks in design
$('#design').on('click change', function (event) {
    if (event.target.value === 'js puns') {
        let can_choose_colors = ['cornflowerblue', 'darkslategrey', 'gold'];
        show_color_options(can_choose_colors);
    }
    else if (event.target.value === 'heart js') {
        let can_choose_colors = ['tomato', 'steelblue', 'dimgrey'];
        show_color_options(can_choose_colors);

    }
    else {
        prompt_to_select_color();
    }

});

function show_color_options(list_of_colors) {
    //Shows the colors in the list of colors, hides all other//
    const menu_options = $('#color option');
    $('#color').show();
    $('#colors-js-puns label').text('Colors:');

    for (let i = 0; i < menu_options.length; i++) {

        let allowed = (list_of_colors.indexOf(menu_options[i].value)>-1)

        console.log(`${menu_options[i].value} ${allowed}`)
        if (allowed) {
           $(menu_options[i]).show();
        } else{
            $(menu_options[i]).hide();
        }
    }
};

function prompt_to_select_color() {
    // hide the color selection
    $('#color').hide();
    //Tell user to select a color
    $('#colors-js-puns label').text('Select a theme');

}