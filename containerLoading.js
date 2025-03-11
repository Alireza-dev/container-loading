class BlurLoader {
  constructor(selector, action, color) {


    this.$element = $(selector); // Select the element using jQuery

    if (this.$element.length === 0) {
      console.error(`Element not found: ${selector}`);
      return;
    }

    if (action === "activate") {
      this.activate(color);
    } else if (action === "deactivate") {
      this.deactivate();
    } else {
      console.error(
        `Invalid action: ${action}. Use "activate" or "deactivate".`
      );
    }
  }

  activate(color) {
    // Check if the loader is already active
    if (this.$element.parent().hasClass("loading_container")) {
      console.warn("BlurLoader is already active.");
      return;
    }

    // Wrap the original container
    this.$element.wrap(
      '<div class="loading_container" style="position: relative;"></div>'
    );

    // Add the spinner
    const spinner = `
        <div class="spinner-border ${color}" role="status" style="
          position: absolute; 
          z-index: 2; 
          left: calc(50% - 48px); 
          top: calc(50% - 48px); 
          width: 100px; 
          height: 100px; 
          --bs-spinner-border-width: 0.35em;">
          <span class="visually-hidden">Loading...</span>
        </div>
      `;
    this.$element.before(spinner);

    // Apply blur effect
    this.$element.css("filter", "blur(3px)");
  }

  deactivate() {
    // Check if the loader is inactive
    const $loadingContainer = this.$element.parent(".loading_container");
    if ($loadingContainer.length === 0) {
      console.warn("BlurLoader is not active.");
      return;
    }

    // Remove the spinner
    $loadingContainer.find(".spinner-border").remove();

    // Unwrap the original container
    this.$element.css("filter", "").unwrap();
  }
}
