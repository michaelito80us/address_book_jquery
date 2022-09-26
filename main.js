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
        if (a.firstName !== b.firstName) {
          return a.firstName > b.firstName
            ? 1
            : b.firstName > a.firstName
            ? -1
            : 0;
        } else {
          return a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0;
        }
      });
      return contacts;
    };
  })(jQuery);

  (function ($) {
    $.fn.renderContactList = function (contacts) {
      contacts.map((contact, index) => {
        $("#contact-list ul").append(() => {
          return `<li data-filter-item data-index-${index} data-firstname=${contact.firstName.toLowerCase()} data-lastname=${contact.lastName.toLowerCase()} data-fullname="${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}" class="contact-item">${
            contact.firstName
          } ${
            contact.lastName
          }</li> <div data-filter-item data-firstname=${contact.firstName.toLowerCase()} data-lastname=${contact.lastName.toLowerCase()} data-fullname="${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}" class="separator"> </div>`;
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
  });

  // handles the search bar
  $(".search-area").on("keyup", function () {
    let searchItem = $(this).val();
    console.log({ searchItem });
    let filterItems = $contactList.find("[data-filter-item]");
    console.log({ filterItems });

    // filters the contacts based on the search bar
    if (searchItem !== "") {
      // find the contacts that match the search bar - first name or last name
      filterItems
        .addClass("hidden")
        .filter((item) => {
          console.log(filterItems[item]);
          return (
            $(filterItems[item])
              .data("firstname")
              .indexOf(searchItem.toLowerCase()) === 0 ||
            $(filterItems[item])
              .data("lastname")
              .indexOf(searchItem.toLowerCase()) === 0 ||
            $(filterItems[item])
              .data("fullname")
              .indexOf(searchItem.toLowerCase()) === 0
          );
        })
        .removeClass("hidden");
    } else {
      // show all contacts
      filterItems.removeClass("hidden");
    }
  });
});
