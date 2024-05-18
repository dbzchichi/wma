"use strict";
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const notes = document.querySelector("#notes");
const button = document.querySelector("#button");
const form = document.querySelector("#form");
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfeQcBvPItp9CcESBoNRbdJAzQg6dejhl0Qg0GHCa3k3qXzVg/formResponse"; // your google form response URL e.g https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfVQ2ycW2AROnbmCmVw8I8Uc7Z40BZtjleJ_-IQjgtznQ_4cJl/formResponse

const handleSubmit = async (event) => {
  event.preventDefault();
  const fullNameValue = fullName.value;
  const emailValue = email.value;
  const notesValue = notes.value;
  const formData = {
    "entry.1481699390": fullNameValue, // entry.253486596 is the name attribute for the full name field on our google form
    "entry.1215028417": emailValue, // entry.1124906099 is the name attribute for the email address field on our google form
    "entry.548679282": notesValue, // entry.1163114650 is the name attribute for the notes address field on our google form
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("Form submitted, we will be in contact soon.  Thank you for your interest!");
  } catch (error) {
    alert("Something went wrong, please try again");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
  }
};

form.addEventListener("submit", handleSubmit);

// A helper function to help convert the data to FormData
const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};
