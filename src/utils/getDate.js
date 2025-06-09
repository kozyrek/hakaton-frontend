export const getDate = (str) => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    const date = new Date(str);
    return date.toLocaleString('ru', options)
}
