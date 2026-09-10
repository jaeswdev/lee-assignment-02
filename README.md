# Assignment 02 — Interactive JavaScript Page

**CS 174 · Server-Side Web Programming · San José State University**

A single static page with two independent interactive forms, built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies — it runs by opening the file in a browser.

---

## What it does

**Add Two Numbers** — Takes two values from text fields and displays their sum. If either field is empty, contains only whitespace, or contains anything that is not a valid number, an error message replaces the total line instead.

**Change Text Style** — A dropdown offers Normal, Bold, Italic, and Bold Italic. Clicking the button applies the selected style to the sample line below it.

Both forms can be used repeatedly in any order, and each interaction fully replaces the previous result rather than adding to it.

---

## Running it

No server required.

```bash
git clone <repository-url>
cd lee-assignment-02
```

Then open `index.html` in any browser — double-click it, or drag it onto a browser window.

Because every reference in the HTML is relative (`href="style.css"`, `src="app.js"`), the three files only need to stay in the same folder.

---

## Project structure

```
lee-assignment-02/
├── index.html    Structure — the two forms and their controls
├── style.css     Presentation — layout, colours, and the text-style classes
└── app.js        Behaviour — validation, arithmetic, and DOM updates
```

The split is strict on purpose. `index.html` contains no inline styles and no inline event handlers; `style.css` contains no content; `app.js` is the only file that decides what happens when something is clicked.

---

## Implementation notes

### Buttons, not submit controls

Both forms use `<button type="button">`. A submit control would send a request and reload the page, wiping the result the user just generated. Since the page is required to be usable repeatedly, nothing is ever submitted — the `<form>` elements exist purely as document structure.

### Text inputs, not number inputs

The two fields use `type="text"` rather than `type="number"`. A number input would let the browser reject non-numeric keystrokes, which would make the validation logic unreachable. Keeping the fields permissive means the error path is real and testable.

### String-to-number conversion

An input's `.value` is always a string, so `"5" + "3"` evaluates to `"53"` rather than `8`. Values are converted with `Number()` rather than `parseFloat()`, because `parseFloat("12abc")` succeeds and returns `12`, while `Number("12abc")` correctly yields `NaN`.

### Validation order

The empty-field check runs *before* conversion, and it has to. `Number("")` returns `0`, not `NaN` — so without a separate emptiness test, a blank field would silently be treated as zero and the error message would never appear. Both fields are trimmed first so whitespace-only input is caught by the same branch.

### Style state via `className`

The four dropdown options carry CSS class names as their `value` attributes, with Bold Italic using the two-class string `"bold italic"`. Applying a style is therefore a single assignment:

```javascript
styledText.className = styleSelect.value;
```

Assigning `className` wholesale replaces every class already on the element, so the previously selected style is cleared automatically. Using `classList.add()` instead would require explicit removal of every prior class on every click, or styles would accumulate and Normal would never take effect.

### Deferred script loading

The script tag uses `defer`, so the DOM is fully parsed before `app.js` runs. This lets the event listeners be registered at the top level of the file rather than nested inside a load handler.

---

## Input handling

| First field | Second field | Output |
|---|---|---|
| `5` | `3` | `Total = 8` |
| `3.5` | `1.25` | `Total = 4.75` |
| `-4` | `10` | `Total = 6` |
| *(empty)* | `5` | Error — enter a number in both fields |
| `"   "` | `5` | Error — enter a number in both fields |
| `abc` | `5` | Error — both entries must be numbers |
| `12abc` | `5` | Error — both entries must be numbers |

Floating-point sums are displayed as computed, so `0.1 + 0.2` renders as `0.30000000000000004`. This is standard IEEE 754 double-precision behaviour rather than a defect, and matches what `double` produces in Java or C++.

---

## Verification

- Markup validated with the [W3C Validator](https://validator.w3.org/)
- All element IDs unique; every `getElementById` lookup resolves
- Every `<label for="…">` matches an existing control ID
- Every dropdown value maps to a defined CSS class
- No console errors on load or interaction
- Style sequence tested for state leakage: Bold → Italic → Normal → Bold Italic → Normal

---

## Built with

Hand-written HTML5, CSS3, and JavaScript. The CSS uses custom properties (`:root` variables) and Flexbox for row alignment. No libraries.

---

## Author

Hyunjae Lee — San José State University, Department of Software Engineer

---

## Note on academic use

This repository contains coursework submitted for credit. If you are currently enrolled in CS 174, check your course policy before consulting it — submitting this work as your own would be an academic integrity violation, and the point of the assignment is the debugging you do on the way to a working page.