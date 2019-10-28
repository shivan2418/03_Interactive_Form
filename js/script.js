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


// handle changes in the Register for Activities
$('.activities').on('click change', function (event) {

    // only do the check for date if the element we just checked has a date
    let time_of_workshop = $(event.target).data('day-and-time');

    if (time_of_workshop !== undefined) {
        // iterate over all the boxes and disable those that have the same time as the one we just checked
        name = $(event.target).prop('name');
        // if a box was enabled, do one kind of check
        if ($(event.target).prop('checked') === true) {
            disable_conflicting_workshops(name, time_of_workshop);
        } else if ($(event.target).prop('checked') === false) {
            free_up_workshops(name, time_of_workshop);
        }
    }
});

function disable_conflicting_workshops(name, time) {
    //takes the time of a workshop as input and disables all workshops with the same time
    $('.activities input').each(function () {

        if ($(this).data('day-and-time') === time) {
            console.log(`This conflicts ${$(this).data('day-and-time')}`);

            // disable the checkbox that has the same time, unless its the same as the checkbox clicked.
            if ($(this).prop('name') !== name) {
                $(this).prop('disabled', true);
            }
        }
    });
}
function free_up_workshops(name, time) {
    //takes the time of a workshop as input and disables all workshops with the same time
    $('.activities input').each(function () {

        if ($(this).data('day-and-time') === time) {
            console.log(`This conflicts ${$(this).data('day-and-time')}`);

            // disable the checkbox that has the same time, unless its the same as the checkbox clicked.
            if ($(this).prop('name') !== name) {
                $(this).prop('disabled', false);
            }
        }
    });
}

function show_color_options(list_of_colors) {
    //Shows the colors in the list of colors, hides all other//
    const menu_options = $('#color option');
    $('#color').show();
    $('#colors-js-puns label').text('Colors:');

    for (let i = 0; i < menu_options.length; i++) {
        let allowed = (list_of_colors.indexOf(menu_options[i].value) > -1)
        //console.log(`${menu_options[i].value} ${allowed}`)
        if (allowed) {
            $(menu_options[i]).show();
        } else {
            $(menu_options[i]).hide();
        }
    }
};

function prompt_to_select_color() {
    // When the user has not selected a design show this.


    // hide the color selection
    $('#color').hide();
    //Tell user to select a color
    $('#colors-js-puns label').text('Select a theme');

}

class Workshop {
    constructor(title, timeslot, price = 100) {
        this.title = title;
        this.price = price;
        this.timeslot = timeslot;
    }
}

function create_workshops() {
    // Create a list of workshop instances.
    let workshops = [new Workshop('JavaScript Frameworks Workshop', 1),
    new Workshop('JavaScript Libraries Workshop', 2),
    new Workshop('Express Workshop', 1),
    new Workshop('Node.js Workshop', 2),
    new Workshop('Build tools Workshop', 3),
    new Workshop('npm Workshop', 4)];

    return workshops;
}

