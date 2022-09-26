$(document).ready(() => {
  const $addContact = $("#add-contact");
  const $overlay = $(".overlay");
  const $contactList = $("#contact-list");
  const $containers = $(".containers");

  // initial list of contacts to display (not in alphabetical order on purpose)
  let contacts = [
    {
      firstName: "John",
      lastName: "Smith",
      phone: "123-123-1234",
      street: "123 Main St",
      city: "New York",
      country: "USA",
    },
    {
      firstName: "Andres",
      lastName: "Lopez",
      phone: "888-888-8888",
      street: "Calle del Portal",
      city: "Mexico City",
      country: "Mexico",
    },
    {
      firstName: "Andres",
      lastName: "Barajas",
      phone: "888-888-8888",
      street: "Calle del Portal",
      city: "Mexico City",
      country: "Mexico",
    },
  ];

  // function to sort contacts alphabetically into the array of contacts - will be called everytime a new contact is created
  (function ($) {
    $.fn.sortContacts = function (contacts) {
      contacts.sort((a, b) => {
        if (a.firstName.toLowerCase() !== b.firstName.toLowerCase()) {
          return a.firstName.toLowerCase() > b.firstName.toLowerCase()
            ? 1
            : b.firstName.toLowerCase() > a.firstName.toLowerCase()
            ? -1
            : 0;
        } else {
          return a.lastName.toLowerCase() > b.lastName.toLowerCase()
            ? 1
            : b.lastName.toLowerCase() > a.lastName.toLowerCase()
            ? -1
            : 0;
        }
      });
      return contacts;
    };
  })(jQuery);

  (function ($) {
    $.fn.renderContactList = function (contacts) {
      contacts.map((contact, index) => {
        $("#contact-list ul").append(() => {
          return `<li data-filter-item data-index-${index} data-firstname="${contact.firstName.toLowerCase()}" data-lastname="${contact.lastName.toLowerCase()}" class="contact-item separator">${
            contact.firstName
          } ${contact.lastName}</li>`;
        });
      });
    };
  })(jQuery);

  // sort contacts first time the app loads and then render the list
  contacts = $.fn.sortContacts(contacts);
  $.fn.renderContactList(contacts);

  // Add contact form - hides the rest of the page and shows the form
  $addContact.on("click", () => {
    $overlay.show();
    $containers.hide();
    $("#new-contact-form").trigger("reset");
  });

  // handles the search bar
  $(".search-area").on("keyup", function () {
    let searchItem = $(this).val();
    let filterItems = $contactList.find("[data-filter-item]");

    // filters the contacts based on the search bar
    if (searchItem !== "") {
      // find the contacts that match the search bar - first name or last name
      let shortlist = filterItems
        .addClass("hidden")
        .filter((item) => {
          return (
            $(filterItems[item])
              .data("firstname")
              .indexOf(searchItem.toLowerCase()) === 0 ||
            $(filterItems[item])
              .data("lastname")
              .indexOf(searchItem.toLowerCase()) === 0
          );
        })
        .removeClass("hidden");

      // if there are no contacts that match the search bar, show the message
      shortlist.length === 0 && $(".no-results").show();
    } else {
      // show all contacts
      filterItems.removeClass("hidden");
      $(".no-results").hide();
    }
  });

  $("#new-contact-form .form-cancel").on("click", function (e) {
    e.preventDefault();
    $overlay.hide();
    $containers.show();
  });

  $(function () {
    $("#new-contact-form").validate({
      rules: {
        firstname: {
          required: true,
          minlength: 2,
        },
        lastname: {
          required: true,
          minlength: 2,
        },
      },
      messages: {
        firstname: {
          required: "Please enter your name",
          minlength: "Name must consist of at least 2 characters",
        },
        lasttname: {
          required: "Please enter your name",
          minlength: "Name must consist of at least 2 characters",
        },
      },
      submitHandler: function (form) {
        console.log({ form });
        let newContact = {
          firstName: $("#firstname").val(),
          lastName: $("#lastname").val(),
          phone: $("#phone").val() || "",
          street: $("#street").val() || "",
          city: $("#city").val() || "",
          country: $("#country").val() || "",
        };
        $("#contact-list ul").empty();
        $(".no-results").hide();
        contacts.push(newContact);
        contacts = $.fn.sortContacts(contacts);
        $.fn.renderContactList(contacts);
        $overlay.hide();
        $containers.show();
      },
    });
  });
});
