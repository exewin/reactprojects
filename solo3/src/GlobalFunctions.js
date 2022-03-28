//use to correctly display text containing quotes, commas etc.
export const decodeHtml = html => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}