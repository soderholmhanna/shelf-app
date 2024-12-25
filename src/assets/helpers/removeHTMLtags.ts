export const removeHTMLTags = (input: string | undefined) => {
    if (!input) return '';
    return input.replace(/<\/?[^>]+(>|$)/g, '');
}