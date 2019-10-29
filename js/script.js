// code that runs when the page is loaded
run_at_startup();

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

// handle clicks and changes to the register button. It was not given an id, but there are no longer buttons on page so its "good enough".
$('button').on('click change', function (event) {
    event.preventDefault();
    // Check if all validation is complete
    validate_fields_and_show_warnings();

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

function validate_fields_and_show_warnings() {

    let name = $('#name');

    if (validate_name(name.val()) === false) {
        console.log($('input #name'));
        create_or_show_warning('Please enter a name', name);
    } else {
        hide_warning(name);
    }
    let mail = $('#mail');
    if (validate_email(mail.val()) === false) {
        create_or_show_warning("Invalid email", mail);
    } else {
        hide_warning(mail);
    }
    let activities = $('.activities');
    if (validate_registered_for_at_least_one() === false) {
        create_or_show_warning('Please select at least one activity', activities);
    } else {
        hide_warning(activities);
    }
    // check only if credit card is selected
    let payment_menu = $('#payment')
    if (payment_menu.val() === 'Credit Card') {
        let card_number = $('#cc-num');
        if (validate_credit_card(card_number.val()) === false) {
            create_or_show_warning('Invalid credit card number', card_number);
        } else {
            hide_warning(card_number);
        }
        let zip = $('#zip');
        if (validate_zip_code(zip.val()) === false) {
            create_or_show_warning('Invalied Zip code', zip);
        } else {
            hide_warning(zip);
        }
        let cvv = $('#cvv');
        if (validate_cvv(cvv.val()) === false) {
            create_or_show_warning('Invalid CVV', cvv);
        } else {
            hide_warning(cvv);
        }
    }
}

function hide_warning(attachto) {
    //remove the label
    $(attachto).prev('.error-text').hide();
    // remove red around the element
    $(attachto).removeClass('error');
}
function create_or_show_warning(text, attachto) {
    // a helper function for creating a html element for showing warnings and makes the element border red
    // only create a warning if there is not already one in place
    if (attachto.prev('.error-text').length < 1) {
        let element = document.createElement('label')
        element.textContent = text;

        // make the text red
        element.className = 'error-text';
        // make the border around the textfield red
        $(attachto).addClass('error');

        // attach to element ot what was passed to it
        attachto.before(element);


    }
    // if the element already exsists, just show it
    else if (attachto.prev('.error-text').length >= 1) {
        attachto.prev('.error-text').show();
        attachto.addClass('error');
    }



}
function check_all_validation() {
    // go over all the things that can be validated and display error messages where things are not correct

    // check for failed validation
    // validation ok
    if (validate_email($('mail').val())) {
        null;
        //validation ok
    } else {

    }
}
function validate_email(email) {
    //returns true if the email is valid
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function validate_registered_for_at_least_one() {
    // check that the user has checked at least one box
    let signed_up = false

    $('.activities input').each(function () {
        console.log($(this).prop('checked'));
        if ($(this).prop('checked') === true) {
            // return true, this breaks the loop, but only into the other method, hence the signed_up flag.
            signed_up = true
            return true
        }

    });

    if (signed_up == false) {
        return false;
    }

}
function validate_cvv(cvv) {
    return /^\d{3}$/.test(cvv);
}
function validate_name(name) {
    //returns true if there is at least one word character, case insensitive
    return /^[a-z]+/.test(name);
}
function validate_credit_card(credit_card) {
    return /^[\d]{13-16}$/.test(credit_card);
}
function validate_zip_code(zipcode) {
    //zip code must be 5 digits
    return /^\d{5}$/.test(zipcode);
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
function run_at_startup() {
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

}