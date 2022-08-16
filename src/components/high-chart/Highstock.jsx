import { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Card from 'react-bootstrap/Card';

export default function Highstock(props)
{
  const highChartRef = useRef(null);
  const [ options, setOptions ] = useState({
    title: {
      text: props.title,
      align: 'left',
    },
    xAxis: {
      categories: [],
    },
    series: [
      {
        name: props.seriesName ? props.seriesName : 'Series',
        data: [],
      }
    ],
  });

  const setCategoriesAndSeries = () => {
    let newCategories = [...props.data].map(element => element[props.dataCategoriesName]);
    let newSeries = [...props.data].map(element => element[props.dataSeriesName]);
    setOptions({
      ...options,
      xAxis: {
        categories: newCategories,
      },
      series: [
        {
          name: props.seriesName ? props.seriesName : 'Series',
          data: newSeries,
        }
      ],
    });
  }

  useEffect(() => {
    if ( props.data && Array.isArray(props.data) && props.data.length > 0 && props.dataCategoriesName && props.dataSeriesName ) {
      setCategoriesAndSeries();
    }
  }, [props.data]);

  return (
    <Card style={{ marginBottom: '30px' }}>
        <Card.Body>
          <HighchartsReact highcharts={Highcharts} options={options} ref={highChartRef} />
        </Card.Body>
    </Card>
  )
}