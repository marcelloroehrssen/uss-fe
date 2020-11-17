export const describe = (downtTime, length) => {
    let originalDescription = '';

    if (downtTime.description !== '' && downtTime.description !== null) {
        originalDescription = downtTime.description
    } else {
        originalDescription = downtTime.recipe.downtimeDefinition.description.replace(/<[^>]+>/g, '')
    }

    let description = originalDescription.substring(0, length)
    if (originalDescription.length > length) {
        description += '...';
    }

    return description;
}