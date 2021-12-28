import React from 'react'
import axios from 'axios'
import { HOMESCREEN_API_URL } from '../utils/constants'
import HomePodcastSection from '../components/HomePodcastSection'
import Loading from '../components/containers/spinner/Loading'
const HomeScreen = (props) => {
  const [podcasts, setPodcasts] = React.useState()

  React.useEffect(() => {
    const fetchPods = async () => {
      getPodcasts()
        .then((data) => {
          setPodcasts(data)
        })
        .catch((err) => console.log(err))
    }
    fetchPods()
  }, [])

  let popularPodcasts, crimePodcasts, comedyPodcasts, politicsPodcasts

  if (podcasts) {
    // The alternative to this will be to create 4 separate API calls, which is wasteful
    popularPodcasts = podcasts.slice(0, 5)
    crimePodcasts = podcasts.slice(5, 10)
    comedyPodcasts = podcasts.slice(10, 15)
    politicsPodcasts = podcasts.slice(15, 20)
  }

  const { history } = props

  return (
    <>
      {podcasts ? (
        <>
          <section className="container px-5 mx-auto">
            <HomePodcastSection
              header={'Popular podcasts'}
              podcasts={popularPodcasts}
              history={history}
            />
            <HomePodcastSection
              header={'Top crime podcasts'}
              podcasts={crimePodcasts}
              history={history}
            />
            <HomePodcastSection
              header={'Top comedy podcasts'}
              podcasts={comedyPodcasts}
              history={history}
            />
            <HomePodcastSection
              header={'Top politics podcasts'}
              podcasts={politicsPodcasts}
              history={history}
            />
          </section>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  )
}
export default HomeScreen

const getPodcasts = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  }
  const response = await axios.get(HOMESCREEN_API_URL, headers)
  return response.data.results
}
