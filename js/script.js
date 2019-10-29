// code that runs when the page is loaded
//focus the name input box
$('#name').focus();
//Set focus to credit card
select_credit_card();
// disable select payment option in box.
$('#payment option[value="select method"]').attr('disabled', true);

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

    //update the total cost
    update_total_cost();

});


// handle clicks in the payment methods
$('#payment').on('change click', function () {

    let value = $(this).val();

    if (value === 'Credit Card') {
        select_credit_card();
    }
    else if (value === 'Bitcoin') {
        select_bitcoin();
    } else if (value === 'PayPal') {
        select_paypal();

    }
    // All other options are invalid, 
    else {
        null;
    }
});


function validate_email(email) {
    //returns true if the email is valid
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function validate_registered_for_at_least_one(){
    // check that the user has checked at least one box
    $('.activities').each( function(){
        if ( $(this).attr('checked')===true  ){
            // return true, this breaks the loop
            return true
        }
    });
    // we only reach this point if none were checked.
    return false
}
function validate_cvv(cvv) {
    return /[\d]{3}/;
}
function validate_name(name) {
    //returns true if there is at least one word character, case insensitive
    return /[a-z]+i/.test(name);
}
function validate_credit_card(credit_card) {
    return /[\d]{13-16}/.test(credit_card);
}
function validate_zip_code(zipcode) {
    //zip code must be 5 digits
    /[\d]{5}/.test(zipcode);
}
function update_total_cost() {
    // if there is no element below the checkboxes then create it
    if ($('#total_cost').length === 0) {
        let total_cost = document.createElement('label');
        total_cost.id = 'total_cost';
        total_cost.textContent = '$0';
        total_cost.className = 'cost';
        console.log(total_cost);
        $('.activities').append(total_cost);
    }

    // calculate the total price by iterating over the checkboxes and added up those that are checked
    let cost = 0;
    $('.activities input').each(function () {
        let checkbox = $(this);
        let cst = checkbox.data('cost');
        console.log(cst);
        if (checkbox.prop('checked') === true) {
            cost += parseFloat(cst.replace('$', ''));
        }
    });

    // set the value of the total cost field to the cost
    $('#total_cost').prop('textContent', `$${cost}`);

}

function disable_conflicting_workshops(name, time) {
    //takes the time of a workshop as input and disables all workshops with the same time
    $('.activities input').each(function () {

        if ($(this).data('day-and-time') === time) {
            //console.log(`This conflicts ${$(this).data('day-and-time')}`);

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


function select_paypal() {
    $('#payment').val('PayPal').attr('selected', true);
    $('#bitcoin').hide();
    $('#paypal').show();
    $('#credit-card').hide();
}
function select_credit_card() {
    $('#payment').val('Credit Card').attr('selected', true);
    // hide paybal and bitcoin info
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#credit-card').show();
}
function select_bitcoin() {
    $('#payment').val('Bitcoin').attr('selected', true);
    $('#bitcoin').show();
    $('#paypal').hide();
    $('#credit-card').hide();
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

