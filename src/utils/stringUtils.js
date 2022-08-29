export const validatePrice = (price) => 
{
    if ( !price ) {
        return false;
    }

    const re = /^[0-9]+([.][0-9]+)?$/g;

    if ( !re.test(price) ) {
        return false;
    }

    return true;
}