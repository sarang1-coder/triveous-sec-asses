import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://indian-news1.p.rapidapi.com/indianNews',
  params: {
    size: '20',
    cat: 'TopNews'
  },
  headers: {
    'X-RapidAPI-Key': '3d14d4999bmsh57d6b86c6fa9797p109968jsn5796d7f96ef9',
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
