/**
 * Decodes HTML entities in a string for use in React applications
 * @param {string} str - The HTML-encoded string to decode
 * @returns {string} - The decoded string
 */
export const decodeHTML = str => {
  // Handle null, undefined, or non-string inputs
  if (!str || typeof str !== "string") {
    return "";
  }

  // Comprehensive HTML entity map
  const htmlEntities = {
    // Basic entities
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",

    // Space and formatting
    "&nbsp;": "\u00A0", // non-breaking space
    "&ensp;": "\u2002", // en space
    "&emsp;": "\u2003", // em space
    "&thinsp;": "\u2009", // thin space

    // Copyright and symbols
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
    "&sect;": "§",
    "&para;": "¶",
    "&dagger;": "†",
    "&Dagger;": "‡",
    "&bull;": "•",
    "&hellip;": "…",

    // Math symbols
    "&deg;": "°",
    "&plusmn;": "±",
    "&times;": "×",
    "&divide;": "÷",
    "&sup2;": "²",
    "&sup3;": "³",
    "&frac12;": "½",
    "&frac14;": "¼",
    "&frac34;": "¾",

    // Punctuation
    "&ndash;": "–",
    "&mdash;": "—",
    "&lsquo;": "'",
    "&rsquo;": "'",
    "&sbquo;": "‚",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&bdquo;": "„",
    "&laquo;": "«",
    "&raquo;": "»",

    // Currency
    "&euro;": "€",
    "&pound;": "£",
    "&yen;": "¥",
    "&cent;": "¢",
    "&curren;": "¤",

    // Accented characters
    "&agrave;": "à",
    "&aacute;": "á",
    "&acirc;": "â",
    "&atilde;": "ã",
    "&auml;": "ä",
    "&aring;": "å",
    "&aelig;": "æ",
    "&ccedil;": "ç",
    "&egrave;": "è",
    "&eacute;": "é",
    "&ecirc;": "ê",
    "&euml;": "ë",
    "&igrave;": "ì",
    "&iacute;": "í",
    "&icirc;": "î",
    "&iuml;": "ï",
    "&ntilde;": "ñ",
    "&ograve;": "ò",
    "&oacute;": "ó",
    "&ocirc;": "ô",
    "&otilde;": "õ",
    "&ouml;": "ö",
    "&oslash;": "ø",
    "&ugrave;": "ù",
    "&uacute;": "ú",
    "&ucirc;": "û",
    "&uuml;": "ü",
    "&yacute;": "ý",
    "&yuml;": "ÿ",

    // Uppercase accented
    "&Agrave;": "À",
    "&Aacute;": "Á",
    "&Acirc;": "Â",
    "&Atilde;": "Ã",
    "&Auml;": "Ä",
    "&Aring;": "Å",
    "&AElig;": "Æ",
    "&Ccedil;": "Ç",
    "&Egrave;": "È",
    "&Eacute;": "É",
    "&Ecirc;": "Ê",
    "&Euml;": "Ë",
    "&Igrave;": "Ì",
    "&Iacute;": "Í",
    "&Icirc;": "Î",
    "&Iuml;": "Ï",
    "&Ntilde;": "Ñ",
    "&Ograve;": "Ò",
    "&Oacute;": "Ó",
    "&Ocirc;": "Ô",
    "&Otilde;": "Õ",
    "&Ouml;": "Ö",
    "&Oslash;": "Ø",
    "&Ugrave;": "Ù",
    "&Uacute;": "Ú",
    "&Ucirc;": "Û",
    "&Uuml;": "Ü",
    "&Yacute;": "Ý",
  };

  return str.replace(
    /&(?:#(?:x[0-9a-fA-F]+|[0-9]+)|[a-zA-Z][a-zA-Z0-9]*);/g,
    entity => {
      // Handle numeric entities (&#123; or &#x1F;)
      if (entity.startsWith("&#")) {
        const isHex = entity.startsWith("&#x");
        const numStr = entity.slice(isHex ? 3 : 2, -1);
        const num = parseInt(numStr, isHex ? 16 : 10);

        // Validate the number is within valid Unicode range
        if (isNaN(num) || num < 0 || num > 0x10ffff) {
          return entity; // Return original if invalid
        }

        try {
          // Use String.fromCodePoint for full Unicode support
          return String.fromCodePoint(num);
        } catch (e) {
          return entity; // Return original if conversion fails
        }
      }

      // Handle named entities
      return htmlEntities[entity] || entity;
    }
  );
};
