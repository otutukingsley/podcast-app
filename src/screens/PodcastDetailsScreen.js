import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PodcastDetailsBody from '../components/PodcastDetailsBody'
import PodcastDetailsHeader from '../components/ProductDetailsHeader'
import Loading from '../components/containers/spinner/Loading'
import { BASE_URL } from '../utils/constants'

const PodcastDetailsScreen = ({ handlePause, handlePlay }) => {
  const { collectionId } = useParams()
  const [podcast, setPodcast] = React.useState({})

  React.useEffect(() => {
    const fetchPods = async () => {
      getPodcast(collectionId)
        .then((data) => {
          setPodcast(data)
        })
        .catch((err) => console.log(err))
    }
    fetchPods()
  }, [collectionId])

  const { results } = podcast

  let podcastList, podcastDetails

  if (results) {
    podcastList = results.slice(1, results.length)
    podcastDetails = results[0]
  }

  return (
    <section>
      {results ? (
        <>
          <PodcastDetailsHeader podcastDetails={podcastDetails} />
          <PodcastDetailsBody
            episodes={podcastList}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </section>
  )
}

const getPodcast = async (collectionId) => {
  const response = await axios.get(
    `${BASE_URL}lookup?id=${collectionId}&country=US&media=podcast&entity=podcastEpisode&limit=400`,
  )
  return response.data
}

export default PodcastDetailsScreen
