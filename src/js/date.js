const dateOnlyRegex =
  /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])))$/;

function parseDateString(dateString) {
  if (dateOnlyRegex.test(dateString)) {
    const utcDate = new Date(dateString);
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );
    return localDate;
  }
  return new Date(dateString);
}

export { parseDateString };
