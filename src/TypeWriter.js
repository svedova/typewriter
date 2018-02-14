const consume = promises => {
  const promise = promises[0];

  if (promise) {
    return promise().then(() => consume(promises.slice(1)));
  }

  return Promise.resolve();
};

export default class TypeWriter {
  constructor(element, opts = { pause: 1000, speed: 5 }) {
    this.element = element;
    this.opts = opts;
    this.stack = [];
    this.speed = (10 - opts.speed) * 10;
  }

  /**
   * Type a string.
   *
   * @param {string} string
   * @param {HTMLElement} element The element to write
   */
  type(string, element = this.element) {
    this.stack.push(
      () =>
        new Promise(resolve => {
          let timeout = 0;

          string.split("").forEach((s, i) => {
            timeout += this.speed;
            setTimeout(() => {
              const className = this.opts.className || "typewriter";
              const prevTypeWriter = document.querySelector("." + className);

              if (prevTypeWriter) {
                prevTypeWriter.classList.remove(className);
              }

              element.innerHTML += s;
              element.classList.add(className);

              if (string.length === i + 1) {
                resolve();
              }
            }, timeout);
          });
        })
    );

    return this;
  }

  /**
   * Pause the action.
   *
   * @param timeout
   */
  pause(timeout = this.opts.pause) {
    this.stack.push(
      () =>
        new Promise(resolve => {
          setTimeout(resolve, timeout);
        })
    );

    return this;
  }

  /**
   * Delete the text.
   */
  delete() {
    this.stack.push(
      () =>
        new Promise(resolve => {
          this.element.innerHTML = "&#65279;";
          resolve();
        })
    );

    return this;
  }

  /**
   * Start the type writer.
   */
  start() {
    consume(this.stack);
  }

  /**
   * Loop over again and again.
   */
  loop() {
    const clone = this.stack.slice(0);

    if (!clone.length) {
      return;
    }

    consume(this.stack)
      .then(() => {
        this.stack = clone;
        this.loop();
      })
      .catch(() => {
        // Do nothing
      });
  }
}

