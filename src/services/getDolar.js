import axios from 'axios';
import moment from 'moment';

export default async function getDolar()
{
    const apiURL = 'https://mindicador.cl/api/dolar/2022';

    try {
        const response = await axios.get(apiURL);
        const { serie } = response.data;
        return transformDolarDate(serie);
    } catch (error) {
        throw error
    }
}

const transformDolarDate = (values) => {
    const newValues = values.map(element => 
    {
        let fecha = new Date(element.fecha);
        fecha = `${fecha.getDate()}/${(fecha.getMonth() + 1)}/${fecha.getFullYear()}`;
        fecha = moment(fecha, 'DD/MM/yyyy').format('DD/MM/yyyy');

        return {
            ...element,
            ['fecha']: fecha,
        }
    });

    return newValues;
}