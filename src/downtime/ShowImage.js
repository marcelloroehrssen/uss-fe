export const showImage = i => {
    if (process.env.CDN_ENABLED) {
        return i.image;
    }
    return i.image.replace('//cdn.unasporcastoria.com/item', 'https://localhost:8000/uploads')
}