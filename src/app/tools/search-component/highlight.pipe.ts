import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to highlight searcch text in results
 */
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  /**
   * parses a string to return highlighted search text
   * @param {string} text
   * @param {string} search
   * @returns {string}
   */
  transform(text: string, search: string): string {
    if (search && text) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      pattern = pattern.split(' ').filter((t) => {
        return t.length > 0;
      }).join('|');
      const regex = new RegExp(pattern, 'gi');

      return text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);
    } else {
      return text;
    }
  }
}
