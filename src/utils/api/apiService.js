import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://indian-news1.p.rapidapi.com/indianNews',
  params: {
    size: '20',
    cat: 'TopNews'
  },
  headers: {
    'X-RapidAPI-Key': '9f4071b712msh8d3753923e1a0dbp1e59f5jsnbfa52ef0c5fe',
    'X-RapidAPI-Host': 'indian-news1.p.rapidapi.com'
  }
}

export const fetchAllData = async () => {
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
