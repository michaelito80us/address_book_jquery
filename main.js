$(document).ready(() => {
  const $addContact = $("#add-contact");
  const $overlay = $(".overlay");
  const $contactList = $("#contact-list");
  const $containers = $(".containers");

  // initial list of contacts to display
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

  // function to sort contacts alphabetically into the array of contacts
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

  $.fn.sortContacts(contacts).map((contact, index) => {
    $("#contact-list ul").append(() => {
      return `<li data-filter-tem data-index-${index} class="contact-item">${contact.firstName} ${contact.lastName}</li>
      <div class="separator"> </div>`;
    });
  });

  // Add contact form - hides the rest of the page and shows the form
  $addContact.on("click", () => {
    $overlay.show();
    $containers.hide();
  });

  // handles the search bar
  $(".search-area").on("keyup", function () {
    let searchItem = $(this).val();
    console.log({ searchItem });

    // filters the contacts based on the search bar
    if (searchItem !== "") {
      // filter items from my contacts object
    } else {
      // show all contacts
    }
  });
});
