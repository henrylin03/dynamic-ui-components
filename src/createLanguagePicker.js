import "./assets/styles/global.css";

export default function createLanguagePicker({
  containerElementCSSSelector = "body",
  languages = ["English"],
  expandEvent = "click",
} = {}) {
  // run checks
  const VALID_EXPAND_EVENTS = ["hover", "click", "mousedown"];
  if (!expandEvent || !VALID_EXPAND_EVENTS.includes(expandEvent))
    return console.error(
      "Please use a valid event type for expanding the dropdown. Valid events are 'hover', 'click', 'mousedown'."
    );

  // container element is the parent of the language picker
  const containerElement = document.querySelector(containerElementCSSSelector);

  // event handlers
  const expandEventType = expandEvent === "hover" ? "mouseover" : "mousedown";
  const toggleOptionsDisplay = () => dropdownOptions.classList.toggle("opened");
  const hideOptions = () => dropdownOptions.classList.remove("opened");
  const updateBtnTextWithChosenLanguage = (language) =>
    (currentLanguageDisplayed.textContent = language);

  // generate the language-picker
  const languagePickerElement = document.createElement("article");
  languagePickerElement.classList.add("language-picker");

  const toggleBtnElement = document.createElement("button");
  toggleBtnElement.type = "button";
  toggleBtnElement.classList.add("language-picker-btn");
  toggleBtnElement.addEventListener(expandEventType, toggleOptionsDisplay);

  const toggleBtnLeftContainer = document.createElement("div");
  toggleBtnLeftContainer.classList.add("left");

  const globeIcon = document.createElement("figure");
  globeIcon.classList.add("globe-icon");

  const currentLanguageDisplayed = document.createElement("p");
  currentLanguageDisplayed.classList.add("current-language");
  currentLanguageDisplayed.textContent = languages[0];

  const chevronIcon = document.createElement("figure");
  chevronIcon.classList.add("chevron-icon");

  toggleBtnLeftContainer.appendChild(globeIcon);
  toggleBtnLeftContainer.appendChild(currentLanguageDisplayed);
  toggleBtnElement.appendChild(toggleBtnLeftContainer);
  toggleBtnElement.appendChild(chevronIcon);

  languagePickerElement.appendChild(toggleBtnElement);

  const dropdownOptions = document.createElement("ul");
  dropdownOptions.classList.add("dropdown-options");
  languages.forEach((language) => {
    const languageListItem = document.createElement("li");
    languageListItem.classList.add("option");
    const left = document.createElement("figure");
    const languageText = document.createElement("p");
    languageText.textContent = language;

    languageListItem.addEventListener("mousedown", () => {
      updateBtnTextWithChosenLanguage(language);
      hideOptions();
    });

    languageListItem.appendChild(left);
    languageListItem.appendChild(languageText);
    dropdownOptions.appendChild(languageListItem);
  });

  languagePickerElement.appendChild(dropdownOptions);
  languagePickerElement.addEventListener("mouseleave", hideOptions);

  containerElement.appendChild(languagePickerElement);
}

//todo: in docs, explain what each parameter means, expected values, and show examples!

// todo: function for generating button, and function for generating dropdown options
