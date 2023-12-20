import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://indian-news1.p.rapidapi.com/indianNews',
  params: {
    size: '20',
    cat: 'TopNews',
  },
  headers: {
    'X-RapidAPI-Key': 'c9ef0c2187msh3e72985ab01cb5bp139987jsn9b1d0233af1f',
    'X-RapidAPI-Host': 'indian-news1.p.rapidapi.com',
  },
}

export const fetchAllData = async () => {
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
