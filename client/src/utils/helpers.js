export function truncate(str, length) {
   return str.slice(0, length) + "..."; // return a new str
}

// to prevent crashing
export function safelyParseJson(value) {
   try {
      JSON.parse(value);
   } catch {
      // if error return the original value
      return value;
   }
   return JSON.parse(value);
}

function checkIsOver(str, num) {
   if (str.length > num) return true;
   else return false;
}

const MAX_CARD_CHARS = 240;

export { checkIsOver, MAX_CARD_CHARS };
