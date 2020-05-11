import {ElementRef, Injectable} from '@angular/core';
import * as katex from 'katex';

/**
 * delimiter class to split a text strping in order to render math equations
 */
export class SplitAtDelimiters {

  /**
   * eslint no-constant-condition:0
   * find end of math expression using delimiter
   * @param {string} delimiter
   * @param {string} text
   * @param {number} startIndex
   * @returns {number}
   */
  findEndOfMath(delimiter: string, text: string, startIndex: number): number {
    // Adapted from
    // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
    let index = startIndex;
    let braceLevel = 0;

    const delimLength = delimiter.length;

    while (index < text.length) {
      const character = text[index];

      if (braceLevel <= 0 &&
        text.slice(index, index + delimLength) === delimiter) {
        return index;
      } else if (character === '\\') {
        index++;
      } else if (character === '{') {
        braceLevel++;
      } else if (character === '}') {
        braceLevel--;
      }

      index++;
    }

    return -1;
  }

  /**
   * Split text string by specified delimiters
   * @param startData
   * @param {string} leftDelim
   * @param {string} rightDelim
   * @param display
   * @returns {any[]}
   */
   splitAtDelimiters(startData: any, leftDelim: string, rightDelim: string, display: any): any[] {
    const finalData = [];

    startData.forEach( text => {
      if (text.type === 'text') {
        let lookingForLeft = true;
        let currIndex = 0;
        let nextIndex;

        nextIndex = text.data.indexOf(leftDelim);
        if (nextIndex !== -1) {
          currIndex = nextIndex;
          finalData.push({
            type: 'text',
            data: text.data.slice(0, currIndex),
          });
          lookingForLeft = false;
        }

        while (true) {
          if (lookingForLeft) {
            nextIndex = text.data.indexOf(leftDelim, currIndex);
            if (nextIndex === -1) {
              break;
            }

            finalData.push({
              type: 'text',
              data: text.data.slice(currIndex, nextIndex),
            });

            currIndex = nextIndex;
          } else {
            nextIndex = this.findEndOfMath(
              rightDelim,
              text.data,
              currIndex + leftDelim.length);
            if (nextIndex === -1) {
              break;
            }

            finalData.push({
              type: 'math',
              data: text.data.slice(
                currIndex + leftDelim.length,
                nextIndex),
              rawData: text.data.slice(
                currIndex,
                nextIndex + rightDelim.length),
              display,
            });

            currIndex = nextIndex + rightDelim.length;
          }

          lookingForLeft = !lookingForLeft;
        }

        finalData.push({
          type: 'text',
          data: text.data.slice(currIndex),
        });
      } else {
        finalData.push(text);
      }
    });

    return finalData;
  }

  /**
   * no args constructor
   */
   constructor() {}
}

/**
 * service to render math
 */
@Injectable({
  providedIn: 'root'
})
export class KatexRenderService {
  /**
   * delimiter object
   * @type {SplitAtDelimiters}
   */
  splitAtDelimiters: SplitAtDelimiters = new SplitAtDelimiters();

  /**
   * object of default parameters
   * @type {{strict: boolean; delimiters: {left: string; right: string; display: boolean}[];
   * ignoredTags: string[]; errorCallback: (msg, err) => void}}
   */
  defaultAutoRenderOptions = {
    strict: false,
    delimiters: [
      {left: '$$', right: '$$', display: true},

      {left: '\\(', right: '\\)', display: false},
      {left: '\\\\(', right: '\\\\)', display: false},
      // LaTeX uses $…$, but it ruins the display of normal `$` in text:
      // {left: "$", right: "$", display: false},

      //  \[…\] must come last in this array. Otherwise, renderMathInElement
      //  will search for \[ before it searches for $$ or  \(
      // That makes it susceptible to finding a \\[0.3em] row delimiter and
      // treating it as if it were the start of a KaTeX math zone.
      {left: '\\[', right: '\\]', display: true}
    ],

    ignoredTags: [
      'script', 'noscript', 'style', 'textarea', 'pre', 'code',
    ],

    errorCallback(msg, err) {
      console.error(msg, err);
    },
  };

  /**
   * no args constructor
   */
  constructor() {
  }


  /* eslint no-console:0 */
  /**
   *
   * @param {string} text
   * @param delimiters
   * @returns {any}
   */
  splitWithDelimiters(text: string, delimiters: any): any {
    let data = [{type: 'text', data: text}];
    delimiters.forEach(delimiter => {
      data = this.splitAtDelimiters.splitAtDelimiters(
        data, delimiter.left, delimiter.right,
        delimiter.display || false);
    });
    return data;
  }

  /**
   * Note: optionsCopy is mutated by this method. If it is ever exposed in the
   * API, we should copy it before mutating.
   * @param text
   * @param optionsCopy
   * @returns {DocumentFragment}
   */
  renderMathInText(text: string, optionsCopy?: any): DocumentFragment {
    const data = this.splitWithDelimiters(text, optionsCopy.delimiters);
    const fragment = document.createDocumentFragment();
    data.forEach( datum => {
      if (datum.type === 'text') {
        fragment.appendChild(document.createTextNode(datum.data));
      } else {
        const span = document.createElement('span');
        const math = datum.data;
        // Override any display mode defined in the settings with that
        // defined by the text itself
        optionsCopy.displayMode = datum.display;
        try {
          katex.render(math, span, optionsCopy);
        } catch (e) {
          if (!(e instanceof katex.ParseError)) {
            throw e;
          }
          optionsCopy.errorCallback(
            'KaTeX auto-render: Failed to parse `' + datum.data +
            '` with ',
            e
          );
          fragment.appendChild(document.createTextNode(datum.rawData));
        }
        fragment.appendChild(span);
      }
    });
    return fragment;
  }

  /**
   * render equation in element
   * @param elem
   * @param optionsCopy
   * @private
   */
  private _renderElem(elem: any, optionsCopy?: any): void {
      for (const childNode of elem.childNodes) {
      if (childNode.nodeType === 3) {
        // Text node
        const frag = this.renderMathInText(childNode.textContent, optionsCopy);
       // i += frag.childNodes.length - 1;
        elem.replaceChild(frag, childNode);
      } else if (childNode.nodeType === 1) {
        // Element node
        const shouldRender = optionsCopy.ignoredTags.indexOf(
          childNode.nodeName.toLowerCase()) === -1;

        if (shouldRender) {
          this._renderElem(childNode, optionsCopy);
        }
      }
      // Otherwise, it's something else, and ignore it.
    }
  }

  /**
   * pass to renderElem function
   * @param elem
   * @param options
   */
  renderMathInElement(elem: any, options?: any): void {
    if (!elem) {
      throw new Error('No element provided to render');
    }

    const optionsCopy = Object.assign({}, this.defaultAutoRenderOptions, options);

    // Enable sharing of global macros defined via `\gdef` between different
    // math elements within a single call to `renderMathInElement`.
    if (!optionsCopy.macros) {
      optionsCopy.macros = {};
    }

    this._renderElem(elem, optionsCopy);
  }
}
