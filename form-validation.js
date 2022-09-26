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
